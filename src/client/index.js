import React from 'react';
import ReactDom from 'react-dom';

class Hello extends React.Component {
    render () {
        return (
            <div>hello</div>
        );
    }
}

ReactDom.render(
    <Hello/>,
    document.querySelector('#app')
);