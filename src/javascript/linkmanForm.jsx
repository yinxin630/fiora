'use strict'

const React = require('react');

export default class Linkman extends React.Component {
    render () {
        return (
            <div style={{
                width: '220px',
                display: 'flex',
                flexDirection: 'column',
                borderCollapse: 'collapse',
            }}>
                { this.props.children }
            </div>
        );
    }
}