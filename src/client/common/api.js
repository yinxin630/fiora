const cbMap = { };
let body;
function getCurrentRoomId() {
    return body.props.routeParams.id;
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
            cb(match[1] && match[1].trim());
        }
    });
}
export default {
    on, off, emit, init, registerCommand,
};
