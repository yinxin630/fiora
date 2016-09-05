import immutable from 'immutable';

const initialState = immutable.fromJS({
    showToolbar: false,
    showGroupSetting: false,
    showGroupNotice: false,
    showExpression: false,
    showCodeInput: false,
    showMaskLayout: false,
    showNotification: false,
    notificationContent: '',
    insertTexts: [],

    shouldScrollMessage: true,
    windowFocus: true,
    showSystemSetting: false,

    desktopNotification: true,
    soundNotification: true,
});

function reducer(state = initialState, action) {
    switch (action.type) {
    case 'ShowToolbar': {
        return state.set('showToolbar', true);
    }
    case 'CloseToolbar': {
        return state.set('showToolbar', false);
    }

    case 'OpenGroupSetting': {
        return state.set('showGroupSetting', true);
    }
    case 'CloseGroupSetting': {
        return state.set('showGroupSetting', false);
    }
    case 'OpenGroupNotice': {
        return state.set('showGroupNotice', true);
    }
    case 'CloseGroupNotice': {
        return state.set('showGroupNotice', false);
    }
    case 'OpenExpression': {
        return state.set('showExpression', true);
    }
    case 'CloseExpression': {
        return state.set('showExpression', false);
    }
    case 'openCodeInput': {
        return state.set('showCodeInput', true);
    }
    case 'closeCodeInput': {
        return state.set('showCodeInput', false);
    }

    case 'OpenMaskLayout': {
        return state.set('showMaskLayout', true);
    }
    case 'CloseMaskLayout': {
        return state.set('showMaskLayout', false);
    }

    case 'OpenNotification': {
        return state
        .set('showNotification', true)
        .set('notificationContent', action.content);
    }
    case 'CloseNotification': {
        return state.set('showNotification', false);
    }

    case 'InsertText': {
        return state.update('insertTexts', insertTexts => insertTexts.push(action.text));
    }
    case 'InsertTextEnd': {
        return state.update('insertTexts', insertTexts => insertTexts.slice(action.count));
    }

    case 'ShouldScrollMessage': {
        return state.set('shouldScrollMessage', action.should);
    }

    case 'WindowFocus': {
        return state.set('windowFocus', action.focus);
    }

    case 'OpenSystemSetting': {
        return state.set('showSystemSetting', true);
    }
    case 'CloseSystemSetting': {
        return state.set('showSystemSetting', false);
    }

    case 'ToggleDesktopNotification': {
        return state.set('desktopNotification', !state.get('desktopNotification'));
    }
    case 'ToggleSoundNotification': {
        return state.set('soundNotification', !state.get('soundNotification'));
    }

    default:
        return state;
    }
}

export default reducer;
