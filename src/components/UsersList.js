import React from 'react';

const UsersList = ({ users }) => {
  return (
    <>
      <h4>All Users</h4>
      <table className='table'>
        <thead>
          <tr>
            <th scope='col'>Name</th>
            <th scope='col'>Title</th>
            <th scope='col'>Email</th>
            <th scope='col'>Department</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.name}>
              <td>{user.name}</td>
              <td>{user.title}</td>
              <td>{user.email}</td>
              <td>{user.department}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default UsersList;
