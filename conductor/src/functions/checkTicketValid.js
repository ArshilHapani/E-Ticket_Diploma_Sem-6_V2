export async function checkTicketValid(id) {
  const response = await fetch(
    `${process.env.REACT_APP_BACKEND}/conductor/scanTicket/${id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authToken: localStorage.getItem("user"),
      },
    }
  );
  const validity = await response.json();
  return await validity;
}
