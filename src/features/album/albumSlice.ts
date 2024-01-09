import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IAlbum } from "../../entities/IAlbum";

export interface AlbumState {
  albums: IAlbum[];
  loading: boolean;
  error: string | null;
}

const initialState: AlbumState = {
  albums: [],
  loading: false,
  error: null,
};

export const fetchAlbums = createAsyncThunk("album/fetchAlbums", async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/albums");
  const data = await response.json();
  return data;
});

const findHighestAlbumId = (albums: IAlbum[]) => {
  let highestId = 0;
  albums.forEach((album) => {
    if (album.id > highestId) {
      highestId = album.id;
    }
  });
  return highestId;
};

const albumSlice = createSlice({
  name: "album",
  initialState,
  reducers: {
    addAlbum: (state, action) => {
      const newAlbum = {
        ...action.payload,
        id: findHighestAlbumId(state.albums) + 1,
      };
      state.albums.unshift(newAlbum);
    },
    removeAlbum: (state, action) => {
      state.albums = state.albums.filter(
        (album) => album.id !== action.payload
      );
    },
    editAlbum: (state, action) => {
      const index = state.albums.findIndex(
        (album) => album.id === action.payload.id
      );
      state.albums[index] = action.payload;
    },
    removeAlbumsByUserId: (state, action) => {
      state.albums = state.albums.filter(
        (album) => album.userId !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAlbums.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAlbums.fulfilled, (state, action) => {
        state.loading = false;
        state.albums = action.payload;
      })
      .addCase(fetchAlbums.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Unknown error occured!";
      });
  },
});

export const selectAlbums = (state: { albums: AlbumState }) =>
  state.albums.albums;

export const { addAlbum, removeAlbum, editAlbum, removeAlbumsByUserId } =
  albumSlice.actions;

export default albumSlice.reducer;
