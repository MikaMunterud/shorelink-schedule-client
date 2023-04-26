export async function getUsers() {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/authentication/users`,
      {
        method: "GET",
        credentials: "include",
      }
    );

    if (response.status === 400) {
      return { loggedIn: null };
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
