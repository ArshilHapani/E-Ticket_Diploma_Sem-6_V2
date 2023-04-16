import b64Convertor from "./b64Convertor";
import compressImage from "./compressImage";

export const uploadImage = async (e, setLoader, showSnackBar, fetchUser) => {
  console.log(fetchUser);
  e.preventDefault();
  setLoader(true);
  const selectedFile = e.target.files[0];
  if (
    selectedFile.type !== "image/jpeg" &&
    selectedFile.type !== "image/png" &&
    selectedFile.type !== "image/svg" &&
    selectedFile.type !== "image/jpg"
  ) {
    showSnackBar("Please upload an image with valid format", "error");
    setLoader(false);
    return;
  }
  if (selectedFile.size >= 800000) {
    const imageRes = await compressImage(selectedFile);
    await b64Convertor(imageRes, showSnackBar, fetchUser);
    showSnackBar("Image updated successfully", "success");
    setLoader(false);
    return;
  }
  await b64Convertor(selectedFile, showSnackBar, fetchUser);
  showSnackBar("Image updated successfully", "success");
  setTimeout(() => {
    fetchUser();
  }, 1000);
  setLoader(false);
};
