import user from '../action/user';

function send(linkmanType, linkmanId, messageType, messageContent) {
    const messageId = `self${Date.now()}`;
    user.addSelfMessage(linkmanType, linkmanId, messageType, messageContent, messageId);
    if (linkmanType === 'group') {
        return user.sendGroupMessage(linkmanId, messageType, messageContent);
    }
    else {
        return user.sendMessage(linkmanId, messageType, messageContent);
    }
}

export default send;
