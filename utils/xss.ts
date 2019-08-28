import xss from 'xss';

const myXss = new xss.FilterXSS({
    whiteList: { },
});

/**
 * xss防护
 * @param text 要处理的文字
 */
export default function processXss(text: string) {
    return myXss.process(text);
}
