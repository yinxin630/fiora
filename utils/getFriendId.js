module.exports = function getFriendId(userId1, userId2) {
    if (userId1 < userId2) {
        return userId1 + userId2;
    }
    return userId2 + userId1;
};
