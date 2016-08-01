import React from 'react';
import '../style/groupSetting.scss';

class GroupSetting extends React.Component {
    render () {
        return (
            <div className="group-info">
                <div>
                    <span>群名称：</span>
                    <span>Fiora</span>
                    <span>{ '< 修改' }</span>
                </div>
                <div>
                    <span>群主：</span>
                    <span>碎碎酱</span>
                </div>
                <div>
                    <span>群成员：</span>
                    <span>3人</span>
                </div>
                <div className="userList">
                    <div>
                        <img src={ require('../image/avatar.gif') }/>
                        <span>碎碎酱</span>
                    </div>
                    <div>
                        <img src={ require('../image/avatar.gif') }/>
                        <span>碎碎酱</span>
                    </div>
                </div>
            </div>
        );
    }
}

export default GroupSetting;