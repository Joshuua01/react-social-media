import { configureStore } from "@reduxjs/toolkit";
import userReducer from './features/user/userSlice'
import currentUserReducer from './features/currentUser/currentUserSlice'

const store = configureStore({
    reducer: {
        users: userReducer,
        currentUser: currentUserReducer
    }
})

export type AppDispatch = typeof store.dispatch

export default store;