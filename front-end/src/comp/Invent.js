import { useEffect, useState } from "react";
import { InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import { addCustomer, getCustomerById } from "../utils/getCustomer"
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getType } from "../redux/TypeEnumSlice";
import { getTypeEnumFromServer } from "../utils/getType";
import { getCatering } from "../redux/CateringSlice";
import { getCateringFromServer } from "../utils/getCatering";
import { addCustomers, addNewCustomer } from "../redux/CustomerSlice";

export function Invent() {
    //עידכון
    //קוד
    const [codeCustomer, setCodeCustomer] = useState();
    const [Myprop, setMyprop] = useState({
        CodeCustomer: 0,
        NameCustomer: '',
        FamilyCustomer: '',
        TelCustomer: '',
        CardCustomer: '',
    });

    const [eventProp, setEventProp] = useState({
        typeofEvent: '',
        TimeOfEvent: '',
    });

    //בשביל התקינות
    const [error, setError] = useState({})
    const dispatch = useDispatch();
    const navigate = useNavigate();

    //בדיקות תקינות

    //מספר זהות
    const validateCode = async (event) => {
        event.preventDefault();
        //???????????????????????
        //בדיקה אם הוא לקוח מוכר ואם כן להציג את הפרטים שלו
        var passw = /^[0-9]\w{8}$/;
        if (!event.target.value)
            setError(
                { ...error, codeError: "חייבים למלא קוד" })
        else if (event.target.value.match(passw)) {
            setError({ ...error, codeError: " " })
        }
        else
            setError({ ...error, codeError: ' תעודת הזהות חייבת להיות 9 תווים המכילים ספרות בלבד ' })
    }

    //שם פרטי ומשפחה
    const validateName = async (event) => {
        event.preventDefault();
        //???????????????????????
        //בדיקה אם הוא לקוח מוכר ואם כן להציג את הפרטים שלו
        var pass = /^['א-ת']\w{5}$/;
        if (!event.target.value)
            setError(
                { ...error, codeError: "חייבים למלא קוד" })
        else if (event.target.value.match(pass)) {
            setError({ ...error, codeError: " " })
        }
        else
            setError({ ...error, codeError: ' תעודת  חייבת להיות 9 תווים המכילים ספרות בלבד ' })
    }

    //טלפון
    const validateTel = async (event) => {
        event.preventDefault();
        //???????????????????????
        //בדיקה אם הוא לקוח מוכר ואם כן להציג את הפרטים שלו
        var pass = /^[0-9]\w{6}$/;
        if (!event.target.value)
            setError(
                { ...error, codeError: "חייבים למלא טלפון" })
        else if (event.target.value.match(pass)) {
            setError({ ...error, codeError: " " })
        }
        else
            setError({ ...error, codeError: '   הטלפון חייב להיות לפחות 7 תווים המכילים ספרות בלבד ' })
    }

    //אשראי
    const validateCard = async (event) => {
        event.preventDefault();
        //???????????????????????
        //בדיקה אם הוא לקוח מוכר ואם כן להציג את הפרטים שלו
        var pass = /^[0-9]\w{15}$/;
        if (!event.target.value)
            setError(
                { ...error, codeError: "חייבים למלא מספר אשראי" })
        else if (event.target.value.match(pass)) {
            setError({ ...error, codeError: " " })
        }
        else
            setError({ ...error, codeError: '   מספר האשראי חייב להיות 16 תווים המכילים ספרות בלבד ' })
    }

    const saveCustomer = async () => {
        move(Myprop.CodeCustomer)
        const newCustomer = await addCustomer(Myprop);
        addNewCustomer(newCustomer)
    }

    function move(codeCustomer) {
        var elem = document.getElementById("myBar");
        var width = 0;
        var id = setInterval(frame, 20);
        function frame() {
            if (width < 100) {
                width++;
                elem.style.width = width + '%';
                elem.innerHTML = width * 1 + '%';
            }
            else {
                elem.style.width = 0
                elem.innerHTML = '';
                clearInterval(id);
                aaaaa(codeCustomer)
            }
        }
    }

    const aaaaa = (codeCustomer) => {
        var i = 0;
        var txt = 'הצטרפת בהצלחה למערכת!!!';
        var speed = 50;
        // typeWriter()
        // function typeWriter() {
        //     if (i < txt.length) {
        //         document.getElementById("demo").innerHTML += txt.charAt(i);
        //         i++;
        //         setTimeout(typeWriter, speed);
        //     }
        // }
        finishWellcome(codeCustomer)
    }

    const finishWellcome = async (codeCustomer) => {
        navigate('/Personal/' + codeCustomer);
    }

    const handleFilterByInvent = (codeCatering) => {
        navigate('/MySal/' + codeCatering);
    }

    const enterCustomer = async () => {
        const customerFromServer = await getCustomerById(codeCustomer);
        debugger
        dispatch(await addCustomers(customerFromServer));
        debugger
        //איך להוסיף את הקייטרינג לרידקס
        move(customerFromServer.codeCustomer)
    }


    // שליפת נתונים מהמחסן
    const food = useSelector(state => {
        return state.food.food
    });

    const catering = useSelector(state => {
        return state.Catering.catering
    });

    const TypeEnum = useSelector(state => {
        return state.type.TypeEnum
    });

    // קריאות שרת

    const getMyCatering = async () => {
        if (!catering) {
            const t = await getCateringFromServer();
            dispatch(getCatering(t))
        }
    };

    useEffect(() => {
        getMyCatering();
    }, [])

    return <>
        <div className="rashiInvent">
            <div className="pic2">

                <div className="aa">
                    <div>
                        <AccountCircle style={{ width: "70px", height: "70px", color: "rgb(253, 158, 26)" }}></AccountCircle>
                    </div>
                    <div style={{ color: "rgb(255, 145, 0)", fontSize: "30px", fontFamily: "'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode'" }}>הכנס פרטים אישיים </div>
                    <TextField
                        style={{ width: "223px", border: "2px solid rgb(253, 158, 26)" }}
                        variant="outlined"
                        type="number"
                        label="📋מספר זהות"
                        onChange={(e) => {
                            setMyprop({ ...Myprop, CodeCustomer: Number(e.target.value) })
                            validateCode(e)
                        }}
                    />
                    <br></br>
                    <TextField
                        style={{ width: "223px", border: "2px solid rgb(253, 158, 26)" }}
                        variant="outlined"
                        type="String"
                        label="📝שם פרטי"
                        onChange={(e) => {
                            setMyprop({ ...Myprop, NameCustomer: e.target.value })
                            validateName(e)
                        }}
                    />
                    <br></br>
                    <TextField
                        style={{ width: "223px", border: "2px solid rgb(253, 158, 26)" }}
                        variant="outlined"
                        type="String"
                        label="📑שם משפחה"
                        onChange={(e) => {
                            setMyprop({ ...Myprop, FamilyCustomer: e.target.value })
                            validateName(e)
                        }}
                    />
                    <br></br>
                    <TextField
                        style={{ width: "223px", border: "2px solid rgb(253, 158, 26)" }}
                        variant="outlined"
                        type="tel"
                        label="📞טלפון"
                        onChange={(e) => {
                            setMyprop({ ...Myprop, TelCustomer: e.target.value })
                            validateTel(e)
                        }}
                    />
                    <br></br>
                    <TextField
                        style={{ width: "223px", border: "2px solid rgb(253, 158, 26)" }}
                        variant="outlined"
                        type="String"
                        label="💳כרטיס אשראי"
                        onChange={(e) => {
                            setMyprop({ ...Myprop, CardCustomer: e.target.value })
                            validateCard(e)
                        }}
                    />
                    
                   
                    <small style={{ color: "red", width: "50px", height: "30px", fontSize: "14px" }} >{error?.codeError}</small>
                </div>
                {(Myprop.CodeCustomer != 0
                    && Myprop.NameCustomer != ""
                    && Myprop.FamilyCustomer != ""
                    && Myprop.TelCustomer != ""
                    && Myprop.CardCustomer != "")
                    && <button onClick={() => saveCustomer()} className="saveCustomer">להצטרפות</button>}
                <div className="myBar">
                    <div id="myBar"></div>
                </div>
                <p id="demo"></p>
            </div>

            <div className="aa">
                <div>
                    <AccountCircle style={{ width: "70px", height: "70px", color: "pink" }}></AccountCircle>
                    <div style={{ color: "rgb(255, 145, 0)", fontSize: "30px", fontFamily: "'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode'" }}>לכניסה ישירה לאיזור האישי שלך</div>
                </div>
                <TextField
                    style={{ width: "223px", border: "2px solid pink" }}
                    variant="outlined"
                    type="Number"
                    label="קוד לקוח"
                    onChange={(e) => {
                        setCodeCustomer(Number(e.target.value))
                    }}
                />
                <br></br>
                <small style={{ color: "red", width: "50px", height: "30px", fontSize: "14px" }} >{error?.codeError}</small>
                {JSON.stringify(codeCustomer) >= 0
                    && <button onClick={() => enterCustomer()} className="saveCustomer">לכניסה</button>}

                <div className="myBar">
                    <div id="myBar"></div>
                </div>
            </div >
        </div>
    </>
}
