export default function getFriendId(userId1: string, userId2: string) {
    if (userId1 < userId2) {
        return userId1 + userId2;
    }
    return userId2 + userId1;
}
