module.exports = function (user) {
    return {
        createTime: user.createTime,
        updateTime: user.updateTime,
        username: user.username,
        avatar: user.avatar,
        gender: user.gender,
        birthday: user.birthday,
        introduce: user.introduce,
        friends: user.friends,
        groups: user.groups
    };
} 