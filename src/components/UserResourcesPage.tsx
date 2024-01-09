import React from "react";
import { IUser } from "../entities/IUser";
import { IPost } from "../entities/IPost";
import { useSelector } from "react-redux";
import { selectPosts } from "../features/post/postSlice";
import { selectAlbums } from "../features/album/albumSlice";
import { IAlbum } from "../entities/IAlbum";
import { selectUsers } from "../features/user/userSlice";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";

const UserResourcesPage: React.FC = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const navigation = useNavigate();
  const user = useSelector(selectUsers).find(
    (user: IUser) => user.id === Number(urlParams.get("user"))
  );
  const post = useSelector(selectPosts).filter(
    (post: IPost) => post.userId === user?.id
  );
  const albums = useSelector(selectAlbums).filter(
    (album: IAlbum) => album.userId === user?.id
  );

  return (
    <div className="min-h-screen min-w-screen bg-slate-900">
      <Navbar />
      <div className="flex flex-col items-center justify-center w-full">
        <div className="text-white">
          {user?.name} has {post.length} posts and {albums.length} albums
        </div>
        <div>
          List of posts:
          {post.map((post) => (
            <div
              key={post.id}
              className="text-white cursor-pointer"
              onClick={() => navigation(`/posts/?post=${post.id}`)}
            >
              {post.title}
            </div>
          ))}
        </div>
        <div>
          List of albums:
          {albums.map((album) => (
            <div
              key={album.id}
              className="text-white cursor-pointer"
              onClick={() => navigation(`/pictures/?album=${album.id}`)}
            >
              {album.title}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserResourcesPage;
