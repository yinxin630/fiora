type Huaji = {
    [key: number]: string;
};

const huaji: Huaji = {
    0: `${require('../client/assets/images/huaji/0.jpg')}?width=250&height=250&huaji=true`,
    1: `${require('../client/assets/images/huaji/1.gif')}?width=300&height=300&huaji=true`,
    2: `${require('../client/assets/images/huaji/2.jpeg')}?width=245&height=206&huaji=true`,
    3: `${require('../client/assets/images/huaji/3.jpeg')}?width=225&height=225&huaji=true`,
    4: `${require('../client/assets/images/huaji/4.jpeg')}?width=224&height=225&huaji=true`,
    5: `${require('../client/assets/images/huaji/5.jpg')}?width=200&height=200&huaji=true`,
    6: `${require('../client/assets/images/huaji/6.jpeg')}?width=284&height=177&huaji=true7`,
    7: `${require('../client/assets/images/huaji/7.jpg')}?width=300&height=300&huaji=true`,
    8: `${require('../client/assets/images/huaji/8.jpeg')}?width=225&height=225&huaji=true`,
    9: `${require('../client/assets/images/huaji/9.jpeg')}?width=204&height=247&huaji=true`,
    10: `${require('../client/assets/images/huaji/10.jpeg')}?width=223&height=226&huaji=true`,
    11: `${require('../client/assets/images/huaji/11.jpeg')}?width=198&height=255&huaji=true`,
    12: `${require('../client/assets/images/huaji/12.jpeg')}?width=212&height=237&huaji=true`,
    13: `${require('../client/assets/images/huaji/13.jpeg')}?width=290&height=174&huaji=true`,
    14: `${require('../client/assets/images/huaji/14.jpeg')}?width=224&height=224&huaji=true`,
    15: `${require('../client/assets/images/huaji/15.jpeg')}?width=224&height=224&huaji=true`,
    16: `${require('../client/assets/images/huaji/16.jpeg')}?width=225&height=225&huaji=true`,
    17: `${require('../client/assets/images/huaji/17.jpeg')}?width=225&height=225&huaji=true`,
    18: `${require('../client/assets/images/huaji/18.gif')}?width=100&height=110&huaji=true`,
    19: `${require('../client/assets/images/huaji/19.jpeg')}?width=225&height=225&huaji=true`,
    20: `${require('../client/assets/images/huaji/20.jpeg')}?width=225&height=225&huaji=true`,
    21: `${require('../client/assets/images/huaji/21.jpeg')}?width=225&height=225&huaji=true`,
    22: `${require('../client/assets/images/huaji/22.jpeg')}?width=245&height=206&huaji=true`,
    23: `${require('../client/assets/images/huaji/23.jpeg')}?width=225&height=225&huaji=true`,
    24: `${require('../client/assets/images/huaji/24.jpeg')}?width=225&height=225&huaji=true`,
    25: `${require('../client/assets/images/huaji/25.png')}?width=225&height=225&huaji=true`,
    26: `${require('../client/assets/images/huaji/26.jpeg')}?width=225&height=225&huaji=true`,
    27: `${require('../client/assets/images/huaji/27.jpeg')}?width=180&height=180&huaji=true`,
    28: `${require('../client/assets/images/huaji/28.jpeg')}?width=235&height=215&huaji=true`,
    29: `${require('../client/assets/images/huaji/29.jpeg')}?width=278&height=182&huaji=true`,
    30: `${require('../client/assets/images/huaji/30.jpeg')}?width=228&height=221&huaji=true`,
    31: `${require('../client/assets/images/huaji/31.jpeg')}?width=239&height=211&huaji=true`,
    32: `${require('../client/assets/images/huaji/32.jpg')}?width=220&height=220&huaji=true`,
    33: `${require('../client/assets/images/huaji/33.gif')}?width=220&height=220&huaji=true`,
    34: `${require('../client/assets/images/huaji/34.gif')}?width=164&height=192&huaji=true`,
    35: `${require('../client/assets/images/huaji/35.gif')}?width=130&height=62&huaji=true`,
    36: `${require('../client/assets/images/huaji/36.gif')}?width=187&height=144&huaji=true`,
};
const HuajiaCount = Object.keys(huaji).length;

export default function getRandomHuaji() {
    const number = Math.floor(Math.random() * HuajiaCount);
    return huaji[number];
}
