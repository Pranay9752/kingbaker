

// auth.js

import getCookie from "./getCookies";

const isAuthenticated = () => {
    return getCookie("isAuth") == 'true';
};
export default isAuthenticated;