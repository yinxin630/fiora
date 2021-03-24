---
id: script
title: Script
sidebar_label: Script
---

The server has built-in scripts to manage the server. These scripts are in the `fiora/bin` directory

**Note!** Most of these scripts will directly modify the database. It is recommended (but not necessary) to backup the database in advance and stop the server before executing

## deleteMessages

`yarn script deleteMessages`

Delete all historical message records, if the message pictures and files are stored on the server, they can also be deleted together

## deleteTodayRegisteredUsers

`yarn script deleteTodayRegisteredUsers`

Delete all newly registered users on the day (based on server time)

## deleteUser

`yarn script deleteUser [userId]`

Delete the specified user, delete its historical messages, exit the group that it has joined, and delete all its friends

## doctor

`yarn script doctor`

Check the server configuration and status, which can be used to locate the cause of the server startup failure

## fixUsersAvatar

`yarn script fixUsersAvatar`

Fix user error avatar path, please modify the script judgment logic according to your actual situation

## getUserId

`yarn script getUserId [username]`

Get the userId of the specified user name

## register

`yarn script register [username] [password]`

Register new users, when registration is prohibited, the administrator can register new users through it