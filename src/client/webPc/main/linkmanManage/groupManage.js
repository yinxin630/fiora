import React from 'react';
import pureRenderMixin from 'react-addons-pure-render-mixin';

import './groupManage.scss';

import CreateGroup from './createGroup';
import AddGroup from './addGroup';
import ui from '../../../action/ui';
import mask from '../../../util/mask';

class GroupManage extends React.Component {
    constructor(props) {
        super(props);
        this.shouldComponentUpdate = pureRenderMixin.shouldComponentUpdate.bind(this);
        this.handleCreateGroupClick = this.handleCreateGroupClick.bind(this);
    }

    handleCreateGroupClick() {
        ui.openCreateGroupInput();
        mask(ui.closeCreateGroupInput);
    }

    handleAddGroupClick() {
        ui.openAddGroupInput();
        mask(ui.closeAddGroupInput);
    }

    render() {
        return (
            <div className="group-manage">
                <div
                    onClick={this.handleCreateGroupClick}
                >创建群组</div>
                <div
                    onClick={this.handleAddGroupClick}
                >加入群组</div>
                <CreateGroup />
                <AddGroup />
            </div>
        );
    }
}

export default GroupManage;
