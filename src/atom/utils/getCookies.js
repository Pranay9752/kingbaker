import Cookies from "js-cookie";

const getCookie = (key, isLocal = false) => {
  try {
    if (isLocal) {
      const value = localStorage.getItem(key);
      return value ? JSON.parse(value) : "";
    }
    return Cookies.get(key) || "";
  } catch (error) {
    console.error(
      `Error reading ${isLocal ? "localStorage" : "cookie"} for ${key}:`,
      error
    );
    return "";
  }
};

export default getCookie;
