import moment from "moment";
import "moment/locale/sv";
import Button from "../buttons/Button";
import FilterButton from "../buttons/FilterButton";

export default function CalendarDateButtons({
  overView,
  filter,
  cross,
  toggleMenu,
  setCurrentDate,
}) {
  moment.locale("sv");

  async function gotToToday() {
    await setCurrentDate(moment());
    const currentDateElement = document.getElementById("currentDate");
    if (currentDateElement) {
      currentDateElement.scrollIntoView();
    }
  }

  function goToCurrentYear() {
    const currentMonth = moment().month();

    if (currentMonth < 6) {
      setCurrentDate(moment().startOf("year"));
    } else {
      setCurrentDate(moment().startOf("year").add(6, "months"));
    }
  }

  return (
    <>
      {!overView ? (
        <Button
          className={" currentDay"}
          handleClick={gotToToday}
          text={"Idag"}
        />
      ) : (
        <Button
          className={" currentYear"}
          handleClick={goToCurrentYear}
          text={moment().format("YYYY")}
        />
      )}

      <FilterButton
        className={` workers${overView ? " overView" : ""}`}
        handleClick={toggleMenu}
        text={"Resurser"}
        filter={filter}
        cross={cross}
      />
    </>
  );
}
