import { createSlice } from "@reduxjs/toolkit";

const initialState = {}

const FeedBackSlice = createSlice({
    name: "feedBack",
    initialState,
    reducers: {
        getFeedBack: (state, action) => {
            state.feedBack = action.payload;
        }
    }
})

export const { getFeedBack } = FeedBackSlice.actions;
export default FeedBackSlice.reducer; 