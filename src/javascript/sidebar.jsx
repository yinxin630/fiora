'use strict'

const React = require('react');

export default class Sidebar extends React.Component {
    render () {
        return (
            <div style={{
                width: '100px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                borderRight: '1px solid #e0e0e0',
            }}>
                { this.props.children }
            </div>
        );
    }
}