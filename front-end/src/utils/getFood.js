import axios from "axios"
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getTypeEnumFromServer } from "../utils/getType";
import { getType } from "../redux/TypeEnumSlice";
import { getCateringFromServer } from "../utils/getCatering";
import { getCatering } from "../redux/CateringSlice";
import { MilkFood } from "../comp/MilkFood";

const serviceURL = `https://localhost:7254/api`


// // הגדרה של פונקציה אסינכרונית הניגשת לשרת
// // async- זוהי הגדרה על פונקציה שמאפשרת לנהל את תוכן הפונקציה באופן ידני,
// // js ולא בדרך הרגילה של 
// //שפועלת ללא סדר
export const getFoodFromServer = async () => {
    let res = await axios.get(`${serviceURL}/Food/GetAllFood`)
    if (res) {
        console.log(res);
        return await res.data;
    }
}
// export const dispatch = useDispatch();

// // const getFoodByCode = async (Code) => {
// //     let res = await axios.get(`${serviceURL}/Food/GetFoodByCode/Code?Id=${Code}`)
// //     if (res) {
// //         console.log(res);
// //         return await res.data;
// //     }
// // }


// export const TypeEnum = useSelector(state => {
//     return state.type.TypeEnum
// });

// export const food = useSelector(state => {
//     return state.food.food
// });

// export const catering = useSelector(state => {
//     return state.Catering.catering
// });

// export const [foodData, setFoodData] = useState(food);

// export const showAll = () => {
//     setFoodData(food)
// }

// export const getMyType = async (int) => {
//     if (!TypeEnum) {
//         const t = await getTypeEnumFromServer(int);
//         dispatch(getType(t))
//     }
// };

// export const getMyCatering = async () => {
//     if (!catering) {
//         const t = await getCateringFromServer();
//         dispatch(getCatering(t))
//     }
// };

// export const handleFilterByHechsher = (codeHechsher) => {
//     const myCatring = catering.filter(c => c.nameHechsher == codeHechsher)
//     setFoodData(food.filter(f => myCatring.find(c => f.codeCatering == c.codeCatering)))
// }

// export const handleFilterByCatering = (codeCatering) => {
//     setFoodData(food.filter(f => f.codeCatering == codeCatering));
// }

// export const handleFilterByTypeCourse = (codeCourse) => {
//     setFoodData(food.filter(f => f.typeOfCourse == codeCourse));
// }




