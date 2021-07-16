import React, { useRef, useState } from 'react';

import IconButton from './IconButton';
import Style from './Input.less';

interface InputProps {
    value?: string;
    type?: string;
    placeholder?: string;
    className?: string;
    onChange: (value: string) => void;
    onEnter?: (value: string) => void;
    onFocus?: () => void;
}

function Input(props: InputProps) {
    const {
        value,
        type = 'text',
        placeholder = '',
        className = '',
        onChange,
        onEnter = () => {},
        onFocus = () => {},
    } = props;

    function handleInput(e: any) {
        onChange(e.target.value);
    }

    const [lockEnter, setLockEnter] = useState(false);
    function handleIMEStart() {
        setLockEnter(true);
    }
    function handleIMEEnd() {
        setLockEnter(false);
    }
    function handleKeyDown(e: any) {
        if (lockEnter) {
            return;
        }
        if (e.key === 'Enter') {
            onEnter(value as string);
        }
    }

    const $input = useRef(null);
    function handleClickClear() {
        onChange('');
        // @ts-ignore
        $input.current.focus();
    }

    return (
        <div className={`${Style.inputContainer} ${className}`}>
            <input
                className={Style.input}
                type={type}
                value={value}
                onChange={handleInput}
                onInput={handleInput}
                placeholder={placeholder}
                ref={$input}
                onKeyDown={handleKeyDown}
                onCompositionStart={handleIMEStart}
                onCompositionEnd={handleIMEEnd}
                onFocus={onFocus}
            />
            <IconButton
                className={Style.inputIconButton}
                width={32}
                height={32}
                iconSize={18}
                icon="clear"
                onClick={handleClickClear}
            />
        </div>
    );
}

export default Input;
