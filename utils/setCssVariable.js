export default function setCssVariable(color, textColor) {
    let cssText = '';
    for (let i = 0; i <= 10; i++) {
        cssText += `--primary-color-${i}:rgba(${color}, ${i / 10});--primary-color-${i}_5:rgba(${color}, ${(i + 0.5) / 10});--primary-text-color-${i}:rgba(${textColor}, ${i / 10});`;
    }
    document.documentElement.style.cssText += cssText;
}
