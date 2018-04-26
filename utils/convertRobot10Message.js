export default function convertRobot10Message(message) {
    if (message.from._id === '5adad39555703565e7903f79') {
        try {
            const parseMessage = JSON.parse(message.content);
            message.from.tag = parseMessage.source;
            message.from.avatar = parseMessage.avatar;
            message.from.username = parseMessage.username;
            message.type = parseMessage.type;
            message.content = parseMessage.content;
        } catch (err) {
            console.warn('解析robot10消息失败', err);
        }
    }
}
