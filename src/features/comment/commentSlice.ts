import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IComment } from '../../entities/IComment';

export interface CommentState {
  comments: IComment[];
  loading: boolean;
  error: string | null;
}

const initialState: CommentState = {
  comments: [],
  loading: false,
  error: null,
};

export const fetchComments = createAsyncThunk('comment/fetchComments', async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/comments');
  const data = await response.json();
  return data;
});

const commentSlice = createSlice({
  name: 'comment',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.loading = false;
        state.comments = action.payload;
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Unknown error occured!';
      });
  },
});

export const selectComments = (state: { comments: CommentState }) => state.comments.comments;

export default commentSlice.reducer;
