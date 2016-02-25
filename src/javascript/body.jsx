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
    render () {
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
                    <Topbar/>
                    <ChatForm>
                        <Message/>
                        <Message align="right"/>
                    </ChatForm>
                    <InputArea/>
                </div>
            </div>
        )
    }
}