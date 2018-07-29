import React, { Component } from 'react';
import { connect } from 'react-redux';
import ImmutablePropTypes from 'react-immutable-proptypes';
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
        linkman: ImmutablePropTypes.map,
        onShowInfo: PropTypes.func,
        isLogin: PropTypes.bool.isRequired,
    }
    render() {
        const { linkman, onShowInfo, isLogin } = this.props;
        if (!linkman) {
            return <div />;
        }
        return (
            <div className="chat-headerBar">
                <h2>{linkman && linkman.get('name')}</h2>
                {
                    isLogin ?
                        <div>
                            {
                                linkman.get('type') === 'group' ?
                                    <CopyToClipboard text={`invite::${linkman.get('name')}`}>
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
        linkman,
    };
})(HeaderBar);
