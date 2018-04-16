import React, { Component } from 'react';

import Dialog from '@/components/Dialog';

class GroupInfo extends Component {
    render() {
        return (
            <Dialog className="group-info" {...this.props}>
                <div>
                    GroupInfo
                </div>
            </Dialog>
        );
    }
}

export default GroupInfo;
