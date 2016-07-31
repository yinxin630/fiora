import React from 'react';
import '../style/body.scss';

import UserList from './userList';

class Body extends React.Component {
    render () {
        return (
            <div className="body">
                <UserList.container>
                    <UserList.item/>
                    <UserList.item/>
                </UserList.container>
                <div className="chatPanel">
                    <div className="header">
                        <div>
                            <img src={ require('../image/avatar.gif') }/>
                            <p>碎碎酱</p>
                        </div>
                        <div>
                            <div>
                                <i className="icon">&#xe603;</i>
                            </div>
                            <div>
                                <i className="icon">&#xe603;</i>
                            </div>
                            <div>
                                <i className="icon">&#xe603;</i>
                            </div>
                        </div>
                    </div>
                    <div className="content">
                        <div className="message">
                            <img src={ require('../image/avatar.gif') }/>
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
                        <div className="message message-other">
                            <img src={ require('../image/avatar.gif') }/>
                            <div>
                                <div>
                                    <span>碎碎酱</span>
                                    <span>12:34</span>
                                </div>
                                <div>
                                    以上现象是由于字体图标存在半个像素的锯齿，在浏览器渲染的时候直接显示一个像素了，导致在有背景下的图标显示感觉加粗；所以在应用字体图标的时候需要对图标样式进行抗锯齿处理，CSS代码设置如下：
                                </div>
                            </div>
                        </div>
                        <div className="message">
                            <img src={ require('../image/avatar.gif') }/>
                            <div>
                                <div className="nick">
                                    <span>碎碎酱</span>
                                    <span>12:34</span>
                                </div>
                                <div>
                                    Note that it's partie
                                </div>
                            </div>
                        </div>
                        <div className="message message-other">
                            <img src={ require('../image/avatar.gif') }/>
                            <div>
                                <div>
                                    <span>碎碎酱</span>
                                    <span>12:34</span>
                                </div>
                                <div>
                                    Note that it's partie
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="input"></div>
                </div>
            </div>
        );
    }
}

export default Body;