import React from "react";

const CustomInput = ({
  name,
  label,
  value,
  type = "text",
  id,
  error,
  onChange,
}) => {
  return (
    <div className="mb-3">
      <label htmlFor={name}>{label}</label>
      <input
        className="form-control"
        name={name}
        type={type}
        value={value}
        id={id}
        onChange={onChange}
      />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default CustomInput;
