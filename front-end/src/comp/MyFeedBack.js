import { useEffect } from "react";
import { getFeedBack } from "../utils/getFeedBack";
import { useState } from "react";
import { Dialog } from "@mui/material";
import {DialogFeedBack} from './MyDialog'

export function MyFeedBack() {

   const [isOpen, setIsOpen] = useState(false);

   const [feed, setFeed] = useState();
   useEffect(() => {
      getAllFeedBack()
   }, [])

   const getAllFeedBack = async () => {
      setFeed(await getFeedBack());
   }

   const addFeedBack = () => {
      setIsOpen(true);
   }

   return <>
      <p>MyFeedBack</p>
      <div className="marque">

         {feed && feed.map((f) =>
            <marquee behavior="scroll" direction="up" scrollamount="1">
               <div>{f.feedBack1}</div>
            </marquee>)
         }

      </div>
      <div className="marque2"></div>
      <div className="marque">
         <marquee behavior="scroll" direction="up" scrollamount="1">
            <div onClick={() => addFeedBack()}>להוספה</div>
         </marquee>
      </div>
      <Dialog open={isOpen} onClose={!isOpen}>
         <DialogFeedBack></DialogFeedBack>
         </Dialog>

   </>

}
{/* <marquee behavier="scroll" direction="left" scrollamount="10" class="end" > */}