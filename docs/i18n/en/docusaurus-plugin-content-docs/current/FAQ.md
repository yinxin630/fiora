---
id: faq
title: FAQ
sidebar_label: FAQ
---

## How to set up an administrator

1. Run `yarn script getUserId [username]` to get userId
2. Set `Administrator` in config to be administrator userId.
3. Restart the server

## Modify the default group name

1. Set `DefaultGroupName` in config to be new group name
2. Restart the server

## Custom domain name, reverse proxy via nginx

**Please modify the configuration of the comment item**

Example config

```
server {
   listen 80;
   # Change to your domain name
   server_name fiora.suisuijiang.com;

   location / {
      proxy_set_header   X-Real-IP        $remote_addr;
      proxy_set_header   X-Forwarded-For  $proxy_add_x_forwarded_for;
      proxy_set_header   Host             $http_host;
      proxy_set_header   Upgrade          $http_upgrade;
      proxy_set_header   X-NginX-Proxy    true;
      proxy_set_header   Connection "upgrade";
      proxy_http_version 1.1;
      proxy_pass         http://localhost:9200;
   }
}
```

HTTPS + HTTP 2.0 config

```
server {
   listen 80;
   # Change to your domain name
   server_name fiora.suisuijiang.com;
   return 301 https://fiora.suisuijiang.com$request_uri;
}
server {
   listen 443 ssl http2;
   # Change to your domain name
   server_name  fiora.suisuijiang.com;

   ssl on;
   # Modify to your ssl certificate location
   ssl_certificate ./ssl/fiora.suisuijiang.com.crt;
   ssl_certificate_key ./ssl/fiora.suisuijiang.com.key;
   ssl_session_timeout 5m;
   ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
   ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:HIGH:!aNULL:!MD5:!RC4:!DHE;
   ssl_prefer_server_ciphers on;

   location / {
      proxy_set_header   X-Real-IP        $remote_addr;
      proxy_set_header   X-Forwarded-For  $proxy_add_x_forwarded_for;
      proxy_set_header   Host             $http_host;
      proxy_set_header   Upgrade          $http_upgrade;
      proxy_set_header   X-NginX-Proxy    true;
      proxy_set_header   Connection "upgrade";
      proxy_http_version 1.1;
      proxy_pass         http://localhost:9200;
   }
}
```

## Disable register, manual account assignment

Set `DisableRegister` in config to be true. Restart the server to take effect

Run `yarn script register [username] [password]` register new account

## Delete user

Run `yarn script deleteUser [userId]`
