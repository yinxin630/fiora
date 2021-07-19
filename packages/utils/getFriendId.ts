/**
 * Combina two users id as frind id
 * The result has nothing to do with the order of the parameters
 * @param userId1 user id
 * @param userId2 user id
 */
export default function getFriendId(userId1: string, userId2: string) {
    if (userId1 < userId2) {
        return userId1 + userId2;
    }
    return userId2 + userId1;
}
