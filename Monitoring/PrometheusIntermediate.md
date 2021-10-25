dotnet_total_memory_bytes{instance="eb:80", job="web"} --- total memory usage for the app

# Use [Fortio](https://github.com/fortio/fortio/) to send multiple concurrent GET requests:

- load test defined in the [docker-compose-fortio.yaml](./docker-compose-fortio.yaml) Compose override file

```
docker-compose -f docker-compose.yaml -f docker-compose-fortio.yaml up fortio
```

https://github.com/fortio/fortio/

```
docker run -p 8080:8080 -p 8079:8079 fortio/fortio server & # For the server
docker run fortio/fortio load http://www.google.com/ # For a test run
```

# Other metrics from prometheus or dotnet app

```
process_cpu_seconds_total 1.9
process_num_threads 26
process_open_handles 180
dotnet_collection_count_total{gen="0"} 6
dotnet_collection_count_total{gen="1"} 4
dotnet_collection_count_total{gen="2"} 1
```

####left joining with another metric that is statis ( 1 value )

```
dotnet_total_memory_bytes * on (instance) group_left(app_version) web_info
```

# AOP - Aspect Oriented Programming

One of the key components of Spring Framework is the Aspect oriented programming (AOP) framework. Aspect-Oriented Programming entails breaking down program logic into distinct parts called so-called concerns. The functions that span multiple points of an application are called cross-cutting concerns and these cross-cutting concerns are conceptually separate from the application's business logic. There are various common good examples of aspects like logging, auditing, declarative transactions, security, caching, etc.

The key unit of modularity in OOP is the class, whereas in AOP the unit of modularity is the aspect. Dependency Injection helps you decouple your application objects from each other and AOP helps you decouple cross-cutting concerns from the objects that they affect. AOP is like triggers in programming languages such as Perl, .NET, Java, and others.
