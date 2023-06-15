import axios from "axios";
import { toast } from "react-hot-toast";

export default async function b64Convertor(file: File) {
  let base64String;
  var reader = new FileReader();

  reader.onload = async function () {
    //@ts-ignore
    base64String = reader?.result?.replace("data:", "").replace(/^.+,/, "");
    const { data: response } = await axios.patch(
      `${process.env.NEXT_PUBLIC_HOST}/admin/updateImage`,
      {
        image: base64String,
      },
      {
        headers: {
          "Content-Type": "application/json",
          authToken: sessionStorage?.getItem("admin")?.toString(),
        },
      }
    );
    if (!response.success) toast.error("Something went wrong");
  };
  reader.readAsDataURL(file);
}
