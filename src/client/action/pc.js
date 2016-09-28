import Store from '../store';

const dispatch = Store.dispatch;
let closeNotification = null;

const actions = {
    // chatPanel
    openGroupSetting: () => dispatch({ type: 'OpenGroupSetting' }),
    closeGroupSetting: () => dispatch({ type: 'CloseGroupSetting' }),
    openGroupNotice: () => dispatch({ type: 'OpenGroupNotice' }),
    closeGroupNotice: () => dispatch({ type: 'CloseGroupNotice' }),
    openExpression: () => dispatch({ type: 'OpenExpression' }),
    closeExpression: () => dispatch({ type: 'CloseExpression' }),
    openCodeInput: () => dispatch({ type: 'OpenCodeInput' }),
    closeCodeInput: () => dispatch({ type: 'CloseCodeInput' }),
    openNotification: function (content) {
        dispatch({ type: 'OpenNotification', content });
        clearTimeout(closeNotification);
        closeNotification = setTimeout(this.closeNotification, 5000);
    },
    closeNotification: () => dispatch({ type: 'CloseNotification' }),

    // maskLayout
    openMaskLayout: () => dispatch({ type: 'OpenMaskLayout' }),
    closeMaskLayout: () => dispatch({ type: 'CloseMaskLayout' }),

    // inputBox
    insertText: (text) => dispatch({ type: 'InsertText', text }),
    insertTextEnd: (count) => dispatch({ type: 'InsertTextEnd', count }),

    // messageList
    shouldScrollMessage: (should) => dispatch({ type: 'ShouldScrollMessage', should }),

    // window
    windowFocus: (focus) => dispatch({ type: 'WindowFocus', focus }),

    // systemSetting
    openSystemSetting: () => dispatch({ type: 'OpenSystemSetting' }),
    closeSystemSetting: () => dispatch({ type: 'CloseSystemSetting' }),
    toggleDesktopNotification: () => dispatch({ type: 'ToggleDesktopNotification' }),
    toggleSoundNotification: () => dispatch({ type: 'ToggleSoundNotification' }),

    // groupaManage
    openCreateGroupInput: () => dispatch({ type: 'OpenCreateGroupInput' }),
    closeCreateGroupInput: () => dispatch({ type: 'CloseCreateGroupInput' }),
    openAddGroupInput: () => dispatch({ type: 'OpenAddGroupInput' }),
    closeAddGroupInput: () => dispatch({ type: 'CloseAddGroupInput' }),

    // self info and user info
    openUserSetting: () => dispatch({ type: 'OpenUserSetting' }),
    closeUserSetting: () => dispatch({ type: 'CloseUserSetting' }),
    openUserInfo: (user) => dispatch({ type: 'OpenUserInfo', user }),
    closeUserInfo: () => dispatch({ type: 'CloseUserInfo' }),

    // imageViewer
    openImageViewer: (src) => dispatch({ type: 'OpenImageViewer', src }),
    closeImageViewer: () => dispatch({ type: 'CloseImageViewer' }),
};

export default actions;
