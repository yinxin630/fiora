import { getMemoryData, MemoryDataStorageKey, addMemoryData, existMemoryData, deleteMemoryData, clearMemoryData } from '../../server/memoryData';

describe('server/memoryData.ts', () => {
    beforeEach(() => {
        clearMemoryData(MemoryDataStorageKey.NewUserList);
    });

    it('should support crud operation', () => {
        const userList = getMemoryData(MemoryDataStorageKey.NewUserList);
        expect(userList).toHaveProperty('size', 0);

        addMemoryData(MemoryDataStorageKey.NewUserList, 'user1');
        addMemoryData(MemoryDataStorageKey.NewUserList, 'user2');
        expect(userList).toHaveProperty('size', 2);

        expect(existMemoryData(MemoryDataStorageKey.NewUserList, 'user1')).toBe(true);

        deleteMemoryData(MemoryDataStorageKey.NewUserList, 'user1');
        expect(userList).toHaveProperty('size', 1);
    });

    it('should ignore emtry value', () => {
        const userList = getMemoryData(MemoryDataStorageKey.NewUserList);
        addMemoryData(MemoryDataStorageKey.NewUserList, '');
        expect(userList).toHaveProperty('size', 0);

        addMemoryData(MemoryDataStorageKey.NewUserList, 'user1');
        deleteMemoryData(MemoryDataStorageKey.NewUserList, '');
        expect(userList).toHaveProperty('size', 1);
    });
});
