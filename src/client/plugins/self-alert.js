import $ from 'jquery';
import api from '../api.js';

const {
    registerCommand,
} = api;

registerCommand('boom', userName => {
    const $name = $('.message-list-item').find(`.message-username:contains('${userName}')`);
    if (!$name.length) {
        alert(`目标${userName}不存在`);
    }
    const $target = $name.last().parents('.message-list-item').find('.avatar-image');
    $target.css('transition', '0.2s all')
           .css('opacity', '0')
           .css('transform', 'scale(2)');
    setTimeout(() => {
        $target.css('opacity', '')
               .css('transform', '');
        setTimeout(() => {
            $target.css('transition', '0.2s all');
        }, 300);
    }, 1400);
});
