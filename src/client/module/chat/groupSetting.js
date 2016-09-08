import React, { PropTypes } from 'react';
import pureRenderMixin from 'react-addons-pure-render-mixin';
import { connect } from 'react-redux';

import './style/groupSetting.scss';

import ui from '../../action/ui';
import user from '../../action/user';
import FloatPanel from './floatPanel';
import Avatar from './avatar';

class GroupSetting extends React.Component {
    static propTypes = {
        show: PropTypes.bool.isRequired,
        creator: PropTypes.object,
        members: PropTypes.object.isRequired,
        linkmanId: PropTypes.string.isRequired,
    };

    constructor(props) {
        super(props);
        this.shouldComponentUpdate = pureRenderMixin.shouldComponentUpdate.bind(this);
        this.handleSelectImage = this.handleSelectImage.bind(this);
    }

    handleSelectImage() {
        const image = this.image.files[0];
        if (!image) {
            return;
        }

        const reader = new FileReader();
        const instance = this;
        reader.onloadend = function () {
            user.updateGroupAvatar(instance.props.linkmanId, this.result);
        };
        reader.readAsDataURL(image);
    }

    render() {
        const { show, creator, members } = this.props;
        return (
            <FloatPanel
                onClose={ui.closeGroupSetting}
                show={show}
                title="群设置"
            >
                <div className="group-info">
                    <div className="button">
                        <button
                            onClick={() => this.image.click()}
                        >修改群头像</button>
                    </div>
                    <div className="button">
                        <button>删除群</button>
                    </div>
                    <div className="content">
                        <span>群主：</span>
                        <span>{ creator ? creator.get('username') : '无' }</span>
                    </div>
                    <div className="content">
                        <span>群成员：</span>
                        <span>{ members.size }人</span>
                    </div>
                    <div className="userList">
                    {
                        members.map(member => (
                            <div
                                key={member.get('_id')}
                            >
                                <Avatar
                                    avatar={member.get('avatar')}
                                    name={member.get('username')}
                                    width={40}
                                    height={40}
                                />
                                <span>{ member.get('username') }</span>
                            </div>
                        ))
                    }
                    </div>
                    <input
                        type="file"
                        ref={image => this.image = image}
                        accept="image/*"
                        onChange={this.handleSelectImage}
                    />
                </div>
            </FloatPanel>
        );
    }
}

export default connect(
    state => ({
        show: state.getIn(['ui', 'showGroupSetting']),
    })
)(GroupSetting);
