import axios from "axios";

export async function fetchConductors() {
  const req = await axios.get(
    `${process.env.NEXT_PUBLIC_HOST}/admin/fetchAllConductors`,
    {
      headers: {
        authToken: sessionStorage.getItem("admin"),
      },
    }
  );
  const { data } = req;
  if (data.success) {
    return data.conductors;
  } else return [];
}

export async function fetchUsers() {
  const req = await axios.get(
    `${process.env.NEXT_PUBLIC_HOST}/admin/fetchAllPassengers`,
    {
      headers: {
        authToken: sessionStorage.getItem("admin"),
      },
    }
  );
  const { data } = req;
  if (data.success) {
    return data.passengers;
  } else return [];
}

export async function fetchStations() {
  const req = await axios.get(
    `${process.env.NEXT_PUBLIC_HOST}/admin/fetchAllStations`,
    {
      headers: {
        authToken: sessionStorage.getItem("admin"),
      },
    }
  );
  const { data } = req;
  if (data.success) {
    return data.stations;
  } else return [];
}
export async function fetchInvoices() {
  const req = await axios.get(
    `${process.env.NEXT_PUBLIC_HOST}/admin/fetchAllPayments`,
    {
      headers: {
        authToken: sessionStorage.getItem("admin"),
      },
    }
  );
  const { data } = req;
  if (data.success) {
    return data.payments;
  } else return [];
}
export async function fetchAdmins() {
  const req = await axios.get(
    `${process.env.NEXT_PUBLIC_HOST}/admin/fetchAllAdmins`,
    {
      headers: {
        authToken: sessionStorage.getItem("admin"),
      },
    }
  );
  const { data } = req;
  if (data.success) {
    return data.admins;
  } else return [];
}

export async function fetchFeedback(type: string = "") {
  if (type === "All") {
    type = "";
  }
  const req = await axios.get(
    `${process.env.NEXT_PUBLIC_HOST}/admin/fetchFeedback/${type}`,
    {
      headers: {
        authToken: sessionStorage.getItem("admin"),
      },
    }
  );

  const { data } = req;
  if (data.success) {
    return data.feedbacks;
  } else {
    return [];
  }
}
