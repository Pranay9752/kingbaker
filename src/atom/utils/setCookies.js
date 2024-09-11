import Cookies from "js-cookie";

const setCookie = (key, value) => {
  try {
    Cookies.set(key, JSON.stringify(value), {
      expires: 7,
    });
  } catch (error) {
    console.error(`Error reading cookie for ${key}:`, error);
    return "";
  }
};

export default setCookie;
