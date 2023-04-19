import CalendarMonth from "../components/calendar/CalendarMonth";
import moment from "moment";
import "moment/locale/sv";
import CalendarFilter from "../components/calendar/CalendarFilter";
import { useContext, useState } from "react";
import { AuthenticationContext } from "../contexts/AuthenticationContext";
import NotLoggedIn from "../components/NotLoggedIn";
import CalendarHeadingOverview from "../components/calendar/CalendarHeadingOverview";

export default function SixMonthsOverview() {
  const [currentDate, setCurrentDate] = useState(moment().startOf("year"));
  const array = [0, 1, 2, 3, 4, 5];
  const { isLoggedIn } = useContext(AuthenticationContext);

  moment.locale("sv");

  if (!isLoggedIn) {
    return <NotLoggedIn />;
  }

  return (
    <main className="mainSection overview">
      <CalendarHeadingOverview
        currentDate={currentDate}
        setCurrentDate={setCurrentDate}
      />

      <CalendarFilter
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
