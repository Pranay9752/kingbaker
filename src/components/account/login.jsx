import { useEffect } from "react";
import Cookies from "js-cookie";
import { useNavigate, useSearchParams } from "react-router-dom";

import Basicheader from "../product_detail/header/Basicheader";
import AccountAuth from "../../molecules/account/AccountAuth";
import SecurePaymentCard from "../../molecules/cards/SecurePaymentCard";


function Login() {
  const [searchParams] = useSearchParams();
  const next = searchParams.get('next');


  const navigate = useNavigate();

  const handleOnLogin = ({ data }) => {
    // navigate(next ? next : '/');
  };

  useEffect(() => {
    if (Cookies.get("isAuth") == "true") {
      navigate("/");
    }

    document.body.classList.add("bg-[#f2f2f2]");
    return () => {
      document.body.classList.remove("bg-[#f2f2f2]");
    };
  }, []);
  return (
    <>
      <Basicheader title={"Login/Register"} link={"/"} />
      <div className="max-w-[1600px] mx-auto flex justify-center h-full items-center ">
        <section className="px-3 mt-20 flex flex-col gap-3 md:w-[30%] ">
          <AccountAuth handleOnLogin={handleOnLogin} />
          <SecurePaymentCard />
        </section>
      </div>

    </>
  );
}

export default Login;
