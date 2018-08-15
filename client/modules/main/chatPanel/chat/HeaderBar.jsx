import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import immutable from 'immutable';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import IconButton from '@/components/IconButton';
import Message from '@/components/Message';

class HeaderBar extends Component {
    static handleShareGroup() {
        Message.success('已复制邀请信息到粘贴板, 去邀请其它人加群吧');
    }
    static propTypes = {
        linkmanType: PropTypes.string,
        linkmanName: PropTypes.string,
        onShowInfo: PropTypes.func,
        isLogin: PropTypes.bool.isRequired,
    }
    render() {
        const { linkmanType, linkmanName, onShowInfo, isLogin } = this.props;
        if (!linkmanName) {
            return <div />;
        }
        return (
            <div className="chat-headerBar">
                <h2>{linkmanName}</h2>
                {
                    isLogin ?
                        <div>
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
                        :
                        null
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
    };
})(HeaderBar);
