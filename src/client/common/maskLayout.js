import React, { PropTypes } from 'react';
import pureRenderMixin from 'react-addons-pure-render-mixin';
import { connect } from 'react-redux';

import './maskLayout.scss';

class MaskLayout extends React.Component {
    static propTypes = {
        show: PropTypes.bool.isRequired,
    };

    constructor(props) {
        super(props);
        this.shouldComponentUpdate = pureRenderMixin.shouldComponentUpdate.bind(this);
    }

    render() {
        return (
            <div
                className="mask-layout"
                id="maskLayout"
                style={{ display: this.props.show ? 'block' : 'none' }}
            />
        );
    }
}

export default connect(
    state => ({
        show: state.getIn(['ui', 'showMaskLayout']),
    })
)(MaskLayout);
