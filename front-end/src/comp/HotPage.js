import { Dialog } from "@mui/material";
import { useState } from "react"
import { KnowPerson } from "./MyDialog";

export const HotPage = () => {

    const [isOpen, setIsOpen] = useState(false);
    const [myNum, setMyNum] = useState(false);

    const logIn = (int) => {
        setIsOpen(true);
        setMyNum(int)
    }

    return <>
        <div className="rashiHot">
            <div className="hotDiv">
                <p>ביקרתם כבר בעבר?</p>
                <p>שמחים לפגוש אתכם שוב!!!</p>
                <button onClick={() => logIn(2)} >לכניסה מהירה וקלה לחץ כאן🔰</button>
            </div>
            <div className="hotDiv">
                <p>מנהל קייטרינג?</p>
                <p>חדש!!</p>
                <button onClick={() => logIn(1)} >לכניסה ישירה לניהול הקייטרינג שלך🔰</button>
            </div>
        </div>
        <Dialog open={isOpen} onClose={!isOpen}><KnowPerson int={myNum}></KnowPerson></Dialog>
    </>
}