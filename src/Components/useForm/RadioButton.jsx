import React from 'react';

function RadioButton({
    label,
    className,
    id,
    name,
    value,
    checked,
    onChange,
    option,
    error,
    ...props
}, ref) {
    return (
        <>
            <div className=''>
                <label className="block text-sm font-medium leading-6 mb-2 text-gray-900">
                    {label}
                </label>
                <div className="flex items-center space-x-6 mt-2">
                    {option.map((data, index) => (
                        <>
                            <div key={index} className={`flex items-center gap-x-3 ${className}`}>
                                <input
                                    type="radio"
                                    id={id}
                                    value={data}
                                    checked={checked}
                                    onChange={onChange}
                                    name={name}
                                    ref={ref}
                                    {...props}
                                />
                                {data && <label htmlFor={id} className="ml-2">{data}</label>}
                            </div>
                        </>
                    ))}
                </div>
            </div >
            {error && <span>{label} is required</span>}
        </>
    );
}

export default React.forwardRef(RadioButton);


// <div className="sm:col-span-4">
//     <label className="block text-sm font-medium leading-6 text-gray-900">Gender</label>
//     <div className="flex items-center space-x-6 mt-2">
//         <div className="flex items-center gap-x-3">
//             <input
//                 name="gender"
//                 type="radio"
//                 className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
//             />
//             <label
//                 htmlFor="gender"
//                 className="block text-sm font-medium leading-6 text-gray-900"
//             >
//                 Male
//             </label>
//         </div>
//         <div className="flex items-center gap-x-3">
//             <input
//                 name="gender"
//                 type="radio"
//                 className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
//             />
//             <label
//                 htmlFor="gender"
//                 className="block text-sm font-medium leading-6 text-gray-900"
//             >
//                 Female
//             </label>
//         </div>
//     </div>
// </div>