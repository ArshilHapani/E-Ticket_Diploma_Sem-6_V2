export async function createTicket(dist, showSnackBar) {
  const ticket = await fetch(
    `${process.env.REACT_APP_BACKEND}/passenger/purchaseTicket`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authToken: localStorage.getItem("user").toString(),
      },
      body: JSON.stringify({
        quantity: dist.quantity,
        start: dist.source.st_id,
        dest: dist.destination.st_id,
      }),
    }
  );

  const response = await ticket.json();
  if (!response.success) {
    showSnackBar("Insufficient balance", "error");
    return false;
  } else {
    showSnackBar("Ticket purchased successfully", "success");
    return true;
  }
}
