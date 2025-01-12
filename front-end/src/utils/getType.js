import axios from "axios"
const serviceURL = `https://localhost:7254/api/`


// // הגדרה של פונקציה אסינכרונית הניגשת לשרת
// // async- זוהי הגדרה על פונקציה שמאפשרת לנהל את תוכן הפונקציה באופן ידני,
// // js ולא בדרך הרגילה של 
// //שפועלת ללא סדר
export const getTypeEnumFromServer = async (int) => {
    let res = await axios.get(`${serviceURL}Enum/GetAllEnumTable/?e=${int}`)
    if (res) {
        console.log(res);
        return await res.data;
    }
} 
// //שפועלת ללא סדר
export const addTypetoServer = async (int, obj) => {
    debugger
    let res = await axios.post(`${serviceURL}Enum/addEnum/MyEnum?e=${int}`, obj)
    if (res) {
        console.log(res);
        return await res.data;
    }
} 

// curl -X 'POST' \
//   'https://localhost:7254/api/Enum/addEnum/MyEnum?e=3' \
//   -H 'accept: text/plain' \
//   -H 'Content-Type: application/json' \
//   -d '{
//   "code": 0,
//   "typy": "lll"
// }'
