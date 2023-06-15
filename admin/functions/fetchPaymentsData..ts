import axios from "axios";

type types = {
  setPayments: object;
  payments: Array<object>;
};
export async function fetchPaymentsData(setPayments: types, payments: types) {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_HOST}/admin/dailyPayment`,
    {
      headers: {
        "Content-type": "application/json",
        authToken: sessionStorage.getItem("admin")?.toString(),
      },
    }
  );
  const { data }: any = res;
  if (data.success) {
    //@ts-ignore
    await setPayments({
      ...payments,
      dates: data.dates,
      payments: data.payments,
    });
  }
}
