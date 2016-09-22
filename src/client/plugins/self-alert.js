import $ from 'jquery';
import api from '../api.js';

window.$ = $;

// Preserve the original jQuery "swing" easing as "jswing"
$.easing.jswing = $.easing.swing;

const pow = Math.pow;
const sqrt = Math.sqrt;
const sin = Math.sin;
const cos = Math.cos;
const PI = Math.PI;
const c1 = 1.70158;
const c2 = c1 * 1.525;
const c3 = c1 + 1;
const c4 = (2 * PI) / 3;
const c5 = (2 * PI) / 4.5;

// x is the fraction of animation progress, in the range 0..1
function bounceOut(x) {
    const n1 = 7.5625;
    const d1 = 2.75;
    if (x < 1 / d1) {
        return n1 * x * x;
    } else if (x < 2 / d1) {
        return (n1 * (x -= (1.5 / d1)) * x) + 0.75;
    } else if (x < 2.5 / d1) {
        return (n1 * (x -= (2.25 / d1)) * x) + 0.9375;
    } else {
        return (n1 * (x -= (2.625 / d1)) * x) + 0.984375;
    }
}

$.fn.explode = function ({
        minWidth = 1,
        maxWidth,
        omitLastLine = true,
    }) {
    const $target = this;
    const w = $target.width();
    const h = $target.height();
    const minorDimension = Math.min(w, h);
    const backgroundImage = $target.attr('src');
    if (!maxWidth) {
        maxWidth = minorDimension / 2;
    }
    const $wrapper = $('<div></div>', {
        class: 'explode-wrapper',
    });
    const syncStyles = ['width', 'height', 'margin-top', 'margin-right', 'margin-bottom', 'margin-left', 'position', 'top', 'right', 'bottom', 'left'];
    syncStyles.forEach((v) => {
        $wrapper.css(v, $target.css(v));
    });
        //        $wrapper.css("background-color", "black");
    if ($wrapper.css('position') === 'static') {
        $wrapper.css('position', 'relative');
    }

    this.replaceWith($wrapper);

    function random(min, max) {
        max++;
        return parseInt(Math.random() * (max - min), 10) + min;
    }
    window.random = random;

    function generateRags() {
        let rowCnt;
        if (omitLastLine) {
            rowCnt = Math.floor(h / maxWidth);
        } else {
            rowCnt = Math.ceil(h / maxWidth);
        }
        let value;

        const ret = [];
        for (let row = 0; row < rowCnt; row++) {
            let rowSum = 0;
            let column = 0;
            do {
                if (value) {
                    rowSum += value;
                    if (ret[row] === undefined) {
                        ret[row] = [];
                    }
                    ret[row][column] = value;
                    column++;
                }
                value = random(minWidth, maxWidth);
            } while (w > rowSum + value);
            ret[row][column] = w - rowSum;
        }


        return ret;
    }
    const ragMap = generateRags();
    let ragTop = 0;
    const rags = [];
    ragMap.forEach((v) => {
        let left = 0;
        v.forEach((u) => {
            const $dom = $('<div></div>', {});
            $dom.css({
                width: u,
                height: u,
                position: 'absolute',
                left,
                top: ragTop,
                'background-image': `url("${backgroundImage}")`,
                'background-size': `${w}px ${h}px`,
                'background-position': `${-left}px ${-ragTop}px`,
            });
            rags.push({
                $dom,
                left,
                top: ragTop,
                width: u,
            });
            left += u;
            $wrapper.append($dom);
        });
        ragTop += maxWidth;
    });
    const centerX = w / 2;
    const centerY = h / 2;
    rags.forEach((v) => {
        v.$dom.css('transition', '0.3s all ease-out');

        const rand1 = (Math.random() + 2) * v.width;
        const degMax = 720;
        const rand2 = (((Math.random() * degMax) - (degMax / 2)) / ((Math.random() + 2) * v.width)) * 10;
            //            rand=Math.max(rand,3)
        const ratio = 8 / rand1;
        setTimeout(() => {
            v.$dom.css('transform', `translate(${(v.left - centerX) * ratio}px,${((v.top - centerY) + maxWidth) * ratio}px) rotate(${rand2}deg)`);
        });
        setTimeout(() => {
            v.$dom.fadeOut({
                done: function () {
                    v.$dom.remove();
                },
            });
        }, 3000 / ratio);
    });
};

$.extend($.easing, {
    def: 'easeOutQuad',
    swing: function (x) {
        return $.easing[$.easing.def](x);
    },
    easeInQuad: function (x) {
        return x * x;
    },
    easeOutQuad: function (x) {
        return 1 - ((1 - x) * (1 - x));
    },
    easeInOutQuad: function (x) {
        return x < 0.5 ?
            2 * x * x :
            1 - (pow((-2 * x) + 2, 2) / 2);
    },
    easeInCubic: function (x) {
        return x * x * x;
    },
    easeOutCubic: function (x) {
        return 1 - pow(1 - x, 3);
    },
    easeInOutCubic: function (x) {
        return x < 0.5 ?
            4 * x * x * x :
            1 - (pow((-2 * x) + 2, 3) / 2);
    },
    easeInQuart: function (x) {
        return x * x * x * x;
    },
    easeOutQuart: function (x) {
        return 1 - pow(1 - x, 4);
    },
    easeInOutQuart: function (x) {
        return x < 0.5 ?
            8 * x * x * x * x :
            1 - (pow((-2 * x) + 2, 4) / 2);
    },
    easeInQuint: function (x) {
        return x * x * x * x * x;
    },
    easeOutQuint: function (x) {
        return 1 - pow(1 - x, 5);
    },
    easeInOutQuint: function (x) {
        return x < 0.5 ?
            16 * x * x * x * x * x :
            1 - (pow((-2 * x) + 2, 5) / 2);
    },
    easeInSine: function (x) {
        return 1 - cos((x * PI) / 2);
    },
    easeOutSine: function (x) {
        return sin((x * PI) / 2);
    },
    easeInOutSine: function (x) {
        return -(cos(PI * x) - 1) / 2;
    },
    easeInExpo: function (x) {
        return x === 0 ? 0 : pow(2, (10 * x) - 10);
    },
    easeOutExpo: function (x) {
        return x === 1 ? 1 : 1 - pow(2, -10 * x);
    },
    easeInOutExpo: function (x) {
        if (x === 0) {
            return 0;
        } else if (x === 1) {
            return 1;
        } else if (x < 0.5) {
            return pow(2, (20 * x) - 10) / 2;
        } else {
            return (2 - pow(2, (-20 * x) + 10)) / 2;
        }
    },
    easeInCirc: function (x) {
        return 1 - sqrt(1 - pow(x, 2));
    },
    easeOutCirc: function (x) {
        return sqrt(1 - pow(x - 1, 2));
    },
    easeInOutCirc: function (x) {
        return x < 0.5 ?
            (1 - sqrt(1 - pow(2 * x, 2))) / 2 :
            (sqrt(1 - pow((-2 * x) + 2, 2)) + 1) / 2;
    },
    easeInElastic: function (x) {
        if (x === 0) {
            return 0;
        } else if (x === 1) {
            return 1;
        } else {
            return -pow(2, (10 * x) - 10) * sin(((x * 10) - 10.75) * c4);
        }
    },
    easeOutElastic: function (x) {
        if (x === 0) {
            return 0;
        } else if (x === 1) {
            return 1;
        } else {
            return (pow(2, -10 * x) * sin(((x * 10) - 0.75) * c4)) + 1;
        }
    },
    easeInOutElastic: function (x) {
        if (x === 0) {
            return 0;
        } else if (x === 1) {
            return 1;
        } else if (x < 0.5) {
            return -(pow(2, (20 * x) - 10) * sin(((20 * x) - 11.125) * c5)) / 2;
        } else {
            return ((pow(2, (-20 * x) + 10) * sin(((20 * x) - 11.125) * c5)) / 2) + 1;
        }
    },
    easeInBack: function (x) {
        return (c3 * x * x * x) - (c1 * x * x);
    },
    easeOutBack: function (x) {
        return 1 + (c3 * pow(x - 1, 3)) + (c1 * pow(x - 1, 2));
    },
    easeInOutBack: function (x) {
        return x < 0.5 ?
            (pow(2 * x, 2) * (((c2 + 1) * 2 * x) - c2)) / 2 :
            ((pow((2 * x) - 2, 2) * (((c2 + 1) * ((x * 2) - 2)) + c2)) + 2) / 2;
    },
    easeInBounce: function (x) {
        return 1 - bounceOut(1 - x);
    },
    easeOutBounce: bounceOut,
    easeInOutBounce: function (x) {
        return x < 0.5 ?
            (1 - bounceOut(1 - (2 * x))) / 2 :
            (1 + bounceOut((2 * x) - 1)) / 2;
    },
});

const $bombTpl = $('<img style="width:40px;" class="plugin-bomb"  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAAA4CAMAAACfWMssAAABNVBMVEUAAAAiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiK1FxXUJBoiIiKnGxgiIiIiIiLXJRoiIiKrHBmuFBIiIiKQLCaQLCbYJRuxFRMiIiK2FxSQLCYiIiK7GRUiIiIiIiKGHhuCLSjCHBciIiKyFROuExLcJxyjHBnEHRfTJBoiIiKQLCaQLCbSIxoiIiIiIiKQLCZ6KiXfKR2QLCbJHxjeKB25GRXMIRk4PEM5PUhFSE06QE0iIiI9QERLTlGQLCZBREgmJigzNjzPOjotLjHoWFitExLlU1PyamnWRkYwMzntZGOdMy3sYWDqXl3VUU+6Qz9wNTOWLyncJxzNIRneT0/DSkfBREF1MzF7Mi/EMC/DHRe8GhVSPT+xPjtcOjunNjLVJBrgYmBkKie+KCdUKCWiHRmE5EKhAAAAOHRSTlMAupnUwrGihGFL/YRuMS8oIhgV7su4k5N+em5GQ0AhDwn9797Yy8TDwKSMcWRgVTwm7t3PzbGwcweVBRAAAAJkSURBVEjH7dXXctpQEIDhIzrExhiXuAZ3O+7pMlmxagGESQCDIRSX1Pd/hKw0Y+WgIxC5zNi/uNQ3uxLSiD31WDpfPTo+ZxM1e3oYjcxLsXgyxxbfoN3CaqCaiUvwt1eI1dtO/QpxMYBFgTJ1xU43f2H1e7lsGVYbcX9paX2kC9lKybt1sVYul68Nw+gV7Xan/a8tSkzNczWwTfDSMH6S+r0/V5zzky/CoNG0AvUA77B6SZWMXqrXxoXsbnFnw9epDnOo6tTF+mfKXtaq4nR2rrjidbl513HyBrH2hSqRrOMRW0nteGGM9lQLXKpTA69qn+wsq0N/yUYq5bnKBICi5IdSnL7a0ukWjxl7P1gahvOg27DAHYorrZLdPdLjszI4GHJTtKgw0ZVYJ3eNSHd0fbA1BCM00H8i1UCsdqx7XKATs/1+hnNnNFCc6HbTRWozy6itPv/gxcFUKJV3qsJ119j8AWeMets68W5KeQbK7kGZsMyog9YHDgLITpxUZU86SIx62XrGvUygyR6pKrI32GbUcx6uEXyQqssEqDnwGweTDnQtr3gIzqoCFPKHe80TYVUxcdVMs5nhXsVJoA5hOvVdc49xAQTDCkTte/M6w0MJ9EBowhQTWgbzIigN0iJMAwQ5HSLMJwkqAdCEuB9MgDbeyQCzzH+kGXCFIebbGoA8xlUgzEYUomU/jkoHSLJRRUdLGbhFhXIRV4rzYmM/xBKA7uNMwQnFADTZO04DetaCSoSJOlPzzu+iQkxKswk6JAqaWdF1vWKSgog7LnBqFNy2Y0n2L6UT8VAotHw6w576P/oD9Mc3kWf8L78AAAAASUVORK5CYII=">');
const {
    registerCommand,
} = api;

function findUserMessage(userName) {
    const $names = $('.message-list-item').find('.message-username');
    let $item;
    for (let i = $names.length - 1; i >= 0; i--) {
        if ($names.eq(i).text().indexOf(userName) !== -1) {
            $item = $names.eq(i).parents('.message-list-item');
            break;
        }
    }
    return $item;
}

function checkBottom() {
    return $('.message-list').prop('scrollHeight') < $('.message-list').innerHeight() + $('.message-list').scrollTop() + 100;
}

function toBottom() {
    $('.message-list').scrollTop($('.message-list').prop('scrollHeight'));
}
window.checkBottom = checkBottom;
registerCommand('boom', ([userName], msg) => {
    const $target = findUserMessage(userName);
    $target.attr('a', '1');

    if (!$target) {
        console.warn(`目标${userName}不存在`);
        return;
    }
    const $targetAvatar = $target.find('.avatar-image,.avatar-text');
    if (!$targetAvatar.length) {
        console.warn(`目标${userName}头像不存在`);
        return;
    }
    setTimeout(() => {
        const $source = findUserMessage(msg.from.username);
        $target.attr('a', '2');
        const $bomb = $bombTpl.clone();

        $source.find('.text').replaceWith($bomb);
        const pos1 = $targetAvatar.offset();
        const pos2 = $bomb.offset();
        if ($source.css('flex-direction') === 'row-reverse') {
            $bomb.css('left', '-20px')
                .css('bottom', '-20px')
                .css('transform', 'translate(50%,-50%)');
        } else {
            $bomb.css('left', '20px')
                .css('bottom', '-20px')
                .css('transform', 'translate(-50%,-50%)');
        }


        $bomb.css('width', '10px')
            .css('position', 'relative')
            .animate({
                width: '40px',
            }, {
                duration: 500,
                easing: 'easeOutBack',
                done: function () {
                    $(this).css('left', '')
                        .css('bottom', '')
                        .css('transform', '');
                },
            })
            .delay(1000)
            .animate({
                left: pos1.left - pos2.left,
                top: pos1.top - pos2.top,
                borderSpacing: 1080,
            }, {
                duration: 1000,
                easing: 'easeOutCubic',
                step: function (now, fx) {
                    if (fx.prop === 'borderSpacing') {
                        $bomb.css('transform', `rotate(${now}deg)`);
                    }
                },
                done: function () {
                    $(this).css('transform', '')
                        .css('borderSpacing', '1000')
                        .css('left', pos1.left - pos2.left - 20)
                        .css('top', (pos1.top - pos2.top) + 20)
                        .css('transform', 'translate(50%,-50%)');
                },
            })
            .delay(500)
            .animate({
                opacity: '0',
                borderSpacing: '2000',
            }, {
                duration: 100,
                easing: 'linear',
                step: function (now, fx) {
                    if (fx.prop === 'borderSpacing') {
                        $bomb.css('transform', `translate(50%,-50%) scale(${now / 1000})`);
                    }
                },
                start: function () {
                    $targetAvatar.explode({
                        maxWidth: 8,
                        minWidth: 1,
                    });
                },
                done: function () {

                },
            });
        if (checkBottom()) {
            toBottom();
        }
    });
});
