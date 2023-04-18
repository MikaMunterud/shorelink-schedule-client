import { createContext, useContext, useEffect, useState } from "react";
import { OriginalWorkerContext } from "./OriginalWorkerContext";

export const WorkerContext = createContext();

export function WorkerProvider({ children }) {
  const [selectedWorkers, setSelectedWorkers] = useState([]);
  const originalWorkers = useContext(OriginalWorkerContext);

  useEffect(function () {
    const storedSelectedUsers = localStorage.getItem("checkedWorkers");

    if (storedSelectedUsers) {
      setSelectedWorkers(JSON.parse(storedSelectedUsers));
    } else {
      setSelectedWorkers(originalWorkers);
    }
  }, []);

  if (!selectedWorkers) {
    return null;
  }

  return (
    <WorkerContext.Provider value={{ selectedWorkers, setSelectedWorkers }}>
      {children}
    </WorkerContext.Provider>
  );
}
