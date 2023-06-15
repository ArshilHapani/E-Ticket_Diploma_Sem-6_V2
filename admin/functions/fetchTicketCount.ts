import axios from "axios";

export async function fetchTicketCount(
  setTicketCount: Function,
  ticketCount: Array<object>
) {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_HOST}/admin/dailyTicket/count`,
    {
      headers: {
        authToken: sessionStorage.getItem("admin")?.toString(),
      },
    }
  );
  if (data.success) {
    setTicketCount({ ...ticketCount, dates: data.dates, counts: data.tickets });
  }
}
