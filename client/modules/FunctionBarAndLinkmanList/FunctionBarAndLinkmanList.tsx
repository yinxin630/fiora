import React from 'react';
import { useSelector } from 'react-redux';

import useIsLogin from '../../hooks/useIsLogin';
import useAction from '../../hooks/useAction';
import FunctionBar from './FunctionBar';
import LinkmanList from './LinkmanList';

import Style from './FunctionBarAndLinkmanList.less';
import { State } from '../../state/reducer';

function FunctionBarAndLinkmanList() {
    const isLogin = useIsLogin();
    const action = useAction();
    const functionBarAndLinkmanListVisible = useSelector(
        (state: State) => state.status.functionBarAndLinkmanListVisible,
    );

    if (!functionBarAndLinkmanListVisible) {
        return null;
    }

    function handleClick(e) {
        if (e.target === e.currentTarget) {
            action.setStatus('functionBarAndLinkmanListVisible', false);
        }
    }

    return (
        <div className={Style.functionBarAndLinkmanList} onClick={handleClick} role="button">
            <div className={Style.container}>
                {isLogin && <FunctionBar />}
                <LinkmanList />
            </div>
        </div>
    );
}

export default FunctionBarAndLinkmanList;
