import React from 'react';
import './style/messageList.scss';

class MessageList extends React.Component {
    render () {
        return (
            <div className="message-list">
                { this.props.children }
            </div>
        );
    }
}

class Message extends React.Component {
    render () {
        let { self } = this.props;
        return (
            <div className={ `message-list-item ${ self ? 'message-self': '' }` }>
                <img src={ require('../../image/avatar.gif') }/>
                <div>
                    <div>
                        <span>碎碎酱</span>
                        <span>12:34</span>
                    </div>
                    <div>
                        Note that it's particularly not recommended to use a pixel dimension and an auto dimension with a gradient, because it's impossible to replicate rendering in versions of Firefox prior to 8, and in browsers not implementing Firefox 8's rendering, without knowing the exact size of the element whose background is being specified.
                    </div>
                </div>
            </div>
        );
    }
}

export default {
    container: MessageList,
    item: Message,
};