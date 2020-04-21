import React from 'react';
import classnames from 'classnames'

export const TextInputField = (props) => {

    const { onChange, type, value, name, error, label } = props;

    return (

        <div className="input-field col s6">
            <input
                onChange={e => onChange(e.target.value)}
                value={value}
                error={error}
                id={name}
                name={name}
                type={type || 'text'}
                className={classnames('', { invalid: error })}
            />
            {label && label !== null && (
                <label htmlFor={name} className="active">
                    {label}
                </label>
            )}
            {error && error !== null && <span className="red-text">{error}</span>}
        </div>
    )

}


