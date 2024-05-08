import React from "react";
import { Input, Button } from "../components";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { PhotoAddIcon } from "../assets";

function ProfileForm({ onSubmit, defaultValues = {} }) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const avatar = watch("avatar");

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="my-14 flex w-full flex-col items-start justify-start gap-4"
    >
      <div className="flex flex-col justify-center items-center w-full">
        <Input
          id="avatar-input-1"
          hidden
          accept=".jpg, .png"
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
              <PhotoAddIcon />
            </div>
          )}
        </label>
      </div>
      {errors.avatar?.message && (
        <p className="text-red-500 italic">&#9888; {errors.avatar?.message}</p>
      )}
      <div className="flex w-full flex-col items-start justify-start gap-2">
        <label className="text-xs text-slate-200">Full name</label>
        <Input
          placeholder="Enter a Full name..."
          autoComplete="false"
          className="w-full border-[1px] border-white bg-black p-4 text-white placeholder:text-gray-500"
          {...register("fullName", {
            required: "full name is required",
            validate: {
              matchFullName: (value) =>
                /^[a-zA-Z]+(?: [a-zA-Z]+)*$/.test(value) ||
                "Full name must be alphabetic characters",
            },
            maxLength: {
              value: 15,
              message: "Full name cannot be more than 15 characters",
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
        <label className="text-xs text-slate-200">Email</label>
        <Input
          placeholder="Enter an email..."
          autoComplete="false"
          className="w-full border-[1px] border-white bg-black p-4 text-white placeholder:text-gray-500"
          {...register("email", {
            required: "email is required",
            validate: {
              matchEmailPattern: (value) =>
                /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                "Email address must be a valid address",
            },
          })}
        />
        {errors.email?.message && (
          <p className="text-red-500 italic">&#9888; {errors.email?.message}</p>
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
            validate: {
              matchPassword: (value) =>
                /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm.test(
                  value
                ) ||
                "Password must contain 1 uppercase and lowercase letter and a numeric digit",
            },
            minLength: {
              value: 8,
              message: "password should be of more than 8 characters",
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
            validate: {
              matchPhoneNumber: (value) =>
                /^(?:\+91)?(?:\d{10})$/.test(value) ||
                "Please enter a valid phone number",
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
  );
}

export default ProfileForm;
