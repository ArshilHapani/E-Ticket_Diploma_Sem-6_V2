import { ChangeEvent } from "react";
import { toast } from "react-hot-toast";
import * as xlsx from "xlsx";
import isUserNameValid from "./userNameValidate";
import validateEmail from "./validateEmail";

// conductor excel reading and helper functions
export async function readConductorExcel(
  event: ChangeEvent<HTMLInputElement>,
  setLoading: Function
) {
  const file = event.target.files?.[0];

  let conductorObjArray: Array<string[]> = [];
  if (file) {
    const reader = new FileReader();
    reader.onload = (event) => {
      const data = new Uint8Array(event.target?.result as ArrayBuffer);
      const workbook = xlsx.read(data, { type: "array" });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = xlsx.utils.sheet_to_json(worksheet, { header: 1 });

      jsonData.forEach(async (arr: any, index: number) => {
        // Checking for first row validation in excel
        if (index === 0) {
          if (
            arr[0].toString() !== "Name" ||
            arr[1].toString() !== "username" ||
            arr[2].toString() !== "email" ||
            arr[3].toString() !== "mobile number" ||
            arr[4].toString() !== "Date of Birth" ||
            arr[5].toString() !== "Password"
          ) {
            // toast.error(
            //   "Please enter valid field heading excel sheet or check the demo excel file"
            // );
            return false;
          }
        } else if (index !== 0) {
          if (
            arr[0] === "" ||
            arr[1] === "" ||
            arr[2] === "" ||
            arr[3] === "" ||
            arr[4] === "" ||
            arr[5] === ""
          ) {
            toast.error(
              `Please enter all the required fields in excel sheet for row ${index} or check the demo excel file`
            );
            return false;
          }
          if (!isUserNameValid(arr[1])) {
            toast.error(`Please enter valid username in excel at row ${index}`);
            return false;
          }
          if (validateEmail(arr[2]) === null) {
            toast.error(
              `please enter valid email format in excel at row ${index}`
            );
            return false;
          }
          if (parseInt(arr[3]).toString().length !== 10) {
            toast.error(
              `Please enter valid mobile number in excel at row ${index}`
            );
            return false;
          }
          conductorObjArray.push(arr);
        }
      });

      if (conductorObjArray.length > 0) {
        setLoading(true);
        conductorObjArray.forEach(async (arr, index) => {
          const create = await fetch(
            `${process.env.NEXT_PUBLIC_HOST}/admin/createConductor`,
            {
              method: "POST",
              //@ts-ignore
              headers: {
                "Content-Type": "application/json",
                authToken: sessionStorage.getItem("admin")?.toString(),
              },
              body: JSON.stringify({
                c_uname: arr[1].toString(),
                c_pwd: arr[5].toString(),
                c_name: arr[0].toString(),
                c_email: arr[2].toString(),
                c_dob: arr[4].toString(),
                c_no: arr[3].toString(),
              }),
            }
          );
          const response = await create.json();
          if (response.success) {
            toast.success(`Conductor inserted ${arr[1]} `);
            setLoading(false);
            return;
          } else if (!response.success) {
            toast.error(`At ${index} error occur '${response.msg}'`);
            setLoading(true);
          }
        });
        setLoading(true);
      }
    };
    reader.readAsArrayBuffer(file);
  }
}

// Bus stop excel functions

export async function readBusStopsExcel(
  event: ChangeEvent<HTMLInputElement>,
  setLoading: Function
) {
  const file = event.target.files?.[0];
  let conductorObjArray: Array<string[]> = [];
  if (file) {
    const reader = new FileReader();
    reader.onload = (event) => {
      const data = new Uint8Array(event.target?.result as ArrayBuffer);
      const workbook = xlsx.read(data, { type: "array" });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = xlsx.utils.sheet_to_json(worksheet, { header: 1 });
      jsonData.forEach(async (arr: any, index: number) => {
        // Checking for first row validation in excel
        if (index === 0) {
          if (
            arr[0].toString() !== "Station ID" ||
            arr[1].toString() !== "Name" ||
            arr[2].toString() !== "Latitude" ||
            arr[3].toString() !== "Longitude"
          ) {
            toast.error(
              "Please enter valid field heading excel sheet or check the demo excel file"
            );
            return;
          }
          return false;
        } else if (index > 0) {
          conductorObjArray.push(arr);
          console.log(conductorObjArray);
        }
      });
      conductorObjArray.length !== 0 &&
        conductorObjArray.forEach(async (station, index) => {
          if (
            station[0].toString() === "" ||
            station[1].toString() === "" ||
            station[2].toString() === "" ||
            station[3].toString() === ""
          ) {
            toast.error(`Please enter an entry in sheet at row ${index}`);
            return false;
          } else {
            setLoading(true);
            const store = await fetch(
              `${process.env.NEXT_PUBLIC_HOST}/admin/addStation`,
              {
                method: "POST",
                //@ts-ignore
                headers: {
                  "Content-Type": "application/json",
                  authToken: sessionStorage.getItem("admin"),
                },
                body: JSON.stringify({
                  st_id: station[0].toString(),
                  st_name: station[1].toString(),
                  st_lat: station[2].toString(),
                  st_long: station[3].toString(),
                }),
              }
            );
            const response = await store.json();
            if (response.success) {
              toast.success(`Successfully added new stations ${station[1]} `);
            } else {
              toast.error("Failed to add station\n" + response.msg);
            }
            setLoading(false);
          }
        });
    };
    reader.readAsArrayBuffer(file);
  }
}

//  add admin excel helper functions

export async function readAdminExcel(
  event: ChangeEvent<HTMLInputElement>,
  setLoading: Function
) {
  const file = event.target.files?.[0];

  let conductorObjArray: Array<string[]> = [];
  if (file) {
    const reader = new FileReader();
    reader.onload = (event) => {
      const data = new Uint8Array(event.target?.result as ArrayBuffer);
      const workbook = xlsx.read(data, { type: "array" });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = xlsx.utils.sheet_to_json(worksheet, { header: 1 });
      jsonData.forEach(async (arr: any, index: number) => {
        // Checking for first row validation in excel
        if (index === 0) {
          if (
            arr[0].toString() !== "Name" ||
            arr[1].toString() !== "password" ||
            arr[2].toString() !== "username" ||
            arr[3].toString() !== "email" ||
            arr[4].toString() !== "mobile number" ||
            arr[5].toString() !== "Date of Birth"
          ) {
            // toast.error(
            //   "Please enter valid field heading excel sheet or check the demo excel file"
            // );
            return false;
          }
        } else if (index !== 0) {
          if (
            arr[0] === "" ||
            arr[1] === "" ||
            arr[2] === "" ||
            arr[3] === "" ||
            arr[4] === "" ||
            arr[5] === ""
          ) {
            toast.error(
              `Please enter all the required fields in excel sheet for row ${index} or check the demo excel file`
            );
            return false;
          }
          if (!isUserNameValid(arr[2].toString())) {
            toast.error(`Please enter valid username in excel at row ${index}`);
            return false;
          }
          if (validateEmail(arr[3].toString()) === null) {
            toast.error(
              `please enter valid email format in excel at row ${index}`
            );
            return false;
          }
          if (parseInt(arr[4]).toString().length !== 10) {
            toast.error(
              `Please enter valid mobile number in excel at row ${index}`
            );
            return false;
          }
          conductorObjArray.push(arr);
        }
      });

      if (conductorObjArray.length > 0) {
        conductorObjArray.forEach(async (arr, index) => {
          setLoading(true);
          const create = await fetch(
            `${process.env.NEXT_PUBLIC_HOST}/admin/createAdmin`,
            {
              method: "POST",
              //@ts-ignore
              headers: {
                "Content-Type": "application/json",
                authToken: sessionStorage.getItem("admin")?.toString(),
              },
              body: JSON.stringify({
                a_uname: arr[2].toString(),
                a_pwd: arr[1].toString(),
                a_name: arr[0].toString(),
                a_email: arr[3].toString(),
                a_dob: arr[5].toString(),
                a_no: arr[4].toString(),
              }),
            }
          );
          const response = await create.json();
          if (response.success) {
            toast.success(`Successfully created a new admin ${arr[2]} `);
          } else if (!response.success) {
            toast.error(`Error occur at ${index} error : ${response.msg}`);
          }
          setLoading(false);
        });
      }
    };
    reader.readAsArrayBuffer(file);
  }
}

export async function handleDownloadSampleExcel() {
  downloadFile("../assets/sample_files.zip", "sample_files.zip");
}
function downloadFile(uri: string, fileName: string): void {
  fetch(uri)
    .then((response) => response.blob())
    .then((blob) => {
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = fileName; // Specify the desired file name for the downloaded ZIP file

      link.style.display = "none";
      document.body.appendChild(link);

      link.click();

      document.body.removeChild(link);

      // Clean up the created URL
      window.URL.revokeObjectURL(url);
    })
    .catch((error) => {
      console.error("Error downloading ZIP file:", error);
    });
}
