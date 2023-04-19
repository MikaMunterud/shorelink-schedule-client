import {
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
} from "react-icons/md";
import MiniCalendar from "./MiniCalendar";

export default function CalendarHeading({ currentMonth, setCurrentMonth }) {
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

  return (
    <div className="calendarHeading">
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
      <MiniCalendar
        currentMonth={currentMonth}
        setCurrentMonth={setCurrentMonth}
        nextYear={nextYear}
        prevYear={prevYear}
      />

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
