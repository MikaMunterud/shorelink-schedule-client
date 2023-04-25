import { createContext, useEffect, useState } from "react";
export const AuthenticationContext = createContext();
export function AuthenticationProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(function () {
    async function checkLoggedIn() {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BASE_URL}/authentication/`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        if (response.status === 401) {
          localStorage.removeItem("loggedInUser");
          setIsLoggedIn(false);
        }

        if (response.status === 400) {
          localStorage.removeItem("loggedInUser");
          setIsLoggedIn(false);
        }

        if (response.status === 200) {
          const username = await response.text();
          localStorage.setItem("loggedInUser", username);
          setIsLoggedIn(true);
        }
      } catch (FetchError) {
        localStorage.removeItem("loggedInUser");
        setIsLoggedIn("serverError");
      }

      setLoading(false);
    }
    checkLoggedIn();
  }, []);

  if (loading) {
    return (
      <section className="mainSection">
        <h3>Laddar...</h3>
      </section>
    );
  }

  if (isLoggedIn === "serverError") {
    return (
      <section className="mainSection">
        <h2 className="serverError">
          Misslyckades att koppla upp till servern!
        </h2>
        <h3
          className="serverError_refresh"
          onClick={() => {
            window.location.reload();
          }}
        >
          Klicka här för att refresha sidan eller kom tillbaka lite senare!
        </h3>
      </section>
    );
  }

  return (
    <AuthenticationContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </AuthenticationContext.Provider>
  );
}
