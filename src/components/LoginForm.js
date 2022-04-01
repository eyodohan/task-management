import React, { useState } from "react";
import Joi from "joi-browser";
import { toast } from "react-toastify";
import CustomInput from "../common/CustomInput";
import CustomButton from "../common/CustomButton";
import { useDispatch } from "react-redux";
import { loginUser } from "../store/auth";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [data, setData] = useState({ username: "" });
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const schema = {
    username: Joi.string().required().email().label("Username"),
  };

  const validate = () => {
    const result = Joi.validate(data, schema);
    console.log(result);
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

  const disabled = validate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (newErrors) return setErrors(newErrors);

    doSubmit();
  };

  const handleChange = ({ target: input }) => {
    const newErrors = { ...errors };
    const errorMessage = validateProperty(input);
    if (errorMessage) newErrors[input.name] = errorMessage;
    else delete newErrors[input.name];
    setErrors(newErrors);

    const newdata = { ...data };
    newdata[input.name] = input.value;
    setData(newdata);
  };

  // const doSubmit = async () => {
  //   try {
  //     await auth.login(data.username);
  //     toast.success("başarı ile giriş yapıldı");
  //     window.location = "/tasks";
  //   } catch (error) {
  //     if (error.response && error.response.status === 404) {
  //       const err = { ...errors };
  //       err.username = error.message;
  //       setErrors(err);
  //       toast.error("Sisteme girmeye yetkili değilsiniz.");
  //       // console.log(error.message);
  //     }
  //   }
  // };

  const doSubmit = () => {
    try {
      // setJwt();
      dispatch(loginUser(data.username));
      navigate("/tasks");
      localStorage.setItem("auth");
    } catch (error) {
      if (error.response && error.response.status === 404) {
        const err = { ...errors };
        err.username = error.message;
        setErrors(err);
        toast.error("Sisteme girmeye yetkili değilsiniz.");
        console.log(error.message);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CustomInput
        name="username"
        label="Email"
        type="email"
        id="email"
        error={errors?.username}
        onChange={handleChange}
      />
      <CustomButton
        label="Login"
        disabled={disabled}
        className="btn btn-primary"
      />
    </form>
  );
};

export default LoginForm;
