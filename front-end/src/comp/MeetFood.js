import { useSelector } from "react-redux";
import { useState } from "react";
import { FilterFood } from "./filter";

export const MeetFood = () => {

   const food = useSelector(state => {
      return state.food.food
   });

   const [foodData, setFoodData] = useState(food);

   function scrollFunction() {
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
               { debugger }
               return <div>
                   <table className="myTable">
                       <tr onScroll={scrollFunction}>
                           {/* <th>{index == 0 &&  <div id="header">המוצרים שלנו</div>}</th> */}
                           <th>{f.nameOfFood}</th>
                           <th>{f.codeFood}</th>
                           <th>{f.price}</th>
                           <th ><img className="myImg" style={{ width: " 10px", height: "10px" }} src={f.img}></img>
                           </th>
                       </tr>
                   </table>
               </div>
           })}
       </div>
   </div>
</div>
}







