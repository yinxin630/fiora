'use strict'

const React = require('react');
import Linkman from './linkman.jsx';
import LinkmanForm from './linkmanForm.jsx';
import User from './user.jsx';
import Sidebar from './sidebar.jsx';
import Topbar from './topbar.jsx';
import Message from './message.jsx';
import ChatForm from './chatForm.jsx';

export default class Body extends React.Component {
    render () {
        return (
            <div style={{
                flex: 1,
                display: 'flex',
                zIndex: -1,
            }}>
                <Sidebar>
                    <User/>
                    <nav style={{
                        flex: 1,
                        marginTop: '100px',
                    }}>
                    </nav>
                </Sidebar>
                <LinkmanForm>
                    <Linkman/>
                    <Linkman/>
                    <Linkman/>
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
                    <div style={{
                        height: '6rem',
                    }}>
                        输入区
                    </div>
                </div>
            </div>
        )
    }
}