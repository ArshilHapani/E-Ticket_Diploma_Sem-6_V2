import axios from "axios";

export async function fetchTicketDetails(setTickets: Function) {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_HOST}/admin/dailyTicket/fare`,
    {
      headers: {
        authToken: sessionStorage.getItem("admin")?.toString(),
      },
    }
  );
  if (data.success) {
    setTickets(data.amount);
  }
}
