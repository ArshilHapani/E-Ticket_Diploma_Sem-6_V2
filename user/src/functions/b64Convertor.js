export default async function b64Convertor(file, showSnackBar, fetchUser) {
  let base64String;
  var reader = new FileReader();

  reader.onload = async function () {
    base64String = reader.result.replace("data:", "").replace(/^.+,/, "");
    const data = await fetch(
      `${process.env.REACT_APP_BACKEND}/passenger/updateImage`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          authToken: localStorage.getItem("user").toString(),
        },
        body: JSON.stringify({
          image: base64String,
        }),
      }
    );
    const response = await data.json();
    if (response.success) fetchUser();
    if (!response.success) showSnackBar("Something went wrong", "error");
  };
  reader.readAsDataURL(file);
}
