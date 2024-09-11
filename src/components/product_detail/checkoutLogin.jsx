import { useEffect } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import BasicNav from "../../atom/nav/BasicNav";
import AccountAuth from "../../molecules/account/AccountAuth";
import Basicheader from "./header/Basicheader";

function CheckOutLogin() {
  const navigate = useNavigate();

  const handleOnLogin = ({ data }) => {
    console.log('data: ', data);
    navigate("/checkout/details");
  };

  useEffect(() => {
    if (Cookies.get("isAuth") == "true") {
      navigate("/checkout/details");
    }
  }, []);
  return (
    <>
      <Basicheader num={1} title={"Login/Register"} />
      <section className="px-3 mt-20 ">
        <AccountAuth handleOnLogin={handleOnLogin} />
      </section>
    </>
  );
}

export default CheckOutLogin;
