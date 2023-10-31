import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/user/userSlice';
import currentUserReducer from '../features/currentUser/currentUserSlice';
import postReducer from '../features/post/postSlice';
import commentReducer from '../features/comment/commentSlice';

const store = configureStore({
  reducer: {
    users: userReducer,
    currentUser: currentUserReducer,
    posts: postReducer,
    comments: commentReducer,
  },
});

export type AppDispatch = typeof store.dispatch;

export default store;
