/** 内存数据存储键值 */
export enum MemoryDataStorageKey {
    /** 封禁用户列表 */
    'SealList',
    /** 新注册用户列表 */
    'NewUserList',
}

/** 内存数据 */
const memoryData: Map<MemoryDataStorageKey, Set<string>> = new Map();

/**
 * 更新指定键值数据
 * @param key 键值
 * @param set 新值
 */
export function setMemoryData(key: MemoryDataStorageKey, set: Set<string>) {
    memoryData.set(key, set);
}

/**
 * 想指定键值添加数据
 * @param key 键值
 * @param value 要添加的值
 */
export function addMemoryData(key: MemoryDataStorageKey, value: string) {
    if (value) {
        const set = memoryData.get(key);
        set.add(value);
    }
}

/**
 * 获取指定键值数据
 * @param key 键值
 */
export function getMemoryData(key: MemoryDataStorageKey) {
    return memoryData.get(key);
}

/**
 * 判断指定键值数据中是否存在目标值
 * @param key 键值
 * @param value 要判断的值
 */
export function existMemoryData(key: MemoryDataStorageKey, value: string) {
    return memoryData.get(key).has(value);
}

/**
 * 删除指定键值数据中的目标值
 * @param key 键值
 * @param value 要删除的值
 */
export function deleteMemoryData(key: MemoryDataStorageKey, value: string) {
    if (value) {
        const set = memoryData.get(key);
        set.delete(value);
    }
}

setMemoryData(MemoryDataStorageKey.SealList, new Set());
setMemoryData(MemoryDataStorageKey.NewUserList, new Set());
