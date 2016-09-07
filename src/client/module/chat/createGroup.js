import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import pureRenderMixin from 'react-addons-pure-render-mixin';

import InputForm from './inputForm';
import ui from '../../action/ui';
import user from '../../action/user';

class CreateGroup extends React.Component {
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

    handleClick(text) {
        user.createGroup(text).then(response => {
            if (response.status === 201) {
                ui.closeCreateGroupInput();
                ui.closeMaskLayout();
                this.context.router.push('/chat/body');
            }
        });
    }

    render() {
        const { show } = this.props;

        return (
            <InputForm
                show={show}
                title="请输入群组名"
                onClick={this.handleClick}
            />
        );
    }
}

export default connect(
    state => ({
        show: state.getIn(['ui', 'showCreateGroupInput']),
    })
)(CreateGroup);
