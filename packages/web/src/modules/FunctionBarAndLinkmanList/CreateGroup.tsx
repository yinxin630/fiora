import React, { useState } from 'react';

import Style from './CreateGroup.less';
import Dialog from '../../components/Dialog';
import Input from '../../components/Input';
import Message from '../../components/Message';
import { createGroup } from '../../service';
import useAction from '../../hooks/useAction';

interface CreateGroupProps {
    visible: boolean;
    onClose: () => void;
}

function CreateGroup(props: CreateGroupProps) {
    const { visible, onClose } = props;
    const action = useAction();
    const [groupName, setGroupName] = useState('');

    async function handleCreateGroup() {
        const group = await createGroup(groupName);
        if (group) {
            group.type = 'group';
            action.addLinkman(group, true);
            setGroupName('');
            onClose();
            Message.success('Successfully created group');
        }
    }

    return (
        <Dialog title="create group" visible={visible} onClose={onClose}>
            <div className={Style.container}>
                <h3 className={Style.text}>Please enter a group name</h3>
                <Input
                    className={Style.input}
                    value={groupName}
                    onChange={setGroupName}
                />
                <button
                    className={Style.button}
                    onClick={handleCreateGroup}
                    type="button"
                >
                    create
                </button>
            </div>
        </Dialog>
    );
}

export default CreateGroup;
