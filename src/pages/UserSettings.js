import { useContext, useState } from "react";
import { AuthenticationContext } from "../contexts/AuthenticationContext";
import NotLoggedIn from "../components/NotLoggedIn";

export default function UserSettings() {
  const { isLoggedIn } = useContext(AuthenticationContext);

  if (!isLoggedIn) {
    return <NotLoggedIn />;
  }

  return (
    <section className="mainSection" id="homepage">
      <h1>Inställningar</h1>
    </section>
  );
}
