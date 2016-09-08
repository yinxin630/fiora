import immutable from 'immutable';

const initialState = immutable.fromJS({
    online: false,
});

function reducer(state = initialState, action) {
    switch (action.type) {
    case 'Online': {
        return state.set('online', true);
    }
    case 'Offline': {
        return state.set('online', false);
    }

    case 'LoginSuccess': {
        const linkmans = [];
        for (const group of action.user.groups) {
            group.type = 'group';
            group.unread = 0;
            linkmans.push(group);
        }
        for (const friend of action.user.friends) {
            friend.type = 'friend';
            friend.unread = 0;
            linkmans.push(friend);
        }
        linkmans.sort((a, b) => {
            const lastMessageTimeOfA = a.messages.length === 0 ? a.createTime : a.messages[a.messages.length - 1].createTime;
            const lastMessageTimeOfB = b.messages.length === 0 ? b.createTime : b.messages[b.messages.length - 1].createTime;
            return new Date(lastMessageTimeOfB).getTime() - new Date(lastMessageTimeOfA).getTime();
        });
        action.user.linkmans = linkmans;

        return state.merge({
            _id: action.user._id,
            createTime: action.user.createTime,
            updateTime: action.user.updateTime,
            username: action.user.username,
            avatar: action.user.avatar,
            gender: action.user.gender,
            birthday: action.user.birthday,
            introduce: action.user.introduce,
            linkmans: action.user.linkmans,
        });
    }
    case 'CreateGroup': {
        action.group.type = 'group';
        action.group.unread = 0;
        return state.update(
            'linkmans',
            linkmans => linkmans.unshift(immutable.fromJS(action.group))
        );
    }
    case 'JoinGroup': {
        action.group.type = 'group';
        action.group.unread = 0;
        return state.update(
            'linkmans',
            linkmans => linkmans.unshift(immutable.fromJS(action.group))
        );
    }
    case 'UpdateGroupAnnouncement': {
        return state.update(
            'linkmans',
            linkmans => linkmans.update(
                linkmans.findIndex(linkman => linkman.get('type') === 'group' && linkman.get('_id') === action.group._id),
                linkman => linkman.set('announcement', action.group.announcement).set('announcementPublisher', action.group.announcementPublisher).set('announcementTime', action.group.announcementTime)
            )
        );
    }
    case 'UpdateGroupAvatar': {
        return state.update(
            'linkmans',
            linkmans => linkmans.update(
                linkmans.findIndex(linkman => linkman.get('type') === 'group' && linkman.get('_id') === action.group._id),
                linkman => linkman.set('avatar', action.group.avatar)
            )
        );
    }

    case 'AddGroupMessage': {
        return state.updateIn(
            ['linkmans'],
            linkmans => {
                const groupIndex = linkmans.findIndex(g => g.get('type') === 'group' && g.get('_id') === action.message.to._id);
                const group = linkmans.get(groupIndex).updateIn(['messages'], m => m.push(immutable.fromJS(action.message))).update('unread', unread => unread + 1);
                return linkmans.delete(groupIndex).unshift(group);
            }
        );
    }
    case 'ClearUnread': {
        return state.update(
            'linkmans',
            linkmans => linkmans.update(
                linkmans.findIndex(linkman => linkman.get('type') === action.linkmanType && linkman.get('_id') === action.linkmanId),
                linkman => linkman.set('unread', 0)
            )
        );
    }
    case 'UpdateAvatar': {
        return state.set('avatar', action.user.avatar);
    }

    default:
        return state;
    }
}

export default reducer;
