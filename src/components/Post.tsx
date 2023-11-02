import React, { useState } from 'react';
import { IPost } from '../entities/IPost';
import { IUser } from '../entities/IUser';
import { selectUsers } from '../features/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { addComment, selectComments } from '../features/comment/commentSlice';
import { IComment } from '../entities/IComment';
import { AppDispatch } from '../tools/store';
import { selectCurrentUser } from '../features/currentUser/currentUserSlice';

interface PostProps {
  post: IPost;
}

const Post: React.FC<PostProps> = ({ post }) => {
  const comments = useSelector(selectComments).filter((comment: IComment) => comment.postId === post.id);
  const lastThreeComments = comments.slice(Math.max(comments.length - 3, 0));
  const creator = useSelector(selectUsers).find((user: IUser) => user.id === post.userId);
  const currentUser = useSelector(selectCurrentUser);
  const [comment, setComment] = useState('');
  const dispatch = useDispatch<AppDispatch>();

  const handleCommentAdd = () => {
    dispatch(addComment({ postId: post.id, body: comment, name: currentUser.name, email: currentUser.email }));
  };

  return (
    <div className='bg-gray-800 p-5 mt-6 w-7/12 rounded-md shadow-md'>
      <h2 className='text-white font-medium p-4'>{creator?.name}</h2>
      <div className='text-slate-400 p-4'>{post.title}</div>
      <div className='text-slate-400 p-4'>{post.body}</div>
      <div className='text-slate-400 m-4 py-3 border-y-[1px] border-slate-300 border-opacity-40'>Comments: {comments.length}</div>
      <div className='text-slate-400 m-4 py-3 border-slate-300 border-opacity-40 flex flex-col'>
        {lastThreeComments.map((comment: IComment) => (
          <div key={comment.id} className='flex flex-col mt-4'>
            <div className='font-medium text-white'>{comment.email}</div>
            <div className='text-slate-400'>{comment.body}</div>
          </div>
        ))}
      </div>
      <div className='p-4 flex'>
        <div className='relative flex flex-grow items-stretch focus-within:z-10'>
          <input
            type='text'
            id='first_name'
            className=' border text-sm rounded-l-lg ring-1 ring-gray-600 focus:ring-blue-700 focus:border-blue-700 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white'
            placeholder='Write a comment...'
            required
            value={comment}
            autoComplete='off'
            onChange={(e) => setComment(e.target.value)}
          />
          <button
            type='button'
            className='relative -ml-px inline-flex items-center gap-x-1.5 rounded-r-md px-3 py-2 text-sm font-semibold text-white  bg-blue-700 ring-1 ring-blue-700 hover:bg-blue-800'
            onClick={handleCommentAdd}
          >
            Publish
          </button>
        </div>
      </div>
    </div>
  );
};

export default Post;
