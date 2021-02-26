---
id: getting-started
title: Getting Started
sidebar_label: Getting Started
---

# Fiora

Language: [English](./Getting-Started.md) | [简体中文](./Getting-Started.ZH.md)

fiora is an interesting chat application. It is developed based on node.js, mongodb, react and socket.io technologies

The project started at [2015-11-04](https://github.com/yinxin630/chatroom-with-sails/commit/0a032372727550b8b4087f24ac299de03b677b9f)

Online address: [https://fiora.suisuijiang.com/](https://fiora.suisuijiang.com/)  
Android / iOS app: [https://github.com/yinxin630/fiora-app](https://github.com/yinxin630/fiora-app)

## Functions

1. Register an account and log in, it can save your data for a long time
2. Join an existing group or create your own group to communicate with everyone
3. Chat privately with anyone and add them as friends
4. Multiple message types, including text / emoticons / pictures / codes / files / commands, you can also search for emoticons
5. Push notification when you receive a new message, you can customize the notification ringtone, and it can also read the message out
6. Choose the theme you like, and you can set it as any wallpaper and theme color you like
7. Set up an administrator to manage users

## Screenshot

<img src="https://github.com/yinxin630/fiora/raw/master/docs/screenshots/screenshot-pc.png" alt="PC" style="max-width:800px" />
<img src="https://github.com/yinxin630/fiora/raw/master/docs/screenshots/screenshot-phone.png" alt="Phone" height="667" style="max-height:667px" />

## Install

[See how to run Fiora](./docs/INSTALL.md)

## Change Log

[See change log](./docs/CHANGELOG.md)

## Directory

    |-- [bin]                     // Server management tools
    |-- [build]                   // Webpack build
    |-- [client]                  // Client code
    |-- [config]                  // Config
    |-- [dist]                    // Packaging output directory
    |-- [docs]                    // Document
    |-- [public]                  // Server static resources
    |-- [server]                  // Server code
    |-- [utils]                   // Util method
    |-- .babelrc                  // Babel config
    |-- .eslintignore             // Eslint ignore config
    |-- .eslintrc                 // Eslint rule config
    |-- .gitignore                // Git ignore config
    |-- .nodemonrc                // Nodemon config
    |-- package-lock.json         // npm
    |-- package.json              // npm
    |-- yarn.lock                 // yarn
    ...

## Contribution

If you want to add functionality or fix bugs, please follow the process below:

0. Fork this repository and clone the fork post to the local
1. Installation dependencies `yarn install`
2. Modify the code and confirm it is bug free
3. Submit code, if eslint has reported error, please repair it and submit it again.
4. Create a pull request
