import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import task from '../services/taskService';
import CustomInput from '../common/CustomInput';
import { useDispatch } from 'react-redux';
import { updateTask } from '../store/task';

const EditTask = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    populateTask();
  }, []);

  const handleChange = ({ target: input }) => {
    const editedTask = { ...data };
    editedTask[input.name] = input.value;
    setData(editedTask);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateTask(data));
    navigate('/tasks');
  };

  async function populateTask() {
    setIsLoading(true);
    const selectedTask = await task.getTask(id);
    setData(selectedTask);
    setIsLoading(false);
  }

  return (
    <>
      <h4>Edit Task</h4>
      <form onSubmit={handleSubmit}>
        <div className='mb-3'>
          {isLoading ? (
            <div>yükleniyor</div>
          ) : (
            <>
              <CustomInput
                name='title'
                label='Title'
                value={data?.title}
                onChange={handleChange}
              />
              <CustomInput
                name='description'
                label='Description'
                value={data?.description}
                onChange={handleChange}
              />
            </>
          )}
        </div>
        <button className='btn btn-primary'>Edit Task</button>
      </form>
    </>
  );
};

export default EditTask;
