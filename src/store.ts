import { configureStore } from "@reduxjs/toolkit";
import userReducer from './features/user/userSlice'


const store = configureStore({
    reducer: {
        users: userReducer,
    }
})

export type AppDispatch = typeof store.dispatch

export default store;