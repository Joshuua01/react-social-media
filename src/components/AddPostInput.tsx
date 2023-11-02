import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../tools/store';
import { addPost } from '../features/post/postSlice';
import { selectCurrentUser } from '../features/currentUser/currentUserSlice';

const AddPostInput: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const currentUser = useSelector(selectCurrentUser);

  const handlePostAdd = () => {
    dispatch(addPost({ title, body, userId: currentUser?.id || 0 }));
    setTitle('');
    setBody('');
  };

  return (
    <div className='w-7/12 mt-5'>
      <div className='mt-2 -space-y-px rounded-md shadow-sm'>
        <div>
          <input
            type='text'
            name='post-title'
            id='post-title'
            className='relative block w-full rounded-none rounded-t-md  py-1.5 border ring-1 ring-gray-600  focus:ring-blue-700 focus:border-blue-700 focus:z-10 bg-gray-700 border-gray-600 placeholder-gray-400 text-white text-sm'
            placeholder='Post title'
            autoComplete='off'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className='flex -space-x-px'>
          <div className='w-4/5 min-w-0 '>
            <input
              type='text'
              name='post-body'
              id='post-body'
              className='relative block w-full rounded-bl-md text-sm border ring-1 ring-gray-600 py-1.5 focus:ring-blue-700 focus:border-blue-700 bg-gray-700 border-gray-600 placeholder-gray-400 text-white'
              placeholder='Post body'
              autoComplete='off'
              value={body}
              onChange={(e) => setBody(e.target.value)}
            />
          </div>
          <button
            type='button'
            className='min-w-0 flex-1 relative items-center gap-x-1.5 rounded-br-md px-3 py-1.5 text-sm font-semibold text-white  bg-blue-700 ring-1 ring-blue-700 hover:bg-blue-800'
            onClick={handlePostAdd}
          >
            Publish
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddPostInput;
