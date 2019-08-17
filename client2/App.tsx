import React, {
    useMemo, useState, useEffect,
} from 'react';
import { hot } from 'react-hot-loader';
import { useSelector } from 'react-redux';

import './assets/styles/normalize.less';
import './assets/styles/iconfont.less';

// @ts-ignore
import Style from './App.less';
import { isMobile } from '../utils/ua';
import { State } from './state/reducer';

/**
 * 获取窗口宽度百分比
 */
function getWidthPercent() {
    let width = 0.6;
    if (window.innerWidth < 1000) {
        width = 0.9;
    } else if (window.innerWidth < 1300) {
        width = 0.8;
    } else if (window.innerWidth < 1600) {
        width = 0.7;
    } else if (isMobile) {
        width = 1;
    }
    return width;
}

/**
 * 获取窗口高度百分比
 */
function getHeightPercent() {
    let height = 0.8;
    if (window.innerHeight < 1000) {
        height = 0.9;
    } else if (isMobile) {
        height = 1;
    }
    return height;
}

function App() {
    const showLoginDialog = useSelector((state: State) => state.status.showLoginDialog);
    const backgroundImage = useSelector((state: State) => state.status.backgroundImage);

    // 计算窗口高度/宽度百分比
    const [width, setWidth] = useState(getWidthPercent());
    const [height, setHeight] = useState(getHeightPercent());
    useEffect(() => {
        window.onresize = () => {
            setWidth(getWidthPercent());
            setHeight(getHeightPercent());
        };
    }, []);

    // 获取底图尺寸
    const [backgroundWidth, setBackgroundWidth] = useState(window.innerWidth);
    const [backgroundHeight, setBackgroundHeight] = useState(window.innerHeight);
    useEffect(() => {
        const img = new Image();
        img.onload = () => {
            setBackgroundWidth(Math.max(img.width, window.innerWidth));
            setBackgroundHeight(Math.max(img.height, window.innerHeight));
        };
        img.src = backgroundImage;
    }, [backgroundImage]);

    // 主体样式
    const style = useMemo(() => ({
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: `${backgroundWidth}px ${backgroundHeight}px`,
        backgroundRepeat: 'no-repeat',
    }), [backgroundImage, backgroundWidth, backgroundHeight]);

    // 聊天窗口样式
    const childStyle = useMemo(() => ({
        width: `${width * 100}%`,
        height: `${height * 100}%`,
        left: `${((1 - width) / 2) * 100}%`,
        top: `${((1 - height) / 2) * 100}%`,
    }), [width, height]);

    // 模糊背景样式
    const blurStyle = useMemo(() => ({
        backgroundPosition: `${(-(1 - width) * window.innerWidth) / 2}px ${(-(1 - height) * window.innerHeight) / 2}px`,
        ...style,
        ...childStyle,
    }), [width, height, style, childStyle]);

    return (
        <div className={Style.app} style={style}>
            <div className={Style.blur} style={blurStyle} />
            <div className={Style.child} style={childStyle}>
                {/* <Main /> */}
            </div>
            {showLoginDialog}
        </div>
    );
}

export default hot(module)(App);
