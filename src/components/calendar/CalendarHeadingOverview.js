import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

export default function CalendarHeadingOverview({
  setCurrentDate,
  currentDate,
}) {
  function handleNextSixMonths() {
    setCurrentDate(currentDate.clone().add(6, "months"));
  }

  function handlePreviousSixMonths() {
    setCurrentDate(currentDate.clone().subtract(6, "months"));
  }

  return (
    <div className="calendarHeading overView">
      <MdKeyboardArrowLeft
        className="calendarArrow"
        onClick={handlePreviousSixMonths}
      />
      <h1 className="calendarOverview_currentMonth months">
        {currentDate.format("MMM").toUpperCase()} {" – "}
        {currentDate.clone().add(5, "months").format("MMM").toUpperCase()}{" "}
        {currentDate.format("YYYY")}
      </h1>
      <MdKeyboardArrowRight
        className="calendarArrow"
        onClick={handleNextSixMonths}
      />{" "}
    </div>
  );
}
