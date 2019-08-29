import randomColor from 'randomcolor';

/**
 * 获取随机颜色
 * @param seed when passed will cause randomColor to return the same color each time
 */
export default function getRandomColor(seed: string | number, luminosity = 'dark') {
    return randomColor({
        luminosity,
        seed,
    });
}
