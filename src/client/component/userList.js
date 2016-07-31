import React from 'react';
import '../style/userList.scss';

class UserList extends React.Component {
    render () {
        return (
            <div className="user-list">
                { this.props.children }
            </div>
        );
    }
}

class User extends React.Component {
    render () {
        return (
            <div className="user-list-item">
                <img src={ require('../image/avatar.gif') }></img>
                <div>
                    <div>
                        <p>碎碎酱</p>
                        <p>12:34</p>
                    </div>
                    <div>
                        <p>我是一个老司机, 老啊老司机.我是一个老司机, 老啊老司机.</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default {
    container: UserList,
    item: User,
};