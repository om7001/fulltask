import React from 'react';

function CheckBoxButton({
    label,
    className,
    id,
    name,
    error,
    option,
    ...props
}, ref) {
    return (
        <>
            <div className="mb-3 row">
                <label className="form-label col-auto">
                    {label}
                </label>
                {option.map((data, index)=>(
                    <div key={index} className="form-check col-auto">
                        <input
                            type="checkbox"
                            className={`form-check-input ${className}`}                        
                            ref={ref}
                            name={name}
                            id={id}
                            value={data}
                            {...props}
                        />
                        {<label className="form-check-label">{data}</label>}
                    </div>
                ))}
                {error && <span>{label} is required</span>}
            </div>
        </>
    );
}

export default React.forwardRef(CheckBoxButton);