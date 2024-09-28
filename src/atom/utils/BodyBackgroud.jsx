import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";

function BodyBackgroud({ color }) {
  useEffect(() => {
    document.body.classList.add('bg-[#f1f1f1]');
    return () => {
      document.body.classList.remove('bg-[#f1f1f1]');
    };
  },[color]);
  return <Outlet />;
}

export default BodyBackgroud;
