---
id: install
title: INSTALL
sidebar_label: INSTALL
---

# How to run fiora

## Environmental Preparation

To run Fiora, you need Node.js(recommend v14 LTS version), MongoDB and redis

-   Install Node.js
    -   Official website <https://nodejs.org/en/download/>
    -   It is recommended to use nvm to install Node.js
        -   Install nvm <https://github.com/nvm-sh/nvm#install--update-script>
        -   Install Node.js via nvm <https://github.com/nvm-sh/nvm#usage>
-   Install MongoDB
    -   Official website <https://docs.mongodb.com/manual/installation/#install-mongodb>
-   Install redis
    -   Official website <https://docs.mongodb.com/manual/installation/#install-mongodb>

Recommended to running on Linux or MacOS systems

## How to run

1. Clone the project `git clone https://github.com/yinxin630/fiora.git -b master`
2. Ensure you have install [yarn](https://www.npmjs.com/package/yarn) before, if not please run `npm install -g yarn`
3. Install project dependencies `yarn install`
4. Build client `yarn build:client && yarn move-dist`
5. Start the server `yarn start`
6. Open `http://[ip]:[port]`(such as `http://127.0.0.1:9200`) in browser

### Run in the background

Using `yarn start` to run the server will stop running after disconnecting the ssh connection, it is recommended to use pm2 to run

```bash
# install pm2
npm install -g pm2

# use pm2 to run fiora
pm2 start yarn --name fiora -- start

# view pm2 apps status
pm2 ls

# view pm2 fiora logging
pm2 logs fiora
```

### Run With Develop Mode

1. Start the server `yarn dev:server`
2. Start the client `yarn dev:client`
3. Open `http://localhost:8080` in browser

### Running on the docker

First install docker <https://docs.docker.com/install/>

#### Run directly from the DockerHub image

```bash
# Pull mongo
docker pull mongo

# Pull redis
docker pull redis

# Pull fiora
docker pull suisuijiang/fiora

# Create a virtual network
docker network create fiora-network

# Run mongodB
docker run --name fioradb -p 27017:27017 --network fiora-network mongo

# Run redis
docker run --name fioraredis -p 6379:6379 --network fiora-network redis

# Run fiora
docker run --name fiora -p 9200:9200 --network fiora-network -e Database=mongodb://fioradb:27017/fiora -e RedisHost=fioraredis suisuijiang/fiora
```

#### Local build image and run

1. Clone the project to the local `git clone https://github.com/yinxin630/fiora.git -b master`
2. Build the image `docker-compose build --no-cache --force-rm`
3. Run it `docker-compose up`

<a id="project-configuration" style="color: unset; text-decoration: none;">
   <h2>Project Configuration</h2>
</a>
Configuration list
- Server configuration `config/server.ts`
- Client configuration `config/client.ts`

Create a `.env` file in the fiora root directory and enter `key=value` key-value pair (one per line) to modify the configuration. For example, modify the port number `Port=8888`

**Server Config**

| Key                | Type    | Default                                | Description                                                                                              |
| ------------------ | ------- | -------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| Host               | string  | your ip                                | backend server host                                                                                      |
| Port               | number  | 9200                                   | backend server port                                                                                      |
| Database           | string  | mongodb://localhost:27017/fiora        | mongodbb address                                                                                         |
| JwtSecret          | string  | jwtSecret (Modify it to ensure safety) | jwt token encryption secret                                                                              |
| MaxGroupCount      | number  | 3                                      | Maximum number of groups created per user                                                                |
| QiniuAccessKey     | string  | ''                                     | access key of qiniu CDN. If it is empty, The uploaded file will be stored on the server                  |
| QiniuSecretKey     | string  | ''                                     | secret key of qiniu CDN                                                                                  |
| QiniuBucket        | string  | ''                                     | bucket name of qiniu CDN                                                                                 |
| QiniuUrlPrefix     | string  | ''                                     | bucket url prefix of qiniu CDN. End with /, for example https://cdn.suisuijiang.com/                     |
| AllowOrigin        | string  | null                                   | The list of allowed client origins. If null, all origins are allowed. Multiple values separated by comma |
| tokenExpiresTime   | number  | 2592000000 (30days)                    | login token expires time                                                                                 |
| Administrator      | string  | ''                                     | Administrator userId list. Multiple values separated by comma                                            |
| DefaultGroupName   | string  | fiora                                  | Default group name                                                                                       |
| DisableRegister    | boolean | false                                  | Disable register                                                                                         |
| DisableCreateGroup | boolean | false                                  | Disable create group                                                                                     |

**Client Config**

| Key                    | Type    | Default         | Description                                                  |
| ---------------------- | ------- | --------------- | ------------------------------------------------------------ |
| Server                 | string  | /               | Server address of the client connection                      |
| MaxImageSize           | number  | 3145728 (3MB)   | The maximum image size that the client can upload            |
| MaxBackgroundImageSize | number  | 5242880 (5MB)   | The maximum background image size that the client can upload |
| MaxAvatarSize          | number  | 1572864 (1.5MB) | The maximum avatar image size that the client can upload     |
| MaxFileSize            | number  | 10485760 (10MB) | The maximum file size that the client can upload             |
| DefaultTheme           | string  | cool            | default theme                                                |
| Sound                  | string  | default         | default notification sound                                   |
| TagColorMode           | string  | fixedColor      | default tag color mode                                       |
| FrontendMonitorAppId   | string  | fixedColor      | appId of monitor <https://yueying.effirst.com/index>         |
| DisableDeleteMessage   | boolean | false           | disable user delete messages                                 |

## FAQ

### How to set up an administrator

1. Run `yarn script getUserId [username]` to get userId
2. Set `Administrator` in config to be administrator userId.
3. Restart the server

### Modify the default group name

1. Set `DefaultGroupName` in config to be new group name
2. Restart the server

### Custom domain name, reverse proxy via nginx

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

### Disable register, manual account assignment

Set `DisableRegister` in config to be true. Restart the server to take effect

Run `yarn script register [username] [password]` register new account

### Delete user

Run `yarn script deleteUser [userId]`
