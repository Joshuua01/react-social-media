import React, { useState } from "react";
import Navbar from "./Navbar";
import { useDispatch, useSelector } from "react-redux";
import { addAlbum, selectAlbums } from "../features/album/albumSlice";
import Album from "./Album";
import { AppDispatch } from "../tools/store";
import { selectCurrentUser } from "../features/currentUser/currentUserSlice";

const AlbumsPage: React.FC = () => {
  const albums = useSelector(selectAlbums);
  const currentUser = useSelector(selectCurrentUser);
  const [title, setTitle] = useState("");
  const dispatch = useDispatch<AppDispatch>();

  const handleAlbumAdd = () => {
    dispatch(addAlbum({ title, userId: currentUser?.id }));
    setTitle("");
  };

  return (
    <div className="min-h-screen min-w-screen bg-slate-900">
      <Navbar />
      <div className="flex justify-center flex-col items-center">
        <div className="w-7/12 mt-5 flex">
          <div className="w-4/5 min-w-0">
            <input
              type="text"
              name="post-body"
              id="post-body"
              className="relative block w-full rounded-l-md text-sm border ring-1 ring-gray-600 py-1.5 focus:ring-indigo-600 focus:border-indigo-600 bg-gray-700 border-gray-600 placeholder-gray-400 text-white"
              placeholder="Post body"
              autoComplete="off"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <button
            type="button"
            className="min-w-0 flex-1 relative items-center gap-x-1.5 rounded-r-md px-3 py-1.5 text-sm font-semibold text-white  bg-indigo-600 ring-1 ring-indigo-600 hover:bg-indigo-700 hover:ring-indigo-700"
            onClick={handleAlbumAdd}
          >
            Publish
          </button>
        </div>
        {albums.map((album) => (
          <Album key={album.id} album={album} />
        ))}
      </div>
    </div>
  );
};

export default AlbumsPage;
