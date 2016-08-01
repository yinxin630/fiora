import React from 'react';
import '../style/chatPanelHeader.scss';

import { connect } from 'react-redux';
import ui from '../action/ui';

class ChatPanelHeader extends React.Component {
    render () {
        return (
            <div className="chat-panel-header">
                <div>
                    <img src={ require('../image/avatar.gif') }/>
                    <p>碎碎酱</p>
                </div>
                <div>
                    <div>
                        <i 
                            className="icon"
                            onClick={ this.props.openGroupNotice }
                        >&#xe60a;</i>
                    </div>
                    <div>
                        <i 
                            className="icon"
                            onClick={ this.props.openGroupSetting }
                        >&#xe609;</i>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(
    state => ({}),
    () => ({
        openGroupSetting: ui.openGroupSetting,
        openGroupNotice: ui.openGroupNotice,
    })
)(ChatPanelHeader);