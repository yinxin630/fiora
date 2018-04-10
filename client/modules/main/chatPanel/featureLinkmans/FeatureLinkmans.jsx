import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import LinkmanGroup from './LinkmanGroup';
import Feature from './Feature';
import './FeatureLinkmans.less';

class FeatureLinkmans extends Component {
    static propTypes = {
        isLogin: PropTypes.bool.isRequired,
    }
    render() {
        const { isLogin } = this.props;
        return (
            <div className="module-main-feature">
                { isLogin ? <Feature /> : null}
                <LinkmanGroup />
            </div>
        );
    }
}

export default connect(state => ({
    isLogin: !!state.getIn(['user', '_id']),
}))(FeatureLinkmans);
