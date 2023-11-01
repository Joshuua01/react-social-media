import React from 'react';
import { IPost } from '../entities/IPost';
import { IUser } from '../entities/IUser';
import { selectUsers } from '../features/user/userSlice';
import { useSelector } from 'react-redux';
import { selectComments } from '../features/comment/commentSlice';
import { IComment } from '../entities/IComment';

interface PostProps {
  post: IPost;
}

const Post: React.FC<PostProps> = ({ post }) => {
  const comments = useSelector(selectComments).filter((comment: IComment) => comment.postId === post.id);
  const creator = useSelector(selectUsers).find((user: IUser) => user.id === post.userId);

  return (
    <div className='bg-gray-800 p-5 mt-6 w-7/12 rounded-md shadow-md'>
      <h2 className='text-white font-medium p-4'>{creator?.name}</h2>
      <div className='text-slate-400 p-4'>{post.title}</div>
      <div className='text-slate-400 p-4'>{post.body}</div>
      <div className='text-slate-400 p-4'>Comments: {comments.length}</div>
    </div>
  );
};

export default Post;
