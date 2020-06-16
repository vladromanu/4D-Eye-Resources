Table of Contents
[TOC]

## Docker image
Image: ```prom/prometheus``` -- https://hub.docker.com/r/prom/prometheus/


Quick spinnoff with docker: 
```
docker container run --detach -- publish-all \
prom/prometheus:latest
```

## Prometheus Generics
* Extracts data by calling periodically the metrics API.  `/metrics`
Port: `9090`

* Uses a Prometheus own format.

##### Data model
https://prometheus.io/docs/concepts/data_model/#metric-names-and-labels

* The metric name specifies the general feature of a system that is measured (e.g. **http_requests_total** - the total number of HTTP requests received). It must match the regex 
`[a-zA-Z_:][a-zA-Z0-9_:]*`

* Given a metric name and a set of labels, time series are frequently identified using this notation:
```
<metric name>{<label name>=<label value>, ...}
```
For example, a time series with the metric name ***api_http_requests_total*** and the labels method="POST" and handler="/messages" could be written like this:
```
api_http_requests_total{method="POST", handler="/messages"}
```

### Metric names

A metric name...
* must comply with the data model for valid characters
* should have a (single-word) application prefix relevant to the domain the metric belongs to.Standardized metrics exported by client libraries. Examples:
    * **prometheus**_notifications_total (specific to the Prometheus server)
    * **process**_cpu_seconds_total (exported by many client libraries)
    * **http**_request_duration_seconds (for all HTTP requests)

* must have a **single unit** (i.e. do not mix seconds with milliseconds, or seconds with bytes).
* should have a suffix describing the unit, in **plural form**. Note that an accumulating count has total as a suffix, in addition to the unit if applicable.
    * http_request_duration_**seconds**
    * node_memory_usage_**bytes**
    * http_requests_**total** (for a unit-less accumulating count)
    * process_cpu_**seconds_total** (for an accumulating count with unit)
    * foobar_build_**info** (for a pseudo-metric that provides metadata about the running binary)

* should represent the same logical thing-being-measured across all label dimensions.
    * request duration
    * bytes of data transfer
    * instantaneous resource usage as a percentage

As a rule of thumb, either the **sum()** or the **avg()** over all dimensions of a given metric should be meaningful (though not necessarily useful). If it is not meaningful, split the data up into multiple metrics. For example, having the capacity of various queues in one metric is good, while mixing the capacity of a queue with the current number of elements in the queue is not.


### Labels
Use labels to differentiate the characteristics of the thing that is being measured:

    api_http_requests_total - differentiate request types: operation="create|update|delete"
    api_request_duration_seconds - differentiate request stages: stage="extract|transform|load"

Do not put the label names in the metric name, as this introduces redundancy and will cause confusion if the respective labels are aggregated away.
