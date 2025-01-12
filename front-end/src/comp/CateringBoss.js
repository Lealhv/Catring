
import { InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { AccountCircle } from "@mui/icons-material"
import { addBoss, getCateringById } from "../utils/getCatering";
import { getType } from "../redux/TypeEnumSlice";
import { getTypeEnumFromServer } from "../utils/getType";
import { useNavigate } from "react-router-dom";
import { Dialog } from "@mui/material";
import { AddCourse } from "./MyDialog";
import { addCatering, addNewCatering } from "../redux/CateringSlice";

export const CateringBoss = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [prop, setprop] = useState({
        codeCatering: 0,
        typeOfCatering: '',
        nameCatering: '',
        nameHechsher: '',
        minimumCount: 0,
    });
    const [codeCatering, setCodeCatering] = useState(0);
    const [isOpen1, setIsOpen1] = useState(false);
    const [isOpen2, setIsOpen2] = useState(false);

    let codeCateringFromServer;

    //בשביל התקינות
    const [error, setError] = useState({})

    useEffect(() => {
        getMyType(0);
        getMyType(2);
    }, [])

    // קריאות שרת
    const getMyType = async (int) => {
        if (!TypeEnum[int].length) {
            const t = await getTypeEnumFromServer(int);
            dispatch(getType({ place: int, data: t }))
        }
    };

    // שליפת נתונים מהמחסן
    const TypeEnum = useSelector(state => {
        return state.type.TypeEnum
    });

    //בדיקות תקינות
    //שם
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

    //אשראי
    const validateMin = async (event) => {
        event.preventDefault();
        //???????????????????????
        //בדיקה אם הוא מנהל מוכר ואם כן להציג את הפרטים שלו
        if (!event.target.value)
            setError(
                { ...error, codeError: "חייבים למלא מספר מינימום" })
        else if (event.target.value < 0)
            setError({ ...error, codeError: ' כמות המינימום אינה תקינה' })
        else
            setError({ ...error, codeError: " " })
    }

    //פונקציות
    const saveBoss = async () => {
        codeCateringFromServer = await addBoss(prop);
        setprop({ ...prop, codeCatering: Number(codeCateringFromServer) })
        dispatch(await addNewCatering(prop));
        move(codeCateringFromServer)
    }

    const move = (codeCateringFromServer) => {
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
                elem.style.width = 0;
                elem.innerHTML = 0;
                clearInterval(id);
                finishWellcome(codeCateringFromServer)
            }
        }
    }

    const finishWellcome = async (codeCateringFromServer) => {
        navigate('/AddFoodToCatering/' + codeCateringFromServer);
    }

    const logIn = (num) => {
        if (num == 1)
            setIsOpen1(true);
        if (num == 2)
            setIsOpen2(true);
    }

    const enterBoss = async () => {
        const cateringFromServer = await getCateringById(codeCatering);
        dispatch(await addCatering(cateringFromServer));
        //איך להוסיף את הקייטרינג לרידקס
        move(cateringFromServer.codeCatering)
    }
    return <>

        <div className="pic2">
            {/* להכנסת קייטרינג חדש */}
            <div className="aa">
                <div>
                    <AccountCircle style={{ width: "70px", height: "70px", color: "pink" }}></AccountCircle>
                    <div style={{ color: "rgb(255, 145, 0)", fontSize: "30px", fontFamily: "'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode'" }}>הכנס פרטים אישיים </div>
                </div>
                <TextField
                    style={{ width: "223px", border: "2px solid pink" }}
                    variant="outlined"
                    type="String"
                    label="📝שם הקייטרינג"
                    onChange={(e) => {
                        setprop({ ...prop, nameCatering: String(e.target.value) })
                        validateName(e)
                    }}
                />
                <br></br>
                <TextField
                    style={{ width: "223px", border: "2px solid pink" }}
                    variant="outlined"
                    type="number"
                    label="כמות מינימום♎"
                    onChange={(e) => {
                        setprop({ ...prop, minimumCount: Number(e.target.value) })
                        validateMin(e)
                    }}
                />

                <InputLabel>הכשרים</InputLabel>
                <Select label="status" style={{ width: "223px", border: "2px solid pink" }}>
                    <div >  {TypeEnum[0] && TypeEnum[0].length && TypeEnum[0].map(f => {
                        return <>
                            <MenuItem href="#" value={f.code} onClick={(e) => {
                                setprop({ ...prop, nameHechsher: String(e.target.value) })
                            }}>
                                {f.typy}
                            </MenuItem>
                        </>
                    })}
                        <div onClick={() => logIn(1)}>  אחר  </div>
                    </div>
                </Select>

                <InputLabel>סוג הקייטרינג🍗🥛🍸</InputLabel>
                <Select label="status" style={{ width: "223px", border: "2px solid pink" }}>
                    <div >  {TypeEnum[2] && TypeEnum[2].length && TypeEnum[2].map(f => {
                        return <>
                            <MenuItem href="#" value={f.code} onClick={(e) => {
                                setprop({ ...prop, typeOfCatering: String(e.target.value) })
                            }}>
                                {f.typy}
                            </MenuItem>
                        </>
                    })}
                    </div>
                </Select>

                <small style={{ color: "red", width: "50px", height: "30px", fontSize: "14px" }} >{error?.codeError}</small>
                <br></br>
                {(prop.nameCatering != ""
                    && JSON.stringify(prop.minimumCount) != 0
                    && prop.nameHechsher != ""
                    && prop.typeOfCatering != "")
                    && <button onClick={() => saveBoss()} className="saveCustomer">להצטרפות</button>}

                <div className="myBar">
                    <div id="myBar"></div>
                </div>
                <Dialog open={isOpen1} onClose={!isOpen1}><AddCourse myLable={"להוספת הכשר למערכת"} num={0}></AddCourse></Dialog>
            </div >

            {/* לכניסה לקייטרינג מוכר */}
            <div className="aa">
                <div>
                    <AccountCircle style={{ width: "70px", height: "70px", color: "pink" }}></AccountCircle>
                    <div style={{ color: "rgb(255, 145, 0)", fontSize: "30px", fontFamily: "'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode'" }}>לכניסה כמנהל שמור במערכת הכנס קוד אישי</div>
                </div>
                <TextField
                    style={{ width: "223px", border: "2px solid pink" }}
                    variant="outlined"
                    type="Number"
                    label="קוד הקייטרינג"
                    onChange={(e) => {
                        setCodeCatering(Number(e.target.value))
                    }}
                />
                <br></br>
                <small style={{ color: "red", width: "50px", height: "30px", fontSize: "14px" }} >{error?.codeError}</small>
                {JSON.stringify(codeCatering) >= 10000
                    && <button onClick={() => enterBoss()} className="saveBoss">לכניסה</button>}

                <div className="myBar">
                    <div id="myBar"></div>
                </div>
                <Dialog open={isOpen1} onClose={!isOpen1}><AddCourse myLable={"להוספת הכשר למערכת"} num={0}></AddCourse></Dialog>
            </div >

        </div>
    </>

}