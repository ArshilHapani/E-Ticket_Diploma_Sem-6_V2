import imageCompression from "browser-image-compression";
async function compressImage(imageFile) {
  const options = {
    maxSizeMB: 0.2,
    maxWidthOrHeight: 520,
    useWebWorker: true,
  };
  try {
    const compressedFile = await imageCompression(imageFile, options);
    return compressedFile;
  } catch (error) {
    alert(error);
  }
}

export default compressImage;
