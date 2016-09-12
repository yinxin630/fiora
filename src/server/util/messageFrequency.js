let count = { };
const MaxMessageLimit = 10; // every mimute

(
    function clear() {
        count = { };
        setTimeout(clear, 1000 * 60);
    }()
);

module.exports = function (userId) {
    if (count[userId] === undefined) {
        count[userId] = 1;
        return true;
    }
    else if (count[userId] < MaxMessageLimit) {
        count[userId]++;
        return true;
    }
    return false;
};
