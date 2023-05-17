// Encryption function
export async function encrypt(message) {
  let key = process.env.REACT_APP_SECRET_KEY;
  let encryptedMessage = "";
  for (let i = 0; i < message.length; i++) {
    const charCode =
      (await message.charCodeAt(i)) ^ key.charCodeAt(i % key.length);
    encryptedMessage += String.fromCharCode(charCode);
  }
  return encryptedMessage;
}

// Decryption function
export async function decrypt(encryptedMessage) {
  let key = process.env.REACT_APP_SECRET_KEY;

  let decryptedMessage = "";
  for (let i = 0; i < encryptedMessage.length; i++) {
    const charCode =
      (await encryptedMessage.charCodeAt(i)) ^ key.charCodeAt(i % key.length);
    decryptedMessage += String.fromCharCode(charCode);
  }
  return decryptedMessage;
}
