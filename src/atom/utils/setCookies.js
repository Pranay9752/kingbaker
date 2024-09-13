import Cookies from "js-cookie";

const setCookie = (key, value) => {
  try {
    Cookies.set(
      key,
      typeof value === "object" && value !== null
        ? JSON.stringify(value)
        : value,
      {
        expires: 7,
      }
    );
  } catch (error) {
    console.error(`Error reading cookie for ${key}:`, error);
    return "";
  }
};

export default setCookie;
