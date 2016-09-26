import user from '../action/user';

function send(type, id, messageType, messageContent) {
    if (type === 'group') {
        user.sendGroupMessage(id, messageType, messageContent);
    }
    else {
        user.sendMessage(id, messageType, messageContent);
    }
}

export default send;
