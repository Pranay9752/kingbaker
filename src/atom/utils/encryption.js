import CryptoJS  from "crypto-js";
const secretKey = 'your-strong-secret-key';
// Encryption function
export const encryptData = (data) => {
  return CryptoJS .AES.encrypt(JSON.stringify(data), secretKey).toString();
};

// Decryption function
export const decryptData = (ciphertext) => {
  const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);
  const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
  return JSON.parse(decryptedData);
};
