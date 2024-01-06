import { createBrowserRouter } from "react-router-dom";
import { FeedPage } from "../components/FeedPage";
import { LoginPage } from "../components/LoginPage";
import RegisterPage from "../components/RegisterPage";
import NotFoundPage from "../components/NotFoundPage";
import AlbumsPage from "../components/AlbumsPage";
import PostPage from "../components/PostPage";
import PicturesPage from "../components/PicturesPage";
import TodosPage from "../components/TodosPage";
import PrivateRoutes from "./PrivateRoutes";

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
    element: <PrivateRoutes />,
    children: [
      {
        path: "/",
        element: <FeedPage />,
      },
      {
        path: "/albums",
        element: <AlbumsPage />,
      },
      {
        path: "/albums/:albumId",
        element: <PicturesPage />,
      },
      {
        path: "/posts/:postId",
        element: <PostPage />,
      },
      {
        path: "/todos",
        element: <TodosPage />,
      },
    ],
  },
]);
