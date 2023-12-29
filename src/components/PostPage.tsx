import React from "react";
import { IPost } from "../entities/IPost";
import { useSelector } from "react-redux";
import { selectPosts } from "../features/post/postSlice";
import NotFoundPage from "./NotFoundPage";
import Navbar from "./Navbar";
import Post from "./Post";

const PostPage: React.FC = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const post: IPost =
    useSelector(selectPosts).find(
      (post: IPost) => post.id === Number(urlParams.get("post"))
    ) || null;

  if (!post) {
    return <NotFoundPage />;
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen min-w-screen flex justify-center items-center bg-slate-900">
        <Post post={post} isPostPage={true} />
      </div>
    </>
  );
};

export default PostPage;
