import React, { useState } from "react";
import Navbar from "./Navbar";
import {
  logoutUser,
  selectCurrentUser,
} from "../features/currentUser/currentUserSlice";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, editUser, selectUsers } from "../features/user/userSlice";
import { AppDispatch } from "../tools/store";

const UserPage: React.FC = () => {
  const currentUser = useSelector(selectCurrentUser);
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector(selectUsers).find(
    (user) => user.id === currentUser?.id
  );
  const [userState, setUserState] = useState(user);

  const handleUserEdit = () => {
    dispatch(editUser(userState));
    dispatch(logoutUser());
  };

  const handleUserDelete = () => {
    dispatch(deleteUser(userState?.id));
    dispatch(logoutUser());
  };

  return (
    <div className="min-h-screen min-w-screen bg-slate-900">
      <Navbar />
      <div className="flex justify-center items-center flex-col mt-10">
        <div className="bg-gray-800 p-10 shadow-lg rounded-sm flex flex-col gap-8 w-5/12">
          <h1 className="text-4xl text-white">Hello, {currentUser?.name}!</h1>
          <input
            type="text"
            name="username"
            className="relative block w-full rounded-md text-sm border ring-1 ring-gray-600 py-1.5 focus:ring-indigo-600 focus:border-indigo-600 bg-gray-700 border-gray-600 placeholder-gray-400 text-white"
            placeholder="Username"
            autoComplete="off"
            value={userState?.username}
            onChange={(e) =>
              setUserState({ ...userState, username: e.target.value })
            }
          />
          <input
            type="text"
            name="name"
            className="relative block w-full rounded-md text-sm border ring-1 ring-gray-600 py-1.5 focus:ring-indigo-600 focus:border-indigo-600 bg-gray-700 border-gray-600 placeholder-gray-400 text-white"
            placeholder="Name"
            autoComplete="off"
            value={userState?.name}
            onChange={(e) =>
              setUserState({ ...userState, name: e.target.value })
            }
          />
          <input
            type="email"
            name="username"
            className="relative block w-full rounded-md text-sm border ring-1 ring-gray-600 py-1.5 focus:ring-indigo-600 focus:border-indigo-600 bg-gray-700 border-gray-600 placeholder-gray-400 text-white"
            placeholder="Email"
            autoComplete="off"
            value={userState?.email}
            onChange={(e) =>
              setUserState({ ...userState, email: e.target.value })
            }
          />
          <button
            type="button"
            className="min-w-0 flex-1 relative items-center rounded-md px-3 py-2 text-sm font-semibold text-white  bg-indigo-600 ring-1 ring-indigo-600 hover:bg-indigo-700 hover:ring-indigo-700 transition-all duration-200 ease-in-out"
            onClick={handleUserEdit}
          >
            Save changes
          </button>
          <button
            type="button"
            className="min-w-0 flex-1 relative items-center rounded-md px-3 py-2 text-sm font-semibold text-white  bg-indigo-600 ring-1 ring-indigo-600 hover:bg-indigo-700 hover:ring-indigo-700 transition-all duration-200 ease-in-out"
            onClick={handleUserDelete}
          >
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserPage;
