import axios from "axios"

const serviceURL = `https://localhost:7254/api`

export const getFeedBack = async () => {
    debugger
    let res = await axios.get(`${serviceURL}/FeedBack/GetAllFeedBack`)
    if (res) {debugger
        console.log(res);
        return await res.data;
    }
}
