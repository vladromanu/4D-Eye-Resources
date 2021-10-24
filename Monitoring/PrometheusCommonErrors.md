# Typos
FAILED: parsing YAML file prometheus.jml yaml: unmarshal errors: 
line x: field rule_file not found in type config.plain

-- check the indentation
-- check the field names  ( typo ) 


# Certifcate error
X509: cannot valid ate certificate for .. because it doens contain any IP SANNs
-- not having a certificate logged in 
  -- insecure_skip_veryfy: true

server returned HTTP status 401 Unauthorized 
-- certifiicate invalid 

wget --no--check-certificate https://213123:12321/metrics
401 Unauthhorized

wget --no--check-certificate https://213123:12321/metrics
401 Unauthhorized

## WGET with auth header
wget --no--check-certificate --header="Authorization: Bearer $(cat token)"  \
-q -0- https://213123:12321/metrics


# Context deadline exceeded
-- when scrape durations 5.0s 
-- it works internally 

-- use netcat to connect to port  ( use netcat to rule out network issues )
```nc -v 10.10.0.11 9101```
Connection Timed out

-- check firewall 
iptables -L -n

then 

iptables -D INPUT 1
iptables -L -n

```nc -v 10.10.0.11 9101```
Open

# Expected metric name after HELP, got "INVALID"
wget -q -0- \
 https://213123:12321/metrics \
 | promtool check metrics 
error on line 37
 
wget -q -0- \
 https://213123:12321/metrics \
 | head -n 37 | tail -1 
 
 
 






