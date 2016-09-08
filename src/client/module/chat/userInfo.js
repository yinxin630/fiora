import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Motion, spring } from 'react-motion';
import moment from 'moment';
import pureRenderMixin from 'react-addons-pure-render-mixin';

import './style/userInfo.scss';

import ui from '../../action/ui';
import user from '../../action/user';
import Avatar from './avatar';

class UserInfo extends React.Component {
    static propTypes = {
        show: PropTypes.bool.isRequired,
        userInfo: PropTypes.object.isRequired,
    };

    static contextTypes = {
        router: React.PropTypes.object.isRequired,
    }

    constructor(props) {
        super(props);
        this.shouldComponentUpdate = pureRenderMixin.shouldComponentUpdate.bind(this);
        this.handleCloseClick = this.handleCloseClick.bind(this);
        this.handleSendMessageClick = this.handleSendMessageClick.bind(this);
    }

    handleCloseClick() {
        ui.closeUserInfo();
        ui.closeMaskLayout();
    }

    handleSendMessageClick() {
        user.addUserLinkman(this.props.userInfo);
    }

    render() {
        const { show, userInfo } = this.props;

        return (
            <Motion
                defaultStyle={{ scale: 0.4, opacity: 0 }}
                style={{ scale: spring(show ? 1 : 0.4), opacity: spring(show ? 1 : 0) }}
            >
            {
                ({ scale, opacity }) => (
                    <div
                        className="user-info"
                        style={{ opacity, transform: `scale(${scale})`, display: opacity === 0 ? 'none' : 'flex' }}
                    >
                        <div>
                            <span>用户信息</span>
                            <i
                                className="icon"
                                onClick={this.handleCloseClick}
                            >&#xe603;</i>
                        </div>
                        <div>
                            <div>
                                <div>
                                    <span>昵称: { userInfo.get('username') }</span>
                                    <span>性别: { userInfo.get('gender') === 'male' ? '男' : '女' }</span>
                                    <span>生日: { moment(userInfo.get('birthday')).format('YYYY MMMM Do h:mm') }</span>
                                </div>
                                <Avatar
                                    width={60}
                                    height={60}
                                    avatar={userInfo.get('avatar') || ''}
                                    name={userInfo.get('username') || ''}
                                />
                            </div>
                            <div>
                                <button
                                    onClick={this.handleSendMessageClick}
                                >发送消息</button>
                            </div>
                        </div>
                    </div>
                )
            }
            </Motion>
        );
    }
}

export default connect(
    state => ({
        show: state.getIn(['ui', 'showUserInfo']),
        userInfo: state.getIn(['ui', 'userInfoData']),
    })
)(UserInfo);
