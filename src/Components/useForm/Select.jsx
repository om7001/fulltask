import React from 'react';

function Select({
  label,
  options,
  className,
  id,
  error,
  ...props
}, ref) {
  return (
    <div className="">
      {label && <label className="block text-sm font-medium leading-6 mb-2 text-gray-900">{label}</label>}
      <select
        className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${className}`}
        {...props}
        ref={ref}
        id={id}
      >
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <span>{label} is required</span>}
    </div>
  );
}

export default React.forwardRef(Select);	