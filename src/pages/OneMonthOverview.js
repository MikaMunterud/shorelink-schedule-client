import CalendarMonth from "../components/calendar/CalendarMonth";
import moment from "moment";
import "moment/locale/sv";
import CalendarFilter from "../components/calendar/CalendarFilter";
import { useContext, useState } from "react";
import { AuthenticationContext } from "../contexts/AuthenticationContext";
import NotLoggedIn from "../components/NotLoggedIn";
import CalendarHeading from "../components/calendar/CalendarHeading";

export default function OneMonthOverview() {
  const [currentMonth, setCurrentMonth] = useState(moment());
  const { isLoggedIn } = useContext(AuthenticationContext);

  moment.locale("sv");

  if (!isLoggedIn) {
    return <NotLoggedIn />;
  }

  return (
    <section className="mainSection">
      <CalendarHeading
        currentMonth={currentMonth}
        setCurrentMonth={setCurrentMonth}
      />
      <CalendarFilter
        currentDate={currentMonth}
        setCurrentDate={setCurrentMonth}
        overView={false}
      />

      <CalendarMonth month={currentMonth} heading={"Datum"} overView={false} />
    </section>
  );
}
