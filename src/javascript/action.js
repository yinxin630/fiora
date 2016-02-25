module.exports = {
    types: {
        SetUser: 'SetUser',
        SetLinkmans: 'SetLinkmans',
        AddLinkman: 'AddLinkman',
        AddMessage: 'AddMessage',
    },
    
    initUserInfo: function (user) {
        return {
            type: this.types.SetUser,
            user: user,
        };
    },
    
    setLinkmans: function (linkmans) {
        return {
            type: this.types.SetLinkmans,
            linkmans: linkmans,
        };
    },
    
    addLinkman: function (linkman) {
        return {
            type: this.types.AddLinkman,
            lickman: linkman,
        }
    },
    
    addMessage: function (userId, message) {
        return {
            type: this.types.AddMessage,
            message: message,
        }
    }
}