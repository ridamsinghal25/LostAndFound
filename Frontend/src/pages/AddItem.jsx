import React, { useState } from "react";
import { Input, Button, SideBar } from "../components";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import itemService from "../api/item";
import { PhotoAddIcon } from "../assets";

function AddItem() {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const listLostItem = async (data) => {
    setError("");
    try {
      const registerItem = await itemService.registerLostItem(data);

      if (registerItem) {
        alert("Item registered successfully");
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const itemPhoto = watch("itemPhoto");
  return (
    <>
      <div className="overflow-y-auto h-screen bg-[#121212]">
        <div className="mx-auto flex w-full items-stretch justify-between gap-10">
          <SideBar />
          <div className="mx-auto mt-28 flex w-full flex-col items-center justify-center p-6 sm:max-w-4xl lg:px-10">
            <div className="w-full text-center">
              <h1 className="mb-3 text-5xl font-extrabold text-white">
                List Lost Item
              </h1>
            </div>
            {error && (
              <p className="text-red-500 mt-8 w-full text-center">{error}</p>
            )}
            <form
              onSubmit={handleSubmit(listLostItem)}
              className="my-14 flex w-3/4 flex-col items-center justify-center gap-4"
            >
              <div className="flex w-full flex-col items-start justify-start gap-2">
                <label className="text-xs text-slate-200">Product Photo</label>
                <div className="flex flex-col justify-center items-center w-full">
                  <Input
                    id="avatar-input-1"
                    hidden
                    accept=".jpg, .png"
                    type="file"
                    {...register("itemPhoto", {
                      required: "Item photo is required",
                    })}
                  />
                  <label
                    htmlFor="avatar-input-1"
                    className="relative flex aspect-square h-24 w-24 cursor-pointer items-center justify-center overflow-visible rounded-full border-4 border-[#ae7aff] p-0.5"
                  >
                    {itemPhoto && itemPhoto.length > 0 ? (
                      <img
                        src={URL.createObjectURL(itemPhoto[0])}
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
                {errors.itemPhoto?.message && (
                  <p className="text-red-500 italic">
                    &#9888; {errors.itemPhoto?.message}
                  </p>
                )}
              </div>
              <div className="flex w-full flex-col items-start justify-start gap-2">
                <label className="text-xs text-slate-200">Product Name</label>
                <Input
                  placeholder="Enter a product name..."
                  autoComplete="false"
                  className="w-full border-[1px] border-white bg-black p-4 text-white placeholder:text-gray-500"
                  {...register("itemName", {
                    required: "Item name is required",
                    validate: {
                      matchFullName: (value) =>
                        /^[a-zA-Z]+(?: [a-zA-Z]+)*$/.test(value) ||
                        "Item name must be alphabetic characters",
                    },
                    maxLength: {
                      value: 15,
                      message: "Item name cannot be more than 15 characters",
                    },
                  })}
                />
                {errors.itemName?.message && (
                  <p className="text-red-500 italic">
                    &#9888; {errors.itemName?.message}
                  </p>
                )}
              </div>
              <div className="flex w-full flex-col items-start justify-start gap-2">
                <label className="text-xs text-slate-200">
                  Place where it lost
                </label>
                <Input
                  placeholder="Enter a place..."
                  autoComplete="false"
                  type="text"
                  className="w-full border-[1px] border-white bg-black p-4 text-white placeholder:text-gray-500"
                  {...register("placeAtItemLost", {
                    required: "place where item lost is required",
                    validate: {
                      matchFullName: (value) =>
                        /^[A-Za-z][A-Za-z0-9 ]*$/.test(value) ||
                        "Please enter a valid address",
                    },
                    maxLength: {
                      value: 25,
                      message: "Place cannot be more than 25 characters",
                    },
                  })}
                />
                {errors.placeAtItemLost?.message && (
                  <p className="text-red-500 italic">
                    &#9888; {errors.placeAtItemLost?.message}
                  </p>
                )}
              </div>
              <div className="flex w-full flex-col items-start justify-start gap-2">
                <label className="text-xs text-slate-200">Person Name</label>
                <Input
                  placeholder="Enter a person name..."
                  autoComplete="false"
                  type="text"
                  className="w-full border-[1px] border-white bg-black p-4 text-white placeholder:text-gray-500"
                  {...register("username", {
                    required: "username is required",
                    validate: {
                      matchUsername: (value) =>
                        /^[A-Za-z][A-Za-z0-9]*$/.test(value) ||
                        "Please enter a valid username",
                    },
                    maxLength: {
                      value: 15,
                      message: "username cannot be more than 15 characters",
                    },
                  })}
                />
                {errors.username?.message && (
                  <p className="text-red-500 italic">
                    &#9888; {errors.username?.message}
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
              <div className="flex w-full flex-col items-start justify-start gap-2">
                <label className="text-xs text-slate-200">
                  Specific Description
                </label>
                <Input
                  placeholder="Enter a description..."
                  autoComplete="false"
                  type="text"
                  className="w-full border-[1px] border-white bg-black p-4 text-white placeholder:text-gray-500"
                  {...register("description", {
                    required: "Item description is required",
                    validate: {
                      matchDescription: (value) =>
                        /^[a-zA-Z0-9\s]+$/.test(value) ||
                        "Description can contain alphabets and numbers",
                    },
                    maxLength: {
                      value: 50,
                      message: "Description cannot be more than 50 characters",
                    },
                  })}
                />
                {errors.description?.message && (
                  <p className="text-red-500 italic">
                    &#9888; {errors.description?.message}
                  </p>
                )}
              </div>
              <Button
                type="submit"
                className="w-full bg-[#ae7aff] p-3 text-center font-bold text-black shadow-[5px_5px_0px_0px_#4f4e4e] transition-all duration-150 ease-in-out active:translate-x-[5px] active:translate-y-[5px] active:shadow-[0px_0px_0px_0px_#4f4e4e]"
              >
                List Item
              </Button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddItem;
