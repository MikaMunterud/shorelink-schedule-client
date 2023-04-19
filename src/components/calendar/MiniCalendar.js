import moment from "moment";
import { useState } from "react";
import { IoClose } from "react-icons/io5";
import {
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
} from "react-icons/md";

export default function MiniCalendar({
  currentMonth,
  setCurrentMonth,
  nextYear,
  prevYear,
}) {
  const [monthOverview, setMonthOverview] = useState(moment());
  const [overviewMenu, setOverviewMenu] = useState("hidden");
  const vw = window.innerWidth;

  function displayMonthsMenu() {
    if (overviewMenu === "visible") {
      setOverviewMenu("hidden");
    } else {
      setOverviewMenu("visible");
    }
  }

  function goToMonthYear(month) {
    setCurrentMonth(moment().set({ year: monthOverview.year(), month: month }));
    displayMonthsMenu();
  }

  return (
    <div className="miniCalendar">
      <h1 className={"miniCalendar_currentMonth"} onClick={displayMonthsMenu}>
        {vw > 700
          ? currentMonth.format("MMMM YYYY").toUpperCase()
          : currentMonth.format("MMM YYYY").toUpperCase()}
      </h1>
      <div className={`miniCalendar_select ${overviewMenu}`}>
        <IoClose className="miniCalendar_cross" onClick={displayMonthsMenu} />

        <div className="miniCalendar_select_year">
          <MdKeyboardDoubleArrowLeft
            className="calendarArrow"
            onClick={function () {
              prevYear(setMonthOverview, monthOverview);
            }}
          />

          <h2 className="miniCalendar_select_year_heading">
            {monthOverview.format("YYYY")}
          </h2>
          <MdKeyboardDoubleArrowRight
            className="calendarArrow"
            onClick={function () {
              nextYear(setMonthOverview, monthOverview);
            }}
          />
        </div>
        <div className="miniCalendar_select_months">
          {monthOverview["_locale"]["_monthsShort"].map(function (
            month,
            index
          ) {
            return (
              <div
                className={`miniCalendar_select_month${
                  monthOverview.year() === moment().year() &&
                  month === moment().format("MMM")
                    ? " currentMonth"
                    : ""
                }`}
                key={index}
                id={month}
                onClick={function (e) {
                  goToMonthYear(e.target.id);
                }}
              >
                {month}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
