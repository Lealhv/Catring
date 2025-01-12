import { useSelector } from "react-redux";
import { useState } from "react";
import { FilterFood } from "./filter";

export const MilkFood = () => {

    const food = useSelector(state => {
        return state.food.food
    });

    const TypeEnum = useSelector(state => {
        return state.type.TypeEnum
    });

    const [foodData, setFoodData] = useState(food);

    function scrollFunction() {
        console.log("ghjk")
        if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
            document.getElementById("header").style.fontSize = "30px";
        } else {
            document.getElementById("header").style.fontSize = "90px";
        }
    }

    return <div className="showAllPageFood">
        <FilterFood foodData={foodData} setFoodData={setFoodData} />
        {/* להצגת הטבלה */}
        <div id="theTable">
            <div className="theTable">
                {foodData && foodData.length && foodData.map((f, index) => {
                    // { debugger }
                    return <div>
                        <table className="myTable">
                            <tr onScroll={scrollFunction}>
                                {/* <th>{index == 0 &&  <div id="header">המוצרים שלנו</div>}</th> */}
                                {/* <th>{TypeEnum}</th> */}
                                <th>{f.nameOfFood}</th>
                                <th>{f.codeFood}</th>
                                <th>{f.price}</th>
                                <th  className="overlay" ><img className="myImg" style={{ width: " 10px", height: "10px" }} src={f.img}></img>
                                </th>
                            </tr>
                        </table>
                    </div>
                })}
            </div>
        </div>
    </div>
}


