import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IComment } from '../../entities/IComment';

export interface CommentState {
  comments: IComment[];
  loading: boolean;
  error: string | null;
}

export interface CommentRequest {
  postId: number;
  email: string;
  body: string;
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
  reducers: {
    addComment(state, action: PayloadAction<CommentRequest>) {
      const newComment = {
        ...action.payload,
        id: state.comments.length + 1,
        name: 'I belive there should not be a field for comment name.',
      };
      state.comments.push(newComment);
    },
  },
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

export const { addComment } = commentSlice.actions;

export default commentSlice.reducer;
