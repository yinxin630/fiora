import React from 'react';
import './style/app.scss';

import Header from './component/header';
import Body from './component/body';

class App extends React.Component {
    render () {
        return (
            <div className="window">
                <div className="background"></div>
                <div className="app">
                    <Header/>
                    <Body/>
                </div>
            </div>
        );
    }
}

export default App;