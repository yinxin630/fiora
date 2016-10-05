import socket from './socket';

const publicApi = {
    apis: {
        getApis: 'get api list. params( cb )',
        getOnlineCount: 'get online user count. params( cb )',
        sendMessage: 'send message. params( linkmanType, linkmanId, messageType, content, cb )',
    },
    getApis: function (cb) {
        cb(null, this.apis);
    },
    getOnlineCount: function (cb) {
        socket.get('/auth/count', { }, response => {
            cb(null, response.data.onlineCount);
        });
    },
    sendMessage: function (linkmanType, linkmanId, messageType, content, cb) {
        if (linkmanType === 'group') {
            socket.post('/groupMessage', { linkmanId, type: messageType, content }, response => {
                if (response.status !== 201) {
                    return cb(response.data, null);
                }
                cb(null, response.data);
            });
        }
        else if (linkmanType === 'stranger') {
            socket.post('/message', { linkmanId, type: messageType, content }, response => {
                if (response.status !== 201) {
                    return cb(response.data, null);
                }
                cb(null, response.data);
            });
        }
        else {
            cb('invalid linkman type', null);
        }
    },
};

export { publicApi };


const cbMap = { };
let body;

function getCurrentRoomId() {
    return body.props.params.id;
}

function on(name, func) {
    if (!cbMap[name]) {
        cbMap[name] = [];
    }
    cbMap[name].push(func);
}

function off(name, func) {
    if (!cbMap[name]) {
        return false;
    }
    const index = cbMap[name].indexOf(func);
    if (index !== -1) {
        cbMap[name].splice(index, 1);
        return true;
    }
    else {
        return false;
    }
}

function emit(name, data) {
    if (name === 'rawMessage') {
        if (getCurrentRoomId() === data.to._id) {
            emit('message', data);
        }
    }
    if (!cbMap[name]) {
        return;
    }
    cbMap[name].forEach((v) => {
        v(data);
    });
}

function init(bodyInit) {
    body = bodyInit;
}

function registerCommand(commandName, cb) {
    on('message', (msg) => {
        const { content } = msg;
        const reg = new RegExp(`^${commandName}\\s*\\(([\\s\\S]*)\\)\\s*;?`);
        const match = content.trim().match(reg);
        if (match) {
            cb(match[1] && match[1].trim(), msg);
        }
    });
}
const messageList = {};
function getMessage(messageTypeName, content) {
    return messageList[messageTypeName](content);
}
function registerMessage(messageTypeName, cb) {
    messageList[messageTypeName] = cb;
}
function getVirtualMessageName(content) {
    const match = content.trim().match(/^([a-zA-Z0-9_\-]+)\s*\(([\s\S]*)\)\s*;?\s*$/);

    if (match && match[1] && messageList[match[1]]) {
        return { name: match[1], content: match[2] };
    } else {
        return;
    }
}
export default {
    on,
    off,
    emit,
    init,
    registerCommand,
    registerMessage,
    getVirtualMessageName,
    getMessage,
};
