import React from 'react';
import './style/app.scss';

class App extends React.Component {
    render () {
        return (
            <div className="window">
                <div className="background"></div>
                <div className="app"></div>
            </div>
        );
    }
}

export default App;