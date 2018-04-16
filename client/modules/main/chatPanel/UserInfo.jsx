import React, { Component } from 'react';

import Dialog from '@/components/Dialog';

class UserInfo extends Component {
    render() {
        return (
            <Dialog className="user-info" {...this.props}>
                <div>
                    UserInfo
                </div>
            </Dialog>
        );
    }
}

export default UserInfo;
