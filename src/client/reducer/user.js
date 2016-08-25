import immutable from 'immutable';

const initialState = immutable.fromJS({

});

function reducer( state = initialState, action ) {
    switch (action.type) {
        case 'LoginSuccess': {
            let linkmans = [];
            for (let group of action.user.groups) {
                group.type = 'group';
                linkmans.push(group);
            }
            for (let friend of action.user.friends) {
                friend.type = 'friend';
                linkmans.push(friend);
            }
            linkmans.sort((a, b) => {
                let lastMessageTimeOfA = a.messages.length === 0 ? a.createTime : a.messages[a.messages.length - 1].createTime;
                let lastMessageTimeOfB = b.messages.length === 0 ? b.createTime : b.messages[b.messages.length - 1].createTime;
                return lastMessageTimeOfA - lastMessageTimeOfB;
            });
            action.user.linkmans = linkmans;

            return immutable.fromJS({
                createTime: action.user.createTime,
                updateTime: action.user.updateTime,
                username: action.user.username,
                avatar: action.user.avatar,
                gender: action.user.gender,
                birthday: action.user.birthday,
                introduce: action.user.introduce,
                linkmans: action.user.linkmans
            });
        }
        case 'createGroup': {
            return state;
        }

        default: 
            return state;
    }
}

export default reducer;