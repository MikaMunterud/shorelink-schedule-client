import { useContext } from "react";
import Swal from "sweetalert2";
import { AuthenticationContext } from "../../contexts/AuthenticationContext";
import { RiLockPasswordLine } from "react-icons/ri";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { getUsers } from "../../functions/getUsers";
export default function RegisteredUsers({
  users,
  setUsers,
  loggedInUsername,
  setLoggedInUsername,
}) {
  const { setIsLoggedIn } = useContext(AuthenticationContext);

  const navigate = useNavigate();

  async function editPassword(username) {
    const confirmEdit = await Swal.fire({
      icon: "info",
      title: `Ändra ${username}s lösenord?`,
      input: "password",
      inputPlaceholder: "Lösenord",
      showCancelButton: true,
      cancelButtonText: "Nej!",
      confirmButtonText: "Ja!",
      reverseButtons: true,
    });
    if (confirmEdit.isConfirmed) {
      const newPassword = confirmEdit.value;

      const confirmPassword = await Swal.fire({
        icon: "info",
        title: `Bekräfta lösenordet!`,
        input: "password",
        inputPlaceholder: "Lösenord",
        showCancelButton: true,
        cancelButtonText: "Avbryt!",
        confirmButtonText: "Ändra lösenord!",
        reverseButtons: true,
      });
      if (confirmPassword.isConfirmed) {
        if (newPassword !== confirmPassword.value) {
          Swal.fire({
            icon: "error",
            title: `Lösenorden stämmer inte överrens med varandra!`,
          });
          return;
        }

        try {
          const response = await fetch(
            `${process.env.REACT_APP_BASE_URL}/authentication/editPassword`,
            {
              method: "PATCH",
              headers: {
                "content-type": "application/json",
              },
              credentials: "include",
              body: JSON.stringify({ password: confirmPassword.value }),
            }
          );

          const responseMessage = await response.text();

          if (response.status === 401) {
            localStorage.removeItem("loggedInUser");
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

          if (response.status === 404) {
            Swal.fire({
              icon: "error",
              text: responseMessage,
            });
            return;
          }

          if (response.status === 200) {
            Swal.fire({
              icon: "success",
              text: responseMessage,
            });
            return;
          }
        } catch (FetchError) {
          Swal.fire({
            icon: "error",
            text: "Något gick fel, gick inte att ansluta till servern!",
          });
          return;
        }
      } else {
        Swal.fire("Avbrutet!", `Ditt lösenord har inte ändrats!`, "error");
        return;
      }
    } else {
      Swal.fire("Avbrutet!", `Ditt lösenord har inte ändrats!`, "error");
      return;
    }
  }

  async function deleteUser(workerID, username) {
    if (users.length === 1) {
      Swal.fire(`Du måste ha minst en användare kvar!`, "", "warning");
      return;
    }

    const confirmDelete = await Swal.fire({
      title: "Delete account?",
      text: `Är du säker på att du vill radera användare: ${username}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ja!",
      cancelButtonText: "Nej!",
      reverseButtons: true,
    });
    if (confirmDelete.isConfirmed) {
      const confirmUsername = await Swal.fire({
        icon: "info",
        title: `Skriv in användarnamnet för att bekräfta borttagningen!`,
        input: "text",
        inputPlaceholder: "Bekräkfta användarnamnet",
        showCancelButton: true,
        cancelButtonText: "Avbryt!",
        confirmButtonText: "Radera användare!",
        reverseButtons: true,
      });

      if (confirmUsername.isConfirmed) {
        if (confirmUsername.value !== username) {
          Swal.fire({
            icon: "error",
            title: `${confirmUsername.value} stämmer inte överrens med det registrerade användarnamnet!`,
          });
          return;
        }

        try {
          const response = await fetch(
            `${process.env.REACT_APP_BASE_URL}/authentication/deleteUser`,
            {
              method: "DELETE",
              headers: {
                "content-type": "application/json",
              },
              credentials: "include",
              body: JSON.stringify({
                id: workerID,
                username: confirmUsername.value,
              }),
            }
          );

          const responseMessage = await response.text();

          if (response.status === 401) {
            localStorage.removeItem("loggedInUser");
            return setIsLoggedIn(false);
          }

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
            await Swal.fire({
              icon: "success",
              text: responseMessage,
            });
            if (username === loggedInUsername) {
              navigate("/");
              setIsLoggedIn(false);
            }

            const { loggedIn, loggedInUser, usersList } = await getUsers();
            await setIsLoggedIn(loggedIn);
            if (loggedIn) {
              setUsers(usersList);
              setLoggedInUsername(loggedInUser);
            }

            return;
          }
        } catch (FetchError) {
          Swal.fire({
            icon: "error",
            text: "Något gick fel, gick inte att ansluta till servern!",
          });
          return;
        }
      } else {
        Swal.fire(
          "Avbrutet!",
          `Användarnamn ${username} har inte raderats!`,
          "error"
        );
        return;
      }
    } else {
      Swal.fire(
        "Avbrutet!",
        `Användarnamn ${username} har inte raderats!`,
        "error"
      );
      return;
    }
  }

  return (
    <div className="registeredUsers">
      {users.map(function (worker, index) {
        return (
          <div key={index} className="registeredUsers_user">
            {loggedInUsername === worker.username ? (
              <>
                <h3 className="registeredUsers_user_name">{worker.username}</h3>
                <div className="registeredUsers_user_icons">
                  <RiLockPasswordLine
                    onClick={function (event) {
                      editPassword(worker.username);
                    }}
                  />
                  <MdDelete
                    onClick={function (event) {
                      deleteUser(worker.id, worker.username);
                    }}
                  />
                </div>
              </>
            ) : (
              <>
                <h3 className="registeredUsers_user_name">{worker.username}</h3>
                <div className="registeredUsers_user_icons">
                  <MdDelete
                    onClick={function (event) {
                      deleteUser(worker.id, worker.username);
                    }}
                  />
                </div>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
}
