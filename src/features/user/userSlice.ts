import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '../../entities/IUser';

export interface UserState {
  users: IUser[];
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

const findHighestUserId = (users: IUser[]) => {
  let highestId = 0;
  users.forEach((user) => {
    if (user.id > highestId) {
      highestId = user.id;
    }
  });
  return highestId;
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    registerUser: (state, action: PayloadAction<UserRegister>) => {
      const emailExists = state.users.some((user) => user.email === action.payload.email);
      if (!emailExists) {
        const newUser = {
          ...action.payload,
          id: findHighestUserId(state.users) + 1,
        };
        state.users.push(newUser);
      } else {
        throw new Error('Email already exists!');
      }
    },
    editUser: (state, action) => {
      const userIndex = state.users.findIndex((user) => user.id === action.payload.id);
      state.users[userIndex] = action.payload;
    },
    deleteUser: (state, action) => {
      const index = state.users.findIndex((user) => user.id === action.payload);
      state.users.splice(index, 1);
    }
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

export const { registerUser, editUser, deleteUser } = userSlice.actions;

export default userSlice.reducer;
