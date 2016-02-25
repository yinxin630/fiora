# 前端Redux Store存储结构说明

## store: {Object} state主存

```
store: {
    user: {Object} 用户信息
    linkmans: {Array} 联系人列表
    linkmanFocus: {Integer} 被选中的联系人序号
}
```

## user: {Object} 用户信息

```
user: {
    avatar: {String} 用户头像地址
    nickname: {String} 用户昵称
}
```

## linkmans: {Array} 联系人列表

```
linkmans: [
    linkman0: {Linkman} 联系人0
    linkman1: {Linkman} 联系人1
]
```

## linkman: {Object} 联系人

```
linkman: {
    avatar: {String} 联系人头像
    nickname: {String} 联系人昵称
    messages: [
        message0: {Message} 消息0
        message1: {Message} 消息1
    ]
}
```

## message {Object} 消息

```
message: {
    time: {String} 消息时间,
    content: {String} 消息内容,
}
```