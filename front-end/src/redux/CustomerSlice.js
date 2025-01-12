import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentCustomer: null,
    customer: null
}

export const CustomerSlice = createSlice({
    name: "Customer",
    initialState,
    reducers: {
        addCustomers: (state, action) => {   
            state.currentCustomer = action.payload
        },
        addNewCustomer: (state, action) => {
            state.customer.push(action.payload);         
            state.currentCustomer = action.payload
        },
        getCustomer: (state, action) => {
            state.customer = action.payload;
        },
        editCustomer: (state, action) => {
            const newCustomer = action.payload
            const index = state.customer.findIndex(p => p.codeCustomer == newCustomer.codeCustomer)
            state.customer[index] = {
                ...state.customer[index],
                ...newCustomer
            }
        },
        setCurrentCustomer: (state, action) => {
            editCustomer(state.currentCustomer.codeCustomer)
            state.currentCustomer = action.payload;
        },
    }
})

export const { getCustomer, addCustomers, addNewCustomer, setCurrentCustomer, editCustomer} = CustomerSlice.actions;