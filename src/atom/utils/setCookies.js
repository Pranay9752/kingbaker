import Cookies from "js-cookie";

const setCookie = (key, value, isLocal = false) => {
  try {
    if (isLocal) {
      localStorage.setItem(
        key,
        typeof value === "object" && value !== null
          ? JSON.stringify(value)
          : value
      );
    } else {
      Cookies.set(
        key,
        typeof value === "object" && value !== null
          ? JSON.stringify(value)
          : value,
        {
          expires: 7,
        }
      );
    }
  } catch (error) {
    console.error(
      `Error setting ${isLocal ? "localStorage" : "cookie"} for ${key}:`,
      error
    );
  }
};

export default setCookie;
