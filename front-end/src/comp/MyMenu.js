import { useNavigate } from "react-router-dom";
import { ButtonGroup } from '@mui/material';
import { Button } from '@mui/material';
import React from "react";

export function MyMenu() {
    const navigate = useNavigate();

    return <>
        <div style={{ display: "flex", flexDirection: "row" }}>
            <ButtonGroup className="TheButton" style={{ display: 'flex', flexDirection: 'column' }} variant="outlined" aria-label="outlined button group">
                <Button onClick={() => navigate('/MeetFood')}  style={{width : "223px" , border : "2px solid pink"}}>בשרי🍗</Button>
                <Button onClick={() => navigate('/BarFood')}  style={{width : "223px" , border : "2px solid pink"}}>בר🍸</Button>
                <Button onClick={() => navigate('/MilkFood')}  style={{width : "223px" , border : "2px solid pink"}}>חלבי🧀</Button>
            {/* <Button onClick={() => navigate('/filter')}  style={{width : "223px" , border : "2px solid pink"}}>filter</Button> */}
            </ButtonGroup>
        </div>
    </>
}