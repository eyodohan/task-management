import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import CustomButton from '../common/CustomButton';
import {
  getTasks,
  myTasks,
  departmentTasks,
  deleteTask,
  completeTask,
  rejectTask,
} from '../store/task';
import TaskCard from './TaskCard';

const Tasks = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const taskList = useSelector((state) => state.task.list);

  useEffect(() => {
    dispatch(getTasks());
  }, []);

  const handleClick = ({ target: button }) => {
    if (button.name === 'allTasks') dispatch(getTasks());
    else if (button.name === 'myTasks') dispatch(myTasks());
    else if (button.name === 'createTask') navigate('/newTask');
    else dispatch(departmentTasks());
  };

  function deleteTaskById(taskId) {
    dispatch(deleteTask(taskId));
  }

  function completeTaskById(taskId) {
    dispatch(completeTask(taskId));
  }
  function rejectTaskById(taskId) {
    dispatch(rejectTask(taskId));
  }

  const columns = [
    { path: 'name', label: 'Name' },
    { path: 'title', label: 'Title' },
    { path: 'description', label: 'Description' },
    { path: 'department', label: 'Department' },
    { path: 'status', label: 'Status' },
  ];

  return (
    <div className='container'>
      <div className='row'>
        <div
          className='btn-group'
          role='group'
          aria-label='Vertical button group'
        >
          <CustomButton
            name='allTasks'
            label='All Tasks'
            onClick={handleClick}
          />
          <CustomButton name='myTasks' label='My Tasks' onClick={handleClick} />
          <CustomButton
            name='departmentTasks'
            label='Department Tasks'
            onClick={handleClick}
          />
          <CustomButton
            name='createTask'
            label='Create Task'
            onClick={handleClick}
          />
        </div>

        {taskList?.length !== 0 ? (
          <table className='table mt-2'>
            <thead>
              <tr>
                {columns.map((column) => (
                  <th key={column.path} scope='col'>
                    {column.label}
                  </th>
                ))}
              </tr>
            </thead>
            {taskList?.map((task) => {
              const {
                id,
                title,
                description,
                user,
                assignedDepartment,
                status,
              } = task;
              return (
                <tbody key={id}>
                  <TaskCard
                    id={id}
                    title={title}
                    description={description}
                    user={user?.name}
                    assignedDepartment={assignedDepartment}
                    status={status}
                    deleteTask={deleteTaskById}
                    completeTask={completeTaskById}
                    rejectTask={rejectTaskById}
                  />
                </tbody>
              );
            })}
          </table>
        ) : (
          <p className='mt-3'>Tamamlanacak herhangi bir task yoktur.</p>
        )}
      </div>
    </div>
  );
};

export default Tasks;
