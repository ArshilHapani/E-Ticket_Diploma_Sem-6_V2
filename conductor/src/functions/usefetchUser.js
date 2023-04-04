async function usefetchUser() {
  const data = await fetch(`${process.env.REACT_APP_BACKEND}/conductor/fetch`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authToken: localStorage?.getItem("user")?.toString(),
    },
  });

  const { conductor } = await data.json();
  console.log(conductor);
  return conductor;
}
export default usefetchUser;
