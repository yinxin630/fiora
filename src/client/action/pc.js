import Store from '../store';

const dispatch = Store.dispatch;
let closeNotification = null;

const types = {
    OpenGroupSetting: 'OpenGroupSetting',
    CloseGroupSetting: 'CloseGroupSetting',
    OpenGroupNotice: 'OpenGroupNotice',
    CloseGroupNotice: 'CloseGroupNotice',
    OpenExpression: 'OpenExpression',
    CloseExpression: 'CloseExpression',
    OpenCodeInput: 'OpenCodeInput',
    CloseCodeInput: 'CloseCodeInput',
    OpenNotification: 'OpenNotification',
    CloseNotification: 'CloseNotification',

    OpenMaskLayout: 'OpenMaskLayout',
    CloseMaskLayout: 'CloseMaskLayout',

    InsertText: 'InsertText',
    InsertTextEnd: 'InsertTextEnd',

    ShouldScrollMessage: 'ShouldScrollMessage',

    WindowFocus: 'WindowFocus',

    OpenSystemSetting: 'OpenSystemSetting',
    CloseSystemSetting: 'CloseSystemSetting',
    ToggleDesktopNotification: 'ToggleDesktopNotification',
    ToggleSoundNotification: 'ToggleSoundNotification',

    OpenCreateGroupInput: 'OpenCreateGroupInput',
    CloseCreateGroupInput: 'CloseCreateGroupInput',
    OpenAddGroupInput: 'OpenAddGroupInput',
    CloseAddGroupInput: 'CloseAddGroupInput',

    OpenUserSetting: 'OpenUserSetting',
    CloseUserSetting: 'CloseUserSetting',
    OpenUserInfo: 'OpenUserInfo',
    CloseUserInfo: 'CloseUserInfo',

    OpenImageViewer: 'OpenImageViewer',
    CloseImageViewer: 'CloseImageViewer',
};

export { types };

const actions = {
    // chatPanel
    openGroupSetting: () => dispatch({ type: types.OpenGroupSetting }),
    closeGroupSetting: () => dispatch({ type: types.CloseGroupSetting }),
    openGroupNotice: () => dispatch({ type: types.OpenGroupNotice }),
    closeGroupNotice: () => dispatch({ type: types.CloseGroupNotice }),
    openExpression: () => dispatch({ type: types.OpenExpression }),
    closeExpression: () => dispatch({ type: types.CloseExpression }),
    openCodeInput: () => dispatch({ type: types.OpenCodeInput }),
    closeCodeInput: () => dispatch({ type: types.CloseCodeInput }),
    openNotification: () => {
        dispatch({ type: types.OpenNotification });
        clearTimeout(closeNotification);
        closeNotification = setTimeout(this.closeNotification, 5000);
    },
    closeNotification: () => dispatch({ type: types.CloseNotification }),

    // maskLayout
    openMaskLayout: () => dispatch({ type: types.OpenMaskLayout }),
    closeMaskLayout: () => dispatch({ type: types.CloseMaskLayout }),

    // inputBox
    insertText: (text) => dispatch({ type: types.InsertText, text }),
    insertTextEnd: (count) => dispatch({ type: types.InsertTextEnd, count }),

    // messageList
    shouldScrollMessage: (should) => dispatch({ type: types.ShouldScrollMessage, should }),

    // window
    windowFocus: (focus) => dispatch({ type: types.WindowFocus, focus }),

    // systemSetting
    openSystemSetting: () => dispatch({ type: types.OpenSystemSetting }),
    closeSystemSetting: () => dispatch({ type: types.CloseSystemSetting }),
    toggleDesktopNotification: () => dispatch({ type: types.ToggleDesktopNotification }),
    toggleSoundNotification: () => dispatch({ type: types.ToggleSoundNotification }),

    // groupaManage
    openCreateGroupInput: () => dispatch({ type: types.OpenCreateGroupInput }),
    closeCreateGroupInput: () => dispatch({ type: types.CloseCreateGroupInput }),
    openAddGroupInput: () => dispatch({ type: types.OpenAddGroupInput }),
    closeAddGroupInput: () => dispatch({ type: types.CloseAddGroupInput }),

    // self info and user info
    openUserSetting: () => dispatch({ type: types.OpenUserSetting }),
    closeUserSetting: () => dispatch({ type: types.CloseUserSetting }),
    openUserInfo: () => dispatch({ type: types.OpenUserInfo }),
    closeUserInfo: () => dispatch({ type: types.CloseUserInfo }),

    // imageViewer
    openImageViewer: () => dispatch({ type: types.OpenImageViewer }),
    closeImageViewer: () => dispatch({ type: types.CloseImageViewer }),
};

export default actions;
