# Fiora

[![Test Status](https://github.com/yinxin630/fiora/workflows/Unit%20Test/badge.svg)](https://github.com/yinxin630/fiora/actions?query=workflow%3A%22Unit+Test%22)
[![Lint Status](https://github.com/yinxin630/fiora/workflows/Lint%20Code%20Style/badge.svg)](https://github.com/yinxin630/fiora/actions?query=workflow%3A%22Lint+Code+Style%22)
[![Typescript Status](https://github.com/yinxin630/fiora/workflows/Typescript%20Type%20Check/badge.svg)](https://github.com/yinxin630/fiora/actions?query=workflow%3A%22Typescript+Type+Check%22)
[![author](https://img.shields.io/badge/author-%E7%A2%8E%E7%A2%8E%E9%85%B1-blue.svg)](http://suisuijiang.com)
[![Node.js Version](https://img.shields.io/badge/node.js-8.9.0-blue.svg)](http://nodejs.org/download)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://github.com/yinxin630/fiora/blob/master/LICENSE)

语言: [English](../README.md) | [简体中文](README.ZH.md)

fiora 是一款有趣的二次元聊天应用. 是基于 node.js, mongodb, react 和 socket.io 等技术开发的

该项目起始于 [2015-11-04](https://github.com/yinxin630/chatroom-with-sails/commit/0a032372727550b8b4087f24ac299de03b677b9f)

在线地址: [https://fiora.suisuijiang.com/](https://fiora.suisuijiang.com/)   
安卓/iOS app: [https://github.com/yinxin630/fiora-app](https://github.com/yinxin630/fiora-app)

## 功能

1. 注册账号并登录, 可以长久保存你的数据
2. 加入现有群组或者创建自己的群组, 来和大家交流
3. 和任意人私聊, 并添加其为好友
4. 多种消息类型, 包括文本 / 表情 / 图片 / 代码 / 文件 / 命令, 还可以搜索表情包
5. 当收到新消息时推送通知, 可以自定义通知铃声, 还可以把消息读出来
6. 选择你喜欢的主题, 并且可以设置为任何你喜欢的壁纸以及主题颜色
7. 设置管理员来管理用户

## 运行截图

<img src="https://github.com/yinxin630/fiora/raw/master/doc/screenshots/screenshots-pc.png" alt="PC" style="max-width:800px" />
<img src="https://github.com/yinxin630/fiora/raw/master/doc/screenshots/screenshots-phone.png" alt="Phone" style="max-height:667px" />

## 安装运行

[查看如何运行Fiora](./INSTALL.ZH.md)

## 更新日志

[查看更新日志](./CHANGELOG.md)

## 目录结构

    |-- [bin]                     // 服务端管理工具
    |-- [build]                   // webpack构建
    |-- [client]                  // 客户端代码
    |-- [config]                  // 配置
    |-- [dist]                    // 打包输出目录
    |-- [doc]                     // 文档
    |-- [public]                  // 服务端静态资源
    |-- [server]                  // 服务端代码
    |-- [utils]                   // 工具方法
    |-- .babelrc                  // babel配置
    |-- .eslintignore             // eslint忽略配置
    |-- .eslintrc                 // eslint规则配置
    |-- .gitignore                // git忽略配置
    |-- .nodemonrc                // nodemon配置
    |-- package-lock.json         // npm
    |-- package.json              // npm
    |-- yarn.lock                 // yarn
    ...

## 贡献代码

如果你想要添加功能或者修复BUG. 请遵守下列流程.

0. fork 本仓库并克隆 fork 后的仓库到本地
0. 安装依赖 `yarn install`
0. 修改代码并确认无 bug
0. 提交代码, 如果 eslint 有报错, 请修复后再次提交
0. 创建一个 pull request