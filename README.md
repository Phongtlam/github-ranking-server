### A basic setup, available commands:
1. npm install
2. npm run dev - start development server on localhost:3000
2. npm run apache-bench - run ab on the server (only work if install NginX as below)

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
2. npm run apache-bench


