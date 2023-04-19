import { useContext } from "react";
import { WorkerContext } from "../../contexts/WorkerContext";
import { OriginalWorkerContext } from "../../contexts/OriginalWorkerContext";
import { GlobalContext } from "../../contexts/GlobalContext";
import Swal from "sweetalert2";

export default function FilterList({ filterList }) {
  const { selectedWorkers, setSelectedWorkers } = useContext(WorkerContext);
  const originalWorkers = useContext(OriginalWorkerContext);
  const schedule = useContext(GlobalContext);

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

  return (
    <ul className={`employeeList ${filterList}`}>
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
  );
}
