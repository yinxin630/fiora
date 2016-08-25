import React from 'react';
import './style/chatPanelHeader.scss';

import pureRenderMixin from 'react-addons-pure-render-mixin';
import { connect } from 'react-redux';
import ui from '../../action/ui';
import mask from '../../util/mask';

class ChatPanelHeader extends React.Component {
    constructor (props) {
        super(props);
        this.shouldComponentUpdate = pureRenderMixin.shouldComponentUpdate.bind(this);
        this.onGroupNoticeClick = this.onGroupNoticeClick.bind(this);
        this.onGroupSettingClick = this.onGroupSettingClick.bind(this);
    }

    render () {
        const { avatar, name } = this.props;

        return (
            <div className="chat-panel-header">
                <div>
                    <img src={ avatar }/>
                    <p>{ name }</p>
                </div>
                <div>
                    <div>
                        <i 
                            className="icon"
                            onClick={ this.onGroupNoticeClick }
                        >&#xe60a;</i>
                    </div>
                    <div>
                        <i 
                            className="icon"
                            onClick={ this.onGroupSettingClick }
                        >&#xe609;</i>
                    </div>
                </div>
            </div>
        );
    }

    onGroupNoticeClick () {
        ui.openGroupNotice();
        mask(ui.closeGroupNotice);
    }

    onGroupSettingClick () {
        ui.openGroupSetting();
        mask(ui.closeGroupSetting);
    }
}

export default ChatPanelHeader;