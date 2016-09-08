import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import pureRenderMixin from 'react-addons-pure-render-mixin';

import InputForm from './inputForm';
import ui from '../../action/ui';
import user from '../../action/user';

class AddGroup extends React.Component {
    static propTypes = {
        show: PropTypes.bool.isRequired,
    };

    static contextTypes = {
        router: React.PropTypes.object.isRequired,
    }

    constructor(props) {
        super(props);
        this.shouldComponentUpdate = pureRenderMixin.shouldComponentUpdate.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(groupName) {
        user.joinGroup(groupName).then(response => {
            console.log(response);
            if (response.status === 201) {
                ui.closeAddGroupInput();
                ui.closeMaskLayout();
                this.context.router.push('/chat/body');
            }
        });
    }

    handleClose() {
        ui.closeAddGroupInput();
        ui.closeMaskLayout();
    }

    render() {
        const { show } = this.props;

        return (
            <InputForm
                show={show}
                title="请输入群组名"
                onClick={this.handleClick}
                onClose={this.handleClose}
            />
        );
    }
}

export default connect(
    state => ({
        show: state.getIn(['ui', 'showAddGroupInput']),
    })
)(AddGroup);
