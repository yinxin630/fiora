import React, { Component } from 'react';
import PropTypes from 'prop-types';

class LinkmanGroup extends Component {
    static propTypes = {
        children: PropTypes.arrayOf(PropTypes.element),
        defaultFocus: PropTypes.string,
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
            <div>
                {
                    children.map(linkman => React.cloneElement(linkman, {
                        focus: focus === linkman.key,
                        onClick: this.changeFocus.bind(this, linkman.key),
                    }))
                }
            </div>
        );
    }
}

export default LinkmanGroup;
