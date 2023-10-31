import { createBrowserRouter } from 'react-router-dom';
import { FeedPage } from '../components/FeedPage';
import { LoginPage } from '../components/LoginPage';
import RegisterPage from '../components/RegisterPage';

export const routes = createBrowserRouter([
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
