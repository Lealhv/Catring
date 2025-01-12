import axios from "axios"
import { addCatering } from "../redux/CateringSlice";
import { useDispatch } from "react-redux";

const serviceURL = `https://localhost:7254/api/`


export const getCateringFromServer = async () => {
    let res = await axios.get(`${serviceURL}Catering/GetAllCatering`)
    if (res) {
        console.log(res);
        return await res.data;
    }
}

export const getCateringById = async (int) => {
    // Catering/GetCateringByCode/Code?Id
    let res = await axios.get(`${serviceURL}Catering/GetCateringByCode/Code?Id=${int}`)
    if (res) {
        console.log(res);
        return await res.data;
    }
}

export const addBoss = async (MyBoss) => {
    let res = await axios.post(`${serviceURL}Catering/addCatering/MyCatering`,
        MyBoss
    )
    if (res) {
        console.log(res.data);
        return await res.data;
    }
}

export const addFood = async (myFood) => {
    let res = await axios.post(`${serviceURL}Food/addFood/MyFood`,
        myFood
    )
    if (res) {
        console.log(res.data);
        return await res.data;
    }
}

export const UpDateCatering = async (MyCatering) => {
    debugger
    let res = await axios.put(`${serviceURL}Catering/UpDateCateringByCode/Code`,
        MyCatering
    )
    if (res) {
        debugger
        console.log(res.data);
        return await res.data;
    }
}
export const getDate = async () => {
    var d = new Date()
    let res = await axios.get(`${serviceURL}Catering/Date`)
    if (res) {
        console.log(res);
        return await res;
    }
}

