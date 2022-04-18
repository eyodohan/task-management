import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import task from '../services/taskService';

const TaskDetail = () => {
  const [data, setData] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    getTaskDetail();
  }, []);
  const getTaskDetail = async () => {
    const taskDetail = await task.getTask(id);
    setData(mapToViewModel(taskDetail));
  };

  function mapToViewModel(taskItem) {
    return {
      title: taskItem.title,
      description: taskItem.description,
      username: taskItem.logs[0].userName,
      date: taskItem.logs[0].date,
      assignedDepartment: taskItem.assignedDepartment,
      status: taskItem.status,
    };
  }

  const handleClick = () => {
    navigate('/tasks');
  };

  return (
    <>
      <h4>Task {id} Details</h4>

      <table className='table'>
        <thead>
          <tr>
            <th scope='col'>Title</th>
            <th scope='col'>Description</th>
            <th scope='col'>Username</th>
            <th scope='col'>Date</th>
            <th scope='col'>Assigned Department</th>
            <th scope='col'>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{data?.title}</td>
            <td>{data?.description}</td>
            <td>{data?.username}</td>
            <td>{data?.date}</td>
            <td>{data?.assignedDepartment}</td>
            <td>{data?.status}</td>
          </tr>
        </tbody>
      </table>
      <button className='btn btn-success' onClick={handleClick}>
        Back Tasks
      </button>
    </>
  );
};

export default TaskDetail;
