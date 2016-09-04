import Store from '../store';

const dispatch = Store.dispatch;
let closeNotification = null;

const actions = {
    // inputBox
    openToolbar: function () {
        return new Promise(resolve => {
            dispatch({
                type: 'ShowToolbar',
            });
            resolve('success');
        });
    },
    closeToolbar: function () {
        return new Promise(resolve => {
            dispatch({
                type: 'CloseToolbar',
            });
            resolve('success');
        });
    },

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
    changeScroll: function (scrollHeight, scrollTop, clientHeight) {
        return new Promise(resolve => {
            dispatch({
                type: 'ChangeScroll',
                scrollHeight,
                scrollTop,
                clientHeight,
            });
            resolve('success');
        });
    },
};

export default actions;
