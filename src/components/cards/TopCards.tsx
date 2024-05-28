import React from "react";
import Analytics from "../charts/singup_pie/Analytics";
import FinancesPie from "../charts/singup_pie/Finances";
import TimetablePie from "../charts/singup_pie/Timetable";
import AnalyticsBars from "../charts/sign_ups_bar/analytics_bar";
import FinancesBars from "../charts/sign_ups_bar/finances_bar";
import TimetableBars from "../charts/sign_ups_bar/Timetable_bar";

export default function TopCards() {
  return (
    <>
      <section className="flex flex-row justify-between gap-3 mx-10">
        <div className="w-[200px] h-[200px] bg-[#FFE2E5] rounded-[16px] shadow-md p-6">
          <p>2k</p>
          <p>Collection</p>
          <p>+%8 from yesterday </p>
        </div>
        <div className="w-[200px] h-[200px] bg-[#F3E8FF] rounded-[16px]  shadow-md p-6">
          <p>Bounced Cheques</p>
          <p>-%8 from yesterday </p>
        </div>
      </section>

      <section className=" bg-[#FFF4DE] rounded-[16px]  shadow-md p-6 flex gap-3">
        <div>
          <p>Sign-ups</p>
          <div className=" bg-slate-400 rounded-[10px]">
            <p>Zeraki Analytics</p>
            <Analytics />
          </div>
          <div className=" bg-slate-400 rounded-[10px]">
            <p>Zeraki Finance</p>
            <FinancesPie />
          </div>
          <div className=" bg-slate-400 rounded-[10px]">
            <p>Zeraki Timetable</p>
            <TimetablePie />
          </div>
        </div>
        <div>
          <div className=" bg-slate-400 rounded-[10px]">
            <p>Zeraki Analytics</p>
            <AnalyticsBars />
          </div>
          <div className=" bg-slate-400 rounded-[10px]">
            <p>Zeraki Finance</p>
            <FinancesBars />
          </div>
          <div className=" bg-slate-400 rounded-[10px]">
            <p>Zeraki Timetable</p>
            <TimetableBars />
          </div>
        </div>
      </section>

      <section className="w-[591px] h-[348px] bg-[#DCFCE7] rounded-[16px]  shadow-md p-6 flex gap-3">
        <p>Invoices</p>
        <ul className="overflow-scroll">
          <li>school 1</li>
          <li>school 2</li>
          <li>school3</li>
          <li>school 4</li>
          <li>school 1</li>
          <li>school 2</li>
          <li>school3</li>
          <li>school 4</li>
          <li>school 1</li>
          <li>school 2</li>
          <li>school3</li>
          <li>school 4</li>
          <li>school 1</li>
          <li>school 2</li>
          <li>school3</li>
          <li>school 4</li>
        </ul>
      </section>
    </>
  );
}
