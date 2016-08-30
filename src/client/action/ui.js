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
};

export default actions;
