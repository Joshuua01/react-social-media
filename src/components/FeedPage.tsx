import React from "react";
import Navbar from "./Navbar";
import Post from "./Post";
import { useSelector } from "react-redux";
import { selectPosts } from "../features/post/postSlice";
import { selectCurrentUser } from "../features/currentUser/currentUserSlice";
import { useNavigate } from "react-router-dom";
import AddPostInput from "./AddPostInput";

export const FeedPage: React.FC = () => {
  const currentUser = useSelector(selectCurrentUser);
  const posts = useSelector(selectPosts);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen min-w-screen bg-slate-900">
      <Navbar />
      <div className="flex justify-center items-center flex-col">
        <AddPostInput />
        {posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};
