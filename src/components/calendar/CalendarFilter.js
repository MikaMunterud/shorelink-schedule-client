import { useState } from "react";
import moment from "moment";
import FilterList from "./FilterList";
import Button from "../buttons/Button";
import CalendarDateButtons from "./CalendarDateButtons";

export default function CalendarFilter({
  currentDate,
  setCurrentDate,
  overView,
}) {
  const [filterList, setFilterList] = useState("");
  const [filter, setFilter] = useState(" visible");
  const [cross, setCross] = useState("");

  function toggleMenu(event) {
    event.preventDefault();

    if (filter === " visible") {
      setFilter("");
      setCross(" visible");
      setFilterList(" visible");
    } else {
      setCross("");
      setFilter(" visible");
      setFilterList("");
    }
  }

  function goToCurrentDate() {
    setCurrentDate(moment());
  }

  return (
    <nav className="calendarFilter">
      <div className={`calendarFilter_row${overView ? " overView" : ""}`}>
        <CalendarDateButtons
          overView={overView}
          filter={filter}
          cross={cross}
          toggleMenu={toggleMenu}
          setCurrentDate={setCurrentDate}
        />

        <FilterList filterList={filterList} />
      </div>
      {overView ||
      currentDate.format("MMMM YYY") === moment().format("MMMM YYY") ? null : (
        <Button
          className={" currentMonth"}
          handleClick={goToCurrentDate}
          text={moment().format("MMMM YYYY").toUpperCase()}
        />
      )}
    </nav>
  );
}
