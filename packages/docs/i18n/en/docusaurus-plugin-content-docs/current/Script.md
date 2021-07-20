---
id: script
title: Script
sidebar_label: Script
---

Fiora has a built-in command line tool to manage the server. Execute `fiora` to view the tool

**Note!** Most of these scripts will directly modify the database. It is recommended (but not necessary) to backup the database in advance and stop the server before executing

## deleteMessages

`fiora deleteMessages`

Delete all historical message records, if the message pictures and files are stored on the server, they can also be deleted together

## deleteTodayRegisteredUsers

`fiora deleteTodayRegisteredUsers`

Delete all newly registered users on the day (based on server time)

## deleteUser

`fiora deleteUser [userId]`

Delete the specified user, delete its historical messages, exit the group that it has joined, and delete all its friends

## doctor

`fiora doctor`

Check the server configuration and status, which can be used to locate the cause of the server startup failure

## fixUsersAvatar

`fiora fixUsersAvatar`

Fix user error avatar path, please modify the script judgment logic according to your actual situation

## getUserId

`fiora getUserId [username]`

Get the userId of the specified user name

## register

`fiora register [username] [password]`

Register new users, when registration is prohibited, the administrator can register new users through it

## updateDefaultGroupName

`fiora updateDefaultGroupName [newName]`

Update default group name