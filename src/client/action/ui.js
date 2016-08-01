import Store from '../store';
const dispatch = Store.dispatch;

const actions = {
    // inputBox
    showToolbar: function () {
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
    }
};

export default actions;