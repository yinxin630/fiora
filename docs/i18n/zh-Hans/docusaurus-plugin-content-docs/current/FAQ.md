---
id: faq
title: 问题解答
sidebar_label: 问题解答
---

## 设置管理员

1. 获取用户 id, 执行 `yarn script getUserId [username]`
2. 修改 `Administrator` 配置项, 改为上一步获取的 id
3. 重启服务器

## 修改默认群组名称

1. 修改 `DefaultGroupName` 配置项
2. 重启服务器

## 自定义域名, 通过 nginx 反向代理

**请修改注释项的配置**

示例配置

```
server {
   listen 80;
   # 修改为你的域名
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

配置 HTTPS + HTTP 2.0

```
server {
   listen 80;
   # 修改为你的域名
   server_name fiora.suisuijiang.com;
   return 301 https://fiora.suisuijiang.com$request_uri;
}
server {
   listen 443 ssl http2;
   # 修改为你的域名
   server_name  fiora.suisuijiang.com;

   ssl on;
   # 修改为你的ssl证书位置
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

## 禁止注册, 手动分配账号

将 `DisableRegister` 配置项设置为 true, 重启服务器生效

执行 `yarn script register [username] [password]` 手动注册新用户

## 删除用户

执行 `yarn script deleteUser [userId]`
