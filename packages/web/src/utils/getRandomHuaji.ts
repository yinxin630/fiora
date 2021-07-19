import HuaJi0 from '@fiora/assets/images/huaji/0.jpg';
import HuaJi1 from '@fiora/assets/images/huaji/1.gif';
import HuaJi2 from '@fiora/assets/images/huaji/2.jpeg';
import HuaJi3 from '@fiora/assets/images/huaji/3.jpeg';
import HuaJi4 from '@fiora/assets/images/huaji/4.jpeg';
import HuaJi5 from '@fiora/assets/images/huaji/5.jpg';
import HuaJi6 from '@fiora/assets/images/huaji/6.jpeg';
import HuaJi7 from '@fiora/assets/images/huaji/7.jpg';
import HuaJi8 from '@fiora/assets/images/huaji/8.jpeg';
import HuaJi9 from '@fiora/assets/images/huaji/9.jpeg';
import HuaJi10 from '@fiora/assets/images/huaji/10.jpeg';
import HuaJi11 from '@fiora/assets/images/huaji/11.jpeg';
import HuaJi12 from '@fiora/assets/images/huaji/12.jpeg';
import HuaJi13 from '@fiora/assets/images/huaji/13.jpeg';
import HuaJi14 from '@fiora/assets/images/huaji/14.jpeg';
import HuaJi15 from '@fiora/assets/images/huaji/15.jpeg';
import HuaJi16 from '@fiora/assets/images/huaji/16.jpeg';
import HuaJi17 from '@fiora/assets/images/huaji/17.jpeg';
import HuaJi18 from '@fiora/assets/images/huaji/18.gif';
import HuaJi19 from '@fiora/assets/images/huaji/19.jpeg';
import HuaJi20 from '@fiora/assets/images/huaji/20.jpeg';
import HuaJi21 from '@fiora/assets/images/huaji/21.jpeg';
import HuaJi22 from '@fiora/assets/images/huaji/22.jpeg';
import HuaJi23 from '@fiora/assets/images/huaji/23.jpeg';
import HuaJi24 from '@fiora/assets/images/huaji/24.jpeg';
import HuaJi25 from '@fiora/assets/images/huaji/25.png';
import HuaJi26 from '@fiora/assets/images/huaji/26.jpeg';
import HuaJi27 from '@fiora/assets/images/huaji/27.jpeg';
import HuaJi28 from '@fiora/assets/images/huaji/28.jpeg';
import HuaJi29 from '@fiora/assets/images/huaji/29.jpeg';
import HuaJi30 from '@fiora/assets/images/huaji/30.jpeg';
import HuaJi31 from '@fiora/assets/images/huaji/31.jpeg';
import HuaJi32 from '@fiora/assets/images/huaji/32.jpg';
import HuaJi33 from '@fiora/assets/images/huaji/33.gif';
import HuaJi34 from '@fiora/assets/images/huaji/34.gif';
import HuaJi35 from '@fiora/assets/images/huaji/35.gif';
import HuaJi36 from '@fiora/assets/images/huaji/36.gif';

type Huaji = {
    [key: number]: string;
};

const huaji: Huaji = {
    0: `${HuaJi0}?width=250&height=250&huaji=true`,
    1: `${HuaJi1}?width=300&height=300&huaji=true`,
    2: `${HuaJi2}?width=245&height=206&huaji=true`,
    3: `${HuaJi3}?width=225&height=225&huaji=true`,
    4: `${HuaJi4}?width=224&height=225&huaji=true`,
    5: `${HuaJi5}?width=200&height=200&huaji=true`,
    6: `${HuaJi6}?width=284&height=177&huaji=true7`,
    7: `${HuaJi7}?width=300&height=300&huaji=true`,
    8: `${HuaJi8}?width=225&height=225&huaji=true`,
    9: `${HuaJi9}?width=204&height=247&huaji=true`,
    10: `${HuaJi10}?width=223&height=226&huaji=true`,
    11: `${HuaJi11}?width=198&height=255&huaji=true`,
    12: `${HuaJi12}?width=212&height=237&huaji=true`,
    13: `${HuaJi13}?width=290&height=174&huaji=true`,
    14: `${HuaJi14}?width=224&height=224&huaji=true`,
    15: `${HuaJi15}?width=224&height=224&huaji=true`,
    16: `${HuaJi16}?width=225&height=225&huaji=true`,
    17: `${HuaJi17}?width=225&height=225&huaji=true`,
    18: `${HuaJi18}?width=100&height=110&huaji=true`,
    19: `${HuaJi19}?width=225&height=225&huaji=true`,
    20: `${HuaJi20}?width=225&height=225&huaji=true`,
    21: `${HuaJi21}?width=225&height=225&huaji=true`,
    22: `${HuaJi22}?width=245&height=206&huaji=true`,
    23: `${HuaJi23}?width=225&height=225&huaji=true`,
    24: `${HuaJi24}?width=225&height=225&huaji=true`,
    25: `${HuaJi25}?width=225&height=225&huaji=true`,
    26: `${HuaJi26}?width=225&height=225&huaji=true`,
    27: `${HuaJi27}?width=180&height=180&huaji=true`,
    28: `${HuaJi28}?width=235&height=215&huaji=true`,
    29: `${HuaJi29}?width=278&height=182&huaji=true`,
    30: `${HuaJi30}?width=228&height=221&huaji=true`,
    31: `${HuaJi31}?width=239&height=211&huaji=true`,
    32: `${HuaJi32}?width=220&height=220&huaji=true`,
    33: `${HuaJi33}?width=220&height=220&huaji=true`,
    34: `${HuaJi34}?width=164&height=192&huaji=true`,
    35: `${HuaJi35}?width=130&height=62&huaji=true`,
    36: `${HuaJi36}?width=187&height=144&huaji=true`,
};
const HuajiaCount = Object.keys(huaji).length;

export default function getRandomHuaji() {
    const number = Math.floor(Math.random() * HuajiaCount);
    return huaji[number];
}
