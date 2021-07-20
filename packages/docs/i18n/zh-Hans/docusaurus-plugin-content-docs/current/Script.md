---
id: script
title: 脚本
sidebar_label: 脚本
---

fiora 内置了一个命令行工具, 用来管理服务器. 执行 `fiora` 查看工具

> **注意!**  这些脚本大多会直接修改数据库, 推荐(但非必需)提前备份数据库并停止服务端后再执行

## deleteMessages

`fiora deleteMessages`

删除所有历史消息记录, 如果消息图片和文件是存储在服务器上, 也可以一并删除

## deleteTodayRegisteredUsers

`fiora deleteTodayRegisteredUsers`

删除当天(以服务器时间为准)新注册的所有用户

## deleteUser

`fiora deleteUser [userId]`

删除指定用户, 同时删除其历史消息, 退出其已加入的群组并删除其所有好友关系

## doctor

`fiora doctor`

检查服务端配置和状态, 可以用来定位服务端启动失败的原因

## fixUsersAvatar

`fiora fixUsersAvatar`

修复用户错误头像路径, 请根据你的实际情况修改脚本判断逻辑

## getUserId

`fiora getUserId [username]`

获取指定用户名的 userId

## register

`fiora register [username] [password]`

注册新用户, 当禁止注册时可以由管理员通过其注册新用户

## updateDefaultGroupName

`fiora updateDefaultGroupName [newName]`

更新默认群组名