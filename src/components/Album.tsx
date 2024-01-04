import React, { useState } from "react";
import { IAlbum } from "../entities/IAlbum";
import { useDispatch, useSelector } from "react-redux";
import { selectUsers } from "../features/user/userSlice";
import { IUser } from "../entities/IUser";
import {
  removePicturesByAlbumId,
  selectPictures,
} from "../features/picture/pictureSlice";
import { IPicture } from "../entities/IPicture";
import { useNavigate } from "react-router-dom";
import { selectCurrentUser } from "../features/currentUser/currentUserSlice";
import { AppDispatch } from "../tools/store";
import { editAlbum, removeAlbum } from "../features/album/albumSlice";

interface AlbumProps {
  album: IAlbum;
}

const Album: React.FC<AlbumProps> = ({ album }) => {
  const currentUser = useSelector(selectCurrentUser);
  const [isAlbumEdit, setIsAlbumEdit] = useState(false);
  const [albumState, setAlbumState] = useState<IAlbum>(album);
  const dispatch = useDispatch<AppDispatch>();
  const creator = useSelector(selectUsers).find(
    (user: IUser) => user.id === album.userId
  );
  const pictures = useSelector(selectPictures).filter(
    (picture: IPicture) => picture.albumId === album.id
  );
  const navigate = useNavigate();

  const handleShowPictures = () => {
    navigate(`/pictures?album=${album.id}`);
  };

  const handleAlbumDelete = () => {
    dispatch(removeAlbum(album.id));
    dispatch(removePicturesByAlbumId(album.id));
  };

  const handleAlbumEdit = () => {
    setIsAlbumEdit(!isAlbumEdit);
    dispatch(editAlbum(albumState));
  };

  return (
    <div className="bg-gray-800 p-5 mt-6 w-7/12 rounded-md shadow-md">
      <div className="m-4 border-b-[1px] border-slate-300 border-opacity-40 flex items-center justify-between">
        <h2 className="text-white font-medium p-4">{creator?.name}</h2>
        <div className="flex items-center flex-row p-4 gap-3">
          {currentUser?.id === creator?.id && (
            <div>
              <svg
                viewBox="0 0 1024 1024"
                fill="currentColor"
                className="w-6 h-6 cursor-pointer hover:text-orange-600"
                onClick={handleAlbumEdit}
              >
                <path
                  d="M880 836H144c-17.7 0-32 14.3-32 32v36c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-36c0-17.7-14.3-32-32-32zm-622.3-84c2 0 4-.2 6-.5L431.9 722c2-.4 3.9-1.3 5.3-2.8l423.9-423.9a9.96 9.96 0 000-14.1L694.9 114.9c-1.9-1.9-4.4-2.9-7.1-2.9s-5.2 1-7.1 2.9L256.8 538.8c-1.5 1.5-2.4 3.3-2.8 5.3l-29.5 168.2a33.5 33.5 0 009.4 29.8c6.6 6.4 14.9 9.9 23.8 9.9z"
                  className="fill-current text-indigo-600 hover:text-red-600"
                />
              </svg>
            </div>
          )}
          {currentUser?.id === creator?.id && (
            <svg
              viewBox="0 0 448 512"
              fill="currentColor"
              className="w-5 h-5 cursor-pointer"
              onClick={handleAlbumDelete}
            >
              <path
                d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64s14.3 32 32 32h384c17.7 0 32-14.3 32-32s-14.3-32-32-32h-96l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32l21.2 339c1.6 25.3 22.6 45 47.9 45h245.8c25.3 0 46.3-19.7 47.9-45L416 128z"
                className="fill-current text-indigo-600 hover:text-red-600"
              />
            </svg>
          )}
        </div>
      </div>
      {isAlbumEdit ? (
        <input
          type="text"
          id="title"
          className=" border text-sm rounded-lg ring-1 ring-gray-600 focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white"
          placeholder="Edit post title..."
          required
          value={albumState.title}
          autoComplete="off"
          onChange={(e) => {
            setAlbumState({ ...albumState, title: e.target.value });
          }}
        />
      ) : (
        <div className="text-slate-400 p-4">{album.title}</div>
      )}

      <div
        className="text-slate-400 p-4 cursor-pointer"
        onClick={handleShowPictures}
      >
        Pictures: {pictures.length}
      </div>
    </div>
  );
};

export default Album;
