import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import pureRenderMixin from 'react-addons-pure-render-mixin';

import InputForm from './inputForm';

class AddGroup extends React.Component {
    static propTypes = {
        show: PropTypes.bool.isRequired,
    };

    constructor(props) {
        super(props);
        this.shouldComponentUpdate = pureRenderMixin.shouldComponentUpdate.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {

    }

    handleClose() {

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
