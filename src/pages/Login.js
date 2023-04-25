import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserForm from "../components/forms/UserForm";
import { AuthenticationContext } from "../contexts/AuthenticationContext";
import Swal from "sweetalert2";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setIsLoggedIn } = useContext(AuthenticationContext);
  const navigate = useNavigate();

  async function login(event) {
    event.preventDefault();

    const user = { username, password };

    try {
      const response = await fetch(
        "https://shorelink-schedule.onrender.com/authentication/login",
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

      if (response.status === 400) {
        Swal.fire({
          icon: "error",
          text: responseMessage,
        });
        return;
      }

      if (response.status === 404) {
        Swal.fire({
          icon: "error",
          text: responseMessage,
        });
        return;
      }

      if (response.status === 200) {
        localStorage.setItem("loggedInUser", responseMessage);
        setIsLoggedIn(true);
        navigate("/oneMonthSchedule");
        return;
      }
    } catch (FetchError) {
      Swal.fire({
        icon: "error",
        text: FetchError,
      });
      return;
    }
  }

  return (
    <section className="mainSection" id="homepage">
      <UserForm
        heading={"Login"}
        handleSubmit={login}
        username={username}
        setUsername={setUsername}
        password1={password}
        setPassword1={setPassword}
        autoCompletePassword={"current-password"}
        buttonValue={"Login"}
      />
    </section>
  );
}
