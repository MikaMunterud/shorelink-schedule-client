import CalendarMonth from "../components/CalendarMonth";
import moment from "moment";
import "moment/locale/sv";
import Heading from "../components/Heading";
import Nav from "../components/Nav";
import { useContext, useState } from "react";
import { AuthenticationContext } from "../contexts/AuthenticationContext";
import NotLoggedIn from "../components/NotLoggedIn";

export default function OneMonthOverview() {
  const [currentMonth, setCurrentMonth] = useState(moment());
  const { isLoggedIn } = useContext(AuthenticationContext);

  moment.locale("sv");

  if (!isLoggedIn) {
    return <NotLoggedIn />;
  }

  return (
    <section className="mainSection">
      <Heading currentMonth={currentMonth} setCurrentMonth={setCurrentMonth} />
      <Nav
        currentDate={currentMonth}
        setCurrentDate={setCurrentMonth}
        overView={false}
      />

      <CalendarMonth month={currentMonth} heading={"Datum"} overView={false} />
    </section>
  );
}
