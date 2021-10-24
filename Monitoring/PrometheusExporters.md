Prometheus Exporters
https://prometheus.io/docs/instrumenting/exporters/

Node Exporter 
https://github.com/prometheus/node_exporter/releases
wget https://github.com/prometheus/node_exporter/releases/download/v*/node_exporter-*.*linux-amd64.tar.gz
tar xvfz node_exporter-*.*-amd64.tar.gz
cd node_exporter-*.*-amd64
./node_exporter > node.out 2>&1
curl http://localhost:9100/metrics

MySQL Exporter
wget https://github.com/prometheus/mysqld_exporter/releases/download/v*/mysqld_exporter-*.*.linux-amd64.tar.gz
tar xvfz mysqld_exporter-*.*-amd64.tar.gz
cd mysqld_exporter-*.*-amd64
./mysqld_exporter > mysqld.out 2>&1
curl http://localhost:9104/metrics
