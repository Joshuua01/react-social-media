import React from 'react';
import { IPost } from '../entities/IPost';
import { User } from '../entities/User';
import { selectUsers } from '../features/user/userSlice';
import { useSelector } from 'react-redux';
import { selectComments } from '../features/comment/commentSlice';

interface PostProps {
  post: IPost;
}

const Post: React.FC<PostProps> = ({ post }) => {
  const comments = useSelector(selectComments).filter((comment) => comment.postId === post.id);
  const users = useSelector(selectUsers);
  const user = users.find((user: User) => user.id === post.userId);

  return (
    <div className='bg-gray-800 p-5 mt-6 w-7/12 rounded-md shadow-md'>
      <h2 className='text-white font-medium p-4'>{user?.name}</h2>
      <div className='text-slate-400 p-4'>{post.title}</div>
      <div className='text-slate-400 p-4'>{post.body}</div>
      <div className='text-slate-400 p-4'>Comments: {comments.length}</div>
    </div>
  );
};

export default Post;
