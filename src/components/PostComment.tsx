import React, { useState } from "react";
import { IComment } from "../entities/IComment";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser } from "../features/currentUser/currentUserSlice";
import { AppDispatch } from "../tools/store";
import { editComment, removeComment } from "../features/comment/commentSlice";

interface PostCommentProps {
  comment: IComment;
}

const PostComment: React.FC<PostCommentProps> = ({ comment }) => {
  const currentUser = useSelector(selectCurrentUser);
  const dispatch = useDispatch<AppDispatch>();
  const [isCommentEdit, setIsCommentEdit] = useState(false);
  const [commentState, setCommentState] = useState<IComment>(comment);

  const handleCommentDelete = () => {
    dispatch(removeComment(comment.id));
  };

  const handleCommentEdit = () => {
    setIsCommentEdit(!isCommentEdit);
    dispatch(editComment(commentState));
  };

  return (
    <div className="flex flex-col mt-4">
      <div className="flex items-center justify-between">
        <div className="font-medium text-white">{comment.email}</div>
        {currentUser?.email === comment.email && (
          <div className="flex flex-row gap-3">
            <svg
              viewBox="0 0 1024 1024"
              fill="currentColor"
              className="w-6 h-6 cursor-pointer hover:text-orange-600"
              onClick={handleCommentEdit}
            >
              <path
                d="M880 836H144c-17.7 0-32 14.3-32 32v36c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-36c0-17.7-14.3-32-32-32zm-622.3-84c2 0 4-.2 6-.5L431.9 722c2-.4 3.9-1.3 5.3-2.8l423.9-423.9a9.96 9.96 0 000-14.1L694.9 114.9c-1.9-1.9-4.4-2.9-7.1-2.9s-5.2 1-7.1 2.9L256.8 538.8c-1.5 1.5-2.4 3.3-2.8 5.3l-29.5 168.2a33.5 33.5 0 009.4 29.8c6.6 6.4 14.9 9.9 23.8 9.9z"
                className="fill-current text-indigo-600 hover:text-red-600"
              />
            </svg>
            <svg
              viewBox="0 0 448 512"
              fill="currentColor"
              className="w-5 h-5 cursor-pointer"
              onClick={handleCommentDelete}
            >
              <path
                d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64s14.3 32 32 32h384c17.7 0 32-14.3 32-32s-14.3-32-32-32h-96l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32l21.2 339c1.6 25.3 22.6 45 47.9 45h245.8c25.3 0 46.3-19.7 47.9-45L416 128z"
                className="fill-current text-indigo-600 hover:text-red-600"
              />
            </svg>
          </div>
        )}
      </div>
      {isCommentEdit ? (
        <input
          type="text"
          id="title"
          className="mt-2 border text-sm rounded-lg ring-1 ring-gray-600 focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white"
          placeholder="Edit post title..."
          required
          value={commentState.body}
          autoComplete="off"
          onChange={(e) => {
            setCommentState({ ...commentState, body: e.target.value });
          }}
        />
      ) : (
        <div className="text-slate-400">{comment.body}</div>
      )}
    </div>
  );
};

export default PostComment;
