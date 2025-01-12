import { createSlice } from "@reduxjs/toolkit";

// public enum EType { HechsherEnum, TimeOfEvent, TypeOfCatering, TypeOfCourse, Event };

const initialState = {
    TypeEnum: [[],[],[],[],[],[]]
}

const TypeEnumSlice = createSlice({
    name: "type",
    initialState,
    reducers: {
        getType: (state, action) => {
            state.TypeEnum[action.payload.place] = action.payload.data;
        }
    }
})

export const { getType } = TypeEnumSlice.actions;
export default TypeEnumSlice.reducer; 