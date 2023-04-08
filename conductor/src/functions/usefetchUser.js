async function usefetchUser() {
  const data = await fetch(`${process.env.REACT_APP_BACKEND}/conductor/fetch`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authToken: localStorage?.getItem("user")?.toString(),
    },
  });

  const { conductor } = await data.json();
  return conductor;
}
export default usefetchUser;
