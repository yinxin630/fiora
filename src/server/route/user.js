const user = {
    'POST /user': function* (data, cb) {
        console.log('get POST /user data ->', data);
        cb(200, { msg: 'ni hao' });
    }
}

module.exports = user;