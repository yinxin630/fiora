import immutable from 'immutable';

const initialState = immutable.fromJS({
    showToolbar: false,
    showGroupSetting: false,
    showGroupNotice: false,
    showExpression: false,
    showMaskLayout: false,
    showNotification: false,
    notificationContent: '',
    insertTexts: [],

    messageListScrollHeight: 0,
    messageListScrollTop: 0,
    messageListClientHeight: 0,
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

    case 'ChangeScroll': {
        return state
        .set('messageListScrollHeight', action.scrollHeight)
        .set('messageListScrollTop', action.scrollTop)
        .set('messageListClientHeight', action.clientHeight);
    }

    default:
        return state;
    }
}

export default reducer;
