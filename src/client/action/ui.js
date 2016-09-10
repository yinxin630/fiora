import Store from '../store';

const dispatch = Store.dispatch;
let closeNotification = null;

const actions = {
    // chatPanel
    openGroupSetting: function () {
        return new Promise(resolve => {
            dispatch({
                type: 'OpenGroupSetting',
            });
            resolve('success');
        });
    },
    closeGroupSetting: function () {
        return new Promise(resolve => {
            dispatch({
                type: 'CloseGroupSetting',
            });
            resolve('success');
        });
    },
    openGroupNotice: function () {
        return new Promise(resolve => {
            dispatch({
                type: 'OpenGroupNotice',
            });
            resolve('success');
        });
    },
    closeGroupNotice: function () {
        return new Promise(resolve => {
            dispatch({
                type: 'CloseGroupNotice',
            });
            resolve('success');
        });
    },
    openExpression: function () {
        return new Promise(resolve => {
            dispatch({
                type: 'OpenExpression',
            });
            resolve('success');
        });
    },
    closeExpression: function () {
        return new Promise(resolve => {
            dispatch({
                type: 'CloseExpression',
            });
            resolve('success');
        });
    },
    openCodeInput: function () {
        return new Promise(resolve => {
            dispatch({
                type: 'openCodeInput',
            });
            resolve('success');
        });
    },
    closeCodeInput: function () {
        return new Promise(resolve => {
            dispatch({
                type: 'closeCodeInput',
            });
            resolve('success');
        });
    },

    openNotification: function (content) {
        return new Promise(resolve => {
            dispatch({
                type: 'OpenNotification',
                content: content,
            });
            resolve('success');
            clearTimeout(closeNotification);
            closeNotification = setTimeout(this.closeNotification, 5000);
        });
    },
    closeNotification: function () {
        return new Promise(resolve => {
            dispatch({
                type: 'CloseNotification',
            });
            resolve('success');
        });
    },

    // maskLayout
    openMaskLayout: function () {
        return new Promise(resolve => {
            dispatch({
                type: 'OpenMaskLayout',
            });
            resolve('success');
        });
    },
    closeMaskLayout: function () {
        return new Promise(resolve => {
            dispatch({
                type: 'CloseMaskLayout',
            });
            resolve('success');
        });
    },

    // inputBox
    insertText: function (text) {
        return new Promise(resolve => {
            dispatch({
                type: 'InsertText',
                text,
            });
            resolve('success');
        });
    },
    insertTextEnd: function (count) {
        return new Promise(resolve => {
            dispatch({
                type: 'InsertTextEnd',
                count,
            });
            resolve('success');
        });
    },

    // messageList
    shouldScrollMessage: function (should) {
        return new Promise(resolve => {
            dispatch({
                type: 'ShouldScrollMessage',
                should,
            });
            resolve('success');
        });
    },

    // window
    windowFocus: function (focus) {
        return new Promise(resolve => {
            dispatch({
                type: 'WindowFocus',
                focus,
            });
            resolve('success');
        });
    },

    // systemSetting
    openSystemSetting: function () {
        return new Promise(resolve => {
            dispatch({
                type: 'OpenSystemSetting',
            });
            resolve('success');
        });
    },
    closeSystemSetting: function () {
        return new Promise(resolve => {
            dispatch({
                type: 'CloseSystemSetting',
            });
            resolve('success');
        });
    },
    toggleDesktopNotification: function () {
        return new Promise(resolve => {
            dispatch({
                type: 'ToggleDesktopNotification',
            });
            resolve('success');
        });
    },
    toggleSoundNotification: function () {
        return new Promise(resolve => {
            dispatch({
                type: 'ToggleSoundNotification',
            });
            resolve('success');
        });
    },

    openCreateGroupInput: function () {
        return new Promise(resolve => {
            dispatch({
                type: 'OpenCreateGroupInput',
            });
            resolve('success');
        });
    },
    closeCreateGroupInput: function () {
        return new Promise(resolve => {
            dispatch({
                type: 'CloseCreateGroupInput',
            });
            resolve('success');
        });
    },
    openAddGroupInput: function () {
        return new Promise(resolve => {
            dispatch({
                type: 'OpenAddGroupInput',
            });
            resolve('success');
        });
    },
    closeAddGroupInput: function () {
        return new Promise(resolve => {
            dispatch({
                type: 'CloseAddGroupInput',
            });
            resolve('success');
        });
    },

    openUserSetting: function () {
        return new Promise(resolve => {
            dispatch({
                type: 'OpenUserSetting',
            });
            resolve('success');
        });
    },
    closeUserSetting: function () {
        return new Promise(resolve => {
            dispatch({
                type: 'CloseUserSetting',
            });
            resolve('success');
        });
    },

    openUserInfo: function (user) {
        return new Promise(resolve => {
            dispatch({
                type: 'OpenUserInfo',
                user,
            });
            resolve('success');
        });
    },
    closeUserInfo: function () {
        return new Promise(resolve => {
            dispatch({
                type: 'CloseUserInfo',
            });
            resolve('success');
        });
    },
};

export default actions;
