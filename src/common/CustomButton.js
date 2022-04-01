import React from "react";

const CustomButton = ({
  label,
  disabled = false,
  className = "btn btn-outline-primary",
  name,
  onClick,
}) => {
  return (
    <button
      className={className}
      disabled={disabled}
      onClick={onClick}
      name={name}
    >
      {label}
    </button>
  );
};

export default CustomButton;
