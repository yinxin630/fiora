---
id: getting-start
title: Getting Start
sidebar_label: Getting Start
---

import useBaseUrl from '@docusaurus/useBaseUrl';

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

<img alt="PC screenshot" src={useBaseUrl('img/screenshots/screenshot-pc.png')} style={{'max-width':'800px'}} />
<img alt="Mobile screenshot" src={useBaseUrl('img/screenshots/screenshot-phone.png')} style={{'max-height':'667px'}} />

## Directory

    |-- [.githubb]                // github actions
    |-- [.vscode]                 // vscode workspace config
    |-- [bin]                     // server scripts
    |-- [build]                   // webpack config
    |-- [client]                  // web client
    |-- [config]                  // application configs
    |-- [dist]                    // client buid output directory
    |-- [docs]                    // document
    |-- [public]                  // server static resources
    |-- [server]                  // server
    |-- [test]                    // unit test
    |-- [types]                   // typescript types
    |-- [utils]                   // util functions
    |-- .babelrc                  // babel config
    |-- .eslintignore             // eslint ignore list
    |-- .eslintrc                 // eslint config
    |-- .gitignore                // git ignore
    |-- .nodemonrc                // nodemon config
    |-- .prettierrc               // prettier config
    |-- Dockerfile                // docker file
    |-- LICENSE                   // fiora license
    |-- docker-compose.yaml       // docker compose config
    |-- jest.*.sj                 // jest config
    |-- package.json              // npm
    |-- tsconfig.json             // typescript config
    |-- yarn.lock                 // yarn
    ...

## Contribution

If you want to add functionality or fix bugs, please follow the process below:

1. Fork this repository and clone the fork post to the local
2. Installation dependencies `yarn install`
3. Modify the code and confirm it is bug free
4. Submit code, if eslint has reported error, please repair it and submit it again.
5. Create a pull request
