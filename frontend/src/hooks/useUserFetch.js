import { useDispatch } from "react-redux";
import { useStateContext } from "../context/stateContext";
import { setUser } from "../states/slices/userSlice";

const useUserFetch = () => {
  const { setLoader, setNewUser } = useStateContext();
  const dispatch = useDispatch();

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
    dispatch(
      setUser({
        ...passenger,
      })
    );
    setNewUser(passenger);
    setLoader(false);
  }

  return { fetchUser };
};

export default useUserFetch;
