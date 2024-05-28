import React from "react";
import Analytics from "../charts/sign_ups/analytics";
import Finance from "../charts/sign_ups/finances";
import Timetable from "../charts/sign_ups/Timetable";


export default function TopCards() {
  return (
    <>
      <div className="flex flex-row justify-between gap-3 mx-10">
        <div className="w-[200px] h-[200px] bg-[#FFE2E5] rounded-[16px] shadow-md p-6">
          <p>2k</p>
          <p>Collection</p>
          <p>+%8 from yesterday </p>
        </div>
        <div className="w-[200px] h-[200px] bg-[#F3E8FF] rounded-[16px]  shadow-md p-6">
         
          <p>Bounced Cheques</p>
          <p>-%8 from yesterday </p>
        </div>
        <div className="w-[591px] h-[348px] bg-[#FFF4DE] rounded-[16px]  shadow-md p-6 flex gap-3">
        <p>Sign-ups</p>
         <div className="w-[100px] h-[100px] bg-slate-400 rounded-[10px]"> 

            <p>Zeraki Analytics</p>
            <Analytics/>
            </div>
         <div className="w-[100px] h-[100px] bg-slate-400 rounded-[10px]"> 
            <p>Zeraki Finance</p>
            <Finance/>
         </div>
        <div className="w-[100px] h-[100px] bg-slate-400 rounded-[10px]">  
            <p>Zeraki Timetable</p>
            <Timetable/>
        </div>
        </div>
        <div className="w-[591px] h-[348px] bg-[#DCFCE7] rounded-[16px]  shadow-md p-6 flex gap-3">
        <div className="w-[100px] h-[100px] bg-slate-400 rounded-[10px]"> 
            <p>Zeraki Analytics</p>
            
            </div>
         <div className="w-[100px] h-[100px] bg-slate-400 rounded-[10px]"> 
            <p>Zeraki Finance</p>
         </div>
        <div className="w-[100px] h-[100px] bg-slate-400 rounded-[10px]">  
            <p>Zeraki Timetable</p>
        </div>
        </div>
      </div>
    </>
  );
}
