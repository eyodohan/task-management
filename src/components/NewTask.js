import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Joi from "joi-browser";
import task from "../services/taskService";
import CustomInput from "../common/CustomInput";
import Select from "../common/Select";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { createTask } from "../store/task";

const NewTask = () => {
  const [data, setData] = useState({
    title: "",
    description: "",
    assignedDepartment: "",
  });
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const schema = {
    title: Joi.string().required().label("Title"),
    description: Joi.string().required().label("Description"),
    assignedDepartment: Joi.string()
      .required()
      .min(1)
      .max(2)
      .label("Assigned Department"),
  };
  const validate = () => {
    const result = Joi.validate(data, schema, { abortEarly: false });
    // console.log(result);
    const newErrors = { ...errors };
    if (!result.error) return null;
    result.error.details.map(
      (error) => (newErrors[error.path[0]] = error.message)
    );
    return newErrors;
  };

  const validateProperty = (input) => {
    const obj = { [input.name]: input.value };
    const subSchema = { [input.name]: schema[input.name] };
    const result = Joi.validate(obj, subSchema);
    // console.log(result);
    return result.error ? result.error.details[0].message : null;
  };
  const navigate = useNavigate();

  const options = [{ number: 1 }, { number: 2 }];

  const handleChange = ({ target }) => {
    const newErrors = { ...errors };
    const errorMessage = validateProperty(target);
    if (errorMessage) newErrors[target.name] = errorMessage;
    else delete newErrors[target.name];
    setErrors(newErrors);
    const newTask = { ...data };
    newTask[target.name] = target.value;
    setData(newTask);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newError = validate();
    if (newError) return setErrors(newError);
    dispatch(createTask(data));
    toast.success("Task başarı ile oluşturuldu.");
    navigate("/tasks");
  };

  return (
    <>
      <h4>New Task</h4>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <CustomInput
            name="title"
            label="Title"
            error={errors?.title}
            onChange={handleChange}
          />
          <CustomInput
            name="description"
            label="Description"
            error={errors?.description}
            onChange={handleChange}
          />
          <Select
            name="assignedDepartment"
            label="Assigned Department"
            error={errors?.assignedDepartment}
            options={options}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Create Task
        </button>
      </form>
    </>
  );
};

export default NewTask;
