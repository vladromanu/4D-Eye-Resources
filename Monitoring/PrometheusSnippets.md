Table of Contents
[TOC]

##### Github Repo & samples
https://github.com/prometheus-net/prometheus-net

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

