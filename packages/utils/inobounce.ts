/**
 * 阻止目标元素下不必要的滚动事件. 解决ios橡皮筋效果问题
 * @param {HTMLElement} targetElement 目标元素
 */
export default function inobounce(targetElement: HTMLElement) {
    let startX = 0;
    let startY = 0;

    function handleTouchStart(e: any) {
        startY = e.touches ? e.touches[0].screenY : e.screenY;
        startX = e.touches ? e.touches[0].screenX : e.screenX;
    }
    function handleTouchMove(e: any) {
        let el = e.target;

        while (el !== e.currentTarget) {
            const style = window.getComputedStyle(el);

            if (!style) {
                break;
            }

            if (el.nodeName === 'INPUT' && el.getAttribute('type') === 'range') {
                return;
            }

            const overflowY = style.getPropertyValue('overflow-y');
            const height = +parseFloat(style.getPropertyValue('height')).toFixed(0);
            const isScrollableY = overflowY === 'auto' || overflowY === 'scroll';
            const canScrollY = el.scrollHeight > el.offsetHeight;
            if (isScrollableY && canScrollY) {
                const curY = e.touches ? e.touches[0].screenY : e.screenY;
                const isAtTop = (startY <= curY && el.scrollTop === 0);
                const isAtBottom = (startY >= curY && el.scrollHeight - el.scrollTop === height);

                if (isAtTop || isAtBottom) {
                    e.preventDefault();
                }
                return;
            }

            const overflowX = style.getPropertyValue('overflow-x');
            const width = +parseFloat(style.getPropertyValue('width')).toFixed(0);
            const isScrollableX = overflowX === 'auto' || overflowX === 'scroll';
            const canScrollX = el.scrollWidth > el.offsetWidth;
            if (isScrollableX && canScrollX) {
                const curX = e.touches ? e.touches[0].screenX : e.screenX;
                const isAtLeft = (startX <= curX && el.scrollLeft === 0);
                const isAtRight = (startX >= curX && el.scrollWidth - el.scrollLeft === width);

                if (isAtLeft || isAtRight) {
                    e.preventDefault();
                }
                return;
            }

            el = el.parentNode;
        }

        e.preventDefault();
    }

    if (targetElement) {
        targetElement.addEventListener('touchstart', handleTouchStart);
        targetElement.addEventListener('touchmove', handleTouchMove);
    }
}
