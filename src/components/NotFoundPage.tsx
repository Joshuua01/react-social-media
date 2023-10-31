import React from 'react';
import Navbar from './Navbar';

const NotFoundPage: React.FC = () => {
  return (
    <div className='min-h-screen min-w-screen bg-slate-900'>
      <Navbar />
      <div className='flex justify-center items-center flex-col mt-64 italic space-x-3'>
        <h1 className='text-6xl text-white'>404</h1>
        <h1 className='text-6xl text-white'>Page Not Found</h1>
      </div>
    </div>
  );
};

export default NotFoundPage;
