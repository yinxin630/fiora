---
id: config
title: Config
sidebar_label: Config
---

Server configuration `config/server.ts`
Client configuration `config/client.ts`

Compared to directly modifying the configuration file, it is recommended to use environment variables to modify the configuration  
Create a `.env` file in the fiora root directory and enter `key=value` key-value pair (one per line) to modify the configuration. For example, modify the port number `Port=8888`

## Server Config

**Modifying the server configuration requires restarting the application**

| Key                | Type    | Default                                | Description                                                                                              |
| ------------------ | ------- | -------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| Host               | string  | your ip                                | backend server host                                                                                      |
| Port               | number  | 9200                                   | backend server port                                                                                      |
| Database           | string  | mongodb://localhost:27017/fiora        | mongodbb address                                                                                         |
| RedisHost          | string  | localhost                              | redis host                                                                                               |
| RedisPort          | number  | 6379                                   | redis port                                                                                               |
| JwtSecret          | string  | jwtSecret (Modify it to ensure safety) | jwt token encryption secret                                                                              |
| MaxGroupCount      | number  | 3                                      | Maximum number of groups created per user                                                                |
| AllowOrigin        | string  | null                                   | The list of allowed client origins. If null, all origins are allowed. Multiple values separated by comma |
| tokenExpiresTime   | number  | 2592000000 (30days)                    | login token expires time                                                                                 |
| Administrator      | string  | ''                                     | Administrator userId list. Multiple values separated by comma                                            |
| DisableRegister    | boolean | false                                  | Disable register                                                                                         |
| DisableCreateGroup | boolean | false                                  | Disable create group                                                                                     |
| ALIYUN_OSS         | boolean | false                                  | enable to use aliyun OSS                                                                                 |
| ACCESS_KEY_ID      | string  | ''                                     | aliyun OSS access key id. reference: https://help.aliyun.com/document_detail/48699.html                  |
| ACCESS_KEY_SECRET  | string  | ''                                     | aliyun OSS access key secret. reference like ACCESS_KEY_ID                                               |
| ROLE_ARN           | string  | ''                                     | aliyun OSS RoleARN. reference: https://help.aliyun.com/document_detail/28649.html                        |
| REGION             | string  | ''                                     | aliyun OSS region. example: `oss-cn-zhangjiakou`                                                         |
| BUCKET             | string  | ''                                     | aliyun OSS bucket name                                                                                   |
| ENDPOINT           | string  | ''                                     | aliyun OSS domain. example: `cdn.suisuijiang.com`                                                        |

## Client Config

**Modifying the client configuration requires rebuilding the client**

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
