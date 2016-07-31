import React from 'react';
import './style/app.scss';

import Header from './component/header';

class App extends React.Component {
    render () {
        return (
            <div className="window">
                <div className="background"></div>
                <div className="app">
                    <Header/>
                </div>
            </div>
        );
    }
}

export default App;