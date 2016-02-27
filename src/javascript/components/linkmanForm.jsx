'use strict'

const React = require('react');

const BackgroundColor = '#FDFFFF';

export default class LinkmanForm extends React.Component {
    render () {
        return (
            <div style={{
                width: '220px',
                display: 'block',
                flexDirection: 'column',
                borderCollapse: 'collapse',
                borderRight: '1px solid #e0e0e0',
                backgroundColor: BackgroundColor,
                overflow: 'auto',
            }}>
                { this.props.children }
            </div>
        );
    }
}