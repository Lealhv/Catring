import { createSlice } from "@reduxjs/toolkit";

const initialState = {}

const FoodSlice = createSlice({
    name: "food",
    initialState,
    reducers: {
        getFood: (state, action) => {
            state.food = action.payload;
        }
    }
})

export const { getFood } = FoodSlice.actions;
export default FoodSlice.reducer; 