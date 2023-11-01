import { createSlice, createAction } from '@reduxjs/toolkit';
import { User } from '../../entities/IUser';

export interface CurrentUserState {
  currentUser: User | null;
  error: boolean;
}

const initialState: CurrentUserState = {
  currentUser: null,
  error: false,
};

export const loginUser = createAction<User | null>('currentUser/loginUser');

const currentUserSlice = createSlice({
  name: 'currentUser',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginUser, (state, action) => {
      const user = action.payload;
      state.currentUser = user;
      state.error = false;
    });
  },
});

export const selectCurrentUser = (state: { currentUser: CurrentUserState }) => state.currentUser.currentUser;

export const selectLoginError = (state: { currentUser: CurrentUserState }) => state.currentUser.error;

export default currentUserSlice.reducer;
