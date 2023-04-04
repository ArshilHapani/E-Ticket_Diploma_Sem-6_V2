export default async function b64Convertor(file) {
  let base64String;
  var reader = new FileReader();
  console.log("base 64 invoked");

  reader.onload = async function () {
    base64String = reader.result.replace("data:", "").replace(/^.+,/, "");
    const data = await fetch(
      `${process.env.REACT_APP_BACKEND}/conductor/updateImage`,
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
    if (!response.success) alert("Something went wrong");
  };
  reader.readAsDataURL(file);
}
