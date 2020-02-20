import randomColor from 'randomcolor';

/**
 * 获取随机颜色, 刷新页面不变
 * @param seed when passed will cause randomColor to return the same color each time
 */
export function getRandomColor(seed: string, luminosity = 'dark') {
    return randomColor({
        luminosity,
        seed,
    });
}

const cache = {};
/**
 * 获取随机颜色, 刷新页面后重新随机
 * @param seed 随机种子
 * @param luminosity 亮度
 */
export function getPerRandomColor(seed: string, luminosity = 'dark') {
    if (cache[seed]) {
        return cache[seed];
    }
    cache[seed] = randomColor({ luminosity });
    return cache[seed];
}
