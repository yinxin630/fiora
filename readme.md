# Fiora

Fiora is a web chat application. Made by node.js, koa, react.

[中文版](readme-zh.md)

## Function

0. create user, create group, join group, private chat, group chat
0. text, image, code, url of message type
0. desktop notification, sound notification, notification switch
0. modify avatar, expression collect, modify group announcement
0. message length limit, message send frequency limit

## Run Shot

![](screenshot_01.png)

## Installation

The project depends node.js and mongodb database. To install [node.js](https://nodejs.org/en/download/) ([For China mirror](https://npm.taobao.org/mirrors/node)). To install [mongodb](https://docs.mongodb.com/manual/installation/).

0. clone repository to local from `https://github.com/yinxin630/fiora`
0. go to repository directory and run `npm install`
0. create config file from simple config `cp config/config.simple.js config/config.js`. modify config file to set database and other params
0. run project `npm start`
0. open `http://localhost:8080/webpack-dev-server/` to look

## Contribute

If you want to add functionality or fix bug. Please observe the following process.

0. fork this repository and clone your fork repository to local
0. install depends `npm install`
0. modify code and check for bug
0. commit your code. if you get some errors or warnings from eslint. please fix it
0. create pull request to me.