type types = {
  setPayments: object;
  payments: Array<object>;
};
export async function fetchPaymentsData(setPayments: types, payments: types) {
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_HOST}/admin/dailyPayment`,
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
    //@ts-ignore
    setPayments({ ...payments, dates: res.dates, payments: res.payments });
  }
}
