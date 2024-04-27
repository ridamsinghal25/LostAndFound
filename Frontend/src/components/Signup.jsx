import React, { useState } from "react";
import { Input, Button } from "../components";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import authService from "../api/auth";

function Signup() {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const avatar = watch("avatar");

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
    <div className="min-h-screen bg-[#121212]">
      <header className="fixed top-0 z-10 mx-auto flex w-full max-w-full items-center justify-between border-b-[1px] border-b-slate-300 bg-[#121212] p-4 text-white lg:px-10">
        <h1 className="text-xl font-extrabold md:text-3xl">Register</h1>
        <div className="flex w-max flex-shrink-0 items-center justify-end gap-6">
          <Link to="/login">
            <Button className="hidden w-max items-center justify-center border-[1px] border-white p-3 text-center font-bold text-white md:inline-flex">
              Login
            </Button>
          </Link>
        </div>
      </header>
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
          <form
            onSubmit={handleSubmit(registerUser)}
            className="my-14 flex w-full flex-col items-start justify-start gap-4"
          >
            <div className="flex w-96 pl-20 items-center justify-center ">
              <Input
                id="avatar-input-1"
                hidden=""
                type="file"
                {...register("avatar", {
                  required: "user avatar is required",
                })}
              />
              <label
                htmlFor="avatar-input-1"
                className="relative flex aspect-square h-24 w-24 cursor-pointer items-center justify-center overflow-visible rounded-full border-4 border-[#ae7aff] p-0.5"
              >
                {avatar && avatar.length > 0 ? (
                  <img
                    src={URL.createObjectURL(avatar[0])}
                    alt="Preview"
                    className="rounded-full object-cover h-full w-full"
                  />
                ) : (
                  <div>
                    <div className="flex h-full w-full items-center justify-center rounded-full">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        aria-hidden="true"
                        className="h-8 w-8 text-white"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 4.5v15m7.5-7.5h-15"
                        ></path>
                      </svg>
                    </div>
                    <span className="absolute bottom-0 right-0 flex aspect-square h-5 w-5 items-center justify-center rounded-full bg-[#ae7aff] p-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        aria-hidden="true"
                        className="h-3 w-3 text-black"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 4.5v15m7.5-7.5h-15"
                        ></path>
                      </svg>
                    </span>
                  </div>
                )}
              </label>
              {errors.avatar?.message && (
                <p className="text-red-500 italic">
                  &#9888; {errors.avatar?.message}
                </p>
              )}
            </div>
            <div className="flex w-full flex-col items-start justify-start gap-2">
              <label className="text-xs text-slate-200">Full name</label>
              <Input
                placeholder="Enter a Full name..."
                autoComplete="false"
                className="w-full border-[1px] border-white bg-black p-4 text-white placeholder:text-gray-500"
                {...register("fullName", {
                  required: "full name is required",
                  minLength: {
                    value: 5,
                    message: "Full name must be atleast 5 characters",
                  },
                })}
              />
              {errors.fullName?.message && (
                <p className="text-red-500 italic">
                  &#9888; {errors.fullName?.message}
                </p>
              )}
            </div>
            <div className="flex w-full flex-col items-start justify-start gap-2">
              <label className="text-xs text-slate-200">Username</label>
              <Input
                placeholder="Enter a username..."
                autoComplete="false"
                className="w-full border-[1px] border-white bg-black p-4 text-white placeholder:text-gray-500"
                {...register("username", {
                  required: "username is required",
                })}
              />
              {errors.username?.message && (
                <p className="text-red-500 italic">
                  &#9888; {errors.username?.message}
                </p>
              )}
            </div>
            <div className="flex w-full flex-col items-start justify-start gap-2">
              <label className="text-xs text-slate-200">Email</label>
              <Input
                placeholder="Enter an email..."
                autoComplete="false"
                className="w-full border-[1px] border-white bg-black p-4 text-white placeholder:text-gray-500"
                {...register("email", {
                  required: "email is required",
                  validate: {
                    matchEmailPattern: (value) =>
                      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
                        value
                      ) || "Email address must be a valid address",
                  },
                })}
              />
              {errors.email?.message && (
                <p className="text-red-500 italic">
                  &#9888; {errors.email?.message}
                </p>
              )}
            </div>
            <div className="flex w-full flex-col items-start justify-start gap-2">
              <label className="text-xs text-slate-200">Password</label>
              <Input
                placeholder="Enter a password..."
                autoComplete="false"
                type="password"
                className="w-full border-[1px] border-white bg-black p-4 text-white placeholder:text-gray-500"
                {...register("password", {
                  required: "password is required",
                  minLength: {
                    value: 6,
                    message: "password should be of more than 6 characters",
                  },
                })}
              />
              {errors.password?.message && (
                <p className="text-red-500 italic">
                  &#9888; {errors.password?.message}
                </p>
              )}
            </div>
            <div className="flex w-full flex-col items-start justify-start gap-2">
              <label className="text-xs text-slate-200">Phone Number</label>
              <Input
                placeholder="Enter a phone number..."
                autoComplete="false"
                type="text"
                className="w-full border-[1px] border-white bg-black p-4 text-white placeholder:text-gray-500"
                {...register("phoneNumber", {
                  required: "phone number is required",
                  minLength: {
                    value: 10,
                    message: "Please enter a valid phone number",
                  },
                })}
              />
              {errors.phoneNumber?.message && (
                <p className="text-red-500 italic">
                  &#9888; {errors.phoneNumber?.message}
                </p>
              )}
            </div>
            <Button
              type="submit"
              className="w-full bg-[#ae7aff] p-3 text-center font-bold text-black shadow-[5px_5px_0px_0px_#4f4e4e] transition-all duration-150 ease-in-out active:translate-x-[5px] active:translate-y-[5px] active:shadow-[0px_0px_0px_0px_#4f4e4e]"
            >
              Create Account
            </Button>
            <Link to="/login">
              <p className="text-sm font-light text-white">
                Already registered?{" "}
                <span className="cursor-pointer font-bold hover:underline">
                  Sign in to your account
                </span>
              </p>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
