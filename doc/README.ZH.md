# Fiora

[![Test Status](https://github.com/yinxin630/fiora/workflows/Unit%20Test/badge.svg)](https://github.com/yinxin630/fiora/actions?query=workflow%3A%22Unit+Test%22)
[![Lint Status](https://github.com/yinxin630/fiora/workflows/Lint%20Code%20Style/badge.svg)](https://github.com/yinxin630/fiora/actions?query=workflow%3A%22Lint+Code+Style%22)
[![Typescript Status](https://github.com/yinxin630/fiora/workflows/Typescript%20Type%20Check/badge.svg)](https://github.com/yinxin630/fiora/actions?query=workflow%3A%22Typescript+Type+Check%22)
[![author](https://img.shields.io/badge/author-%E7%A2%8E%E7%A2%8E%E9%85%B1-blue.svg)](http://suisuijiang.com)
[![Node.js Version](https://img.shields.io/badge/node.js-8.9.0-blue.svg)](http://nodejs.org/download)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://github.com/yinxin630/fiora/blob/master/LICENSE)

语言: [English](../README.md) | [简体中文](README.ZH.md)

Fiora是一款有趣的在线聊天应用. 使用node.js, mongodb, socket.io和react编写

该项目起始于 [2015-11-04](https://github.com/yinxin630/chatroom-with-sails/commit/0a032372727550b8b4087f24ac299de03b677b9f)

在线地址: [https://fiora.suisuijiang.com/](https://fiora.suisuijiang.com/)   
安卓/iOS app: [https://github.com/yinxin630/fiora-app](https://github.com/yinxin630/fiora-app)

## 功能

1. 好友, 群组, 私聊, 群聊
2. 文本, 图片, 代码, url等多种类型消息
3. 贴吧表情, 滑稽表情, 搜索表情包
4. 桌面通知, 声音提醒, 消息语音朗读
5. 自定义桌面背景, 主题颜色, 文本颜色
6. 查看在线用户, @功能
7. 管理员
    - 关小黑屋
    - 撤回消息
    - 给用户打标签
    - 重置用户密码
    - 查看用户 ip

## 运行截图

<img src="https://github.com/yinxin630/fiora/raw/master/doc/screenshots/runtime.jpeg" alt="桌面" style="max-width:800px" />
<img src="https://github.com/yinxin630/fiora/raw/master/doc/screenshots/mobile-runtime.png" alt="手机" style="max-height:667px" />

## 安装运行

[查看如何运行Fiora](./INSTALL.ZH.md)

## 目录结构

    |-- [build]                   // webpack构建
    |-- [client]                  // 客户端代码
    |-- [config]                  // 配置
    |-- [dist]                    // 打包输出目录
    |-- [doc]                     // 文档
    |-- [public]                  // 服务端静态资源
    |-- [server]                  // 服务端代码
    |-- [static]                  // 客户端静态资源
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

0. fork本仓库并克隆fork后的仓库到本地
0. 安装依赖 `yarn install`
0. 修改代码并确认无bug
0. 提交代码, 如果eslint有报错, 请修复后再次提交
0. 创建一个pull request