### A basic setup:
1. npm install
2. npm run dev - start development server on localhost:3000

### Create local NginX server

1. brew link pcre
2. brew install nginx
3. sudo brew services restart nginx
4. sudo vim /etc/nginx/conf.d/sysmon.conf 

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
