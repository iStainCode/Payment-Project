import { createContext, useContext, useState } from "react";
import {
  createUserRequest,
  deleteUserRequest,
  getUsersRequest,
  updateUserRequest,
  getUserRequest
} from "../api/Users";
import bcrypt from 'bcryptjs';

const UserContext = createContext();

export const useUser = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("UseUser deve de estar dentro de un provider");
  }

  return context;
};

export function UserProvider({ children }) {
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    try {
      const res = await getUsersRequest();
      setUsers(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const createUser = async (user) => {
    try {

      const hashedPassword = await bcrypt.hash(user.password, 10);
      const res = await createUserRequest({ ...user, password: hashedPassword });
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const updateUser = async (id, user) => {
    try {
      if (user.password) {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        user.password = hashedPassword;
      }

      await updateUserRequest(id, user);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteUser = async (id) => {
    try {
      const res = await deleteUserRequest(id);
      if (res.status === 204)
      setUsers(users.filter(user => user._id !== id));
      window.location.reload()
    } catch (error) {
      console.log(error);
    }
  };

  const getUser = async (id) =>{
    try {
      const res = await getUserRequest(id)
      return res.data
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <UserContext.Provider
      value={{
        users,
        createUser,
        getUsers,
        deleteUser,
        updateUser,
        getUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}