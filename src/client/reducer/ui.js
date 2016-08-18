import R from 'ramda';

function reducer(
    state = {
        showToolbar: false,
        showGroupSetting: false,
        showGroupNotice: false,
        showExpression: false,
        showMaskLayout: false,
        showNotification: false,
        notificationContent: '',

        isLogin: false,
    }, 
    action
) {
    switch (action.type) {
        case 'ShowToolbar': {
            let newState = R.clone(state);
            newState.showToolbar = true;
            return newState;
        }
        case 'CloseToolbar': {
            let newState = R.clone(state);
            newState.showToolbar = false;
            return newState;
        }

        case 'OpenGroupSetting': {
            let newState = R.clone(state);
            newState.showGroupSetting = true;
            return newState;
        }
        case 'CloseGroupSetting': {
            let newState = R.clone(state);
            newState.showGroupSetting = false;
            return newState;
        }
        case 'OpenGroupNotice': {
            let newState = R.clone(state);
            newState.showGroupNotice = true;
            return newState;
        }
        case 'CloseGroupNotice': {
            let newState = R.clone(state);
            newState.showGroupNotice = false;
            return newState;
        }
        case 'OpenExpression': {
            let newState = R.clone(state);
            newState.showExpression = true;
            return newState;
        }
        case 'CloseExpression': {
            let newState = R.clone(state);
            newState.showExpression = false;
            return newState;
        }

        case 'OpenMaskLayout': {
            let newState = R.clone(state);
            newState.showMaskLayout = true;
            return newState;
        }
        case 'CloseMaskLayout': {
            let newState = R.clone(state);
            newState.showMaskLayout = false;
            return newState;
        }

        case 'OpenNotification': {
            let newState = R.clone(state);
            newState.showNotification = true;
            newState.notificationContent = action.content;
            return newState;
        }
        case 'CloseNotification': {
            let newState = R.clone(state);
            newState.showNotification = false;
            return newState;
        }

        // app
        case 'LoginSuccess': {
            let newState = R.clone(state);
            newState.isLogin = true;
            return newState;
        }

        default: 
            return state;
    }
}

export default reducer;