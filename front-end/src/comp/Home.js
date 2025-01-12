import { useNavigate } from "react-router-dom";
import { ButtonGroup } from '@mui/material';
import { Button } from '@mui/material';
import "../App.css"

export const Home = () => {
  const navigate = useNavigate();

  return (<>
    <div className="main">
      <div className="menu">
        {/* קישוריות להזמנת הקומפננטות ע"י ראוטינג */}
        <ButtonGroup className="TheButton" style={{ display: "flex", flexDirection: "row" }} variant="outlined" aria-label="outlined button group">
          <Button className="topButton" onClick={() => navigate('HotPage')}>עמוד חם♨</Button>
          <Button className="topButton" onClick={() => navigate('Invent')}>איזור אישי😊</Button>
          <Button className="topButton" onClick={() => navigate('CateringBoss')}>בעל הקייטרינג👨🏻‍🍳</Button>
          <Button className="topButton" onClick={() => navigate('MyMenu')}>תפריט📑</Button>
          <Button className="topButton" onClick={() => navigate('MyFeedBack')}>משוב💬</Button>
        </ButtonGroup>
      </div>
    </div>
  </>
  )
}