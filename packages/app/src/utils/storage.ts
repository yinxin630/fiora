import AsyncStorage from '@react-native-async-storage/async-storage';

export async function getStorageValue(key: string) {
    return AsyncStorage.getItem(key);
}

export async function setStorageValue(key: string, value: string) {
    return AsyncStorage.setItem(key, value);
}

export async function removeStorageValue(key: string) {
    return AsyncStorage.removeItem(key);
}
