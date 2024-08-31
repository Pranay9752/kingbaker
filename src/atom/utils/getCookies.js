import Cookies from "js-cookie";

const getCookie = (key) => {
  try {
    return Cookies.get(key) || "";
  } catch (error) {
    console.error(`Error reading cookie for ${key}:`, error);
    return "";
  }
};

export default getCookie;
