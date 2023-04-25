export async function getUsers() {
  try {
    const response = await fetch(
      "https://shorelink-schedule.onrender.com/authentication/users",
      {
        method: "GET",
        credentials: "include",
      }
    );

    if (response.status === 400) {
      return { loggedIn: false };
    }

    if (response.status === 401) {
      return { loggedIn: false };
    }

    if (response.status === 404) {
      return { loggedIn: true };
    }

    if (response.status === 200) {
      const serverObject = await response.json();
      let loggedInUser = null;

      if (localStorage.getItem("loggedInUser")) {
        loggedInUser = localStorage.getItem("loggedInUser");
      }
      return { loggedIn: true, loggedInUser, usersList: serverObject };
    }
  } catch (FetchError) {
    return { loggedIn: "serverError" };
  }
}
