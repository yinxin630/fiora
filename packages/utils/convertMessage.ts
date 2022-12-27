import WuZeiNiangImage from '@fiora/assets/images/wuzeiniang.gif';

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

function convertSystemMessage(message: any) {
    if (message.type === 'system') {
        message.from._id = 'system';
        message.from.originUsername = message.from.username;
        message.from.username = 'Her Majesty the Squid Girl';
        message.from.avatar = WuZeiNiangImage;
        message.from.tag = 'system';

        const content = JSON.parse(message.content);
        switch (content.command) {
            case 'roll': {
                message.content = `throw out${content.value}point (upper limit${content.top}point)`;
                break;
            }
            case 'rps': {
                message.content = `resorted to ${content.value}`;
                break;
            }
            default: {
                message.content = '不支持的指令';
            }
        }
    } else if (message.deleted) {
        message.type = 'system';
        message.from._id = 'system';
        message.from.originUsername = message.from.username;
        message.from.username = '乌贼娘殿下';
        message.from.avatar = WuZeiNiangImage;
        message.from.tag = 'system';
        message.content = `撤回了消息`;
    }
}

export default function convertMessage(message: any) {
    convertSystemMessage(message);
    return message;
}
