import { createBrowserRouter } from "react-router-dom";
import { FeedPage } from "../components/FeedPage";
import { LoginPage } from "../components/LoginPage";
import RegisterPage from "../components/RegisterPage";
import NotFoundPage from "../components/NotFoundPage";
import AlbumsPage from "../components/AlbumsPage";
import PostPage from "../components/PostPage";

export const routes = createBrowserRouter([
  {
    path: "*",
    element: <NotFoundPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/",
    element: <FeedPage />,
  },
  {
    path: "/albums",
    element: <AlbumsPage />,
  },
  {
    path: "/posts",
    element: <PostPage />,
  },
]);
