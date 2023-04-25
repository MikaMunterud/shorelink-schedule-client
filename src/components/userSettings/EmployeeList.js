import { useContext } from "react";
import { GlobalContext } from "../../contexts/GlobalContext";
import Button from "../buttons/Button";
import Swal from "sweetalert2";
import { AuthenticationContext } from "../../contexts/AuthenticationContext";
export default function EmployeeList() {
  const { setIsLoggedIn } = useContext(AuthenticationContext);
  const schedule = useContext(GlobalContext);

  async function editWorker(scheduleID, workerNumber, currentFullName) {
    const confirmEdit = await Swal.fire({
      icon: "info",
      title: `Redigera reusrs ${workerNumber}: ${currentFullName}?`,
      input: "text",
      inputPlaceholder: "Förnamn Efternamn",
      showCancelButton: true,
      cancelButtonText: "Avbryt!",
      confirmButtonText: "Redigera!",
      reverseButtons: true,
    });
    if (confirmEdit.isConfirmed) {
      const newName = confirmEdit.value.split(" ");
      const newFirstName = newName[0];
      const newSurname = newName[1];

      const secondConfirm = await Swal.fire({
        icon: "question",
        title: `Är du säker på att du vill ändra reusrs ${workerNumber}: ${currentFullName} till:`,
        text: `Förnamn "${newFirstName}" Efternamn "${newSurname}"?`,
        showCancelButton: true,
        confirmButtonText: "Byt namn!",
        cancelButtonText: "Avbryt!",
        reverseButtons: true,
      });

      if (secondConfirm.isConfirmed) {
        const responseBody = {
          id: scheduleID,
          workerNumber,
          currentFullName,
          newName: newFirstName,
          newFullName: `${newFirstName} ${newSurname}`,
        };

        try {
          const response = await fetch(
            `${process.env.REACT_APP_BASE_URL}/schedule`,
            {
              method: "PATCH",
              headers: {
                "content-type": "application/json",
              },
              credentials: "include",
              body: JSON.stringify(responseBody),
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

          if (response.status === 409) {
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
            window.addEventListener("click", function () {
              window.location.reload();
            });

            return;
          }
        } catch (FetchError) {
          Swal.fire({
            icon: "error",
            text: "Something went wrong, failed to connect to server!",
          });
          return;
        }
      } else {
        Swal.fire(
          "Avbrutet!",
          `Resurs ${workerNumber} har kvar namnet: ${currentFullName}!`,
          "error"
        );
        return;
      }
    } else {
      Swal.fire(
        "Avbrutet!",
        `Resurs ${workerNumber} har kvar namnet: ${currentFullName}!`,
        "error"
      );
      return;
    }
  }

  return (
    <div className={"currentEmployeeList"}>
      {schedule.map(function (worker, index) {
        return (
          <div key={index} className={"currentEmployeeList_employee"}>
            <h3 id={worker.id} className={"currentEmployeeList_employee_name"}>
              <span className={"currentEmployeeList_employee_number"}>
                {worker.worker}
              </span>
              {worker.fullName}
            </h3>
            <Button
              className={" editEmployee"}
              text={"Redigera"}
              handleClick={function (event) {
                editWorker(worker.id, worker.worker, worker.fullName);
              }}
            />
          </div>
        );
      })}
    </div>
  );
}
