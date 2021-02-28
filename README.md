# Fiora

[![Test Status](https://github.com/yinxin630/fiora/workflows/Unit%20Test/badge.svg)](https://github.com/yinxin630/fiora/actions?query=workflow%3A%22Unit+Test%22)
[![Lint Status](https://github.com/yinxin630/fiora/workflows/Lint%20Code%20Style/badge.svg)](https://github.com/yinxin630/fiora/actions?query=workflow%3A%22Lint+Code+Style%22)
[![Typescript Status](https://github.com/yinxin630/fiora/workflows/Typescript%20Type%20Check/badge.svg)](https://github.com/yinxin630/fiora/actions?query=workflow%3A%22Typescript+Type+Check%22)
[![author](https://img.shields.io/badge/author-%E7%A2%8E%E7%A2%8E%E9%85%B1-blue.svg)](http://suisuijiang.com)
[![Node.js Version](https://img.shields.io/badge/node.js-10.15.0-blue.svg)](http://nodejs.org/download)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://github.com/yinxin630/fiora/blob/master/LICENSE)

Language: [English](README.md) | [简体中文](./docs-website/docs/Getting-Start.ZH.md)

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

<img src="https://github.com/yinxin630/fiora/raw/master/docs-website/docs/img/screenshots/screenshot-pc.png" alt="PC" style="max-width:800px" />
<img src="https://github.com/yinxin630/fiora/raw/master/docs-website/docs/img/screenshot-phone.png" alt="Phone" height="667" style="max-height:667px" />

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
0. Installation dependencies `yarn install`
0. Modify the code and confirm it is bug free
0. Submit code, if eslint has reported error, please repair it and submit it again.
0. Create a pull request
