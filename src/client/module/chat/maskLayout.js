import React from 'react';
import './style/maskLayout.scss';

import pureRenderMixin from 'react-addons-pure-render-mixin';
import { connect } from 'react-redux';

class MaskLayout extends React.Component {
    constructor(props) {
        super(props);
        this.shouldComponentUpdate = pureRenderMixin.shouldComponentUpdate.bind(this);
    }

    render () {
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
        show: state.getIn(['ui', 'showMaskLayout'])
    })
)(MaskLayout);