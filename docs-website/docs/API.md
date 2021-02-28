---
id: api
title: API
sidebar_label: API
---

# fiora 接口文档

## 如何调用接口

fiora 后端基于 socket.io, 首先需要与后端建立连接

```js
import IO from 'socket.io-client';
const socket = new IO(serverAddrress, options);
```

接口调用格式为

```js
socket.emit(event, data, callback);
```

参数说明

-   event {string} 接口名/事件名
-   data {object} 接口入参
-   callback {string|object => void} 接口回调, 返回 string 表示接口失败, string 内容为失败原因, 反正 object 表示接口成功, 里面包含返回数据

## 返回数据结构定义

### User

```js
{
    _id, // {string} id
    username, // {string} 用户名
    avatar, // {string} 头像
    groups, // {[Group]} 群组列表
    friends, // {[User]} 好友列表
    token, // {string} 免密登录token
    isAdmin, // {boolean} 是否为管理员
}
```

### Group

```js
{
    _id, // {string} id
    name, // {string} 群组名
    avatar, // {string} 头像
    creator, // {User ID} 群主id
    isDefault, // {boolean} 是否为默认群
    members, // {[User]} 成员列表
    messages, // {[Message]} 消息列表
}
```

### Message

```js
{
    _id, // {string} id
    from, // {User} 发送者
    to, // {string} 群聊: 群id, 私聊: 两人id拼接, 按字符串比较, 小的在前
    type, // {string} 消息类型 ['text', 'image', 'code', 'invite']
    content, // {string} 消息内容
}
```

## 接口列表

### 用户注册

```js
socket.emit(
    'register',
    {
        username, // {string} 用户名
        password, // {string} 密码
        os, // {string} 操作系统
        browser, // {string} 浏览器
        environment, // {string} 环境信息
    },
    (user) => {}, // {User} 用户数据
);
```

### 用户登录

```js
socket.emit(
    'login',
    {
        username, // {string} 用户名
        password, // {string} 密码
        os, // {string} 操作系统
        browser, // {string} 浏览器
        environment, // {string} 环境信息
    },
    (user) => {}, // {User} 用户数据
);
```

### 免密登录 / 断线重连

```js
socket.emit(
    'loginByToken',
    {
        token, // {string} 免密登录token
        os, // {string} 操作系统
        browser, // {string} 浏览器
        environment, // {string} 环境信息
    },
    (user) => {}, // {User} 用户数据
);
```

### 游客登录

游客仅能获取到默认群组

```js
socket.emit(
    'guest',
    {
        os, // {string} 操作系统
        browser, // {string} 浏览器
        environment, // {string} 环境信息
    },
    (defaultGroup) => {}, // {Group} 默认群组数据
);
```

### 修改头像

```js
socket.emit(
    'changeAvatar',
    {
        avatar, // {string} 新头像url
    },
    () => {}, // {Object} 返回空对象
);
```

### 添加好友

```js
socket.emit(
    'addFriend',
    {
        userId, // {User ID} 目标的id
    },
    (friend) => {}, // {User} 好友信息
);
```

### 删除好友

```js
socket.emit(
    'deleteFriend',
    {
        userId, // {User ID} 目标的id
    },
    () => {}, // {Object} 返回空对象
);
```

### 修改密码

```js
socket.emit(
    'changePassword',
    {
        oldPassword, // {string} 旧密码
        newPassword, // {string} 新密码
    },
    () => {}, // {Object} 返回空对象
);
```

### 修改用户名

```js
socket.emit(
    'changeUsername',
    {
        username, // {string} 新用户名
    },
    () => {}, // {Object} 返回空对象
);
```

### 重置指定用户密码

仅管理员可调用

```js
socket.emit(
    'resetUserPassword',
    {
        username, // {string} 新用户名
    },
    (data) => { // {Object} 返回数据
        data.newPassword, // {string} 新密码
    },
);
```

### 发送消息

通过 to 字段判断是发送给群, 还是发送给个人
发送群的话, to 就是群 id
发送个人的话, to 就是两个人的 id 拼接, 按字符串比较结果, 小的在前大的在后

```js
socket.emit(
    'sendMessage',
    {
        to, // {string} 目标群组, 或者俩用户id拼接结果
        type, // {string} 消息类型
        content, // {string} 消息内容
    },
    (message) => {}, // {Message} 新消息
);
```

### 获取联系人最后消息

```js
socket.emit(
    'getLinkmansLastMessages',
    {
        linkmans, // {[string]} 联系人id列表, 与to同规则
    },
    (messages) => {}, // {object} 所有联系人的最后消息, key: 联系人id, value: [Message] 消息列表
);
```

### 获取联系人历史消息

```js
socket.emit(
    'getLinkmanHistoryMessages',
    {
        linkmanId, // {string} 联系人id
        existCount, // {number} 已有消息数量
    },
    (messages) => {}, // {[Message]} 消息列表
);
```

### 获取默认群组的历史消息

不需要登录态

```js
socket.emit(
    'getDefaultGroupHistoryMessages',
    {
        existCount, // {number} 已有消息数量
    },
    (messages) => {}, // {[Message]} 消息列表
);
```

### 创建群组

```js
socket.emit(
    'createGroup',
    {
        name, // {string} 群组名
    },
    (group) => {}, // {Group} 新创建的群组
);
```

### 加入群组

```js
socket.emit(
    'joinGroup',
    {
        groupId, // {Group ID} 目标群id
    },
    (group) => {}, // {Group} 新创建的群组
);
```

### 退出群组

```js
socket.emit(
    'leaveGroup',
    {
        groupId, // {Group ID} 目标群id
    },
    () => {}, // {object} 返回空数据
);
```

### 获取群组在线用户列表

```js
socket.emit(
    'getGroupOnlineMembers',
    {
        groupId, // {Group ID} 目标群id
    },
    (users) => {}, // {[User]} 在线用户列表
);
```

### 获取默认群组在线用户列表

```js
socket.emit(
    'getDefaultGroupOnlineMembers',
    {},
    (users) => {}, // {[User]} 在线用户列表
);
```

### 修改群头像

```js
socket.emit(
    'changeGroupAvatar',
    {
        groupId, // {Group ID} 目标群id
        avatar, // {string} 新头像url
    },
    () => {}, // {object} 返回空数据
);
```

### 获取七牛前端文件上传 token

```js
socket.emit(
    'uploadToken',
    { },
    (data) => {
        // 服务端支持七牛
        data.token, // 上传token
        data.urlPrefix, // 文件上传后的路径前缀

        // 服务端不支持七牛
        data.useUploadFile, // 不支持上传七牛, 需要客户端调用 uploadFile 上传文件到服务端
    },
);
```

### 搜索用户/群组

```js
socket.emit(
    'search',
    {
        keywords, // {string} 搜索关键字
    },
    (data) => {
        data.users, // {[User]} 命中的用户
        data.groups, // {[Group]} 命中的群组
    },
);
```

### 搜索表情包

```js
socket.emit(
    'searchExpression',
    {
        keywords, // {string} 搜索关键字
    },
    (imageUrls) => {}, // {[string]} 图片列表
);
```

### 获取百度语言合成 token

```js
socket.emit(
    'getBaiduToken',
    { },
    (data) => {
        data.token, // {string} token
    },
);
```

### 封禁用户

```js
socket.emit(
    'sealUser',
    {
        username, // {string} 要封禁的用户名
    },
    () => {}, // {object} 返回空数据
);
```

### 获取封禁用户列表

```js
socket.emit(
    'getSealList',
    {},
    (users) => {}, // {[string]} 被封禁的用户名列表
);
```

### 上传文件到服务端

```js
socket.emit(
    'uploadFile',
    {
        fileName, // {string} 文件名
        file, // {blob} 文件内容, blob格式
    },
    (data) => {
        data.url, // 文件url
    },
);
```
