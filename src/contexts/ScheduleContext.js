import { createContext, useContext, useEffect, useState } from "react";
import { GlobalContext } from "./GlobalContext";
import { WorkerContext } from "./WorkerContext";

export const ScheduleContext = createContext();

export function ScheduleProvider({ children }) {
  const [filteredSchedule, setFilteredSchedule] = useState([]);
  const schedule = useContext(GlobalContext);
  const { selectedWorkers } = useContext(WorkerContext);

  useEffect(
    function () {
      setFilteredSchedule(
        schedule.filter(function (worker) {
          return selectedWorkers.includes(worker.worker);
        })
      );
    },
    [selectedWorkers]
  );

  if (!filteredSchedule) {
    return null;
  }
  return (
    <ScheduleContext.Provider value={{ filteredSchedule, setFilteredSchedule }}>
      {children}
    </ScheduleContext.Provider>
  );
}
