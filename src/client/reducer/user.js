import R from 'ramda';

function reducer(
    state = {

    }, 
    action
) {
    switch (action.type) {
        case 'LoginSuccess': {
            let newState = R.clone(state);
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

            return Object.assign(newState, action.user);
        }
        case 'createGroup': {
            let newState = R.clone(state);
            newState.groups.push(action.data);
            return newState;
        }

        default: 
            return state;
    }
}

export default reducer;