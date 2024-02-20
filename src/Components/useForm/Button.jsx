import React from 'react';

const Button = ({
  type,
  onClick,
  label,
  className,
  ...props
}, ref) => {
  return (
    <button
      type={type}
      className={className}
      {...props}
      onClick={onClick}>
      {label}
    </button>
  );
};

export default Button;