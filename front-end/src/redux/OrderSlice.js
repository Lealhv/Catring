import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    orderOfCustomer : [],
    currentorderOfCustomer : {}
}

const OrderSlice = createSlice({
    name : "orderOfCustomer",
    initialState,
    reducers : {
        setCurrentorderOfCustomer : (state, action) =>{
            state.currentorderOfCustomer = action.payload;
        },
        getAllorderOfCustomer : (state, action) =>{
            state.orderOfCustomer = action.payload;
        }
    }
})

export const {setCurrentorderOfCustomer, getAllorderOfCustomer} = OrderSlice;
export default OrderSlice.reducers; 