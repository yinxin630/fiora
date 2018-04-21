const huaji = {
    0: `${require('@/assets/images/huaji/0.jpg')}?width=250&height=250`,
    1: `${require('@/assets/images/huaji/1.gif')}?width=300&height=300`,
    2: `${require('@/assets/images/huaji/2.jpeg')}?width=245&height=206`,
    3: `${require('@/assets/images/huaji/3.jpeg')}?width=225&height=225`,
    4: `${require('@/assets/images/huaji/4.jpeg')}?width=224&height=225`,
    5: `${require('@/assets/images/huaji/5.jpg')}?width=400&height=400`,
    6: `${require('@/assets/images/huaji/6.jpeg')}?width=284&height=177`,
    7: `${require('@/assets/images/huaji/7.jpg')}?width=300&height=300`,
    8: `${require('@/assets/images/huaji/8.jpeg')}?width=225&height=225`,
    9: `${require('@/assets/images/huaji/9.jpeg')}?width=204&height=247`,
    10: `${require('@/assets/images/huaji/10.jpeg')}?width=223&height=226`,
    11: `${require('@/assets/images/huaji/11.jpeg')}?width=198&height=255`,
    12: `${require('@/assets/images/huaji/12.jpeg')}?width=212&height=237`,
    13: `${require('@/assets/images/huaji/13.jpeg')}?width=290&height=174`,
    14: `${require('@/assets/images/huaji/14.jpeg')}?width=224&height=224`,
    15: `${require('@/assets/images/huaji/15.jpeg')}?width=224&height=224`,
    16: `${require('@/assets/images/huaji/16.jpeg')}?width=225&height=225`,
    17: `${require('@/assets/images/huaji/17.jpeg')}?width=225&height=225`,
    18: `${require('@/assets/images/huaji/18.jpeg')}?width=224&height=224`,
    19: `${require('@/assets/images/huaji/19.jpeg')}?width=225&height=225`,
    20: `${require('@/assets/images/huaji/20.jpeg')}?width=225&height=225`,
    21: `${require('@/assets/images/huaji/21.jpeg')}?width=225&height=225`,
    22: `${require('@/assets/images/huaji/22.jpeg')}?width=245&height=206`,
    23: `${require('@/assets/images/huaji/23.jpeg')}?width=225&height=225`,
    24: `${require('@/assets/images/huaji/24.jpeg')}?width=225&height=225`,
    25: `${require('@/assets/images/huaji/25.png')}?width=225&height=225`,
    26: `${require('@/assets/images/huaji/26.jpeg')}?width=225&height=225`,
    27: `${require('@/assets/images/huaji/27.jpeg')}?width=180&height=180`,
    28: `${require('@/assets/images/huaji/28.jpeg')}?width=235&height=215`,
    29: `${require('@/assets/images/huaji/29.jpeg')}?width=278&height=182`,
    30: `${require('@/assets/images/huaji/30.jpeg')}?width=228&height=221`,
    31: `${require('@/assets/images/huaji/31.jpeg')}?width=239&height=211`,
};
const HuajiaCount = Object.keys(huaji).length;

export default function getRandomHuaji() {
    const number = Math.ceil(Math.random() * HuajiaCount);
    return huaji[number];
}
