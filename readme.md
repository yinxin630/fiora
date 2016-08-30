#Fiora

Fiora is a web chat application. Made by node.js, koa, react.


## Todo

* 其它消息类型(图片, markdown), 表情, 消息窗体滚动
* 加好友, 好友私聊
* 创建群组, 群组设置, 群组信息, 群组成员禁言
* 用户在线状态, 断线重连
* 消息桌面推送, 消息提示音, 推送及提示音配置
* 查看用户信息面板
* 消息长度限制, 频率限制
* 直接图片粘贴, 图片url

## Installation

The project depends node.js and mongodb database. To install [node.js](https://nodejs.org/en/download/) ([For China mirror](https://npm.taobao.org/mirrors/node)). To install [mongodb](https://docs.mongodb.com/manual/installation/).

0. clone repository to local from `https://github.com/yinxin630/fiora`
0. go to repository directory and run `npm install`
0. create config file from simple config `cp config/config.simple.js config/config.js`. modify config file to set database and other params
0. run project `npm start`
0. open `http://localhost:9200`(default port) to look

## Contribute

If you want to add functionality or fix bug. Please observe the following process.

0. fork this repository and clone your fork repository to local
0. install depends `npm install`
0. modify code and check for bug
0. commit your code. if you get some errors or warnings from eslint. please fix it
0. create pull request to me.