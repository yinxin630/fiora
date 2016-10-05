import jQuery from 'jquery';
import api from '../api.js';

const $ = jQuery;

api.registerMessage('system', (content) => {
    const $dom = $('<p></p>');
    const $wrapper = $('<div></div>');

    $wrapper.append($dom);
    $dom.text(content);

    $wrapper.css({
        margin: '10px 0',
        textAlign: 'center',


    });
    $dom.css({
        display: 'inline-block',
        color: 'white',
        backgroundColor: '#999',
        borderRadius: '50px',
        padding: '5px 20px 6px',
    });

    return $wrapper;
});

