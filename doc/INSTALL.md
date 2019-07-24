# Precondition

To run Fiora, you need to have Node.js (>= version 8.9.0), MongoDB database. Or docker

# Run on docker

Clone the project to the local `git clone https://github.com/yinxin630/fiora.git -b master`

execute `docker-compose up`

# Run on local

## Step 1

Clone the project to the local `git clone https://github.com/yinxin630/fiora.git -b master`

![](./screenshots/git-clone.png)

## Step 2

Installation dependencies, recommended yarn `yarn` or `npm install`

![](./screenshots/yarn.png)

## Step 3

Modify the configuration file:

- server config: `config/server.js`
- client config: `config/client.js`
- webpack config: `config/webpack.js`

In the server config, the picture is stored in the server if the qiniu.com CDN is not configured. will increase service bandwidth pressure and flow consumption, so it is more recommended to use qiniu.com CDN

qiniu.com config introduce:
* `qiniuAccessKey` get from qiniu.com 个人面板 - 密钥管理 page
* `qiniuSecretKey` get from qiniu.com 个人面板 - 密钥管理 page
* `qiniuBucket` qiniu.com bucket name
* `qiniuUrlPrefix` qiniu.com bucket domain. get from qiniu.com 存储空间 - 内容管理 page. should be `//xxx/` or `http://xxx/` or `https://xxx/` format

## Step 4

run server `npm run server`

![](./screenshots/run-server.png)

## Step 5

run client `npm run client`

![](./screenshots/run-client.png)

## Step 6

The browser will automatically open Fiora, and you can manually open the url `http://localhost:8080`


# Run on server

## Step1, Step2, Step3

Link run on local

## Step4

build client `npm run build`

move build result to public directory `npm run move-dist`

Or if you use qiniu.com CDN, you can upload the build result to qiniu.com, and then just put `index.html` in the public directory, so the performance will be better

## Step5

use pm2 start server `export NODE_ENV=production && pm2 start server/main.js --name="fiora"`

## 第六步

open page `http://[服务端ip]:[fiora端口号]`