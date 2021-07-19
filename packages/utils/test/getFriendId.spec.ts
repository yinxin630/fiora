import getFriendId from '../getFriendId';

describe('utils/getFriendId.ts', () => {
    it('should combina two users id as friend id', () => {
        const user1 = '111';
        const user2 = '222';
        expect(getFriendId(user1, user2)).toBe('111222');
        expect(getFriendId(user2, user1)).toBe('111222');
    });
});
