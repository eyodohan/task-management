import { Link } from "react-router-dom";

const TaskCard = ({
  id,
  title,
  description,
  user,
  assignedDepartment,
  status,
  deleteTask,
  completeTask,
  rejectTask,
}) => {
  return (
    <>
      <tr>
        <td>{user}</td>
        <td>{title}</td>
        <td>{description}</td>
        <td>{assignedDepartment}</td>
        <td>{status}</td>
        <td>
          <Link to={`/taskDetail/${id}`} className="btn btn-warning btn-sm">
            Details
          </Link>
        </td>
        <td>
          <Link to={`/editTask/${id}`} className="btn btn-warning btn-sm">
            Edit
          </Link>
        </td>
        <td>
          <button
            className="btn btn-danger btn-sm"
            onClick={() => deleteTask(id)}
          >
            Delete
          </button>
        </td>
        <td>
          <button
            className="btn btn-success btn-sm"
            onClick={() => completeTask(id)}
          >
            Complete
          </button>
        </td>
        <td>
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => rejectTask(id)}
          >
            Reject
          </button>
        </td>
      </tr>
    </>
  );
};

export default TaskCard;
