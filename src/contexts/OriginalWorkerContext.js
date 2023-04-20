import { createContext, useContext, useEffect, useState } from "react";
import { GlobalContext } from "./GlobalContext";

export const OriginalWorkerContext = createContext();

export function OriginalWorkerProvider({ children }) {
  const schedule = useContext(GlobalContext);

  if (!schedule) {
    return null;
  }

  const originalWorkers = schedule.map(function (worker) {
    return worker.worker;
  });

  if (!originalWorkers) {
    return (
      <section className="mainSection">
        <h3>Laddar...</h3>
      </section>
    );
  }

  return (
    <OriginalWorkerContext.Provider value={originalWorkers}>
      {children}
    </OriginalWorkerContext.Provider>
  );
}
