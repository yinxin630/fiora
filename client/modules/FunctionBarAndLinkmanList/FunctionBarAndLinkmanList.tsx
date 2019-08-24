import React from 'react';

import useIsLogin from '../../hooks/useIsLogin';
import useAction from '../../hooks/useAction';
import FunctionBar from './FunctionBar';
import LinkmanList from './LinkmanList';

import Style from './FunctionBarAndLinkmanList.less';

function FunctionBarAndLinkmanList() {
    const isLogin = useIsLogin();
    const action = useAction();

    function handleClick(e) {
        if (e.target === e.currentTarget) {
            action.setStatus('functionBarAndLinkmanListVisible', false);
        }
    }

    return (
        <div className={Style.functionBarAndLinkmanList} onClick={handleClick} role="button">
            <div className={Style.container}>
                { isLogin && <FunctionBar /> }
                <LinkmanList />
            </div>
        </div>
    );
}

export default FunctionBarAndLinkmanList;
