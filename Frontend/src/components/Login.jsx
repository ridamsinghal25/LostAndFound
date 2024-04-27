import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Input, Button } from "./index";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../slices/authSlice";
import authService from "../api/auth";

function Login() {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const loginUser = async (data) => {
    setError("");
    try {
      const loggedInUser = await authService.login(data);

      if (loggedInUser) {
        const token = loggedInUser.data.data?.accessToken;
        const userData = await authService.getCurrentUser();
        if (userData) {
          dispatch(
            login({
              userData: userData.data.data,
              token,
            })
          );
        }
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#121212]">
      <header className="fixed top-0 z-10 mx-auto flex w-full max-w-full items-center justify-between border-b-[1px] border-b-slate-300 bg-[#121212] p-4 text-white lg:px-10">
        <h1 className="text-xl font-extrabold md:text-3xl">Login</h1>
        <div className="flex w-max flex-shrink-0 items-center justify-end gap-6">
          <Link to="/signup">
            <Button className="hidden w-max items-center justify-center border-[1px] border-white p-3 text-center font-bold text-white md:inline-flex">
              Register
            </Button>
          </Link>
        </div>
      </header>
      <div className="mx-auto flex w-full items-stretch justify-between gap-10">
        <div className="fixed left-0 top-0 hidden h-screen w-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 md:block md:w-1/3"></div>
        <div className="ml-auto mt-28 flex w-full flex-col items-start justify-start p-6 sm:max-w-4xl md:w-2/3 lg:px-10">
          <div className="w-full">
            <h1 className="mb-3 text-5xl font-extrabold text-white">Login</h1>
            <p className="text-xs text-slate-400">
              Login to access your account
            </p>
          </div>
          {error && (
            <p className="text-red-600 mt-8 w-full italic text-center">
              {error}
            </p>
          )}
          <form
            onSubmit={handleSubmit(loginUser)}
            className="my-14 flex w-full flex-col items-start justify-start gap-4"
          >
            <div className="flex w-full flex-col items-start justify-start gap-2">
              <label className="text-xs text-slate-200">Email</label>
              <Input
                placeholder="Enter a username or email..."
                autoComplete="false"
                className="w-full border-[1px] border-white bg-black p-4 text-white placeholder:text-gray-500"
                {...register("email", {
                  required: "Email is required",
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
            <Button
              type="submit"
              className="w-full bg-[#ae7aff] p-3 text-center font-bold text-black shadow-[5px_5px_0px_0px_#4f4e4e] transition-all duration-150 ease-in-out active:translate-x-[5px] active:translate-y-[5px] active:shadow-[0px_0px_0px_0px_#4f4e4e]"
            >
              Log in
            </Button>
            <Link to="/signup">
              <p className="text-sm font-light text-white">
                Don&#x27;t have an account?{" "}
                <span className="cursor-pointer font-bold hover:underline">
                  Create an account
                </span>
              </p>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
