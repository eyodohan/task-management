import React, { useState } from 'react';
import Joi from 'joi-browser';
import CustomInput from '../common/CustomInput';
import CustomButton from '../common/CustomButton';
import { useDispatch } from 'react-redux';
import { loginUser } from '../store/auth';

const LoginForm = () => {
  const [data, setData] = useState({ username: '' });
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();

  const schema = {
    username: Joi.string().required().email().label('Username'),
  };

  const validate = () => {
    const result = Joi.validate(data, schema);
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

  const doSubmit = () => {
    dispatch(loginUser(data.username));
  };

  return (
    <form onSubmit={handleSubmit}>
      <CustomInput
        name='username'
        label='Email'
        type='email'
        id='email'
        error={errors?.username}
        onChange={handleChange}
      />
      <CustomButton
        label='Login'
        disabled={disabled}
        className='btn btn-primary'
      />
    </form>
  );
};

export default LoginForm;
