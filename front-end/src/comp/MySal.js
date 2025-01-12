import { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { getType } from "../redux/TypeEnumSlice";
import { getTypeEnumFromServer } from "../utils/getType";
import { Accordion, AccordionSummary, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { AccountCircle, ArrowDropDown, Category } from "@mui/icons-material";

export const MySal = () => {

    //משתנים
    const dispatch = useDispatch();
    const { nameCatering } = useParams();
    const [type, setType] = useState();
    const [salOpen, setSalOpen] = useState(true)
    let dataByType = [];
    const [myInvent, setMyInvent] = useState([]);
    let currentuInvent = {
        Codefo: 0,
        Namefo: '',
        countFo: 0
    };
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

    // שליפת נתונים מהמחסן

    const TypeEnum = useSelector(
        state => state.type.TypeEnum
    );

    const catering = useSelector(state =>
        state.Catering.catering
    );

    const food = useSelector(state => 
        state.food.food.filter(f => f.codeCatering == nameCatering)
    );
    // קריאות שרת
    const getMyType = async (int) => {
        if (!TypeEnum[int].length) {
            const t = await getTypeEnumFromServer(int);
            dispatch(getType({ place: int, data: t }))
        }
    };


    useEffect(() => {
        getMyType(3);
    }, [])

    const setTypes = (current, i) => {
        dataByType = new Set(food.filter(f => f.typeOfCourse == current.code).typeOfFood)
        // Array.form(new Set)
    }

    //נסיון ל-סט
    // let dataByType = [];
    // const [ff, setFf] = useState([])

    // const setTypes = (current, i) => {
    //     debugger
    //     const c = food.filter(f => f.typeOfCourse == current.code);    
    //     dataByType = new Set(c.map(x => x.typeOfFood))
    //     setFf(ff, dataByType)
    //     // Array.form(new Set)
    //     console.log({ dataByType })
    //     // console.log('ff', ff)
    // }

    const setTypes2 = (f, j) => {
        for (let index = 0; index < dataByType.length; index++) {
            Array.form(setTypeFood = new Set(food.filter(x => x.typeOfFood == index.code).nameOfFood))
        }
        // setMyFood[j] = new Set(food.filter(x => x.typeOfFood == f.code).nameOfFood)
    }

    //פונקציות
    const saveSal = () => {
        setSalOpen(!salOpen)
    }

    const AddMyInvent = (code, name) => {
        currentuInvent.Codefo = code;
        currentuInvent.Namefo = name;
        currentuInvent.countFo = 0;
        const f = [...myInvent, currentuInvent]
        debugger
        // setMyInvent(myInvent.concat(currentuInvent))
        setMyInvent(f);
    }

    const addCount = (id, value) => {
        let temp = [...myInvent];
        const i = myInvent.findIndex((x) => x.Codefo == id);
        temp[i] = { ...myInvent[i], countFo: Number(value) }
        console.log('temp', temp)
        setMyInvent(temp)
    }

    return <div className="mySalRashi">
        {salOpen &&
            <div>
                <div className="type-All-Food">
                    {
                        TypeEnum[3] && TypeEnum[3].map(
                            (t, i) => 
                                <Accordion id={t.code}>
                                    {food && food.map((h)=>h.typeOfCourse == t.code &&<AccordionSummary
                                        expandIcon={<ArrowDropDown></ArrowDropDown>}
                                        aria-controls="panel1-content"
                                        id="panel1-header"
                                    >
                                        <Typography onLoad={() => setTypes(t, i)}>
                                            {t.typy}
                                        </Typography>
                                    </AccordionSummary>)}
                                    <div className="type-food">
                                        {
                                            food && food.filter((x) => x.typeOfFood == t.code).map(
                                                (f, j) =>
                                                    <Accordion id={f.code}>
                                                        <AccordionSummary
                                                            expandIcon={<ArrowDropDown></ArrowDropDown>}
                                                            aria-controls="panel1-content"
                                                            id="panel1-header"
                                                        >
                                                            {f &&
                                                                <Typography onLoad={setTypes2(f, j)}>
                                                                    {f.typeOfFood}
                                                                </Typography>}
                                                        </AccordionSummary>
                                                        {food && food.map(
                                                            (x) =>
                                                                f.typeOfFood === x.typeOfFood &&
                                                                <Typography>
                                                                    <button onClick={() => AddMyInvent(x.codeFood, x.nameOfFood)} style={{ width: "100%", backgroundColor: "lightBlue" }}>
                                                                        {x.nameOfFood} {x.price} ש"ח</button>
                                                                </Typography>
                                                        )}
                                                    </Accordion>
                                            )
                                        }
                                    </div >
                                </Accordion >
                        )
                    }
                </div>

                <div>
                    {myInvent && myInvent.length > 0 && myInvent.map((m) => {
                        return food && food.map((f) => {
                            if (m.Codefo == f.codeFood)
                                return <div>
                                    {f.nameOfFood}
                                    <input placeholder="הכנס כמות" type="number" id={f.codeFood}
                                        onChange={(e) => {
                                            debugger
                                            addCount(e.target.id, e.target.value);
                                        }} />
                                    מחיר {f.price}
                                    סה"כ {f.price * 2}
                                </div>
                        })
                    })}
                </div>

                <button onClick={() => saveSal()}>לאישור הזמנה</button>
            </div>}
        {!salOpen &&
            <div>
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
                    <br></br>
                    <label>{catering && catering.map(x => x.codeCatering == nameCatering && x.nameCatering)}</label>
                    <InputLabel>סוג האירוע❓</InputLabel>
                    <Select label="status" style={{ width: "223px", border: "2px solid rgb(253, 158, 26)" }} onMouseOver={() => getMyType(4)} >
                        <div >  {TypeEnum[4] && TypeEnum[4].length && TypeEnum[4].map(f => {
                            return <>
                                <MenuItem href="#" value={f.code} onClick={(e) => {
                                    setEventProp({ ...eventProp, typeofEvent: String(e.target.value) })
                                }}>
                                    {f.typy}
                                </MenuItem>
                            </>
                        })}</div>
                    </Select>
                    <br ></br>
                    <InputLabel>זמן האירוע ⏳</InputLabel>
                    <Select label="status" style={{ width: "223px", border: "2px solid rgb(253, 158, 26)" }} onMouseOver={() => getMyType(1)} >
                        <div >  {TypeEnum[1] && TypeEnum[1].length && TypeEnum[1].map(f => {
                            return <>
                                <MenuItem href="#" value={f.code} onClick={(e) => {
                                    setEventProp({ ...eventProp, TimeOfEvent: String(e.target.value) })
                                }}>
                                    {f.typy}
                                </MenuItem>
                            </>
                        })}</div>
                    </Select>
                </div>
            </div>
        }
    </div>
}
// { TypeEnum[5] && TypeEnum[5].filter(
//     (x) =>
//         f.typeOfFood === x.typy &&
//         <Typography>
//             <button onClick={() => AddMyInvent(x.codeFood, x.nameOfFood)} style={{ width: "100%", backgroundColor: "lightBlue" }}>
//                 {x.nameOfFood} {x.price} ש"ח</button>
//         </Typography>
// )}