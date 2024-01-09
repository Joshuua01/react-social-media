import React, { useState } from "react";
import Navbar from "./Navbar";
import {
  logoutUser,
  selectCurrentUser,
} from "../features/currentUser/currentUserSlice";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, editUser, selectUsers } from "../features/user/userSlice";
import { AppDispatch } from "../tools/store";
import Modal from "./Modal";
import { removePostsByUserId } from "../features/post/postSlice";
import { removeCommentsByUserId } from "../features/comment/commentSlice";
import {
  removeAlbumsByUserId,
  selectAlbums,
} from "../features/album/albumSlice";
import { removeTodosByUserId } from "../features/todo/todoSlice";
import { removePicturesByAlbumId } from "../features/picture/pictureSlice";

const UserPage: React.FC = () => {
  const currentUser = useSelector(selectCurrentUser);
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector(selectUsers).find(
    (user) => user.id === currentUser?.id
  );
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  if (!user) {
    return null;
  }
  const userAlbums = useSelector(selectAlbums).filter(
    (album) => album.userId === currentUser?.id
  );

  const [userState, setUserState] = useState(user);

  const handleUserEdit = () => {
    dispatch(editUser(userState));
    dispatch(logoutUser());
  };

  const handleUserDelete = () => {
    dispatch(removePostsByUserId(userState?.id));
    dispatch(removeCommentsByUserId(userState?.id));
    dispatch(removeAlbumsByUserId(userState?.id));
    userAlbums.map((album) => {
      dispatch(removePicturesByAlbumId(album.id));
    });
    dispatch(removeTodosByUserId(userState?.id));
    dispatch(deleteUser(userState?.id));
    dispatch(logoutUser());
  };

  return (
    <>
      <Modal
        onClickAccept={handleUserEdit}
        onClickCancel={() => setIsEditOpen(!isEditOpen)}
        isOpen={isEditOpen}
      />
      <Modal
        onClickAccept={handleUserDelete}
        onClickCancel={() => setIsDeleteOpen(!isDeleteOpen)}
        isOpen={isDeleteOpen}
      />
      <div className="min-h-screen min-w-screen bg-slate-900">
        <Navbar />
        <div className="flex justify-center items-center flex-col mt-10">
          <div className="bg-gray-800 p-10 shadow-lg rounded-sm flex flex-col gap-8 w-5/12">
            <h1 className="text-4xl text-white border-b-[1px] border-slate-300 border-opacity-40 p-4">
              Hello, {currentUser?.name}!
            </h1>
            <div>
              <label
                htmlFor="username"
                className="text-white uppercase text-xs tracking-widest"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                className="relative block w-full rounded-md text-sm border ring-1 ring-gray-600 py-1.5 focus:ring-indigo-600 focus:border-indigo-600 bg-gray-700 border-gray-600 placeholder-gray-400 text-white"
                placeholder="Username"
                autoComplete="off"
                value={userState?.username}
                onChange={(e) =>
                  setUserState({ ...userState, username: e.target.value })
                }
              />
            </div>
            <div>
              <label
                htmlFor="name"
                className="text-white uppercase text-xs tracking-widest"
              >
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                className="relative block w-full rounded-md text-sm border ring-1 ring-gray-600 py-1.5 focus:ring-indigo-600 focus:border-indigo-600 bg-gray-700 border-gray-600 placeholder-gray-400 text-white"
                placeholder="Name"
                autoComplete="off"
                value={userState?.name}
                onChange={(e) =>
                  setUserState({ ...userState, name: e.target.value })
                }
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="text-white uppercase text-xs tracking-widest"
              >
                Email
              </label>
              <input
                type="email"
                name="username"
                id="email"
                className="relative block w-full rounded-md text-sm border ring-1 ring-gray-600 py-1.5 focus:ring-indigo-600 focus:border-indigo-600 bg-gray-700 border-gray-600 placeholder-gray-400 text-white"
                placeholder="Email"
                autoComplete="off"
                value={userState?.email}
                onChange={(e) =>
                  setUserState({ ...userState, email: e.target.value })
                }
              />
            </div>
            <div className="flex flex-col gap-5">
              <button
                type="button"
                className="items-center rounded-md px-3 py-3 text-xs font-bold tracking-wider uppercase text-white  bg-indigo-600 ring-1 ring-indigo-600 hover:bg-indigo-700 hover:ring-indigo-700 transition-all duration-150"
                onClick={() => setIsEditOpen(!isEditOpen)}
              >
                Save changes
              </button>
              <button
                type="button"
                className="items-center rounded-md px-3 py-3 text-xs font-bold tracking-wider uppercase text-white  bg-red-600 ring-1 ring-red-600 hover:bg-red-800 hover:ring-red-800 transition-all duration-150"
                onClick={() => setIsDeleteOpen(!isDeleteOpen)}
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserPage;
