import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IPicture } from "../../entities/IPicture";

export interface PictureState {
    pictures: IPicture[];
    loading: boolean;
    error: string | null;
}

const initialState: PictureState = {
    pictures: [],
    loading: false,
    error: null,
};

export const fetchPictures = createAsyncThunk('picture/fetchPictures', async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/photos');
    const data = await response.json();
    return data;
});

const findHighestPictureId = (pictures: IPicture[]) => {
    let highestId = 0;
    pictures.forEach((picture) => {
        if (picture.id > highestId) {
            highestId = picture.id;
        }
    });
    return highestId;
}

const pictureSlice = createSlice({
    name: 'picture',
    initialState,
    reducers: {
        addPicture: (state, action) => {
            const newPicture = {
                ...action.payload,
                id: findHighestPictureId(state.pictures) + 1,
            };
            state.pictures.unshift(newPicture);
        },
        removePicture: (state, action) => {
            state.pictures = state.pictures.filter((picture) => picture.id !== action.payload);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPictures.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchPictures.fulfilled, (state, action) => {
                state.loading = false;
                state.pictures = action.payload;
            })
            .addCase(fetchPictures.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Unknown error occured!';
            });
    },
});

export const selectPictures = (state: { pictures: PictureState }) => state.pictures.pictures;

export const { addPicture, removePicture } = pictureSlice.actions;

export default pictureSlice.reducer;