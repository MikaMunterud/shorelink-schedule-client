export async function wakeUpServer() {
  try {
    await fetch(`${process.env.REACT_APP_BASE_URL}/ping`, {
      method: "GET",
      credentials: "include",
    });
  } catch (FetchError) {
    return "Går inte att koppla upp till server";
  }
}
