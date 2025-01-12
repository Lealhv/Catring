import { Login } from "@mui/icons-material";
import { Button, TextField } from "@mui/material"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { getCateringById, getCateringFromServer } from "../utils/getCatering";
import { addCatering, getCatering } from "../redux/CateringSlice";
import { addTypetoServer, getTypeEnumFromServer } from "../utils/getType";
import { getType } from "../redux/TypeEnumSlice";
import { type } from "@testing-library/user-event/dist/type";
import { useNavigate } from "react-router-dom";
import { getCustomerById } from "../utils/getCustomer";
import { addCustomers } from "../redux/CustomerSlice";

export const KnowPerson = ({ int }) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [known, setKnown] = useState({
        name: '',
        ints: 0
    });

    // שליפת נתונים מהמחסן
    const catering = useSelector(state => {
        return state.Catering.catering
    });
    const cateringkk = useSelector(state => {
        return state.Catering.currentCatering
    });
    // קריאות שרת
    const getMyCatering = async () => {
        if (!catering) {
            const t = await getCateringFromServer();
            dispatc(getCatering(t))
        }
    };

    const logIn = async () => {
        if ({ int }.int == 1) {
            const cateringFromServer = await getCateringById(known.ints);
            dispatch(await addCatering(cateringFromServer));
            console.log
            navigate('/AddFoodToCatering/' + known.ints);
        }
        if ({ int }.int == 2) {

            const customerFromServer = await getCustomerById(known.ints);
            dispatch(await addCustomers(customerFromServer));
            navigate('/MySal/' + known.ints);
        }
    }

    useEffect(() => {
        getMyCatering()
    }, [])

    return <>
        <div className="known">
            {/* <div style={{ color: "rgb(255, 145, 0)", fontSize: "30px", fontFamily: "'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode'" }}>הכנס פרטים אישיים </div> */}
            <TextField
                style={{ width: "99%", border: "2px solid pink" }}
                variant="outlined"
                type="String"
                label="הכנס שם"
                onChange={(e) => {
                    setKnown({ ...known, name: String(e.target.value) })
                }}
            />
            <TextField
                style={{ width: "99%", border: "2px solid pink" }}
                variant="outlined"
                type="Number"
                label="הכנס קוד"
                onChange={(e) => {
                    setKnown({ ...known, ints: Number(e.target.value) })
                }}
            />

            <Button onClick={() => logIn()}>לכניסה<Login></Login></Button>
        </div>
    </>
}

export const AddCourse = (myLable) => {

    const [typeString, setTypeString] = useState(myLable.myLable)
    debugger
    const [number, setNumber] = useState(myLable.num)

    const dispatc = useDispatch();
    const [known, setKnown] = useState({
        code: 0,
        typy: ''
    });
    // שליפת נתונים מהמחסן
    const TypeEnum = useSelector(state => {
        return state.type.TypeEnum
    });

    // קריאות שרת
    const getMyType = async (int) => {
        if (!TypeEnum[int].length) {
            const t = await getTypeEnumFromServer(int);
            dispatc(getType({ place: int, data: t }))
        }
    };

    const saveType = () => {
        debugger
        addTypetoServer(number, known)
    }

    useEffect(() => {
        getMyType(3)
    }, [])

    return <>
        <div className="known">
            {/* <div style={{ color: "rgb(255, 145, 0)", fontSize: "30px", fontFamily: "'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode'" }}>הכנס פרטים אישיים </div> */}
            <TextField
                style={{ width: "99%", border: "2px solid pink" }}
                variant="outlined"
                type="String"
                label={typeString}
                onChange={(e) => {
                    setKnown({ ...known, typy: String(e.target.value) })
                }}
            />

            <Button onClick={() => saveType()}>להוספה למערכת</Button>
        </div>
    </>
}

export const DialogFeedBack = () => {
    debugger
    const dispatch = useDispatch();
    const [known, setKnown] = useState({
        codeCus: '',
        codeCat: '',
        feedBack: ''
    });

    return <>
        <div className="known">
            <div style={{ color: "rgb(255, 145, 0)", fontSize: "30px", fontFamily: "'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode'" }}>הכנס פרטים אישיים </div>
            <TextField
                style={{ width: "99%", border: "2px solid pink" }}
                variant="outlined"
                type="String"
                label="הקוד האישי שלך"
                onChange={(e) => {
                    setKnown({ ...known, codeCus: String(e.target.value) })
                }}
            />


            <TextField
                style={{ width: "99%", border: "2px solid pink" }}
                variant="outlined"
                type="String"
                label="שם הקייטרינג ממנו נהנת"
                onChange={(e) => {
                    setKnown({ ...known, codeCat: String(e.target.value) })
                }}
            />

            <TextField
                style={{ width: "99%", border: "2px solid pink" }}
                variant="outlined"
                type="String"
                label="להוספת FEEDBACK לקייטרינג ממנו נהנת"
                onChange={(e) => {
                    setKnown({ ...known, feedBack: String(e.target.value) })
                }}
            />

            <Button>לכניסה<Login></Login></Button>
        </div>
    </>
}





