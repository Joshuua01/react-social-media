import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IComment } from "../../entities/IComment";

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

export const fetchComments = createAsyncThunk(
  "comment/fetchComments",
  async () => {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/comments"
    );
    const data = await response.json();
    return data;
  }
);

const findHighestCommentId = (comments: IComment[]) => {
  let highestId = 0;
  comments.forEach((comment) => {
    if (comment.id > highestId) {
      highestId = comment.id;
    }
  });
  return highestId;
};

const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {
    addComment(state, action: PayloadAction<CommentRequest>) {
      const newComment = {
        ...action.payload,
        id: findHighestCommentId(state.comments) + 1,
        name: "I belive there should not be a field for comment name.",
      };
      state.comments.push(newComment);
    },
    removeComment(state, action) {
      const index = state.comments.findIndex(
        (comment) => comment.id === action.payload
      );
      state.comments.splice(index, 1);
    },
    removeCommentsByPostId(state, action: PayloadAction<number>) {
      state.comments = state.comments.filter(
        (comment) => comment.postId !== action.payload
      );
    },
    editComment(state, action: PayloadAction<IComment>) {
      const index = state.comments.findIndex(
        (comment) => comment.id === action.payload.id
      );
      state.comments[index] = action.payload;
    },
    removeCommentsByUserEmail(state, action: PayloadAction<string>) {
      state.comments = state.comments.filter(
        (comment) => comment.email !== action.payload
      );
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
        state.error = action.error.message || "Unknown error occured!";
      });
  },
});

export const selectComments = (state: { comments: CommentState }) =>
  state.comments.comments;

export const {
  addComment,
  removeComment,
  removeCommentsByPostId,
  editComment,
  removeCommentsByUserEmail,
} = commentSlice.actions;

export default commentSlice.reducer;
