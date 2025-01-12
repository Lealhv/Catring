import { configureStore } from "@reduxjs/toolkit";
import FoodSlice from "./redux/FoodSlice";
import TypeEnumSlice from "./redux/TypeEnumSlice";
import { CateringSlice } from "./redux/CateringSlice";
import FeedBackSlice from "./redux/FeedBackSlice";
import { CustomerSlice } from "./redux/CustomerSlice";

//בניית מחסן גלובאלי
//קישור של המתווכים- הרדוסרים למחסן
//המתווכים הללו יוכלו לגשת למידע של המחסן
//וכן לערוך בו שינויים

//combineReducers
//חיברנו את המתווכים
// let reducers=combineSlices(productReducer,categoryReducer)


//חיבור בין המתווכים למחסן
const store = configureStore({
    reducer: {
        food : FoodSlice,
        type : TypeEnumSlice,
        feedback : FeedBackSlice,
        Customer : CustomerSlice.reducer,
        Catering : CateringSlice.reducer
    }
})

export default store;