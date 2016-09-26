import immutable from 'immutable';
import { types } from '../action/pc';

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

    case types.OpenGroupSetting: { return state.set('showGroupSetting', true); }
    case types.CloseGroupSetting: { return state.set('showGroupSetting', false); }
    case types.OpenGroupNotice: { return state.set('showGroupNotice', true); }
    case types.CloseGroupNotice: { return state.set('showGroupNotice', false); }
    case types.OpenExpression: { return state.set('showExpression', true); }
    case types.CloseExpression: { return state.set('showExpression', false); }
    case types.OpenCodeInput: { return state.set('showCodeInput', true); }
    case types.CloseCodeInput: { return state.set('showCodeInput', false); }

    case types.OpenMaskLayout: { return state.set('showMaskLayout', true); }
    case types.CloseMaskLayout: { return state.set('showMaskLayout', false); }

    case types.OpenNotification: {
        return state
        .set('showNotification', true)
        .set('notificationContent', action.content);
    }
    case types.CloseNotification: { return state.set('showNotification', false); }

    case types.InsertText: { return state.update('insertTexts', insertTexts => insertTexts.push(action.text)); }
    case types.InsertTextEnd: { return state.update('insertTexts', insertTexts => insertTexts.slice(action.count)); }

    case types.ShouldScrollMessage: { return state.set('shouldScrollMessage', action.should); }

    case types.WindowFocus: { return state.set('windowFocus', action.focus); }

    case types.OpenSystemSetting: { return state.set('showSystemSetting', true); }
    case types.CloseSystemSetting: { return state.set('showSystemSetting', false); }
    case types.ToggleDesktopNotification: { return state.set('desktopNotification', !state.get('desktopNotification')); }
    case types.ToggleSoundNotification: { return state.set('soundNotification', !state.get('soundNotification')); }

    case types.OpenUserSetting: { return state.set('showUserSetting', true); }
    case types.CloseUserSetting: { return state.set('showUserSetting', false); }
    case types.OpenUserInfo: { return state.set('showUserInfo', true).set('userInfoData', immutable.fromJS(action.user)); }
    case types.CloseUserInfo: { return state.set('showUserInfo', false); }

    case types.OpenCreateGroupInput: { return state.set('showCreateGroupInput', true); }
    case types.CloseCreateGroupInput: { return state.set('showCreateGroupInput', false); }
    case types.OpenAddGroupInput: { return state.set('showAddGroupInput', true); }
    case types.CloseAddGroupInput: { return state.set('showAddGroupInput', false); }

    case types.OpenImageViewer: { return state.set('showImageViewer', true).set('imageViewerSrc', action.src); }
    case types.CloseImageViewer: { return state.set('showImageViewer', false); }

    default:
        return state;
    }
}

export default reducer;
