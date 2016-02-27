'use strict'

const React = require('react');

export default class ChatForm extends React.Component {
    render () {
        return (
            <div style={{
                flex: 1,
                borderBottom: '1px solid #e0e0e0',
                overflow: 'auto',
                paddingBottom: 10,
            }}>
                { this.props.children }
            </div>
        );
    }
}