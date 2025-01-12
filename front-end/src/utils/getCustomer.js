import axios from "axios"

const serviceURL = `https://localhost:7254/api/`

export const getCustomer = async () => {
    let res = await axios.get(`${serviceURL}Customer`)
    if (res) {
        console.log(res);
        return await res.data;
    }
}

export const getCustomerById = async (int) => {
    let res = await axios.get(`${serviceURL}Customer/GetCustomerById/Id?Id=${int}`)
    if (res) {
        console.log(res);
        return await res.data;
    }
}

export const addCustomer = async (MyCustomer) => {
    //${serviceURL}/Customer/addCustomer/MyCustomer
    let res = await axios.post(`${serviceURL}Customer/addCustomer/MyCustomer`,
        MyCustomer
    )
    if (res) {
        console.log(res);
        return await res.data;
    }
}

export const changeCustomers = async (MyCustomer) => {
    let res = await axios.put(`${serviceURL}Customer/UpDateCustomerById/Id`,
        MyCustomer
    )
    if (res) {
        console.log(res.data);
        return await res.data;
    }
}