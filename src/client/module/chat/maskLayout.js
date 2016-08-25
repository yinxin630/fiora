import React from 'react';
import './style/maskLayout.scss';

import { connect } from 'react-redux';

class MaskLayout extends React.Component {
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