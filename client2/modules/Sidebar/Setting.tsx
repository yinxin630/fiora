import React from 'react';

interface SettingProps {
    visible: boolean;
    onClose: () => void;
}

function Setting(props: SettingProps) {
    console.log(props);
    return (
        <div>Setting</div>
    );
}

export default Setting;
