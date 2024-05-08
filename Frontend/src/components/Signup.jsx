import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../api/auth";
import { ProfileForm } from ".";

function Signup() {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const registerUser = async (data) => {
    setError("");
    try {
      const userData = await authService.createAccount(data);

      if (userData) {
        alert("Account created successfully");
        navigate("/login");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="h-screen overflow-y-auto bg-[#121212]">
      <div className="mx-auto flex w-full items-stretch justify-between gap-10">
        <div className="fixed left-0 top-0 hidden h-screen w-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 md:block md:w-1/3"></div>
        <div className="ml-auto mt-28 flex w-full flex-col items-start justify-start p-6 sm:max-w-4xl md:w-2/3 lg:px-10">
          <div className="w-full text-center">
            <h1 className="mb-3 text-5xl font-extrabold text-white">
              Register
            </h1>
            <p className="text-xs text-slate-400">Please create your account</p>
          </div>
          {error && (
            <p className="text-red-500 mt-8 w-full text-center">{error}</p>
          )}
          <ProfileForm onSubmit={registerUser} />
        </div>
      </div>
    </div>
  );
}

export default Signup;
