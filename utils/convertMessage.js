// function convertRobot10Message(message) {
//     if (message.from._id === '5adad39555703565e7903f79') {
//         try {
//             const parseMessage = JSON.parse(message.content);
//             message.from.tag = parseMessage.source;
//             message.from.avatar = parseMessage.avatar;
//             message.from.username = parseMessage.username;
//             message.type = parseMessage.type;
//             message.content = parseMessage.content;
//         } catch (err) {
//             console.warn('解析robot10消息失败', err);
//         }
//     }
// }

function convertSystemMessage(message) {
    if (message.type === 'system') {
        message.from._id = 'system';
        message.from.originUsername = message.from.username;
        message.from.username = '乌贼娘殿下';
        message.from.avatar = require('../client/assets/images/wuzeiniang.gif');
        message.from.tag = 'system';

        const content = JSON.parse(message.content);
        switch (content.command) {
        case 'roll': {
            message.content = `掷出了${content.value}点 (上限${content.top}点)`;
            break;
        }
        case 'rps': {
            message.content = `使出了 ${content.value}`;
            break;
        }
        default: {
            message.content = '不支持的指令';
        }
        }
    }
}

// function convertHttpImageUrl(message) {
//     if (message.type === 'image' && message.content.startsWith('http:')) {
//         message.content = message.content.replace(/^http:/, '');
//     }
// }

export default function convertMessage(message) {
    // convertRobot10Message(message);
    convertSystemMessage(message);
    // convertHttpImageUrl(message);
}
