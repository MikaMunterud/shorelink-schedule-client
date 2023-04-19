import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserForm from "../components/UserForm";
import Message from "../components/messages/Message";
import { AuthenticationContext } from "../contexts/AuthenticationContext";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const { setIsLoggedIn } = useContext(AuthenticationContext);
  const navigate = useNavigate();

  async function login(event) {
    event.preventDefault();
    const user = { username, password };

    try {
      const response = await fetch(
        "http://localhost:5050/authentication/login",
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(user),
        }
      );

      if (response.status === 400) {
        const serverMessage = await response.text();
        return setMessage(serverMessage);
      }
      if (response.status === 500) {
        return setMessage("Something went wrong, internal server error!");
      }

      if (response.status === 404) {
        return setMessage(
          "Invalid credentials, please double check the username and password!"
        );
      }

      if (response.status === 200) {
        setIsLoggedIn(true);
        navigate("/oneMonthSchedule");
      }
    } catch (FetchError) {
      return setMessage("Something went wrong, failed to connect to server!");
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
      {message && (
        <Message
          className="homepageMessage"
          message={message}
          setMessage={setMessage}
        />
      )}
    </section>
  );
}
