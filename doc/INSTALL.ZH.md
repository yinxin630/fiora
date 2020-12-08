# 安装教程

## 环境准备

要运行 Fiora, 你需要 Node.js(推荐 v14 LTS版本) 和 MongoDB 数据库
- 安装 Node.js
   - 官网 <http://nodejs.cn/download/>
   - 更推荐使用 nvm 安装 Node.js
      - 安装 nvm <https://github.com/nvm-sh/nvm#install--update-script>
      - 通过 nvm 安装 Node.js <https://github.com/nvm-sh/nvm#usage>
- 安装 MongoDB
   - 官网 <https://docs.mongodb.com/manual/installation/#install-mongodb>

推荐在 Linux 或者 MacOS 系统上运行

## 如何运行

1. 克隆项目到本地 `git clone https://github.com/yinxin630/fiora.git -b master`
2. 确保安装了 [yarn](https://www.npmjs.com/package/yarn), 如果没有安装请执行 `npm install -g yarn`
3. 安装项目依赖 `yarn install`
4. 构建客户端代码 `yarn build:client && yarn move-dist`
5. 启动服务端 `yarn start`
6. 使用浏览器打开 `http://[ip地址]:[端口]`(比如 `http://127.0.0.1:9200`)

### 运行开发模式

1. 启动服务端 `yarn dev:server`
2. 启动客户端 `yarn dev:client`
3. 使用浏览器打开 `http://localhost:8080`

### docker运行
首先安装docker <https://docs.docker.com/install/>

#### 直接从 DockerHub 镜像运行
1. 拉取 mongo 镜像 `docker pull mongo`
2. 拉取 fiora 镜像 `docker pull suisuijiang/fiora`
3. 创建虚拟网络 `docker network create fiora-network`
4. 启动数据库 `docker run --name fioradb -p 27017:27017 --network fiora-network mongo`
5. 启动fiora `docker run --name fiora -p 9200:9200 --network fiora-network -e Database=mongodb://fioradb:27017/fiora suisuijiang/fiora`

#### 本地构建镜像运行
1. 克隆项目到本地 `git clone https://github.com/yinxin630/fiora.git -b master`
2. 构建镜像 `docker-compose build --no-cache --force-rm`
3. 运行 `docker-compose up`


## 项目配置

- 服务器配置 `config/server.ts`
- 客户端配置 `config/client.ts`

在 fiora 根目录创建 `.env` 文件, 在里面填写 `key=value` 键值对(每行一个), 即可修改配置. 比如修改端口号 `Port=8888`

**服务端配置**

|  Key  |  类型  |  默认值  |  描述  |
|  ----  | ----  |  ----  |  ----  |
|Host|string|your ip|服务端 host|
|Port|number|9200|服务端端口号|
|Database|string|mongodb://localhost:27017/fiora|mongoDB 数据库地址|
|JwtSecret|string|jwtSecret (推荐修改它来保证安全性)|jwt token 加密 secret|
|MaxGroupCount|number|3|用户最大可以创建的群组个数|
|QiniuAccessKey|string|''|七牛CDN access key. 如果为空, 则文件长传到服务端|
|QiniuSecretKey|string|''|七牛CDN secret key|
|QiniuBucket|string|''|七牛CDN bucket 名|
|QiniuUrlPrefix|string|''|七牛CDN bucket url 前缀 |
|AllowOrigin|string|null|允许的客户端 origin 列表, null 时允许所有 origin 连接, 多个值逗号分割|
|tokenExpiresTime|number|2592000000 (30天)|登陆 token 过期时间|
|Administrator|string|''|管理员用户 id 列表, 多个值逗号分割|
|DefaultGroupName|string|fiora|默认群组名|
|DisableRegister|boolean|false|禁止注册账号|
|DisableCreateGroup|boolean|false|禁止创建群组|

**客户端配置**

|  Key  |  类型  |  默认值  |  描述  |
|  ----  | ----  |  ----  |  ----  |
|Server|string|/|客户端要连接的服务端地址|
|MaxImageSize|number|3145728 (3MB)|客户端可以上传的最大图片大小|
|MaxBackgroundImageSize|number|5242880 (5MB)|客户端可以上传的最大背景图大小|
|MaxAvatarSize|number|1572864 (1.5MB)|客户端可以上传的最大头像图片大小|
|MaxFileSize|number|10485760 (10MB)|客户端可以上传的最大文件大小|
|DefaultTheme|string|cool|默认主题|
|Sound|string|default|默认通知音|
|TagColorMode|string|fixedColor|默认标签颜色模式|
|FrontendMonitorAppId|string|fixedColor|岳鹰监控 appId <https://yueying.effirst.com/index>|
|DisableDeleteMessage|boolean|false|禁止用户撤回消息|

## FAQ

### 设置管理员
1. 获取用户id, 执行 `yarn script getUserId [username]`
2. 修改 `Administrator` 配置项, 改为上一步获取的id
3. 重启服务器

### 修改默认群组名称
1. 修改 `DefaultGroupName` 配置项
2. 重启服务器

### 自定义域名, 通过nginx反向代理
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

### 禁止注册, 手动分配账号

将 `DisableRegister` 配置项设置为 true, 重启服务器生效

执行 `yarn script register [username] [password]` 手动注册新用户

### 删除用户

执行 `yarn script deleteUser [userId]`
