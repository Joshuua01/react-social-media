import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IPost } from '../../entities/IPost';


export interface PostState {
  posts: IPost[];
  loading: boolean;
  error: string | null;
}

const initialState: PostState = {
  posts: [],
  loading: false,
  error: null,
};

export const fetchPosts = createAsyncThunk('post/fetchPosts', async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  const data = await response.json();
  return data;
});

const findHighestPostId = (posts: IPost[]) => {
  let highestId = 0;
  posts.forEach((post) => {
    if (post.id > highestId) {
      highestId = post.id;
    }
  });
  return highestId;
}

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    addPost: (state, action) => {
      const newPost = {
        ...action.payload,
        id: findHighestPostId(state.posts) + 1,
      };
      state.posts.unshift(newPost);
    },
    removePost: (state, action) => {
      const index = state.posts.findIndex((post) => post.id === action.payload);
      state.posts.splice(index, 1);
    },
    editPost: (state, action) => {
      const index = state.posts.findIndex((post) => post.id === action.payload.id);
      state.posts[index] = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Unknown error occured!';
      });
  },
});

export const selectPosts = (state: { posts: PostState }) => state.posts.posts;

export const { addPost, removePost, editPost } = postSlice.actions;

export default postSlice.reducer;
