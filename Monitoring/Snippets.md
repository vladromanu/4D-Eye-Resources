# Prometheus Snippets

Counter
Number of requests in the last hour:  `http_requests_total - http_requests_total offet -1h` = X

Gauge
Number of request in process
`http_request_active`
`memory_allocated_bytes`

Transform in gigabytes
`memory_allocated_bytes / (1024*1024*1024)` = X # gigabytes

Summary
calculation_seconds_count 3
calculation_seconds_sum 15

3 calculations having in total a sum of 15 seconds

`rate(calculation_seconds_sum[5m]) / rate(calculation_seconds_count[5m])`
average rate over a 5 minute period

Histogram
calculation_seconds)bucket{le="1"} 
calculation_seconds)bucket{le="5"} 
calculation_seconds)bucket{le="10"} 

shows the distribution of the data, also used to calculate the percentiles

`calculation_seconds_bucket{le="20"} / calculation_seconds_bucket{le="+Inf"} ` # SLA ( A service-level agreement (SLA) defines the level of service expected by a customer from a supplier, laying out the metrics by which that service is measured ) 

http_requests_total{code="200", path="/"}
http_requests_total{code="500", path="/p2"}
http_requests_total{code="404", path="/p3"}

`sum without(code, path) ( http_requests_total )`
all requests
`sim without(path) (http_requests_total{code="500"})`
all errors


Prometheus Metrics 
`up{instance="xxxx", job="web"}` -- if the service is up and running
`scrape_duration_seconds{instance="xxxx", job="web"}` -- how much did the scrape took 
`scrape_samples_scraped{instance="xxxx", job="web"}` -- how many values did we got on that last scrape

Check the metrics being scraped in the _Graph_ page:

- `up`
- `scrape_duration_seconds`
- `scrape_samples_scraped`
- `worker_jobs_active` - labels & graph


`sum without(insstance, status) (worker_jobs_total)` .. similar to select sum from x

`distogram_quantile(
0.90,
sum without(code, instance) (
rate(http_request_seconds[5m]
)))`
-- percentile 90 from a histogram

{} -- for filtering 
[] -- time series, like where clause; [3m] in the last 3 minutes
sum() -- total values on all values
avg() -- average on all values
without -- to eliminate a label
delta(workder_jobs_active[1h]) -- calculates the diff from the first and last value within a range; delta is working more for gauges 
rate(worker_jobs_total[5m]) -- how does this increment per second 
sum(rate(worker_jobs_total{instance="i1"}[5m])) -- agregate on all jobs

sum without(instance, job, os, runtime) (rate(worker_jobs_total[5m])) -- aggregate like processed / failed pet second


## 1.1 - Gauge 

Evaluate expressions over the batch processor's active jobs metric.

- `worker_jobs_active`
- `worker_jobs_active{instance="ps-prom-ub1804:8080"}` - selector
- `sum (worker_jobs_active)` - aggregation operator
- `sum without(instance) (worker_jobs_active)` 
- `sum without(instance, job, os, runtime) (worker_jobs_active)` 
- `avg without(instance, job, os, runtime) (worker_jobs_active)`
- `max without(instance, job, os, runtime) (worker_jobs_active)`
- `sum without(job, os, runtime) (worker_jobs_active)` - Graph


## 1.2 - Counter

Evaluate expressions over the batch processor's total jobs metric.

- `worker_jobs_total` - one much bigger, started earlier
- `worker_jobs_total[5m]` - range vector
- `rate(worker_jobs_total[5m])` - rates very similar
- `sum without(instance, job, os, runtime) (rate(worker_jobs_total[5m]))`
- `sum without(status, instance, job, os, runtime) (rate(worker_jobs_total[5m]))`
- `sum without(instance, job, os, runtime) (rate(worker_jobs_total{status="failed"}[5m]))`
- `sum without(job, os, runtime) (rate(worker_jobs_total{status="failed"}[5m]))` - Graph
- `sum without(job, os, runtime) (rate(worker_jobs_total{status="processed"}[5m]))` - Graph

## 2.1 - Summary 

Calculate the average delay added in slow mode.

- `web_delay_seconds_count`
- `sum without(job, os, runtime) (rate(web_delay_seconds_count[5m]))` - req/s
- `sum without(job, os, runtime) (rate(web_delay_seconds_sum[5m]))` - delay/s
- `sum without(job, os, runtime) (rate(web_delay_seconds_sum[5m])) / sum without(job, os, runtime) (rate(web_delay_seconds_count[5m]))` - avg delay

## 2.2 - Histogram

Calculate the 90th percentile response time.

- `http_request_duration_seconds_bucket`
- `rate(http_request_duration_seconds_bucket[5m])`
- `rate(http_request_duration_seconds_bucket{code="200"}[5m])`
- `sum without(code, job, method, os, runtime) (rate(http_request_duration_seconds_bucket{code="200"}[5m]))`
- `histogram_quantile(0.90, sum without(code, job, method, os, runtime) (rate(http_request_duration_seconds_bucket{code="200"}[5m])))`





