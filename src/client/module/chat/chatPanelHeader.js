import React, { PropTypes } from 'react';
import pureRenderMixin from 'react-addons-pure-render-mixin';

import './style/chatPanelHeader.scss';

import ui from '../../action/ui';
import mask from '../../util/mask';

class ChatPanelHeader extends React.Component {
    static propTypes = {
        avatar: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
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
        ui.openGroupSetting();
        mask(ui.closeGroupSetting);
    }

    render() {
        const { avatar, name } = this.props;

        return (
            <div className="chat-panel-header">
                <div>
                    <img src={avatar} />
                    <p>{ name }</p>
                </div>
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
            </div>
        );
    }
}

export default ChatPanelHeader;
