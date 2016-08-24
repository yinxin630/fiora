import React from 'react';
import './style/logo.scss';

class Logo extends React.Component {
    render () {
        return (
            <div className="logo">
                <img src={ require('../../image/logo.png') }/>
            </div>
        );
    }
}

export default Logo;