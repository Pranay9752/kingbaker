import bwipjs from "bwip-js";
import QRCode from "qrcode";

export const generateBarcodeImage = (value) => {
  let canvas = document.createElement("canvas");

  bwipjs.toCanvas(canvas, {
    bcid: "code128", // Barcode type
    text: String(value), // Text to encode
    scale: 3, // 3x scaling factor
    height: 10, // Bar height, in millimeters
    includetext: false, // Show human-readable text
    textxalign: "center", // Always good to set this
  });

  return canvas.toDataURL("image/png");
};
export const generateQRCodeImage = async (value) => {
  return new Promise((resolve, reject) => {
    try {
      let canvas = document.createElement("canvas");

      // Adjust width and height to change QR code size
      const options = {
        // width: 3000, // Width of the QR code in pixels
        // height: 3000, // Width of the QR code in pixels
        // scale: 15,
        margin: 1, // Margin around the QR code
        color: {
          dark: "#000000", // Dark color for QR code
          light: "#ffffff", // Light color for background
        },
      };

      QRCode.toCanvas(canvas, `${value}`, options, (error) => {
        if (error) {
          reject(error);
        } else {
          resolve(canvas.toDataURL("image/png"));
        }
      });
    } catch (error) {
      reject(error);
    }
  });
};
export default generateBarcodeImage;
