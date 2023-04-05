export async function fetchTicketDetails(setTickets: Function) {
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_HOST}/admin/dailyTicket/fare`,
    {
      method: "GET",
      //@ts-ignore
      headers: {
        "Content-type": "application/json",
        authToken: sessionStorage.getItem("admin")?.toString(),
      },
    }
  );
  const res = await data.json();
  if (res.success) {
    setTickets(res.amount);
  }
}
