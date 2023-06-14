import axios from "axios";

import {
  AddConductorFunctionProps,
  AdminDetailsProps,
  BusStationDetailsProps,
  RawAdminDetailsProps,
  UserDetailsProps,
} from "@/interfaces";

// For conductors

export async function updateConductor(
  c_id: string,
  c_uname: string,
  c_name: string,
  c_email: string
) {
  const req = await axios.patch(
    `${process.env.NEXT_PUBLIC_HOST}/admin/updateConductor`,
    {
      c_id,
      c_email,
      c_name,
      c_uname,
    },
    {
      headers: {
        authToken: sessionStorage.getItem("admin"),
      },
    }
  );

  const { data } = req;
  return data;
}

export async function addConductor(value: AddConductorFunctionProps) {
  const { c_dob, c_email, c_name, c_pwd, c_uname } = value;

  const req = await axios.post(
    `${process.env.NEXT_PUBLIC_HOST}/admin/createConductor`,
    {
      c_dob,
      c_email,
      c_name,
      c_pwd,
      c_uname,
    },
    {
      headers: {
        authToken: sessionStorage.getItem("admin")?.toString(),
      },
    }
  );

  const { data } = req;

  return data;
}

export async function deleteConductor({ uname }: { uname: string }) {
  const req = await axios.delete(
    `${process.env.NEXT_PUBLIC_HOST}/admin/deleteConductor`,
    {
      headers: {
        authToken: sessionStorage.getItem("admin"),
      },
      data: {
        c_uname: uname,
      },
    }
  );

  const { data } = req;
  return data;
}

// For users

export async function deleteUser({ uname }: { uname: string }) {
  const req = await axios.delete(
    `${process.env.NEXT_PUBLIC_HOST}/admin/passenger/delete`,
    {
      headers: {
        authToken: sessionStorage.getItem("admin"),
      },
      data: {
        p_uname: uname,
      },
    }
  );

  const { data } = req;
  return data;
}

export async function editUser(values: UserDetailsProps) {
  const { p_balance, p_email, p_id, p_name, p_uname } = values;

  const req = await axios.patch(
    `${process.env.NEXT_PUBLIC_HOST}/admin/passenger/update`,
    {
      p_id,
      p_balance,
      p_email,
      p_name,
      p_uname,
    },
    {
      headers: {
        authToken: sessionStorage.getItem("admin"),
      },
    }
  );

  const { data } = req;

  return data;
}

// For stations

export async function deleteStation({ st_id }: { st_id: number }) {
  const req = await axios.delete(
    `${process.env.NEXT_PUBLIC_HOST}/admin/deleteStation`,
    {
      headers: {
        authToken: sessionStorage.getItem("admin"),
      },
      data: { st_id },
    }
  );

  const { data } = req;

  return data;
}

export async function updateStations(values: BusStationDetailsProps) {
  const { st_id, st_lat, st_long, st_name } = values;
  const req = await axios.patch(
    `${process.env.NEXT_PUBLIC_HOST}/admin/updateStation`,
    {
      st_id,
      st_name,
      st_long,
      st_lat,
    },
    {
      headers: {
        authToken: sessionStorage.getItem("admin"),
      },
    }
  );

  const { data } = req;
  return data;
}

export async function addStation(values: BusStationDetailsProps) {
  const { st_id, st_lat, st_long, st_name } = values;

  const req = await axios.post(
    `${process.env.NEXT_PUBLIC_HOST}/admin/addStation`,
    {
      st_id,
      st_name,
      st_long,
      st_lat,
    },
    {
      headers: {
        authToken: sessionStorage.getItem("admin"),
      },
    }
  );

  const { data } = req;

  return data;
}

// For admins

export async function deleteAdmin({ a_uname }: { a_uname: string }) {
  const req = await axios.delete(
    `${process.env.NEXT_PUBLIC_HOST}/admin/deleteAdmin`,
    {
      headers: {
        authToken: sessionStorage.getItem("admin"),
      },
      data: { a_uname },
    }
  );

  const { data } = req;

  return data;
}

export async function editAdmin(values: AdminDetailsProps) {
  const { a_email, a_id, a_name, a_no, a_uname } = values;

  const req = await axios.patch(
    `${process.env.NEXT_PUBLIC_HOST}/admin/updateAdmin`,
    {
      a_id,
      a_uname,
      a_name,
      a_email,
      a_no,
    },
    {
      headers: {
        authToken: sessionStorage.getItem("admin"),
      },
    }
  );

  const { data } = req;

  return data;
}
export async function addAdmin(values: RawAdminDetailsProps) {
  const { a_email, a_dob, a_pwd, a_name, a_no, a_uname } = values;

  const req = await axios.post(
    `${process.env.NEXT_PUBLIC_HOST}/admin/createAdmin`,
    {
      a_uname,
      a_name,
      a_email,
      a_no,
      a_dob,
      a_pwd,
    },
    {
      headers: {
        authToken: sessionStorage.getItem("admin"),
      },
    }
  );

  const { data } = req;

  return data;
}

//  for feedbacks

export async function replyFeedback(values: { f_id: string; reply: string }) {
  const req = await axios.patch(
    `${process.env.NEXT_PUBLIC_HOST}/admin/reply`,
    values,
    {
      headers: {
        authToken: sessionStorage.getItem("admin"),
      },
    }
  );

  const { data } = req;

  return data;
}

//  for broadcast

export function broadCastMessage(message: string) {
  return new Promise((resolve, reject) => {
    axios
      .post(
        `${process.env.NEXT_PUBLIC_HOST}/admin/sendEmails`,
        { message },
        {
          headers: {
            authToken: sessionStorage.getItem("admin"),
          },
        }
      )
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
