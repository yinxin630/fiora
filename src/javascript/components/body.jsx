'use strict'

const React = require('react');

import Linkman from './linkman.jsx';
import LinkmanForm from './linkmanForm.jsx';
import User from './user.jsx';
import Sidebar from './sidebar.jsx';
import Topbar from './topbar.jsx';
import Message from './message.jsx';
import ChatForm from './chatForm.jsx';
import InputArea from './inputArea.jsx';

export default class Body extends React.Component {
    getMessages (linkman, userId) {
        if (!linkman) {
            return;
        }
        return linkman.messages.map(message => {
            return <Message
                avatar={ linkman.avatar }
                nickname={ linkman.nickname }
                time={ message.time }
                content={ message.content }
                align={ linkman.id === userId ? 'right' : 'left' }
            />
        });
    }
    
    getTopbar (linkman) {
        if (!linkman) {
            return <Topbar noNickname={ true }/>
        }
        return <Topbar
            avatar={ linkman.avatar }
            nickname={ linkman.nickname }
        />
    }
    
    render () {
        const { user, linkmans, linkmanFocus } = this.props;
        
        return (
            <div style={{
                flex: 1,
                display: 'flex',
            }}>
                <Sidebar>
                    <User 
                        nickname={ this.props.user.nickname }
                        avatar={ this.props.user.avatar }
                    />
                    <nav 
                        style={{
                            flex: 1,
                            marginTop: '100px',
                        }}
                    >
                    </nav>
                </Sidebar>
                <LinkmanForm>
                    {
                        this.props.linkmans.map((linkman, index) => {
                            return <Linkman
                                avatar={ linkman.avatar }
                                nickname={ linkman.nickname }
                                time={ linkman.messages[linkman.messages.length - 1].time }
                                content={ linkman.messages[linkman.messages.length - 1].content }
                                focus={ index === this.props.linkmanFocus }
                                handleClick={ e => this.props.linkmanClick(index) }
                            />
                        })
                    }
                </LinkmanForm>
                <div style={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    backgroundColor: '#FDFFFF',
                }}>
                    { this.getTopbar(linkmans[linkmanFocus]) }
                    <ChatForm>
                        {
                            this.getMessages(this.props.linkmans[this.props.linkmanFocus], this.props.user.id)
                        }
                    </ChatForm>
                    <InputArea/>
                </div>
            </div>
        )
    }
}