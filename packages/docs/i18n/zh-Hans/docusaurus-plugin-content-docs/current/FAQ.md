---
id: faq
title: 问题解答
sidebar_label: 问题解答
---

## 如何设置管理员

1. 获取用户 id, 参考 [getUserId](/docs/script#getuserid)
2. 修改 `Administrator` 配置项, 改为上一步获取的 id
3. 重启服务端

## 如何修改默认群组名称

参考 [updateDefaultGroupName](/docs/script#updatedefaultgroupname)

##  如何自定义域名

推荐使用 nginx 反向代理

示例配置, **请修改注释项的配置**

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

## 如何禁止注册, 手动分配账号

将 `DisableRegister` 配置项设置为 true, 重启服务器生效

使用脚本手动注册新用户. 参考 [register](/docs/script#register)

##  如何删除用户

参考 [deleteUser](/docs/script#deleteuser)

## 客户端报错 "调用失败,处于萌新阶段"

为了避免新注册的用户乱发消息刷屏, 注册时间未满 24 小时的用户每分钟限制只能发 5 条消息

## 执行命令时报错 "Couldn't find a package.json file in xxx"

先 cd 到 fiora 根目录下, 再执行相应命令

## 为什么修改配置不生效

1. 先确认配置修改是否正确
   - 如果是直接修改配置文件, 请确认修改的部分语法和格式正确
   - 如果是通过 .env 文件修改配置, 请确认格式正确
2. 修改配置后
   - 如果修改的是服务端配置, 需要重启服务端
   - 如果修改的是客户端配置, 需要重新构建客户端

## 怎么重新构建客户端

`yarn build:web`