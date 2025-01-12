import axios from "axios"

const serviceURL = `https://localhost:7254/api/`

export const getOrderByCodeCustomer = async (int) => {
    debugger
    let res = await axios.get(`${serviceURL}Customer/GetCustomerById/Id?Id=${int}`)
    if (res) {
        debugger
        console.log(res);
        return await res.data;
    }
}
