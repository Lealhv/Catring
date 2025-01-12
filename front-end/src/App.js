import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home } from "./comp/Home";
import { HotPage } from "./comp/HotPage"
import { Invent } from "./comp/Invent"
import { CateringBoss } from "./comp/CateringBoss"
import { MyMenu } from "./comp/MyMenu"
import { MyFeedBack } from "./comp/MyFeedBack"
import { MeetFood } from './comp/MeetFood';
import { BarFood } from './comp/BarFood';
import { MilkFood } from './comp/MilkFood';
import { MySal } from './comp/MySal';
import { AddFoodToCatering } from './comp/AddFoodToCatering';
import { getFoodFromServer } from './utils/getFood';
import { getFood } from './redux/FoodSlice';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getCateringFromServer } from './utils/getCatering';
import { getCatering } from './redux/CateringSlice';
import { FilterFood } from './comp/filter';
import { Personal } from './comp/Personal';

const App = () => {

  const dispatch = useDispatch();
  const aa = async() =>{
    await getData();
    await getMyCatering(); 
  }

  useEffect(() => {
    aa(); 
  }, [])

  const getData = async () => {
    const d = await getFoodFromServer();
    dispatch(getFood(d))
  };

  const getMyCatering = async () => {
      const t = await getCateringFromServer();
      dispatch(getCatering(t))
  };

  return (<>
    <div className='aaa'>
      <BrowserRouter>
        {/* <div style={{display: 'flex', flexDirection:'row'}}> */}
        <Home></Home>
        <Routes >
          <Route path='HotPage' element={<HotPage></HotPage>}></Route>
          <Route path='Invent' element={<Invent></Invent>}></Route>
          <Route path='CateringBoss' element={<CateringBoss></CateringBoss>}></Route>
          <Route path='MyMenu' element={<MyMenu></MyMenu>}></Route>
          <Route path='/filter' element={<FilterFood></FilterFood>}></Route>
          {/* <Route path='/BarFood' element={<BarFood></BarFood>}></Route>*/}
          <Route path='/MilkFood' element={<MilkFood></MilkFood>}></Route> 
          {/* <Route path='Shcoiech/:userName' element={<Shcoiech></Shcoiech>}></Route> */}
          {/* <Route path='/MeetFood' element={<MeetFood></MeetFood>}></Route> */}
          <Route path='/MySal/:nameCatering' element={<MySal></MySal>}></Route>
          <Route path='/Personal/:codeCustomer' element={<Personal></Personal>}></Route>
          <Route path='/AddFoodToCatering/:codeCatering' element={<AddFoodToCatering></AddFoodToCatering>}></Route>
          <Route path='MyFeedBack' element={<MyFeedBack></MyFeedBack>}></Route>
        </Routes>
        {/* </div> */}
      </BrowserRouter>
    </div>
  </>
  );
}

export default App;
