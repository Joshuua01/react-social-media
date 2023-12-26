import React, { useState } from "react";
import { IPost } from "../entities/IPost";
import { IUser } from "../entities/IUser";
import { selectUsers } from "../features/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  addComment,
  removeCommentsByPostId,
  selectComments,
} from "../features/comment/commentSlice";
import { IComment } from "../entities/IComment";
import { AppDispatch } from "../tools/store";
import { selectCurrentUser } from "../features/currentUser/currentUserSlice";
import { removePost } from "../features/post/postSlice";
import PostComment from "./PostComment";

interface PostProps {
  post: IPost;
}

const Post: React.FC<PostProps> = ({ post }) => {
  const comments = useSelector(selectComments).filter(
    (comment: IComment) => comment.postId === post.id
  );
  const lastThreeComments = comments.slice(Math.max(comments.length - 3, 0));
  const creator = useSelector(selectUsers).find(
    (user: IUser) => user.id === post.userId
  );
  const currentUser = useSelector(selectCurrentUser);
  const [comment, setComment] = useState("");
  const dispatch = useDispatch<AppDispatch>();

  const handleCommentAdd = () => {
    dispatch(
      addComment({
        postId: post.id,
        body: comment,
        email: currentUser?.email || "Anonymous",
      })
    );
  };

  const handlePostDelete = () => {
    dispatch(removePost(post.id));
    dispatch(removeCommentsByPostId(post.id));
  };

  return (
    <div className="bg-gray-800 p-5 mt-6 w-7/12 rounded-md shadow-md">
      <div className="m-4 border-b-[1px] border-slate-300 border-opacity-40 flex items-center justify-between">
        <h2 className="text-white font-medium p-4">{creator?.email}</h2>
        {currentUser?.id === creator?.id && (
          <div className="p-4 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="w-6 h-6 cursor-pointer"
            >
              <path
                fillRule="evenodd"
                d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z"
                clipRule="evenodd"
                className="fill-current text-red-600 hover:text-orange-600"
                onClick={handlePostDelete}
              />
            </svg>
          </div>
        )}
      </div>
      <div className="text-slate-300 p-4 font-semibold">{post.title}</div>
      <div className="text-slate-400 p-4">{post.body}</div>
      <div className="text-slate-400 m-4 py-3 border-y-[1px] border-slate-300 border-opacity-40">
        Comments: {comments.length}
      </div>
      <div className="text-slate-400 m-4 py-3 border-slate-300 border-opacity-40 flex flex-col">
        {lastThreeComments.map((comment: IComment) => (
          <PostComment key={comment.id} comment={comment} />
        ))}
      </div>
      <div className="p-4 flex">
        <div className="relative flex flex-grow items-stretch focus-within:z-10">
          <input
            type="text"
            id="first_name"
            className=" border text-sm rounded-l-lg ring-1 ring-gray-600 focus:ring-blue-700 focus:border-blue-700 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white"
            placeholder="Write a comment..."
            required
            value={comment}
            autoComplete="off"
            onChange={(e) => setComment(e.target.value)}
          />
          <button
            type="button"
            className="relative -ml-px inline-flex items-center gap-x-1.5 rounded-r-md px-3 py-2 text-sm font-semibold text-white  bg-blue-700 ring-1 ring-blue-700 hover:bg-blue-800"
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
