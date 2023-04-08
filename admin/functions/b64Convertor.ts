import { toast } from "react-hot-toast";

export default async function b64Convertor(file: File) {
  let base64String;
  var reader = new FileReader();

  reader.onload = async function () {
    //@ts-ignore
    base64String = reader?.result?.replace("data:", "").replace(/^.+,/, "");
    const data = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/admin/updateImage`,
      {
        method: "PATCH",
        //@ts-ignore
        headers: {
          "Content-Type": "application/json",
          authToken: sessionStorage?.getItem("admin")?.toString(),
        },
        body: JSON.stringify({
          image: base64String,
        }),
      }
    );
    const response = await data.json();
    if (!response.success) toast.error("Something went wrong");
  };
  reader.readAsDataURL(file);
}
