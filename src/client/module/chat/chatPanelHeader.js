import React from 'react';
import './style/chatPanelHeader.scss';

import { connect } from 'react-redux';
import ui from '../../action/ui';
import mask from '../../util/mask';

class ChatPanelHeader extends React.Component {
    constructor (props) {
        super(props);
        this.onGroupNoticeClick = this.onGroupNoticeClick.bind(this);
        this.onGroupSettingClick = this.onGroupSettingClick.bind(this);
    }

    render () {
        return (
            <div className="chat-panel-header">
                <div>
                    <img src={ require('../../image/avatar.gif') }/>
                    <p>碎碎酱</p>
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

export default connect(
    state => ({})
)(ChatPanelHeader);