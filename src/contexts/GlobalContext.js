import { createContext, useEffect, useState } from "react";
export const GlobalContext = createContext();
export function GlobalProvider({ children }) {
  const [schedule, setSchedule] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(function () {
    async function fetchSchedule() {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BASE_URL}/schedule`,
          {
            method: "GET",
            headers: {
              "content-type": "application/json",
            },
            credentials: "include",
          }
        );

        if (response.status === 404) {
          return setSchedule([]);
        }

        if (response.status === 401) {
          localStorage.removeItem("loggedInUser");
          return setSchedule([]);
        }

        if (response.status === 200) {
          const serverObject = await response.json();
          setSchedule(serverObject);
          setLoading(false);
          return;
        }
      } catch (error) {
        return setSchedule(false);
      }
    }
    fetchSchedule();
  }, []);

  if (loading) {
    return (
      <section className="mainSection">
        <h3>Laddar...</h3>
      </section>
    );
  }

  return (
    <GlobalContext.Provider value={schedule}>{children}</GlobalContext.Provider>
  );
}
