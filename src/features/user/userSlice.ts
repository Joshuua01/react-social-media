import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit"

export interface User {
    id: number
    name: string
    username: string
    email: string
}

export interface UserState {
    users: User[]
    loading: boolean
    error: string | null
}

const initialState: UserState = {
    users: [],
    loading: false,
    error: null 
}

export const fetchUsers = createAsyncThunk('user/fetchUsers', async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    const data = await response.json();
    return data;
});

export const registerUser = createAction<User>('user/registerUser')

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchUsers.pending, (state) => {
            state.loading = true
        })
        .addCase(fetchUsers.fulfilled, (state, action) => {
            state.loading = false
            state.users = action.payload
        })
        .addCase(fetchUsers.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message || 'Unknown error occured!'
        })
        .addCase(registerUser, (state, action) => {
            state.users.push(action.payload)
        })
    }
})

export const selectUsers = (state: { users: UserState }) => state.users.users;
export const selectLoading = (state: { users: UserState }) => state.users.loading;
export const selectError = (state: { users: UserState }) => state.users.error;


export default userSlice.reducer;