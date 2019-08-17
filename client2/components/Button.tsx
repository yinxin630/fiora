import React from 'react';

import Style from './Button.less';

interface ButtonProps {
    /** 类型: primary / danger */
    type: string;
    /** 按钮文本 */
    children: string;
}

function Button(props: ButtonProps) {
    const { type, children, ...otherProps } = props;
    return (
        <button
            className={`${Style.button} ${type}`}
            type="button"
            {...otherProps}
        >
            {children}
        </button>
    );
}

Button.defaultProps = {
    type: 'primary',
};

export default Button;
