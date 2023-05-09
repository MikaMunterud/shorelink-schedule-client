import Swal from "sweetalert2";

export async function wakeUpServer() {
  try {
    await fetch(`${process.env.REACT_APP_BASE_URL}/ping`, {
      method: "GET",
      credentials: "include",
    });

    if (!localStorage.getItem("firstTimeVisit")) {
      return await Swal.fire(
        "Denna sida använder cookies 🍪",
        "För att använda sidans alla funktioner se till att ändra din webbläsares inställningar till att tillåta cookies och spårning mellan webbplatser.",
        "info"
      );
    }

    return;
  } catch (FetchError) {
    Swal.fire(
      `Misslyckades att koppla upp till server, kom tillbaka senare!`,
      "",
      "error"
    );
    return;
  }
}
