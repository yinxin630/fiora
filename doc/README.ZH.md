# Fiora

[![Build Status](https://travis-ci.org/yinxin630/fiora.svg?branch=master)](https://travis-ci.org/yinxin630/fiora)
[![author](https://img.shields.io/badge/author-%E7%A2%8E%E7%A2%8E%E9%85%B1-blue.svg)](http://suisuijiang.com)
[![Node.js Version](https://img.shields.io/badge/node.js-8.9.0-blue.svg)](http://nodejs.org/download)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://github.com/yinxin630/fiora/blob/master/LICENSE)

语言: [English](../README.md) | [简体中文](README.ZH.md)

Fiora是一款web聊天应用. 使用node.js, mongodb, socket.io和react编写

在线地址: [https://fiora.suisuijiang.com/](https://fiora.suisuijiang.com/)

## 功能

0. 用户, 群组, 私聊, 群聊
0. 文本, 图片, 代码, url等多种类型消息
0. 创建/搜索/加入群组, 搜索/添加好友
0. 桌面通知, 声音提醒
0. 自定义桌面背景, 主题颜色和文本颜色
0. 显示群组在线成员
0. 发送滑稽表情, 搜索表情包
0. 新消息语音播报

## 运行截图

![](./screenshots/runtime.png)

## 安装运行

[查看如何在本地运行Fiora](./INSTALL.ZH.md)

## 目录结构

    |-- [build]                   // webpack构建
    |-- [client]                  // 客户端代码
    |-- [config]                  // 配置
    |-- [dist]                    // 打包输出目录
    |-- [doc]                     // 文档
    |-- [public]                  // 静态资源
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

0. fork本仓库并克隆fork后的仓库到本地
0. 安装依赖 `yarn 或者 npm install`
0. 修改代码并确认无bug
0. 提交代码, 如果eslint有报错, 请修复后再次提交
0. 创建一个pull request