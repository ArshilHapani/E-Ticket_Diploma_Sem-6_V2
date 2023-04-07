export async function fetchTicketCount(
  setTicketCount: Function,
  ticketCount: Array<object>
) {
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_HOST}/admin/dailyTicket/count`,
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
    setTicketCount({ ...ticketCount, dates: res.dates, counts: res.tickets });
  }
}
