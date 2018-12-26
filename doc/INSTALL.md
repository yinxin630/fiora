# Install

To run Fiora, you need to have Node.js (>= version 8.9.0) environment, MongoDB database, and qiniu.com cloud storage account (the picture needs to save to qiniu.com)

## Step 1

Clone the project to the local `git clone https://github.com/yinxin630/fiora.git -b master`

![](./screenshots/git-clone.png)

## Step 2

modify eslint config, if your system is Unix, replace rule `"linebreak-style: ["error","windows"]"` as `"linebreak-style: ["error","unix"]"` 

Installation dependencies, recommended yarn `yarn` or `npm install`

![](./screenshots/yarn.png)

## Step 3

Modify the configuration file:

Only qiniu.com related configurations in these configuration items are required, including: `qiniuAccessKey`, `qiniuSecretKey`, `qiniuBucket`, `qiniuUrlPrefix`

You can run without configuring qiniu.com, but it will not be able to send picture messages. You cannot modify the personal/group picture

- server config: `config/server.js`
- client config: `config/client.js`
- webpack config: `config/webpack.js`

## Step 4

run server `npm run server`

![](./screenshots/run-server.png)

## Step 5

run client `npm run client`

![](./screenshots/run-client.png)

## Step 6

The browser will automatically open Fiora, and you can manually open the url `http://localhost:8080`