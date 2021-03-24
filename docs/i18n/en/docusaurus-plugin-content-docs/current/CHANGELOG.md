---
id: changelog
title: Change Log
sidebar_label: Change Log
---

## 2021-3-14

-   Support the server to calculate the number of unread messages

## 2021-3-2

-   When identifying the url in the message, support host as localhost or ip

## 2021-3-1

-   No longer limit the number of groups created by the administrator

## 2021-2-28

-   Multiple users use the same notification token

## 2021-2-27

-   Modify app notification content
-   Messages sent by yourself no longer push notification to yourself
-   The progress bar is displayed when the webpack build production environment

## 2021-2-25

-   Support push notification to fiora app

## 2021-2-21

-   **Important** Fix the wrong logic of judging whether it is an administrator on the server side. Treat everyone as an administrator

## 2021-2-17

-   Support sharing groups externally

## 2021-1-26

-   File message size calculation error

## 2021-1-22

-   A single ip can register up to 3 accounts within 24 hours

## 2020-12-17

-   Support search expressions by input content. It is disabled default and you can enable it in setting

-   Only limit send message frequency

## 2020-12-08

-   **Breaking!!!** Refactor to use redis cache instead of memory variable cache. So you should run redis first before start fiora

## 2020-11-15

-   Refactor to use webpack plugin to generate service worker script
-   Refacotr or add server scripts

## 2020-11-14

-   Adapt to ios full screen devices

## 2020-11-12

-   Support multiple administrators
-   Add getUserId and deleteUser scripts

## 2020-11-08

-   Support to withdraw self's message

## 2020-11-07

-   Support send file directly
-   Support display linkman realtime info. About user online status and group online members count

-   Refactor webpack build config

-   Fix the issue of right click on image viewer to copy image will close it

## 2020-11-04

-   **Breaking!!!** Modify the config files. It no longer supports modifying config items through command line params
-   Remove pm2 ecosystem config and deploy shell script

## 2020-11-03

-   Rename some npm scripts name
