import React, { useState } from 'react';
import Button from '../Button';
import './InputValue.css';
const InputValue = React.memo(({ title, ...props }) => {
    const {
        placeholder,
        id,
        onChange,
        readOnly,
        value,
        type,
        disabled,
        onInput,
        maxLength,
        onKeyDown,
        onClick,
    } = props;
    const inputProps = {
        id,
        type: type || 'text',
        className: 'inputValue form-control',
        value: value,
        placeholder,
        onChange,
        ...(readOnly ? { readOnly: true } : {}), // readOnly가 true일 때만 추가
        ...(disabled ? { disabled: true } : {}), // disabled가 true일 때만 추가
        maxLength,
        onInput,
        onKeyDown,
        onClick,
    };

    return (
        <div className="form-group custom-input-container">
            {title ? (
                <label className="form-label" htmlFor={id}>
                    {title}
                </label>
            ) : (
                ''
            )}
            <input {...inputProps} />
        </div>
    );
});

const InputValueWithBtn = React.memo(
    ({ title, onClick, btnText, ...props }) => {
        const { placeholder, id, onChange, readOnly, value, type, disabled } =
            props;
        const inputProps = {
            id,
            type: type || 'text',
            className: 'inputValue form-control',
            value: value,
            placeholder,
            onChange,
            ...(readOnly ? { readOnly: true } : {}), // readOnly가 true일 때만 추가
            ...(disabled ? { disabled: true } : {}), // disabled가 true일 때만 추가
        };

        return (
            <div className="form-group custom-input-container">
                {title ? (
                    <label className="form-label" htmlFor={id}>
                        {title}
                    </label>
                ) : (
                    ''
                )}
                <input {...inputProps} />
                <Button text={btnText} onClick={onClick} />
            </div>
        );
    },
);
export { InputValue, InputValueWithBtn };
