module.exports = {
    types: {
        InitUserInfo: 'InitUserInfo',
        
        UpdateUserInfo: 'UpdateUserInfo',
    },
    
    initUserInfo: function (user) {
        return {
            type: this.types.InitUserInfo,
            user: user,
        };
    },
    
    updateUserInfo: function (user) {
        return {
            type: this.types.UpdateUserInfo,
            user: user,
        };
    }
}