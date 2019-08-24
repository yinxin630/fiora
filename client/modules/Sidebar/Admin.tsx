import React from 'react';

interface AdminProps {
    visible: boolean;
    onClose: () => void;
}

function Admin(props: AdminProps) {
    console.log(props);
    return (
        <div>Admin</div>
    );
}

export default Admin;
