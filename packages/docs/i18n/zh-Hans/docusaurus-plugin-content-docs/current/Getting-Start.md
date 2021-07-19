---
id: getting-start
title: 入门指南
sidebar_label: 入门指南
---

import useBaseUrl from '@docusaurus/useBaseUrl';

fiora 是一款有趣的聊天应用. 基于 node.js, mongodb, react 和 socket.io 等技术开发

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

<img src={useBaseUrl('img/screenshots/screenshot-pc.png')} alt="PC" style={{'max-width':'800px'}} />
<img src={useBaseUrl('img/screenshots/screenshot-phone.png')} alt="Phone" height="667" style={{'max-width':'667px'}} />

## 目录结构

    |-- [.githubb]                // github actions
    |-- [.vscode]                 // vscode 工作区配置
    |-- [bin]                     // 服务端脚本
    |-- [build]                   // webpack 配置
    |-- [client]                  // web 客户端
    |-- [config]                  // 应用配置
    |-- [dist]                    // 构建客户端输出目录
    |-- [docs]                    // 文档
    |-- [public]                  // 服务端静态资源
    |-- [server]                  // 服务端
    |-- [test]                    // 单元测试
    |-- [types]                   // typescript 类型
    |-- [utils]                   // 工具方法
    |-- .babelrc                  // babel 配置
    |-- .eslintignore             // eslint 忽略
    |-- .eslintrc                 // eslint 配置
    |-- .gitignore                // git 忽略
    |-- .nodemonrc                // nodemon 配置
    |-- .prettierrc               // prettier 配置
    |-- Dockerfile                // docker 文件
    |-- LICENSE                   // fiora 许可
    |-- docker-compose.yaml       // docker compose 配置
    |-- jest.*.sj                 // jest 配置
    |-- package.json              // npm
    |-- tsconfig.json             // typescript 配置
    |-- yarn.lock                 // yarn
    ...

## 贡献代码

如果你想要添加功能或者修复 BUG. 请遵守下列流程.

1. fork 本仓库并克隆 fork 后的仓库到本地
2. 安装依赖 `yarn install`
3. 修改代码并确认无 bug
4. 提交代码, 如果 eslint 有报错, 请修复后再次提交
5. 创建一个 pull request
