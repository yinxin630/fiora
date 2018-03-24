import React from 'react';
import PropTypes from 'prop-types';
import '../styles/hello.less';

export default function Hello({ is }) {
    return (
        <div>
            <span style={{ color: is ? 'red' : 'yellow' }}>Hello</span>
        </div>
    );
}

Hello.propTypes = {
    is: PropTypes.bool.isRequired,
};
