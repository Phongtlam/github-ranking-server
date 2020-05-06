### Future work:
1. db for usage metrics
2. mem cache if user count goes up

### A basic setup, available commands:
1. npm install
2. npm run dev - start development server on localhost:3000
3. npm run apache-bench - run ab on the server (only work if install NginX as below)

- server currently deployed on heroku at https://github-viewer-server.herokuapp.com

#### Note:
- Please create an .env file at root with these values
- Default will work without, however you are limited to 60 queries/hour vs 5000 with no access_token
```
ACCESS_TOKEN
HOSTNAME
PORT
```

### Create local NginX server (OPTIONAL FOR FUTURE USAGE)

1. brew link pcre
2. brew install nginx
3. sudo brew services restart nginx
4. sudo vim /etc/nginx/conf.d/github-ranking.conf 

```
server {
    listen 80;
    server_name github-ranking.com www.github-ranking.com;

    location / {
        proxy_set_header   X-Forwarded-For $remote_addr;
        proxy_set_header   Host $http_host;
        proxy_pass         http://127.0.0.1:3000;
    }
}
```

5. Edit /etc/hosts file
```
192.168.43.31 github-ranking.com
```

### Install Apache benchmark
1. brew install homebrew/apache/ab
2. npm run apache-bench - run against localhost
3. npm run apache-bench-production - run against deployed server on heroku at https://github-viewer-server.herokuapp.com
> current result on command `ab -c 30 -n 100 https://github-viewer-server.herokuapp.com/`
```
Server Software:        Cowboy
Server Hostname:        github-viewer-server.herokuapp.com
Server Port:            443
SSL/TLS Protocol:       xxx
TLS Server Name:        github-viewer-server.herokuapp.com

Document Path:          /
Document Length:        23 bytes

Concurrency Level:      30
Time taken for tests:   2.597 seconds
Complete requests:      100
Failed requests:        0
Total transferred:      36500 bytes
HTML transferred:       2300 bytes
Requests per second:    38.51 [#/sec] (mean)
Time per request:       779.055 [ms] (mean)
Time per request:       25.969 [ms] (mean, across all concurrent requests)
Transfer rate:          13.73 [Kbytes/sec] received

Connection Times (ms)
              min  mean[+/-sd] median   max
Connect:      283  444  32.7    440     543
Processing:    78  109  26.4     98     160
Waiting:       78  108  26.2     95     159
Total:        399  553  47.0    538     631

Percentage of the requests served within a certain time (ms)
  50%    538
  66%    569
  75%    605
  80%    614
  90%    616
  95%    617
  98%    622
  99%    631
 100%    631 (longest request)
```

> Realistically, with this current setup, we can support about 30 users for users to get results in a reasonable amount of time, basically a small team only.
We will need to scale out should the user base increases past this level.
