import { InputLabel, MenuItem, Select, TextField } from "@mui/material"
import { getTypeEnumFromServer } from "../utils/getType";
import { getType } from "../redux/TypeEnumSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { UpDateCatering, addFood } from "../utils/getCatering";
import { AddCourse } from "./MyDialog";
import { Dialog } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import { setCurrentCatering } from "../redux/CateringSlice";

export const AddFoodToCatering = () => {

    //משתנים

    const [isOpen, setIsOpen] = useState(false);
    const [addOpen, setAddOpen] = useState(false);
    const [myProperties, setMyProperties] = useState(false);
    const [myFoodOpen, setMyFoodOpen] = useState(false);
    const [myAddFood, setMyAddFood] = useState([]);
    const dispatch = useDispatch();

    const [item, setItem] = useState({
        codeFood: 0,
        codeCatering: 0,
        typeOfCourse: '',
        typeOfFood: '',
        nameOfFood: '',
        price: 0,
        img: '',
    });

    const [prop, setprop] = useState({
        codeCatering: 0,
        typeOfCatering: '',
        nameCatering: '',
        nameHechsher: '',
        minimumCount: 0,
    });

    // useParams
    // const params = useParams();

    //שליפה מהמחסן
    const currentCatering = useSelector(state => 
         state.Catering.currentCatering
    );

    const TypeEnum = useSelector(state => 
         state.type.TypeEnum
    );

    const food = useSelector(store => 
        store.food.food.filter(f => f.codeCatering == currentCatering.codeCatering)
    );

    //קריאות שרת
    const getMyType = async (int) => {
        if (!TypeEnum[int].length) {
            const t = await getTypeEnumFromServer(int);
            dispatch(getType({ place: int, data: t }))
        }
    };

    //useEffect
    useEffect(() => {
        myProp()
        getMyType(3);
        getMyType(0);
        getMyType(2);
    }, [])

    //פונקציות

    const addFoodToThisCatering = () => {
        setItem({ ...item, codeCatering: Number(currentCatering.codeCatering) })
        setMyAddFood(myAddFood.concat(item))
        setItem({
            codeFood: 0,
            codeCatering: currentCatering.codeCatering,
            typeOfCourse: '',
            typeOfFood: '',
            nameOfFood: '',
            price: 0,
            img: ''
        })
    }

    const scrollFunction = () => {
        if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
            document.getElementById("header").style.fontSize = "30px";
        } else {
            document.getElementById("header").style.fontSize = "90px";
        }
    }

    const saveAllFood = () => {
        addFood(myAddFood)
    }

    const myProp = () => {
        setprop({
            codeCatering: currentCatering.codeCatering,
            typeOfCatering: currentCatering.typeOfCatering,
            nameCatering: currentCatering.nameCatering,
            nameHechsher: currentCatering.nameHechsher,
            minimumCount: currentCatering.minimumCount,
        })
    }

    const upDateCatering = async () => {
        dispatch (await setCurrentCatering(prop))
        UpDateCatering(prop)
        setMyProperties(false)
    }

    return <>
        <div>
            <div style={{ backgroundColor: "rgb(253, 158, 26)", color: "black", height: "30px" }}>{currentCatering.nameCatering},
                {currentCatering.codeCatering},  {currentCatering.typeOfCatering},  {currentCatering.nameHechsher},  {currentCatering.minimumCount},
            </div>

            <button className="open " onClick={() => setAddOpen(!addOpen)}>להוספת מאכלים לקייטרינג שלך</button>
            <button className="open " onClick={() => setMyFoodOpen(!myFoodOpen)}>להצגת המאכלים של הקייטרינג שלך</button>
            <button className="open " onClick={() => setMyProperties(!myProperties)}>לעדכון פרטי הקייטרינג שלך</button>

            {addOpen && <div className="mySalRashi">
                <div className="aa" >

                    <div><InputLabel>סוג מנה</InputLabel>
                        <Select labelId="demo-simple-select-lable" id="demo-simple-select" label="status" style={{ width: "223px", border: "2px solid pink" }}>
                            <div> {TypeEnum[3] && TypeEnum[3].length && TypeEnum[3].map(f => {
                                return <>
                                    <MenuItem href="#" value={f.a} onClick={(e) => {
                                        setItem({ ...item, typeOfCourse: String(e.target.value) })
                                    }}>
                                        {f.typy}
                                    </MenuItem>
                                </>
                            })}
                                <div onClick={() => setIsOpen(true)}>  אחר  </div>
                            </div>
                        </Select>
                    </div>
                    <br></br>

                    <InputLabel>סוג המאכל</InputLabel>
                    <Select label="status" style={{ width: "223px", border: "2px solid pink" }} defaultValue={item.typeOfFood}>
                        <div>  {food && food.length && food.map(f => {
                            return <>
                                <MenuItem href="#" value={item.typeOfFood} onClick={(e) => {
                                    debugger
                                    setItem({ ...item, typeOfFood: e.currentTarget.innerText })
                                }}>
                                    {f.typeOfFood}
                                </MenuItem>
                            </>
                        })}
                        </div>

                    </Select>
                    <br></br>
                    <TextField
                        style={{ width: "223px", border: "2px solid pink" }}
                        variant="outlined"
                        type="String"
                        label="שם המאכל🖋"
                        value={item.nameOfFood}
                        onChange={(e) => {
                            setItem({ ...item, nameOfFood: String(e.target.value) })
                        }}
                    />
                    <br></br>
                    <TextField
                        style={{ width: "223px", border: "2px solid pink" }}
                        variant="outlined"
                        type="Float"
                        value={item.price}
                        label="מחיר💲"
                        onChange={(e) => {
                            setItem({ ...item, price: parseFloat(e.target.value) })
                        }}
                    />
                    <br></br>
                    <TextField
                        style={{ width: "223px", border: "2px solid pink" }}
                        variant="outlined"
                        type="String"
                        value={item.img}
                        label="תמונה📸"
                        onChange={(e) =>
                            setItem({ ...item, img: String(e.target.value) })}
                    // setItem({ ...item, codeCatering: Number(currentCatering.codeCatering) })
                    />
                    <br></br>
                    <button onClick={() => addFoodToThisCatering()}>להוספת המאכל</button>
                </div>

                {/* להצגת הטבלה */}

                <div className="theTable">
                    {myAddFood && myAddFood.length && myAddFood.map((f) => {
                        return <div>
                            <table className="myTable">
                                <tr onScroll={scrollFunction}>
                                    {/* <th>{index == 0 &&  <div id="header">המוצרים שלנו</div>}</th> */}
                                    <th>{f.nameOfFood}</th>
                                    <th>{TypeEnum[3] && TypeEnum[3].length && TypeEnum[3].map(t => t.code == f.typeOfCourse && t.typy)}</th>
                                    <th>{f.typeOfFood}</th>
                                    <th>{f.price}</th>
                                </tr>
                            </table>
                        </div>
                    })}
                </div>

                <button onClick={() => saveAllFood()}>לשמירת התפריט למערכת</button>
            </div >}

            {myFoodOpen &&
                <div className="foodCatering">
                    {food && food.map((f) => {
                        return <p>{f.nameOfFood}  {f.typeOfFood}  {f.typeOfCourse}  {f.img}  {f.price}  </p>
                    })}
                </div>}

            {myProperties && <div className="aa">
                <div>
                    <AccountCircle style={{ width: "70px", height: "70px", color: "pink" }}></AccountCircle>
                    <div style={{ color: "rgb(255, 145, 0)", fontSize: "30px", fontFamily: "'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode'" }}>הכנס פרטים אישיים </div>
                </div>
                <TextField
                    style={{ width: "223px", border: "2px solid pink" }}
                    variant="outlined"
                    type="String"
                    label="📝שם הקייטרינג"
                    value={prop.nameCatering}
                    onChange={(e) => {
                        setprop({ ...prop, nameCatering: String(e.target.value) })
                    }}
                />
                <br></br>
                <TextField
                    style={{ width: "223px", border: "2px solid pink" }}
                    variant="outlined"
                    type="number"
                    label="כמות מינימום♎"
                    value={prop.minimumCount}
                    onChange={(e) => {
                        setprop({ ...prop, minimumCount: Number(e.target.value) })
                    }}
                />

                <InputLabel>הכשרים</InputLabel>
                <Select label="status" style={{ width: "223px", border: "2px solid pink" }}>
                    <div >  {TypeEnum[0] && TypeEnum[0].length && TypeEnum[0].map(f => {
                        return <>
                            <MenuItem href="#" value={prop.nameHechsher} onClick={(e) => {
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
                <br></br>
                <button onClick={() => upDateCatering()}>לעדכון פרטי הקייטרינג במערכת</button>
            </div>}
        </div>
        <Dialog open={isOpen} onClose={!isOpen}><AddCourse num={3} myLable={"להוספת מנה למערכת"} ></AddCourse></Dialog>

    </>
}


