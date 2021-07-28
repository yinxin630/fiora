import React from 'react';

import { css } from 'linaria';

const button = css`
    border: none;
    background-color: var(--primary-color-8_5);
    color: var(--primary-text-color-10);
    border-radius: 4px;
    font-size: 14px;
    transition: background-color 0.4s;
    user-select: none !important;

    &:hover {
        background-color: var(--primary-color-10);
    }
`;

type Props = {
    /** 类型: primary / danger */
    type?: string;
    /** 按钮文本 */
    children: string;
    className?: string;
    /** 点击事件 */
    onClick?: () => void;
};

function Button({
    type = 'primary',
    children,
    className = '',
    onClick,
}: Props) {
    return (
        <button
            className={`${button} ${type} ${className}`}
            type="button"
            onClick={onClick}
        >
            {children}
        </button>
    );
}

export default Button;
