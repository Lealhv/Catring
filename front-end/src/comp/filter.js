import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getTypeEnumFromServer } from "../utils/getType";
import { getType } from "../redux/TypeEnumSlice";
import { getCateringFromServer } from "../utils/getCatering";
import { getCatering } from "../redux/CateringSlice";
import { useNavigate } from "react-router-dom";


export const FilterFood = ({foodData, setFoodData}) => {

    //משתנים
    // const [foodData, setFoodData] = useState()
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // useEffect
    useEffect(() => {
        getMyCatering();
        getMyType(3)
        getMyType(0)
    }, [])

    // useEffect (()=>{
    //     showAll()
    // },[foodData])

    // קריאות שרת
    const getMyCatering = async () => {
        if (!catering) {
            const t = await getCateringFromServer();
            dispatch(getCatering(t))
        }
    };

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

    const food = useSelector(state => {
        //     setFoodData(state.food.food)
        return state.food.food
    });

    const catering = useSelector(state => {
        return state.Catering.catering
    });

    //פונקציות
    function scrollFunction() {
        console.log("ghjk")
        if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
            document.getElementById("header").style.fontSize = "30px";
        } else {
            document.getElementById("header").style.fontSize = "90px";
        }
    }

    // סינונים
    const handleFilterByHechsher = (codeHechsher) => {
        debugger
        const myCatring = catering.filter(c => c.nameHechsher == codeHechsher)
        debugger
        setFoodData(food.filter(f => myCatring.find(c => f.codeCatering == c.codeCatering)))
    }

    const handleFilterByCatering = (codeCatering) => {
        debugger
        setFoodData(food.filter(f => f.codeCatering == codeCatering));
    }

    const handleFilterByTypeCourse = (codeCourse) => {
        debugger
        setFoodData(food.filter(f => f.typeOfCourse == codeCourse));
    }

    const handleFilterByInvent = (codeCatering) => {
        navigate('/MySal/' + codeCatering);
    }

    // להצגת כל האוכל
    const showAll = () => {
        setFoodData(food)
    }

    return <div className="showAllPageFood">
        <div className="filterButton">
            {/* להצגת כל המאכלים */}
            <div>
                <button onClick={() => {
                    showAll()
                }} className="dropbtn" >לצפיה בכל המוצרים</button>
            </div>

            {/* סינון לפי הכשר */}
            <div className="dropup">
                <button onMouseOver={() => getMyType(0)} className="dropbtn" >סינון לפי הכשר</button>
                <div className="dropup-content">
                    {TypeEnum[0] && TypeEnum[0].length && TypeEnum[0].map(f => {
                        return <>
                            <a href="#" onClick={() => handleFilterByHechsher(f.code)}>
                                {f.typy}
                            </a>
                        </>
                    })}
                </div>
            </div>

            {/* סינון לפי קייטרינג */}
            <div className="dropup">
                <button onMouseOver={() => getMyCatering()} className="dropbtn" >סינון לפי קייטרינג</button>
                <div className="dropup-content">
                    {catering && catering.length && catering.map(f => {
                        return <>
                            <a onClick={() => handleFilterByCatering(f.codeCatering)}>
                                {f.nameCatering}
                            </a>
                        </>
                    })}
                </div>
            </div>

            {/* סינון לפי סוג מנה */}
            <div className="dropup">
                <button onMouseOver={() => getMyType(3)} className="dropbtn" >סינון לפי סוג מנה</button>
                <div className="dropup-content">
                    {TypeEnum[3] && TypeEnum[3].length && TypeEnum[3].map(f => {
                        return <>
                            <a href="#" onClick={() => handleFilterByTypeCourse(f.code)}>
                                {f.typy}
                            </a>
                        </>
                    })}
                </div>
            </div>

            {/* להזמנות */}
            <div className="dropup">
                <button onMouseOver={() => getMyType(0)} className="dropbtn" >להזמנות - יופעל בהמשך...</button>
                <div className="dropup-content">
                    {catering && catering.length && catering.map(f => {
                        return <>
                            <div>{TypeEnum[0] && TypeEnum[0].length && TypeEnum[0].find(x => {
                                if (x.codeHechsher == f.nameHechsher) {
                                    console.log(x.nameHechsher)
                                    return <p>jhg</p>
                                }
                            })}</div>
                            <a href="#" onClick={() => handleFilterByInvent(f.codeCatering)}>
                                שם הקייטרינג: {f.nameCatering}
                                כמות מינימום: {f.minimumCount}
                                {(TypeEnum[0].find((o) => o.code == f.nameHechsher))?.typy}
                            </a>
                        </>
                    })}
                </div>
            </div>
        </div>
    </div>
}


