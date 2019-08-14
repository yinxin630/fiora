const xss = require('xss');

const myXss = new xss.FilterXSS({
    whiteList: {
    },
});

module.exports = function processXss(text) {
    return myXss.process(text);
};
