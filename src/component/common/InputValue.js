import React, { useState } from 'react';
import Button from '../Button';

const InputValue = ({ title, ...props }) => {
    const { placeholder, id, onChange, readOnly, value, type, disabled } =
        props;
    const inputProps = {
        id,
        type: type || 'text',
        className: 'inputValue form-control',
        value,
        placeholder,
        onChange,
        ...(readOnly ? { readOnly: true } : {}), // readOnly가 true일 때만 추가
        ...(disabled ? { disabled: true } : {}), // disabled가 true일 때만 추가
    };

    return (
        <div className="form-group">
            <label className="form-label" htmlFor={id}>
                {title}
            </label>
            <br />
            <input {...inputProps} />
        </div>
    );
};

const InputValueWithBtn = ({ title, onClick, ...props }) => {
    const { placeholder, id, onChange, readOnly, value, type, disabled } =
        props;
    const inputProps = {
        id,
        type: type || 'text',
        className: 'inputValue form-control',
        value,
        placeholder,
        onChange,
        ...(readOnly ? { readOnly: true } : {}), // readOnly가 true일 때만 추가
        ...(disabled ? { disabled: true } : {}), // disabled가 true일 때만 추가
    };

    return (
        <div className="form-group">
            <label className="form-label" htmlFor={id}>
                {title}
            </label>
            <br />
            <input {...inputProps} />
            <Button text={'등록'} onClick={onClick} />
        </div>
    );
};

export { InputValue, InputValueWithBtn };
