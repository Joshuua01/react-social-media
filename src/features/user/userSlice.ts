import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../entities/User';

export interface UserState {
  users: User[];
  loading: boolean;
  error: string | null;
}

export interface UserRegister {
  name: string;
  username: string;
  email: string;
}

const initialState: UserState = {
  users: [],
  loading: false,
  error: null,
};

export const fetchUsers = createAsyncThunk('user/fetchUsers', async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/users');
  const data = await response.json();
  return data;
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    registerUser: (state, action: PayloadAction<UserRegister>) => {
      const emailExists = state.users.some((user) => user.email === action.payload.email);
      if (!emailExists) {
        const newUser = {
          ...action.payload,
          id: state.users.length + 1,
        };
        state.users.push(newUser);
      } else {
        throw new Error('Email already exists!');
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Unknown error occured!';
      });
  },
});

export const selectUsers = (state: { users: UserState }) => state.users.users;
export const selectLoading = (state: { users: UserState }) => state.users.loading;
export const selectError = (state: { users: UserState }) => state.users.error;

export const { registerUser } = userSlice.actions;

export default userSlice.reducer;
