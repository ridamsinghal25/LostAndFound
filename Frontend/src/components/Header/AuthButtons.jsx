import React from "react";
import { useDispatch, useSelector } from "react-redux";
import authService from "../../api/auth.js";
import { logout } from "../../slices/authSlice.js";
import { Button } from "../index.js";
import { useNavigate } from "react-router-dom";

function AuthButtons() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);

  const authButtons = [
    {
      name: "Login",
      slug: "/login",
    },
    {
      name: "Signup",
      slug: "/signup",
    },
  ];

  const logoutHandler = () => {
    authService.logout().then(() => {
      dispatch(logout());
    });
  };
  return (
    <>
      {!token ? (
        authButtons.map((btn) => (
          <Button
            key={btn.slug}
            onClick={() => navigate(btn.slug)}
            className="mr-1 w-full bg-[#ae7aff] px-3 py-2 text-center font-bold text-black shadow-[5px_5px_0px_0px_#4f4e4e] transition-all duration-150 ease-in-out active:translate-x-[5px] active:translate-y-[5px] active:shadow-[0px_0px_0px_0px_#4f4e4e] sm:w-auto"
          >
            {btn.name}
          </Button>
        ))
      ) : (
        <Button
          className="mr-1 w-full bg-[#ae7aff] px-3 py-2 text-center font-bold text-black shadow-[5px_5px_0px_0px_#4f4e4e] transition-all duration-150 ease-in-out active:translate-x-[5px] active:translate-y-[5px] active:shadow-[0px_0px_0px_0px_#4f4e4e] sm:w-auto"
          onClick={logoutHandler}
        >
          Logout
        </Button>
      )}
    </>
  );
}

export default AuthButtons;
