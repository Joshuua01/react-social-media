import { createBrowserRouter } from 'react-router-dom';
import { FeedPage } from '../components/FeedPage';
import { LoginPage } from '../components/LoginPage';
import RegisterPage from '../components/RegisterPage';
import NotFoundPage from '../components/NotFoundPage';

export const routes = createBrowserRouter([
  {
    path: '*',
    element: <NotFoundPage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/register',
    element: <RegisterPage />,
  },
  {
    path: '/',
    element: <FeedPage />,
  },
]);
