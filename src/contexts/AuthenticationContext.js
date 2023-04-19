import { createContext, useEffect, useState } from "react";
export const AuthenticationContext = createContext();

export function AuthenticationProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(function () {
    async function checkLoggedIn() {
      try {
        const response = await fetch("http://localhost:5050/authentication/", {
          method: "GET",
          credentials: "include",
        });

        if (response.status === 401) {
          setIsLoggedIn(false);
        }

        if (response.status === 400) {
          setIsLoggedIn(false);
        }

        if (response.status === 200) {
          const username = await response.text();

          localStorage.setItem("loggedInUser", username);
          setIsLoggedIn(true);
        }
      } catch (FetchError) {
        setIsLoggedIn(false);
      }

      setLoading(false);
    }
    checkLoggedIn();
  }, []);

  if (loading) {
    <section className="mainSection">
      <h3>Laddar...</h3>
    </section>;
  }

  return (
    <AuthenticationContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </AuthenticationContext.Provider>
  );
}
