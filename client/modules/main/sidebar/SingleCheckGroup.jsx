import React, { Component } from 'react';
import PropTypes from 'prop-types';

class SingleCheckGroup extends Component {
    static propTypes = {
        children: PropTypes.arrayOf(PropTypes.element),
        defaultFocus: PropTypes.string.isRequired,
    }
    constructor(props) {
        super(props);
        this.state = {
            focus: props.defaultFocus,
        };
    }
    changeFocus(focus) {
        this.setState({
            focus,
        });
    }
    render() {
        const { children } = this.props;
        const { focus } = this.state;
        return (
            <div className="module-main-sidebar-singleCheckGroup">
                {
                    children.map(button => React.cloneElement(button, {
                        focus: button.key === focus,
                        onClick: this.changeFocus.bind(this, button.key),
                    }))
                }
            </div>
        );
    }
}

export default SingleCheckGroup;
