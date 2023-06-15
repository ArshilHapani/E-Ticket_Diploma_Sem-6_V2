import { useStateContext } from "../context/stateContext";

const useUserFetch = () => {
  const { setLoader, setNewUser } = useStateContext();

  async function fetchUser() {
    setLoader(true);
    const data = await fetch(
      `${process.env.REACT_APP_BACKEND}/passenger/fetch`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authToken: localStorage.getItem("user").toString(),
        },
      }
    );
    const response = await data.json();
    const { passenger } = response;
    setNewUser(passenger);
    setLoader(false);
  }

  return { fetchUser };
};

export default useUserFetch;
