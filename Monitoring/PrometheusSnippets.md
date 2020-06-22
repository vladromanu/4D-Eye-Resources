Table of Contents
[TOC]

##### Github Repo & samples
https://github.com/prometheus-net/prometheus-net

##### Cheatsheet 
https://timber.io/blog/promql-for-humans/

##### Config 
```
global: 
    scrape _interval: 10s           -- time when the calls to /metrics happen

    - job_name: 'netfx-app'         -- stupid name
      metrics_path: /metrics/       -- path to metrics
      static_configs:
        - targets: ['netfx:50506']  -- path to app

    - job_name: 'docker-workers'    -- stupid name
      scrape_interval: 15s          -- time between calls
      metrics_path: /metrics        -- path to metrics
      static_configs:
        - targets: ['host.docker.internal:50501']  -- magic* prefix 

    - job_name: 'docker-workers-2'  -- stupid name
      scrape_interval: 15s          -- time between calls
      metrics_path: /metrics        -- path to metrics
      dns_sd_-configs:              -- dns discovery mode 
        - names: 
          - tasks.java
          type:A
          port: 8080

```

##### Dockerfile
```
FROM prom/prometheus:v.2.3.1
COPY prometheus.yml /etc/prometheus/prometheus.yml
```

`docker run`
`docker-compose -f docker-compose.yml -f docker-compose-dev-max.yml up -d`

**Hint**: to target all DNS records for the container use the prefix `tasks.netfx`

##### Number of containers in each state
```
engine_daemon_container_states_containers - total per each jos per each state 
engine_daemon_container_states_containers{state="running"} - total per job in this state
sum(engine_daemon_container_states_containers{state="running"}) - total accross all cluster
```

##### Number of http requests
```
http_requests_total{code="200", handler="prometheus", method="get"} -- total request from prometheus
http_requests_total{job=~"docker-.*"}[30s] -- total request from docker- jobs for the last 30s
sum(irate(http_requests_total[5m])) -- total request over the last 5 minutes
```


##### Dotnet specific
```
sum(irate(w3svc_w3wp_requests_per_second[12h])) -- total request per second over the last 12 hours
process_thread_count -- number of threads
sum(dotnet_clr_memory_gen_0_heap_size) without(host. isntance, job, exported_instance) -- memory usage for dotnet
```

##### Docker specific
```
sum(engine_daemon_engine_cpus_cpus) by (job) -- worker nodes vs manager nodes count 
sum(engine_daemon_engine_memory_bytes / (1000*1000*1000)) without(instance) -- memory usage per worker vs manager nodes
sum(engine_daemon_container_states_containers) by (state) -- number of containers per state
sum(engine_daemon_container_states_containers{job="docker-workers"}) by (instance) -- number of containers per instance on worker noted
sum(swarm_manager_nodes{job="docker-managers"}) by(state) -- managers by state 
```

#### Real Examples
* Percentile 95 response time (stat)
  ```
  histogram_quantile(0.95, sum(rate(wbid_hotels_http_request_duration_seconds_bucket[5m])) by (le))
  ```

* Average request duration (graph) 
  ```
  rate(wbid_hotels_http_request_duration_seconds_sum{controller!~"Live|Ready|"}[5m])
  /
  rate(wbid_hotels_http_request_duration_seconds_count{controller!~"Live|Ready|"}[5m])
  ```

* Combined rate of requests (graph)
  ```
  sum(rate(wbid_hotels_http_requests_received_total[5m])) + sum(rate(wbid_hotels_sh_http_requests_received_total[5m])) 
  ```

* Request by Action (graph)
  ```
  sum by (controller, action) (rate(wbid_hotels_http_requests_received_total{controller!~"Live|Ready|"}[5m])) 
  ```

* InProgress Requests (gauge)
  ```
  sum(wbid_hotels_http_requests_in_progress{job="webbedsid-hotels", action!=""}) by (action)
  ```
* CronJobs (graph)
  ```
  A - count(kube_cronjob_info{namespace="content-and-mapping"}
  B - kube_cronjob_info{namespace="content-and-mapping"}
  ```
* Batchjobs (graph)
  ```
  A - count(kube_job_info{namespace="content-and-mapping"})
  B - kube_job_info{namespace="content-and-mapping"}
  ```
* Requests by action (graph)
  ```
  sum(rate(wbid_hotels_http_requests_received_total{action!="", controller=~"WbProperties|PropertyMapping"}[5m])) by (action) * 60
  ```
* Rate of Requests per minute (graph)
  ```
  sum(rate(wbid_hotels_http_requests_received_total[5m]) * 60) + sum(rate(wbid_hotels_sh_http_requests_received_total[5m]) * 60) 
  ```
* Increase in responses by status coded for past 1h (graph)
  ```
  sum(increase(wbid_hotels_http_requests_received_total{action!="", controller=~"WbProperties|PropertyMapping"}[1h])) by (code)
  ```
* CPU Usage (gauge)
  ```
  sum(rate(container_cpu_usage_seconds_total{container_name="webbedsid-hotels"}[1m])) / sum (machine_cpu_cores) * 100
  ```
* Services CPU Usage (graph)
  ```
  sum(rate(container_cpu_usage_seconds_total{container_name="webbedsid-hotels"}[1m])) / sum (machine_cpu_cores) * 100
  ```
* Services Memory Usage (MB)(graph)
  ```
  sum(rate(container_memory_usage_bytes{container_name="webbedsid-hotels-shell-content", namespace="content-and-mapping", pod_name=~"webbedsid-hotels-shell-content-.*"}[5m])) by (pod_name) /1024/1024
  ```


### Explanations
`request_count` would simply return 5
`rate(request_count[5m])` would return the per second rate of requests averaged over the last 5 minutes


#### Simple time series selection

Return all time series with the metric http_requests_total:
```
http_requests_total
```
Return all time series with the metric http_requests_total and the given job and handler labels:
```
http_requests_total{job="apiserver", handler="/api/comments"}
```
Return a whole range of time (in this case 5 minutes) for the same vector, making it a range vector:
```
http_requests_total{job="apiserver", handler="/api/comments"}[5m]
```
Note that an expression resulting in a range vector cannot be graphed directly, but viewed in the tabular ("Console") view of the expression browser.

Using regular expressions, you could select time series only for jobs whose name match a certain pattern, in this case, all jobs that end with server:
```
http_requests_total{job=~".*server"}
```
All regular expressions in Prometheus use RE2 syntax.

To select all HTTP status codes except 4xx ones, you could run:
```
http_requests_total{status!~"4.."}
```
#### Subquery

Return the 5-minute rate of the http_requests_total metric for the past 30 minutes, with a resolution of 1 minute.
```
rate(http_requests_total[5m])[30m:1m]
```
This is an example of a nested subquery. The subquery for the deriv function uses the default resolution. Note that using subqueries unnecessarily is unwise.
```
max_over_time(deriv(rate(distance_covered_total[5s])[30s:5s])[10m:])
```
Using functions, operators, etc.

Return the per-second rate for all time series with the http_requests_total metric name, as measured over the last 5 minutes:
```
rate(http_requests_total[5m])
```
Assuming that the http_requests_total time series all have the labels job (fanout by job name) and instance (fanout by instance of the job), we might want to sum over the rate of all instances, so we get fewer output time series, but still preserve the job dimension:
```
sum by (job) (
  rate(http_requests_total[5m])
)
```
If we have two different metrics with the same dimensional labels, we can apply binary operators to them and elements on both sides with the same label set will get matched and propagated to the output. For example, this expression returns the unused memory in MiB for every instance (on a fictional cluster scheduler exposing these metrics about the instances it runs):
```
(instance_memory_limit_bytes - instance_memory_usage_bytes) / 1024 / 1024
```
The same expression, but summed by application, could be written like this:
```
sum by (app, proc) (
  instance_memory_limit_bytes - instance_memory_usage_bytes
) / 1024 / 1024
```
If the same fictional cluster scheduler exposed CPU usage metrics like the following for every instance:
```
instance_cpu_time_ns{app="lion", proc="web", rev="34d0f99", env="prod", job="cluster-manager"}
instance_cpu_time_ns{app="elephant", proc="worker", rev="34d0f99", env="prod", job="cluster-manager"}
instance_cpu_time_ns{app="turtle", proc="api", rev="4d3a513", env="prod", job="cluster-manager"}
instance_cpu_time_ns{app="fox", proc="widget", rev="4d3a513", env="prod", job="cluster-manager"}
```
...we could get the top 3 CPU users grouped by application (app) and process type (proc) like this:
```
topk(3, sum by (app, proc) (rate(instance_cpu_time_ns[5m])))
```
Assuming this metric contains one time series per running instance, you could count the number of running instances per application like this:
```
count by (app) (instance_cpu_time_ns)
```