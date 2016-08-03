import React from 'react';
import './style/app.scss';

import Header from './component/header';
import Body from './component/body';
import MaskLayout from './component/maskLayout';

class App extends React.Component {
    render () {
        return (
            <div className="window">
                <div className="background"></div>
                <div className="app">
                    <Header/>
                    <Body/>
                    <MaskLayout/>
                </div>
            </div>
        );
    }
}

export default App;