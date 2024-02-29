import React from 'react'

function Input({
    label,
    type,
    className,
    id,
    value,
    error,
    ...props

}, ref) {
    return (
        <div className="">
            {label && <label className="block text-sm font-medium leading-6 mb-2 text-gray-900"> {label} </label>}
            <input
                type={type}
                className={`block w-full rounded-md px-3 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${className}`}
                ref={ref}
                id={id}
                value={value}
                {...props}
            />
            {error && <span className='text-red-500'>{error.message ? error.message : `${label} is required`}</span>}

        </div>
    )
}

export default React.forwardRef(Input)