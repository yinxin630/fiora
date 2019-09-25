# Fiora

[![Build Status](https://travis-ci.org/yinxin630/fiora.svg?branch=master)](https://travis-ci.org/yinxin630/fiora)
[![author](https://img.shields.io/badge/author-%E7%A2%8E%E7%A2%8E%E9%85%B1-blue.svg)](http://suisuijiang.com)
[![Node.js Version](https://img.shields.io/badge/node.js-10.15.0-blue.svg)](http://nodejs.org/download)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://github.com/yinxin630/fiora/blob/master/LICENSE)

Language: [English](README.md) | [简体中文](./doc/README.ZH.md)

Fiora is a web chat application. It is written by node.js, mongodb, socket.io and react

Online address: [https://fiora.suisuijiang.com/](https://fiora.suisuijiang.com/)   
Android / iOS app: [https://github.com/yinxin630/fiora-app](https://github.com/yinxin630/fiora-app)

## Functions

1. Friends, groups, private chat, group chat
2. Text, pictures, code, URL and many other types of messages
3. Tieba expression, huaji expression, search expression image
4. Desktop notification, sound reminder, message voice reading
5. Custom desktop background, theme color, and text color
6. Display online users, @ function
7. Administrator
    - Block
    - Recall message
    - Give user tag
    - Reset user password

## Screenshot

<img src="./doc/screenshots/runtime.jpeg" alt="PC" style="max-width:800px" />
<img src="./doc/screenshots/mobile-runtime.png" alt="Mobile" style="max-height:667px" />

## Install

[See how to run Fiora](./doc/INSTALL.md)

## Directory

    |-- [build]                   // Webpack build
    |-- [client]                  // Client code
    |-- [config]                  // Config
    |-- [dist]                    // Packaging output directory
    |-- [doc]                     // Document
    |-- [public]                  // Server static resources
    |-- [server]                  // Server code
    |-- [static]                  // Client static resources
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
0. Installation dependencies `yarn or npm install`
0. Modify the code and confirm it is bug free
0. Submit code, if eslint has reported error, please repair it and submit it again.
0. Create a pull request