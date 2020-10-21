/** 内存数据存储键值 */
export enum MemoryDataStorageKey {
    /** 封禁用户列表 */
    'SealUserList',
    /** 封禁ip列表 */
    'SealIpList',
    /** 新注册用户列表 */
    'NewUserList',
    /** 最近新注册用户的ip */
    'NewRegisterUserIp',
}

interface MemoryData {
    [MemoryDataStorageKey.SealUserList]: Set<string>;
    [MemoryDataStorageKey.SealIpList]: Set<string>;
    [MemoryDataStorageKey.NewUserList]: Set<string>;
    [MemoryDataStorageKey.NewRegisterUserIp]: Set<string>;
}
/** 内存数据 */
const memoryData: MemoryData = {
    [MemoryDataStorageKey.SealUserList]: new Set(),
    [MemoryDataStorageKey.SealIpList]: new Set(),
    [MemoryDataStorageKey.NewUserList]: new Set(),
    [MemoryDataStorageKey.NewRegisterUserIp]: new Set(),
};

/**
 * 想指定键值添加数据
 * @param key 键值
 * @param value 要添加的值
 */
export function addMemoryData(key: MemoryDataStorageKey, value: string) {
    if (value) {
        const set = memoryData[key];
        set.add(value);
    }
}

/**
 * 获取指定键值数据
 * @param key 键值
 */
export function getMemoryData(key: MemoryDataStorageKey) {
    return memoryData[key];
}

/**
 * 判断指定键值数据中是否存在目标值
 * @param key 键值
 * @param value 要判断的值
 */
export function existMemoryData(key: MemoryDataStorageKey, value: string) {
    const set = memoryData[key];
    return set.has(value);
}

/**
 * 删除指定键值数据中的目标值
 * @param key 键值
 * @param value 要删除的值
 */
export function deleteMemoryData(key: MemoryDataStorageKey, value: string) {
    if (value) {
        const set = memoryData[key];
        addMemoryData(MemoryDataStorageKey.NewUserList, '');
        set.delete(value);
    }
}

/**
 * Clear the memory data of the specified key
 * @param key
 */
export function clearMemoryData(key: MemoryDataStorageKey) {
    memoryData[key] = new Set();
}
