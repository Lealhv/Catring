import { AccountCircle } from "@mui/icons-material";
import { TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeCustomers } from "../utils/getCustomer";
import { getTypeEnumFromServer } from "../utils/getType";
import { getType } from "../redux/TypeEnumSlice";
import { useNavigate } from "react-router-dom";
import { setCurrentCustomer } from "../redux/CustomerSlice";
import { getOrderByCodeCustomer, getOrderById } from "../utils/getOrder";
import { MySal } from "./MySal";

export const Personal = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [updateProp, setUpdateProp] = useState({
        CodeCustomer: 0,
        NameCustomer: '',
        FamilyCustomer: '',
        TelCustomer: '',
        CardCustomer: '',
    });

    const [addOpen, setAddOpen] = useState(false);
    const [myFoodOpen, setMyFoodOpen] = useState(false);
    const [myProperties, setMyProperties] = useState(false);
    const [myInventOpen, setMyInventOpen] = useState(false);
    const [currentOrder, setCurrentOrder] = useState(false);

    // שליפת נתונים מהמחסן
    const currentCustomer = useSelector(state =>
        state.Customer.currentCustomer
    );

    const TypeEnum = useSelector(state =>
        state.type.TypeEnum
    );


    const catering = useSelector(state =>
        state.Catering.catering
    );

    // קריאות שרת
    const getMyType = async (int) => {
        if (!TypeEnum[int].length) {
            const t = await getTypeEnumFromServer(int);
            dispatch(getType({ place: int, data: t }))
        }
    };

    const handleFilterByInvent = (codeCatering) => {
        setAddOpen(!addOpen)
        // navigate('/MySal/' + codeCatering);
    }

    const putInProp = () => {
        setUpdateProp({
            CodeCustomer: currentCustomer.CodeCustomer,
            NameCustomer: currentCustomer.NameCustomer,
            FamilyCustomer: currentCustomer.FamilyCustomer,
            TelCustomer: currentCustomer.TelCustomer,
            CardCustomer: currentCustomer.CardCustomer
        })
    }

    const changeCustomer = async () => {
        dispatch(await setCurrentCustomer(updateProp))
        changeCustomers(updateProp)
        setMyProperties(false)
    }

    const yourOrder = async () => {
        setMyFoodOpen(!myInventOpen)
        setCurrentOrder(await getOrderByCodeCustomer(currentCustomer.codeCustomer))
    }

    useEffect(() => {
        putInProp();
    }, [])

    return <>
        <div>
            <div style={{ backgroundColor: "rgb(253, 158, 26)", color: "black", height: "30px" }}>
                {updateProp.nameCustomer} {updateProp.familyCustomer}, {updateProp.codeCustomer}, {updateProp.telCutomer}, {updateProp.cardCustomer}
            </div>
            {/* <button onMouseOver={() => getMyType(0)} className="dropbtn" id="dropbtn">להזמנות - יופעל בהמשך...</button> */}
            <button className="open " onClick={() => setMyProperties(!myProperties)}>לעדכון הפרטים שלך</button>
            <button className="open " onClick={() => yourOrder()}>להצגת ההזמנות שלך</button>
            <div className="dropup" id="dropup">
                <button className="open " id="setMyFoodOpen" onClick={() => getMyType(0)}>להזמנת מאכלים לאירוע שלך</button>
                <div className="dropup-content">
                    {catering && catering.length && catering.map(f => {
                        return <>
                            <a href="#" onClick={() => handleFilterByInvent(f.codeCatering)}>
                                שם הקייטרינג: {f.nameCatering}
                                כמות מינימום: {f.minimumCount}
                                {(TypeEnum[0].find((o) => o.code == f.nameHechsher))?.typy}
                            </a>
                        </>
                    })}
                </div>
            </div>

            {myProperties &&
                <div className="aa">
                    <div>
                        <AccountCircle style={{ width: "70px", height: "70px", color: "rgb(253, 158, 26)" }}></AccountCircle>
                    </div>
                    <div style={{ color: "rgb(255, 145, 0)", fontSize: "30px", fontFamily: "'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode'" }}>עדכן פרטים אישיים </div>
                    <TextField
                        style={{ width: "223px", border: "2px solid rgb(253, 158, 26)" }}
                        variant="outlined"
                        type="String"
                        label="📝שם פרטי"
                        defaultValue={currentCustomer.nameCustomer}
                        value={updateProp.NameCustomer}
                        onChange={(e) => {
                            setUpdateProp({ ...updateProp, NameCustomer: String(e.target.value) })
                        }}
                    />
                    <br></br>
                    <TextField
                        style={{ width: "223px", border: "2px solid rgb(253, 158, 26)" }}
                        variant="outlined"
                        type="String"
                        label="📑שם משפחה"
                        defaultValue={currentCustomer.familyCustomer}
                        value={updateProp.FamilyCustomer}
                        onChange={(e) => {
                            setUpdateProp({ ...updateProp, FamilyCustomer: e.target.value })
                        }}
                    />
                    <br></br>
                    <TextField
                        style={{ width: "223px", border: "2px solid rgb(253, 158, 26)" }}
                        variant="outlined"
                        type="Number"
                        label="📞טלפון"
                        defaultValue={currentCustomer.telCutomer}
                        value={updateProp.TelCustomer}
                        onChange={(e) => {
                            debugger
                            setUpdateProp({ ...updateProp, TelCustomer: String(e.target.value) })
                        }}
                    />
                    <br></br>
                    <TextField
                        style={{ width: "223px", border: "2px solid rgb(253, 158, 26)" }}
                        variant="outlined"
                        type="String"
                        label="💳כרטיס אשראי"
                        defaultValue={currentCustomer.cardCustomer}
                        value={updateProp.CardCustomer}
                        onChange={(e) => {
                            setUpdateProp({ ...updateProp, CardCustomer: e.target.value })
                        }}
                    />
                    <br></br>
                    <button onClick={() => changeCustomer()} className="saveCustomer">לעדכון</button>
                </div>}

            {(currentOrder && myFoodOpen) && currentOrder.orders.map((x) => {
                return <div> {x.codeCatering}   {x.codeCustomer}   {x.codeOrder}   {x.countOrder}  {x.dateEvent}
                    {x.dateOfOrder}   {x.timeOfEvent}   {x.typeOfEvent}</div>
            })}
            {addOpen && <MySal></MySal>
            }        </div>
    </>
}