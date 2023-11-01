import React from 'react';
import Navbar from './Navbar';
import { useSelector } from 'react-redux';
import { selectAlbums } from '../features/album/albumSlice';
import Album from './Album';

const AlbumsPage: React.FC = () => {
  const albums = useSelector(selectAlbums);

  return (
    <div className='min-h-screen min-w-screen bg-slate-900'>
      <Navbar />
      <div className='flex justify-center items-center flex-col'>
        {albums.map((album) => (
          <Album key={album.id} album={album} />
        ))}
      </div>
    </div>
  );
};

export default AlbumsPage;
