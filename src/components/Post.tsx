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
import { editPost, removePost } from "../features/post/postSlice";
import PostComment from "./PostComment";
import { useNavigate } from "react-router-dom";

interface PostProps {
  post: IPost;
  isPostPage?: boolean;
}

const Post: React.FC<PostProps> = ({ post, isPostPage }) => {
  const comments = useSelector(selectComments).filter(
    (comment: IComment) => comment.postId === post.id
  );
  const lastThreeComments = comments.slice(Math.max(comments.length - 3, 0));
  const creator = useSelector(selectUsers).find(
    (user: IUser) => user.id === post.userId
  );
  const currentUser = useSelector(selectCurrentUser);

  const [comment, setComment] = useState("");
  const [isPostEdit, setIsPostEdit] = useState(false);
  const [postState, setPostState] = useState<IPost>(post);

  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigate();
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

  const handlePostEdit = () => {
    setIsPostEdit(!isPostEdit);
    dispatch(editPost(postState));
  };

  const handleShowPost = () => {
    if (isPostPage) return;
    navigation(`/posts/?post=${post.id}`);
  };

  return (
    <div className="bg-gray-800 p-5 mt-6 w-7/12 rounded-md shadow-md">
      <div className="m-4 border-b-[1px] border-slate-300 border-opacity-40 flex items-center justify-between">
        <h2 className="text-white font-medium p-4">{creator?.email}</h2>
        <div className="flex items-center flex-row p-4 gap-3">
          {isPostPage && currentUser?.id === creator?.id && (
            <div>
              <svg
                viewBox="0 0 1024 1024"
                fill="currentColor"
                className="w-6 h-6 cursor-pointer hover:text-orange-600"
                onClick={handlePostEdit}
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
              onClick={handlePostDelete}
            >
              <path
                d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64s14.3 32 32 32h384c17.7 0 32-14.3 32-32s-14.3-32-32-32h-96l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32l21.2 339c1.6 25.3 22.6 45 47.9 45h245.8c25.3 0 46.3-19.7 47.9-45L416 128z"
                className="fill-current text-indigo-600 hover:text-red-600"
              />
            </svg>
          )}
        </div>
      </div>
      <div className="text-slate-300 p-4 font-semibold">
        {isPostEdit ? (
          <input
            type="text"
            id="title"
            className=" border text-sm rounded-lg ring-1 ring-gray-600 focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white"
            placeholder="Edit post title..."
            required
            value={postState.title}
            autoComplete="off"
            onChange={(e) => {
              setPostState({ ...postState, title: e.target.value });
            }}
          />
        ) : (
          post.title
        )}
      </div>
      <div className="text-slate-400 p-4">
        {isPostEdit ? (
          <input
            type="text"
            id="body"
            className=" border text-sm rounded-lg ring-1 ring-gray-600 focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white"
            placeholder="Edit post body..."
            required
            value={postState.body}
            autoComplete="off"
            onChange={(e) => {
              setPostState({ ...postState, body: e.target.value });
            }}
          />
        ) : (
          post.body
        )}
      </div>
      <div
        className="text-slate-400 m-4 py-3 border-y-[1px] border-slate-300 border-opacity-40 cursor-pointer"
        onClick={handleShowPost}
      >
        Comments: {comments.length}
      </div>
      <div className="text-slate-400 m-4 py-3 border-slate-300 border-opacity-40 flex flex-col">
        {isPostPage
          ? comments.map((comment: IComment) => (
              <PostComment key={comment.id} comment={comment} />
            ))
          : lastThreeComments.map((comment: IComment) => (
              <PostComment key={comment.id} comment={comment} />
            ))}
      </div>
      <div className="p-4 flex">
        <div className="relative flex flex-grow items-stretch focus-within:z-10">
          <input
            type="text"
            id="first_name"
            className=" border text-sm rounded-l-lg ring-1 ring-gray-600 focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white"
            placeholder="Write a comment..."
            required
            value={comment}
            autoComplete="off"
            onChange={(e) => setComment(e.target.value)}
          />
          <button
            type="button"
            className="relative -ml-px inline-flex items-center gap-x-1.5 rounded-r-md px-3 py-2 text-sm font-semibold text-white  bg-indigo-600 ring-1 ring-indigo-600 hover:bg-indigo-700 hover:ring-indigo-700"
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
