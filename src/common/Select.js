const Select = ({ name, label, value, options, error, onChange }) => {
  return (
    <div className="mb-3">
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <select
        className="form-select"
        value={value}
        onChange={onChange}
        name={name}
        id={name}
      >
        <option value="" />
        {options.map((department) => (
          <option key={department.number} value={department.number}>
            {department.number}
          </option>
        ))}
      </select>
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Select;
