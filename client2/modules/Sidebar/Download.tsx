import React from 'react';

interface DownloadProps {
    visible: boolean;
    onClose: () => void;
}

function Download(props: DownloadProps) {
    console.log(props);
    return (
        <div>Download</div>
    );
}

export default Download;
