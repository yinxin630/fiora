import immutable from 'immutable';

const initialState = immutable.fromJS({
    showGroupSetting: false,
    showGroupNotice: false,
    showExpression: false,
    showCodeInput: false,
    showMaskLayout: false,
    showNotification: false,
    notificationContent: '',
    insertTexts: [],

    shouldScrollMessage: true,
    windowFocus: false,
    showSystemSetting: false,
    showUserSetting: false,
    showUserInfo: false,
    userInfoData: {},

    desktopNotification: true,
    soundNotification: true,

    showCreateGroupInput: false,
    showAddGroupInput: false,

    showImageViewer: false,
    imageViewerSrc: '',
});

function reducer(state = initialState, action) {
    switch (action.type) {
    case 'Initialize': { return initialState; }

    case 'OpenGroupSetting': { return state.set('showGroupSetting', true); }
    case 'CloseGroupSetting': { return state.set('showGroupSetting', false); }
    case 'OpenGroupNotice': { return state.set('showGroupNotice', true); }
    case 'CloseGroupNotice': { return state.set('showGroupNotice', false); }
    case 'OpenExpression': { return state.set('showExpression', true); }
    case 'CloseExpression': { return state.set('showExpression', false); }
    case 'OpenCodeInput': { return state.set('showCodeInput', true); }
    case 'CloseCodeInput': { return state.set('showCodeInput', false); }

    case 'OpenMaskLayout': { return state.set('showMaskLayout', true); }
    case 'CloseMaskLayout': { return state.set('showMaskLayout', false); }

    case 'OpenNotification': {
        return state
        .set('showNotification', true)
        .set('notificationContent', action.content);
    }
    case 'CloseNotification': { return state.set('showNotification', false); }

    case 'InsertText': { return state.update('insertTexts', insertTexts => insertTexts.push(action.text)); }
    case 'InsertTextEnd': { return state.update('insertTexts', insertTexts => insertTexts.slice(action.count)); }

    case 'ShouldScrollMessage': { return state.set('shouldScrollMessage', action.should); }

    case 'WindowFocus': { return state.set('windowFocus', action.focus); }

    case 'OpenSystemSetting': { return state.set('showSystemSetting', true); }
    case 'CloseSystemSetting': { return state.set('showSystemSetting', false); }
    case 'ToggleDesktopNotification': { return state.set('desktopNotification', !state.get('desktopNotification')); }
    case 'ToggleSoundNotification': { return state.set('soundNotification', !state.get('soundNotification')); }

    case 'OpenUserSetting': { return state.set('showUserSetting', true); }
    case 'CloseUserSetting': { return state.set('showUserSetting', false); }
    case 'OpenUserInfo': { return state.set('showUserInfo', true).set('userInfoData', immutable.fromJS(action.user)); }
    case 'CloseUserInfo': { return state.set('showUserInfo', false); }

    case 'OpenCreateGroupInput': { return state.set('showCreateGroupInput', true); }
    case 'CloseCreateGroupInput': { return state.set('showCreateGroupInput', false); }
    case 'OpenAddGroupInput': { return state.set('showAddGroupInput', true); }
    case 'CloseAddGroupInput': { return state.set('showAddGroupInput', false); }

    case 'OpenImageViewer': { return state.set('showImageViewer', true).set('imageViewerSrc', action.src); }
    case 'CloseImageViewer': { return state.set('showImageViewer', false); }

    default:
        return state;
    }
}

export default reducer;
