# Fiora

Fiora是一款web聊天应用. 使用node.js, koa和react编写.

[English](readme.md)

## 功能

0. 创建用户, 创建群组, 加入群组, 私聊, 群聊
0. 文本, 图片, 代码, url等多种类型消息
0. 桌面通知, 声音提醒, 通知开关
0. 头像修改, 表情收藏, 群组公告修改
0. 消息长度限制, 消息发送频率限制

## 运行截图

![](screenshot_01.png)

## 安装

该项目依赖于node.js和mongodb数据库. 安装[node.js](https://nodejs.org/en/download/) ([中国镜像](https://npm.taobao.org/mirrors/node)). 安装[mongodb](https://docs.mongodb.com/manual/installation/).

0. 从 `https://github.com/yinxin630/fiora` 克隆项目到本地
0. 进行项目目录执行 `npm install`
0. 创建配置文件 `cp config/config.simple.js config/config.js`. 编辑配置文件来设置数据库和其它参数, 其中 `localServer`, `localPort`, `database`, `jwtSecret` 是必需的.
0. 运行项目 `npm start`
0. 打开 `http://localhost:8080/webpack-dev-server/` 查看效果

## 贡献代码

如果你想要添加功能或者修复BUG. 请遵守下列流程.

0. fork本仓库并克隆fork后的仓库到本地
0. 安装依赖 `npm install`
0. 修改代码并确认无bug
0. 提交代码, 如果eslint有报错, 请修复后再次提交
0. 创建一个pull request