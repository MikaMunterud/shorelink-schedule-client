import { useContext, useEffect, useState } from "react";
import { AuthenticationContext } from "../contexts/AuthenticationContext";
import NotLoggedIn from "../components/messages/NotLoggedIn";
import UserForm from "../components/forms/UserForm";
import EmployeeList from "../components/userSettings/EmployeeList";
import RegisteredUsers from "../components/userSettings/RegisteredUsers";
import "../sass/userSettings/UserSettings.scss";
import Swal from "sweetalert2";

export default function UserSettings() {
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthenticationContext);
  const [username, setUsername] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [loggedInUsername, setLoggedInUsername] = useState();
  const [users, setUsers] = useState([]);

  useEffect(function () {
    async function getUsers() {
      try {
        const response = await fetch(
          "http://localhost:5050/authentication/users",
          {
            method: "GET",
            credentials: "include",
          }
        );

        if (response.status === 400) {
          return setIsLoggedIn(false);
        }

        if (response.status === 401) {
          return setIsLoggedIn(false);
        }

        if (response.status === 404) {
          return setIsLoggedIn(true);
        }

        if (response.status === 200) {
          const serverObject = await response.json();
          setUsers(serverObject);
          setIsLoggedIn(true);
          if (localStorage.getItem("loggedInUser")) {
            setLoggedInUsername(localStorage.getItem("loggedInUser"));
          }
          return;
        }
      } catch (FetchError) {
        return setIsLoggedIn(false);
      }
    }
    getUsers();
  }, []);

  async function register(event) {
    event.preventDefault();

    if (users.length > 7) {
      Swal.fire(`Du kan inte ha fler än 8 användare!`, "", "warning");

      setUsername("");
      setPassword1("");
      setPassword2("");
      return;
    }
    if (password1 !== password2) {
      Swal.fire({
        icon: "error",
        text: "Lösenorden matchar inte varandra, vönligen ändra för att registrera ett nytt konto!",
      });
      return;
    }

    const user = { username, password: password1 };

    try {
      const response = await fetch(
        "http://localhost:5050/authentication/register",
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(user),
        }
      );

      const responseMessage = await response.text();

      if (response.status === 401) {
        return setIsLoggedIn(false);
      }

      if (response.status === 400) {
        Swal.fire({
          icon: "error",
          text: responseMessage,
        });
        return;
      }

      if (response.status === 409) {
        Swal.fire({
          icon: "error",
          text: responseMessage,
        });
        return;
      }

      if (response.status === 201) {
        await Swal.fire({
          icon: "success",
          text: responseMessage,
        });
        setUsername("");
        setPassword1("");
        setPassword2("");
        window.location.reload();
        return;
      }
    } catch (FetchError) {
      Swal.fire({
        icon: "error",
        text: "Något gick fel, gick inte att ansluta till servern!",
      });
      return;
    }
  }

  if (!isLoggedIn) {
    return <NotLoggedIn />;
  }

  return (
    <section className="mainSection" id="userSettings">
      <h1>Inställningar</h1>
      <h2 className="userSettings_heading">Anställda</h2>
      <EmployeeList />

      <h2 className="userSettings_heading">Registrerade användare</h2>
      <RegisteredUsers users={users} loggedInUsername={loggedInUsername} />

      <UserForm
        heading={"Registrera användare"}
        handleSubmit={register}
        username={username}
        setUsername={setUsername}
        password1={password1}
        setPassword1={setPassword1}
        password2={password2}
        setPassword2={setPassword2}
        passwordAuthentication={true}
        autoCompletePassword={"new-password"}
        buttonValue={"Registrera"}
      />
    </section>
  );
}
