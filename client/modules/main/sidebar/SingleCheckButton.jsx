import React, { Component } from 'react';
import PropTypes from 'prop-types';

class SingleCheckButton extends Component {
    static propTypes = {
        focus: PropTypes.bool,
        icon: PropTypes.string.isRequired,
        onClick: PropTypes.func,
    }
    static defaultProps = {
        focus: false,
    }
    shouldComponentUpdate(nextProps) {
        return !(
            this.props.focus === nextProps.focus &&
            this.props.icon === nextProps.icon
        );
    }
    render() {
        const { focus, icon, onClick } = this.props;
        return (
            <div
                className={`module-main-sidebar-singleCheckButton ${focus ? 'focus' : ''}`}
                onClick={onClick}
            >
                <i className={`iconfont icon-${icon}`} />
                {
                    focus ? <div className="line" /> : null
                }
            </div>
        );
    }
}

export default SingleCheckButton;
