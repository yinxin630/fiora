import React, { PropTypes } from 'react';
import pureRenderMixin from 'react-addons-pure-render-mixin';

import './chatPanelHeader.scss';

import ui from '../../../action/ui';
import user from '../../../action/user';
import mask from '../../../util/mask';
import Avatar from '../../../common/avatar';

class ChatPanelHeader extends React.Component {
    static propTypes = {
        avatar: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        type: PropTypes.string,
        linkmanId: PropTypes.string,
    };

    constructor(props) {
        super(props);
        this.shouldComponentUpdate = pureRenderMixin.shouldComponentUpdate.bind(this);
        this.onGroupNoticeClick = this.onGroupNoticeClick.bind(this);
        this.onGroupSettingClick = this.onGroupSettingClick.bind(this);
    }

    onGroupNoticeClick() {
        ui.openGroupNotice();
        mask(ui.closeGroupNotice);
    }

    onGroupSettingClick() {
        user.getGroupInfo(this.props.linkmanId);
        ui.openGroupSetting();
        mask(ui.closeGroupSetting);
    }

    render() {
        const { avatar, name, type } = this.props;

        return (
            <div className="chat-panel-header">
                <div>
                    <Avatar
                        width={40}
                        height={40}
                        avatar={avatar}
                        name={name}
                    />
                    <p>{ name }</p>
                </div>
                {
                    type === 'group' ?
                        <div>
                            <div>
                                <i
                                    className="icon"
                                    onClick={this.onGroupNoticeClick}
                                >&#xe60a;</i>
                            </div>
                            <div>
                                <i
                                    className="icon"
                                    onClick={this.onGroupSettingClick}
                                >&#xe609;</i>
                            </div>
                        </div>
                    :
                        null
                }
            </div>
        );
    }
}

export default ChatPanelHeader;
