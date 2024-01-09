import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import currentUserReducer from "../features/currentUser/currentUserSlice";
import postReducer from "../features/post/postSlice";
import commentReducer from "../features/comment/commentSlice";
import albumReducer from "../features/album/albumSlice";
import pictureReducer from "../features/picture/pictureSlice";
import todoReducer from "../features/todo/todoSlice";

const store = configureStore({
  reducer: {
    users: userReducer,
    currentUser: currentUserReducer,
    posts: postReducer,
    comments: commentReducer,
    albums: albumReducer,
    pictures: pictureReducer,
    todos: todoReducer,
  },
});

export type AppDispatch = typeof store.dispatch;

export default store;
