import Cookies from 'js-cookie';

// Function to delete all cookies
const deleteAllCookies = () => {
  // Get all cookies
  const cookies = Cookies.get();

  // Loop through each cookie and delete it
  for (const cookieName in cookies) {
    Cookies.remove(cookieName);
  }
};

export default deleteAllCookies;
