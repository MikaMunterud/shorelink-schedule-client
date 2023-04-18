import {
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
} from "react-icons/md";
import { IoClose } from "react-icons/io5";
import "../sass/Heading.scss";
import { useState } from "react";
import moment from "moment";

export default function Heading({ currentMonth, setCurrentMonth }) {
  const [monthOverview, setMonthOverview] = useState(moment());
  const [overviewMenu, setOverviewMenu] = useState("hidden");
  const vw = window.innerWidth;

  function prevYear(setYear, year) {
    setYear(year.clone().subtract(1, "year"));
  }

  function prevMonth(setMonth, month) {
    setMonth(month.clone().subtract(1, "month"));
  }

  function nextMonth(setMonth, month) {
    setMonth(month.clone().add(1, "month"));
  }

  function nextYear(setYear, year) {
    setYear(year.clone().add(1, "year"));
  }

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
    <div className="heading">
      <MdKeyboardDoubleArrowLeft
        className="calendarArrow"
        onClick={function () {
          prevYear(setCurrentMonth, currentMonth);
        }}
      />
      <MdKeyboardArrowLeft
        className="calendarArrow"
        onClick={function () {
          prevMonth(setCurrentMonth, currentMonth);
        }}
      />
      <div className="calendarOverview">
        <h1
          className={"calendarOverview_currentMonth"}
          onClick={displayMonthsMenu}
        >
          {vw > 700
            ? currentMonth.format("MMMM YYYY").toUpperCase()
            : currentMonth.format("MMM YYYY").toUpperCase()}
        </h1>
        <div className={`calendarOverview_select ${overviewMenu}`}>
          <IoClose
            className="closeCalendarOverview"
            onClick={displayMonthsMenu}
          />

          <div className="calendarOverview_select_year">
            <MdKeyboardDoubleArrowLeft
              className="calendarArrow"
              onClick={function () {
                prevYear(setMonthOverview, monthOverview);
              }}
            />

            <h2 className="calendarOverview_select_year_heading">
              {monthOverview.format("YYYY")}
            </h2>
            <MdKeyboardDoubleArrowRight
              className="calendarArrow"
              onClick={function () {
                nextYear(setMonthOverview, monthOverview);
              }}
            />
          </div>
          <div className="calendarOverview_select_months">
            {monthOverview["_locale"]["_monthsShort"].map(function (
              month,
              index
            ) {
              return (
                <div
                  className={`calendarOverview_select_month${
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

      <MdKeyboardArrowRight
        className="calendarArrow"
        onClick={function () {
          nextMonth(setCurrentMonth, currentMonth);
        }}
      />
      <MdKeyboardDoubleArrowRight
        className="calendarArrow"
        onClick={function () {
          nextYear(setCurrentMonth, currentMonth);
        }}
      />
    </div>
  );
}
