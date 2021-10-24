Rules in Prometheus are for alerts and preprocessing data

```
groups:

- name: example
  rules:
    - record: job:http_inprogress_requests
        expr: sum by (job) (http_inprogress_requests)
```

Naming Convention:
level:metric:operation

Level

- Aggregation level & labels (“path”, “node”)
- Use “job”, if no meaningful labels left
  Metric
- Metric name (“requests”, “latency”)
- Remove “total” when using “rate” or “irate”
  Operation
- Operations applied (“rate5m”)
- Omit “sum”, merge associative operations

Recording rules

prometheus.rules.yaml
```
- record: instance_path:requests:rate5m
  expr: rate(requests_total{job="myjob"}[5m])

- record: path:requests:rate5m
  expr: sum without (instance)(instance_path:requests:rate5m{job="myjob"})
```

# Pitfalls

## Avoid Averaging an Average

Have the same number of sum operators as rate operator

##### incorrect
```
sum without (path,host) (
rate(request_duration_sum[5m])
/
rate(request_duration_count[5m])
)
```

##### correct
```
sum without (path,host) (
rate(request_duration_sum[5m])
)
/
sum without (path,host) (
rate(request_duration_count[5m])
)
```

## Rate Then Sum, Never Sum Then Rate

##### incorrect
```rate(counter_a[5m] + counter_b[5m])```

##### correct
```rate(counter_a[5m]) + rate(counter_b[5m])```

# https://bit.ly/prom-rate-then-sum

`

# What to alert On Generally

Alert on pain points for customers
Be pragmatic, reduce the number of alerts
Notifications taken seriously, not silenced
Still collect all the information to diagnose

# Batch Processing Systems

Alert when not processed recently
Alert in time to attempt the process again
If no runs can fail, run more frequently
Single failure should not alert a human

# Capacity & Resource Utilization

Alert when there will be impact
Percentage of hosts rather than any host
Alert on infrastructure at the system level

# Alert Example

```
groups:

- name: example
  rules: 
  - alert: HighRequestLatency
    expr: job:request_latency_seconds:mean5m{job="myjob"} > 0.5
    for: 10m
    labels:
        severity: page
    annotations:
        summary: High request latency 
  
  - alert: LoadBalancerDown
    expr: up{instance='10.10.0.11:9101'} == 0
    for: 5m
    labels:
        severity: page
    annotations:
        summary: "The load balancer has been down for over 5 minutes"
```

```
ALERTS{alertname="LoadeBalancerDown"} --synthetic metric
ALERTS_FOR_STATE -- time series, timestamps when alert expresion began returning data ( pending state, alert stage )
```

# Templating

```
type sample struct {
    Labels map[string]string
    Value float64
}

$labels.the_label_name
$value
```

https://prometheus.io/docs/prometheus/latest/configuration/template_reference/

### Numbers
Name Arguments Returns Notes
humanize number or string string Converts a number to a more readable format, using metric prefixes.
humanize1024 number or string string Like humanize, but uses 1024 as the base rather than 1000.
humanizeDuration number or string string Converts a duration in seconds to a more readable format.
humanizePercentage number or string string Converts a ratio value to a fraction of 100.
humanizeTimestamp number or string string Converts a Unix timestamp in seconds to a more readable format.

```
groups:

- name: example
  rules: 
  - alert: InstanceDown
    expr: up == 0
    for: 5m
    labels:
        severity: page
    annotations:
        summary: "The instance {{ $labels.instance }} has been down for over 5 minutes"
```
