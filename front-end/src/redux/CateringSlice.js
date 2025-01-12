import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentCatering: null,
    catering: null
}

export const CateringSlice = createSlice({
    name: "Catering",
    initialState,
    reducers: {
        addCatering: (state, action) => {
            state.currentCatering = action.payload
        },
        addNewCatering: (state, action) => {
            state.catering.push(action.payload);
            state.currentCatering = action.payload
        },
        getCatering: (state, action) => {
            state.catering = action.payload;
        },
        editCatering: (state, action) => {
            const newCatering = action.payload
            const index = state.catering.findIndex(p => p.codeCatering == newCatering.codeCatering)
            state.catering[index] = {
                ...state.catering[index],
                ...newCatering
            }
        },
        setCurrentCatering: (state, action) => {
            editCatering(state.currentCatering.codeCatering)
            state.currentCatering = action.payload;
        },


    }
})

export const { getCatering, addCatering, addNewCatering, editCatering, setCurrentCatering} = CateringSlice.actions;