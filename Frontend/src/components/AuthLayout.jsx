import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";

function AuthLayout({ children, authentication = true }) {
  const [loader, setLoader] = useState(false);
  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate();

  useEffect(() => {
    if (authentication && Boolean(token) !== authentication) {
      navigate("/login");
    } else if (!authentication && Boolean(token) !== authentication) {
      navigate("/");
    }
    setLoader(false);
  }, [token, navigate, authentication]);

  return loader ? <Loader /> : <>{children}</>;
}

export default AuthLayout;
