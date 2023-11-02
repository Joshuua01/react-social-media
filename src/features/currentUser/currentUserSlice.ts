import { createSlice } from '@reduxjs/toolkit';
import { IUser } from '../../entities/IUser';

export interface CurrentUserState {
  currentUser: IUser | null;
  error: boolean;
}

const initialState: CurrentUserState = {
  currentUser: null,
  error: false,
};

const currentUserSlice = createSlice({
  name: 'currentUser',
  initialState,
  reducers: {
    loginUser(state, action) {
      const user = action.payload;
      state.currentUser = user;
      state.error = false;
    },
    logoutUser(state) {
      state.currentUser = null;
    },
  },
  extraReducers: {},
});

export const selectCurrentUser = (state: { currentUser: CurrentUserState }) => state.currentUser.currentUser;
export const selectLoginError = (state: { currentUser: CurrentUserState }) => state.currentUser.error;

export const { loginUser, logoutUser } = currentUserSlice.actions;

export default currentUserSlice.reducer;
