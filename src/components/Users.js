import React, { useEffect, useState } from "react";
import auth from "../services/authService";
import UsersList from "./UsersList";

const Users = () => {
  const [users, setUsers] = useState(null);
  const [showBtn, setShowBtn] = useState(true);
  useEffect(() => {
    getAllUsers();
  }, []);
  const getAllUsers = async () => {
    const allUsers = await auth.getAllUsers();
    console.log(allUsers);
    setUsers(allUsers);
    setShowBtn(false);
  };
  return <>{users && <UsersList users={users} />}</>;
};

export default Users;
