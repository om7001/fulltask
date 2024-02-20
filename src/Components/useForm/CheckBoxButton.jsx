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
            <div className="flex items-center">
                
                <div className="flex flex-wrap">
                    {option.map((data, index) => (
                        <div key={index} className="form-check mr-3 mb-3">
                            <input
                                type="checkbox"
                                className={`form-checkbox ${className}`}
                                ref={ref}
                                name={name}
                                id={`${id}-${index}`}
                                value={data}
                                {...props}
                            />
                            {<label htmlFor={`${id}-${index}`} className="ml-2 form-check-label">{data}</label>}
                        </div>
                    ))}
                    <label className="form-label mr-3">
                    {label}
                </label>
                </div>
                {error && <span className="text-red-500">{label} is required</span>}
            </div>


        </>
    );
}

export default React.forwardRef(CheckBoxButton);