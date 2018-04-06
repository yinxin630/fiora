import React, { Component } from 'react';
import Message from './Message';

class MessageList extends Component {
    render() {
        return (
            <div className="chat-messageList">
                <Message
                    avatar={require('@/assets/images/头像1.png')}
                    nickname="test呵呵"
                    time={new Date()}
                    type="text"
                    content="消息内容消息内容消息内容消息内容消息内容消息内容"
                />
                <Message
                    avatar={require('@/assets/images/头像1.png')}
                    nickname="test呵呵"
                    time={new Date()}
                    type="text"
                    content="超长的消息内容超长的消息内容超长的消息内容超长的消息内容超长的消息内容超长的消息内容超长的消息内容超长的消息内容"
                />
                <Message
                    avatar={require('@/assets/images/头像1.png')}
                    nickname="test呵呵"
                    time={new Date()}
                    type="text"
                    content="fjlskdjflksdjflsjdlkfsdfjlsdkjfklsdjfdkslfklsdfjfjlskdjflsdjklfjskldfjlksdjfklfjalksdjflkajsdlfjlsadkjflkjdlkfj"
                />
                <Message
                    avatar={require('@/assets/images/头像1.png')}
                    nickname="碎碎酱"
                    time={new Date()}
                    type="text"
                    content="你好啊, 小姐姐"
                    isSelf
                />
                <Message
                    avatar={require('@/assets/images/头像1.png')}
                    nickname="test呵呵"
                    time={new Date()}
                    type="text"
                    content=""
                />
                <Message
                    avatar={require('@/assets/images/头像1.png')}
                    nickname="碎碎酱"
                    time={new Date()}
                    type="text"
                    content="fjfksjdkfskdjfksjf"
                    isSelf
                />
                <Message
                    avatar={require('@/assets/images/头像1.png')}
                    nickname="test呵呵"
                    time={new Date()}
                    type="text"
                    content="消息内容消息内容消息内容消息内容消息内容消息内容"
                />
                <Message
                    avatar={require('@/assets/images/头像1.png')}
                    nickname="test呵呵"
                    time={new Date()}
                    type="text"
                    content="消息内容消息内容消息内容消息内容消息内容消息内容"
                />
                <Message
                    avatar={require('@/assets/images/头像1.png')}
                    nickname="test呵呵"
                    time={new Date()}
                    type="text"
                    content="消息内容消息内容消息内容消息内容消息内容消息内容"
                />
                <Message
                    avatar={require('@/assets/images/头像1.png')}
                    nickname="test呵呵"
                    time={new Date()}
                    type="text"
                    content="消息内容消息内容消息内容消息内容消息内容消息内容"
                />
                <Message
                    avatar={require('@/assets/images/头像1.png')}
                    nickname="test呵呵"
                    time={new Date()}
                    type="text"
                    content="消息内容消息内容消息内容消息内容消息内容消息内容"
                />
                <Message
                    avatar={require('@/assets/images/头像1.png')}
                    nickname="test呵呵"
                    time={new Date()}
                    type="text"
                    content="消息内容消息内容消息内容消息内容消息内容消息内容"
                />
                <Message
                    avatar={require('@/assets/images/头像1.png')}
                    nickname="test呵呵"
                    time={new Date()}
                    type="text"
                    content="消息内容消息内容消息内容消息内容消息内容消息内容"
                />
                <Message
                    avatar={require('@/assets/images/头像1.png')}
                    nickname="test呵呵"
                    time={new Date()}
                    type="text"
                    content="消息内容消息内容消息内容消息内容消息内容消息内容"
                />
            </div>
        );
    }
}

export default MessageList;
