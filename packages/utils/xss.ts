import xss from 'xss';

/**
 * xss防护
 * @param text 要处理的文字
 */
export default function processXss(text: string) {
    return xss(text);
}
