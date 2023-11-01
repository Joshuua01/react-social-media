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

export const fetchAlbums = createAsyncThunk('album/fetchAlbums', async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/albums');
    const data = await response.json();
    return data;
});

const albumSlice = createSlice({
    name: 'album',
    initialState,
    reducers: {},
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
                state.error = action.error.message || 'Unknown error occured!';
            });
    },
});

export const selectAlbums = (state: { albums: AlbumState }) => state.albums.albums;

export default albumSlice.reducer;