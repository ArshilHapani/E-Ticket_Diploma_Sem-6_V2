import axios from "axios";

async function fetchUserCounts() {
  let count = {
    passengerCnt: 0,
    conductorCnt: 0,
    adminCnt: 0,
  };
  const { data: passenger } = await axios.get(
    `${process.env.NEXT_PUBLIC_HOST}/admin/fetchAllPassengers`,
    {
      headers: {
        authToken: sessionStorage.getItem("admin"),
      },
    }
  );
  if (passenger.success) {
    count.passengerCnt = passenger.passengers.length;
  }
  const { data: conductors } = await axios.get(
    `${process.env.NEXT_PUBLIC_HOST}/admin/fetchAllConductors`,
    {
      headers: {
        authToken: sessionStorage.getItem("admin"),
      },
    }
  );
  if (conductors.success) {
    count.conductorCnt = conductors.conductors.length;
  }

  const { data: admins } = await axios.get(
    `${process.env.NEXT_PUBLIC_HOST}/admin/fetchAllAdmins`,
    {
      headers: {
        authToken: sessionStorage.getItem("admin"),
      },
    }
  );
  if (admins.success) {
    count.adminCnt = admins.admins.length;
  }
  return count;
}

export default fetchUserCounts;
