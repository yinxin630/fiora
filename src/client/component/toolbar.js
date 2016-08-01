import React from 'react';
import '../style/toolbar.scss';

class Toolbar extends React.Component {
    render () {
        return (
            <div className="toolbar">
                <div>
                    <i className="icon">&#xe604;</i>
                </div>
                <div>
                    <i className="icon">&#xe605;</i>
                </div>
                <div>
                    <i className="icon">&#xe602;</i>
                </div>
            </div>
        );
    }
}

export default Toolbar;