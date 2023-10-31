import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/user/userSlice';
import currentUserReducer from '../features/currentUser/currentUserSlice';
import postReducer from '../features/post/postSlice';

const store = configureStore({
  reducer: {
    users: userReducer,
    currentUser: currentUserReducer,
    posts: postReducer,
  },
});

export type AppDispatch = typeof store.dispatch;

export default store;
