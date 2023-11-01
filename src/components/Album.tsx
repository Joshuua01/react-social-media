import React from 'react';
import { IAlbum } from '../entities/IAlbum';
import { useSelector } from 'react-redux';
import { selectUsers } from '../features/user/userSlice';
import { IUser } from '../entities/IUser';
import { selectPictures } from '../features/picture/pictureSlice';
import { IPicture } from '../entities/IPicture';

interface AlbumProps {
  album: IAlbum;
}

const Album: React.FC<AlbumProps> = ({ album }) => {
  const creator = useSelector(selectUsers).find((user: IUser) => user.id === album.userId);
  const pictures = useSelector(selectPictures).filter((picture: IPicture) => picture.albumId === album.id);

  return (
    <div className='bg-gray-800 p-5 mt-6 w-7/12 rounded-md shadow-md'>
      <h2 className='text-white font-medium p-4'>{creator?.name}</h2>
      <div className='text-slate-400 p-4'>{album.title}</div>
      <div className='text-slate-400 p-4'>Pictures: {pictures.length}</div>
    </div>
  );
};

export default Album;
