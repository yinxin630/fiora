import React from 'react';

import Style from './Button.less';

interface ButtonProps {
    /** 类型: primary / danger */
    type?: string;
    /** 按钮文本 */
    children: string;
    className?: string;
    /** 点击事件 */
    onClick: () => void
}

function Button(props: ButtonProps) {
    const { type = 'primary', children, className = '', onClick } = props;
    return (
        <button
            className={`${Style.button} ${type} ${className}`}
            type="button"
            onClick={onClick}
        >
            {children}
        </button>
    );
}

Button.defaultProps = {
    type: 'primary',
};

export default Button;
