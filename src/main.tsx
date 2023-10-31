import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './tools/store.ts';
import './main.css';
import { RouterProvider } from 'react-router-dom';
import { fetchUsers } from './features/user/userSlice.ts';
import { routes } from './tools/routes.tsx';
import { fetchPosts } from './features/post/postSlice.ts';
import { fetchComments } from './features/comment/commentSlice.ts';

store.dispatch(fetchUsers());
store.dispatch(fetchPosts());
store.dispatch(fetchComments());

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={routes} />
    </Provider>
  </React.StrictMode>
);
