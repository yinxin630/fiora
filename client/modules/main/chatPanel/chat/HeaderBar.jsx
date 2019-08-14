import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import immutable from 'immutable';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import IconButton from '@/components/IconButton';
import Message from '@/components/Message';
import { isMobile } from '../../../../../utils/ua';
import action from '../../../../state/action';

class HeaderBar extends Component {
    static handleShareGroup() {
        Message.success('已复制邀请信息到粘贴板, 去邀请其它人加群吧');
    }
    static propTypes = {
        linkmanType: PropTypes.string,
        linkmanName: PropTypes.string,
        onShowInfo: PropTypes.func,
        isLogin: PropTypes.bool.isRequired,
        sideInfoVisible: PropTypes.bool,
        connect: PropTypes.bool,
    }
    render() {
        const { linkmanType, linkmanName, onShowInfo, isLogin, sideInfoVisible, connect: connectStatus } = this.props;
        if (!linkmanName) {
            return <div />;
        }
        return (
            <div className="chat-headerBar">
                { isMobile &&
                    <div>
                        <IconButton width={40} height={40} icon="feature" iconSize={24} onClick={() => action.toggleSideInfo(!sideInfoVisible)} />
                        <IconButton width={40} height={40} icon="friends" iconSize={24} onClick={() => action.toggleFeaturePanel(true)} />
                    </div>
                }
                <h2>{linkmanName}</h2>
                {
                    <div style={{ visibility: isLogin ? 'visible' : 'hidden' }}>
                        {
                            linkmanType === 'group' ?
                                <CopyToClipboard text={`invite::${linkmanName}`}>
                                    <IconButton width={40} height={40} icon="share" iconSize={24} onClick={HeaderBar.handleShareGroup} />
                                </CopyToClipboard>

                                :
                                null
                        }
                        <IconButton width={40} height={40} icon="gongneng" iconSize={24} onClick={onShowInfo} />
                    </div>
                }
                {isMobile &&
                    <span className="status">
                        <div className={connectStatus ? 'online' : 'offline'} />
                        {connectStatus ? '在线' : '离线'}
                    </span>
                }
            </div>
        );
    }
}

export default connect((state) => {
    const focus = state.get('focus');
    const linkmans = state.getIn(['user', 'linkmans']) || immutable.fromJS([]);
    const linkman = linkmans.find(l => l.get('_id') === focus);
    return {
        isLogin: !!state.getIn(['user', '_id']),
        linkmanType: linkman && linkman.get('type'),
        linkmanName: linkman && linkman.get('name'),
        sideInfoVisible: state.getIn(['ui', 'sideInfoVisible']),
        connect: state.get('connect'),
    };
})(HeaderBar);
