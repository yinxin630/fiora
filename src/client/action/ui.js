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
};

export default actions;