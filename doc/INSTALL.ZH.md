# 前置条件

要运行Fiora, 你需要具备Node.js(>= 8.9.0版本)环境, Mongodb数据库, 以及七牛云存储账号(发送图片和修改头像会用到七牛)

# 在本地运行

## 第一步

克隆项目到本地 `git clone https://github.com/yinxin630/fiora.git -b master`

![](./screenshots/git-clone.png)

## 第二步

安装依赖, 推荐使用yarn `yarn` 或者 `npm install`

![](./screenshots/yarn.png)

## 第三步

修改配置文件:

- 服务端配置: `config/server.js`
- 客户端配置: `config/client.js`
- webpack配置: `config/webpack.js`

大部分配置项用默认值即可, 只有七牛相关配置需要修改, 否则将会导致无法发送图片消息, 无法修改个人/群组头像

七牛配置说明:
* `qiniuAccessKey` 从七牛 个人面板 - 密钥管理 页面获取
* `qiniuSecretKey` 从七牛 个人面板 - 密钥管理 页面获取
* `qiniuBucket` 存储空间的名称
* `qiniuUrlPrefix` 存储空间的域名, 从七牛 存储空间 - 内容管理 页面获取, 需要写成 `//xxx/` 或者 `http://xxx/` 或者 `https://xxx/` 的格式

## 第四步

启动服务端 `npm run server`

![](./screenshots/run-server.png)

## 第五步

启动客户端 `npm run client`

![](./screenshots/run-client.png)

## 第六步

浏览器将会自动打开Fiora, 你也可以手动打开地址 `http://localhost:8080`


# 在服务器运行

## 第一步, 第二步, 第三步

与在本地安装相同

## 第四步

构建客户端 `npm run build`

移动构建产物到publish目录 `mv dist/fiora/* public`

## 第五步

使用 pm2 启动服务端 `export NODE_ENV=production && pm2 start server/main.js --name="fiora"`

## 第六步

访问地址 `http://[服务端ip]:[fiora端口号]`