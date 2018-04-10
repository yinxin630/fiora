const xss = require('xss');

const myXss = new xss.FilterXSS({
    whiteList: {
    },
});

module.exports = function (text) {
    return myXss.process(text);
};
