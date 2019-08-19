import React from 'react';

interface GroupManagePanelProps {
    visible: boolean;
}

function GroupManagePanel(props: GroupManagePanelProps) {
    return (
        <div>GroupManagePanel {JSON.stringify(props)}</div>
    );
}

export default GroupManagePanel;
