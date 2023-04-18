import { useContext, useEffect, useState } from "react";
import { MdFilterAlt } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import "../sass/Nav.scss";
import moment from "moment";
import Swal from "sweetalert2";
import { WorkerContext } from "../contexts/WorkerContext";
import { OriginalWorkerContext } from "../contexts/OriginalWorkerContext";
import { GlobalContext } from "../contexts/GlobalContext";

export default function Nav({ currentDate, setCurrentDate, overView }) {
  const [menuList, setMenuList] = useState("");
  const [menu, setMenu] = useState("visible");
  const [cross, setCross] = useState("hide");
  const [vw, setVw] = useState();
  const { selectedWorkers, setSelectedWorkers } = useContext(WorkerContext);
  const originalWorkers = useContext(OriginalWorkerContext);
  const schedule = useContext(GlobalContext);

  useEffect(() => {
    setVw(window.innerWidth);
  }, []);

  function toggleMenu(event) {
    event.preventDefault();

    if (menu === "visible") {
      setMenu("hide");
      setCross("visible");
      setMenuList("visible");
    } else {
      setCross("hide");
      setMenu("visible");
      setMenuList("");
    }
  }

  async function handleCheckboxChange(event) {
    const { value, checked } = event.target;
    let workerArray = [...selectedWorkers];

    if (checked) {
      workerArray.push(value);
      workerArray = workerArray.sort(function (a, b) {
        return a - b;
      });
      await setSelectedWorkers(workerArray);
    } else {
      if (selectedWorkers.length > 1) {
        const workerIndex = workerArray.indexOf(value);
        workerArray.splice(workerIndex, 1);
        workerArray = workerArray.sort(function (a, b) {
          return a - b;
        });
        await setSelectedWorkers(workerArray);
      } else {
        Swal.fire({
          title: "Du måste ha minst en resurs markerad!",
          icon: "warning",
        });
        return;
      }
    }

    localStorage.setItem("checkedWorkers", JSON.stringify(workerArray));
  }

  function goToCurrentDate() {
    setCurrentDate(moment());
  }

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
    <nav className="navBar">
      <div className={`navBar_1stLine${overView ? " overView" : ""}`}>
        {!overView ? (
          <button onClick={gotToToday} className="navBar_button currentDay">
            Idag
          </button>
        ) : (
          <button
            onClick={goToCurrentYear}
            className="navBar_button currentYear"
          >
            {moment().format("YYYY")}
          </button>
        )}

        <button
          onClick={toggleMenu}
          className={`navBar_button workers${overView ? " overView" : ""}`}
        >
          Resurser
          <MdFilterAlt className={`menuIcon ${menu}`} />
          <IoClose className={`menuIcon ${cross}`} />
        </button>

        <ul className={`employeeList ${menuList}`}>
          {originalWorkers.map(function (worker, index) {
            return (
              <li className="employee" key={index}>
                <input
                  className="checkbox"
                  type={"checkbox"}
                  id={worker}
                  value={worker}
                  checked={selectedWorkers.includes(worker)}
                  onChange={handleCheckboxChange}
                />

                <label className="name" htmlFor={worker}>
                  {worker} {schedule[worker - 1].name}
                </label>
              </li>
            );
          })}
        </ul>
      </div>
      {overView ||
      currentDate.format("MMMM YYY") === moment().format("MMMM YYY") ? null : (
        <button
          className="navBar_button currentMonth"
          onClick={goToCurrentDate}
        >
          {moment().format("MMMM YYYY").toUpperCase()}
        </button>
      )}
    </nav>
  );
}
