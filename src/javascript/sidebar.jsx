'use strict'

const React = require('react');

export default class Sidebar extends React.Component {
    render () {
        return (
            <div style={{
                backgroundColor: 'aquamarine',
                width: '100px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}>
                { this.props.children }
            </div>
        );
    }
}