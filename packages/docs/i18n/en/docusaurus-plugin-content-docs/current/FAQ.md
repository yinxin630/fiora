---
id: faq
title: FAQ
sidebar_label: FAQ
---

## How to set up an administrator

1. Get user id. reference [getUserId](/docs/script#getuserid)
2. Set `Administrator` in config to be administrator userId.
3. Restart the server

## How to modify the default group name

reference [updateDefaultGroupname](/docs/script#updatedefaultgroupname)

## How to custom domain name

Recommend to use nginx reverse proxy

Example config, **Please modify the configuration of the comment item**

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

## How to Disable register, manual account assignment

Set `DisableRegister` in config to be true. Restart the server to take effect

Use scripts to manually register new users. Reference [register](/docs/script#register)

## How to delete user

Reference [deleteUser](/docs/script#deleteuser)

## The client throw an error "调用失败,处于萌新阶段"

In order to prevent newly registered users from sending messages randomly, users whose registration time is less than 24 hours can only send 5 messages per minute.

## An error is throwed when executing the command. "Couldn't find a package.json file in xxx"

First cd to the fiora root directory, and then execute the corresponding command

## Why the modified configuration does not take effect

1. First confirm whether the configuration modification is correct
    -If you modify the configuration file directly, please make sure that the modified part of the syntax and format is correct
    -If you modify the configuration through the .env file, please make sure the format is correct
2. After modifying the configuration
    -If you modify the server configuration, you need to restart the server
    -If you modify the client configuration, you need to rebuild the client

## How to rebuild the web client

`yarn build:web`