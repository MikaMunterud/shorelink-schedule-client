import { useState, useEffect, useContext } from "react";
import { isPublicHoliday } from "swedish-holidays";
import moment from "moment";
import "moment/locale/sv";
import { GlobalContext } from "../../contexts/GlobalContext";
import { WorkerContext } from "../../contexts/WorkerContext";

export default function CalendarMonth({ month, heading, overView }) {
  const [daysInMonth, setDaysInMonth] = useState([]);
  const schedule = useContext(GlobalContext);
  const { selectedWorkers } = useContext(WorkerContext);
  moment.locale("sv");

  useEffect(
    function () {
      createCalendarSchedule();
    },
    [selectedWorkers, month]
  );

  function getShiftDescription(date, workerIndex) {
    const startDate = moment("2023-01-02");
    let dayIndex = date.diff(startDate, "days") % 42;
    if (date.isBefore(startDate)) {
      dayIndex = 41 - (startDate.diff(date, "days") % 42);
    }

    const shiftData = schedule[workerIndex].schedule[dayIndex];
    return shiftData.description;
  }

  function createCalendarSchedule() {
    const monthStart = month.clone().startOf("month");
    const monthEnd = month.clone().endOf("month");
    const monthArray = [];

    let day = monthStart;
    while (day.isBefore(monthEnd)) {
      const shifts = [];
      for (let i = 0; i < 6; i++) {
        const shiftDescription = getShiftDescription(day, i);
        shifts.push(shiftDescription);
      }

      const isBankHoliday = isPublicHoliday(new Date(day.format("YYYY-MM-DD")));
      let todaysDate = null;
      let displayWeekNumber = null;
      const week = day.week();
      const dayName = day.format("ddd");

      if (day.format("YYYY-MM-DD") === moment().format("YYYY-MM-DD")) {
        todaysDate = true;
      } else {
        todaysDate = false;
      }

      if (day.isoWeekday() === 4) {
        displayWeekNumber = true;
      } else {
        displayWeekNumber = false;
      }

      monthArray.push({
        date: day.format("D"),
        dayName,
        todaysDate,
        displayWeekNumber,
        week,
        shifts: shifts.filter(function (shift, index) {
          return selectedWorkers.includes(schedule[index].worker);
        }),
        isBankHoliday,
      });
      day = day.clone().add(1, "day");
    }
    setDaysInMonth(monthArray);
  }

  return (
    <div className="calendar">
      <div className="month">
        <div
          className={`employees${
            selectedWorkers.length < 6 ? ` total${selectedWorkers.length}` : ""
          }${overView ? " overView" : ""}`}
        >
          <h3>{heading}</h3>
          {selectedWorkers.map(function (worker, index) {
            return <h3 key={index}>{worker}</h3>;
          })}
        </div>
        {daysInMonth.map(function (day, index) {
          return (
            <div
              className={`day${
                selectedWorkers.length < 6
                  ? ` total${selectedWorkers.length}`
                  : ""
              }${day.dayName === "sön" ? " sunday" : ""}${
                day.isBankHoliday ? " holiday" : ""
              }${overView ? " overView" : ""}`}
              id={`${day.todaysDate ? "currentDate" : ""}`}
              key={index}
            >
              <div className={`date${overView ? " overView" : ""}`}>
                {day.displayWeekNumber ? (
                  <div className="week">
                    <span>v.</span>
                    {day.week}
                  </div>
                ) : null}
                <div className="number">{day.date}</div>
                <div>{day.dayName}</div>
              </div>
              {day.shifts.map((shift, index) => {
                return shift === "l" ? (
                  <div key={index} className={"shift free"}>
                    {shift}
                  </div>
                ) : (
                  <div key={index} className="shift">
                    {shift}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}
