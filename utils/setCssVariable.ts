/**
 * set global css variable
 * @param color primary color, three numbers split with comma, like 255,255,255
 * @param textColor text colore, format like color
 */
export default function setCssVariable(color: string, textColor: string) {
    let cssText = '';
    for (let i = 0; i <= 10; i++) {
        cssText += `--primary-color-${i}:rgba(${color}, ${i / 10});--primary-color-${i}_5:rgba(${color}, ${(i + 0.5) / 10});--primary-text-color-${i}:rgba(${textColor}, ${i / 10});`;
    }
    document.documentElement.style.cssText += cssText;
}
