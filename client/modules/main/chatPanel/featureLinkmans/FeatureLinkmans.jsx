import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import LinkmanGroup from './LinkmanGroup';
import Feature from './Feature';
import './FeatureLinkmans.less';
import action from '../../../../state/action';

class FeatureLinkmans extends Component {
    static propTypes = {
        isLogin: PropTypes.bool.isRequired,
    }
    handleClick = (e) => {
        if (e.target === e.currentTarget) {
            action.toggleFeaturePanel(false);
        }
    }
    render() {
        const { isLogin } = this.props;
        return (
            <div className="module-main-feature" onClick={this.handleClick}>
                <div className="container">
                    { isLogin ? <Feature /> : null}
                    <LinkmanGroup />
                </div>
            </div>
        );
    }
}

export default connect(state => ({
    isLogin: !!state.getIn(['user', '_id']),
}))(FeatureLinkmans);
