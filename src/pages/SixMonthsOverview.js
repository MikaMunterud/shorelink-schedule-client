import CalendarMonth from "../components/CalendarMonth";
import moment from "moment";
import "moment/locale/sv";
import Nav from "../components/Nav";
import { useContext, useState } from "react";
import { AuthenticationContext } from "../contexts/AuthenticationContext";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import NotLoggedIn from "../components/NotLoggedIn";

export default function SixMonthsOverview() {
  const [currentDate, setCurrentDate] = useState(moment().startOf("year"));
  const array = [0, 1, 2, 3, 4, 5];
  const { isLoggedIn } = useContext(AuthenticationContext);

  function handleNextSixMonths() {
    setCurrentDate(currentDate.clone().add(6, "months"));
  }

  function handlePreviousSixMonths() {
    setCurrentDate(currentDate.clone().subtract(6, "months"));
  }

  moment.locale("sv");

  if (!isLoggedIn) {
    return <NotLoggedIn />;
  }

  return (
    <main className="mainSection overview">
      <div className="heading overView">
        <MdKeyboardArrowLeft
          className="calendarArrow"
          onClick={handlePreviousSixMonths}
        />

        <h1 className="calendarOverview_currentMonth months">
          {currentDate.format("MMM").toUpperCase()} {" – "}
          {currentDate
            .clone()
            .add(5, "months")
            .format("MMM")
            .toUpperCase()}{" "}
          {currentDate.format("YYYY")}
        </h1>

        <MdKeyboardArrowRight
          className="calendarArrow"
          onClick={handleNextSixMonths}
        />
      </div>
      <Nav
        currentDate={currentDate}
        setCurrentDate={setCurrentDate}
        overView={true}
      />

      <div className="monthOverview">
        {array.map(function (index) {
          const monthDate = currentDate.clone().add(index, "months");

          return (
            <div
              key={index}
              className={`singleMonth${index === 0 ? " first" : ""}${
                index === 5 ? " last" : ""
              }`}
            >
              <CalendarMonth
                month={monthDate}
                heading={monthDate.format("MMM")}
                overView={true}
              />
            </div>
          );
        })}
      </div>
    </main>
  );
}
