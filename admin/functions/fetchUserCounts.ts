async function fetchUserCounts() {
  let count = {
    passengerCnt: 0,
    conductorCnt: 0,
    adminCnt: 0,
  };
  const passenger = await fetch(
    `${process.env.NEXT_PUBLIC_HOST}/admin/fetchAllPassengers`,
    {
      method: "GET",
      //@ts-ignore
      headers: {
        "Content-type": "application/json",
        authToken: sessionStorage.getItem("admin"),
      },
    }
  );
  const res = await passenger.json();
  if (res.success) {
    count.passengerCnt = res.passengers.length;
  }
  const conductors = await fetch(
    `${process.env.NEXT_PUBLIC_HOST}/admin/fetchAllConductors`,
    {
      method: "GET",
      //@ts-ignore
      headers: {
        "Content-type": "application/json",
        authToken: sessionStorage.getItem("admin"),
      },
    }
  );
  const res1 = await conductors.json();

  if (res1.success) {
    count.conductorCnt = res1.conductors.length;
  }

  const admins = await fetch(
    `${process.env.NEXT_PUBLIC_HOST}/admin/fetchAllAdmins`,
    {
      method: "GET",
      //@ts-ignore
      headers: {
        "Content-type": "application/json",
        authToken: sessionStorage.getItem("admin"),
      },
    }
  );
  const res2 = await admins.json();

  if (res2.success) {
    count.adminCnt = res2.admins.length;
  }
  return await count;
}

export default fetchUserCounts;
