/** 内存数据存储键值 */
export enum MemoryDataStorageKey {
    /** 封禁用户列表 */
    'SealUserList',
    /** 封禁ip列表 */
    'SealIpList',
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
        if (set) {
            set.add(value);
        }
    }
}

/**
 * 获取指定键值数据
 * @param key 键值
 */
export function getMemoryData(key: MemoryDataStorageKey) {
    return memoryData.get(key) || new Set();
}

/**
 * 判断指定键值数据中是否存在目标值
 * @param key 键值
 * @param value 要判断的值
 */
export function existMemoryData(key: MemoryDataStorageKey, value: string) {
    const set = memoryData.get(key);
    return set ? set.has(value) : false;
}

/**
 * 删除指定键值数据中的目标值
 * @param key 键值
 * @param value 要删除的值
 */
export function deleteMemoryData(key: MemoryDataStorageKey, value: string) {
    if (value) {
        const set = memoryData.get(key);
        if (set) {
            set.delete(value);
        }
    }
}

// 自动初始化各个 key 的 value
Object.keys(MemoryDataStorageKey).forEach((key) => {
    const id = parseInt(key, 10);
    if (!Number.isNaN(id)) {
        setMemoryData(id as unknown as MemoryDataStorageKey, new Set());
    }
});
