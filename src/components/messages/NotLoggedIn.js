import { Link } from "react-router-dom";

export default function NotLoggedIn() {
  return (
    <section className="mainSection" id="notLoggedInMessage">
      <h2>Vänligen logga in för att använda denna applikation!</h2>
      <h3>
        <Link to={"/"}>Tillbaka till inloggningssidan!</Link>
      </h3>
    </section>
  );
}
