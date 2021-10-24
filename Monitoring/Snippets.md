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

