import React from "react";
import { Input, Button } from "../components";
import { useForm } from "react-hook-form";
import { PhotoAddIcon } from "../assets";

function ItemForm({ onSubmit, defaultValues = {} }) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      itemName: defaultValues.itemName || "",
      placeAtItemLost: defaultValues.placeAtItemLost || "",
      description: defaultValues.description || "",
    },
  });
  const itemPhoto = watch("itemPhoto");

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="my-14 flex w-3/4 flex-col items-center justify-center gap-4 mb-20"
    >
      <div className="flex w-full flex-col items-start justify-start gap-2">
        <label className="text-xs text-slate-200">Item Photo</label>
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
                src={URL.createObjectURL(itemPhoto[0]) || imageUrl}
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
        <label className="text-xs text-slate-200">Item Name</label>
        <Input
          placeholder="Enter a product name..."
          autoComplete="false"
          className="w-full border-[1px] border-white bg-black p-4 text-white placeholder:text-gray-500"
          {...register("itemName", {
            required: "Item name is required",
            validate: {
              matchFullName: (value) =>
                /^[a-zA-Z0-9.]+(?: [a-zA-Z0-9.]+)*$/.test(value) ||
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
        <label className="text-xs text-slate-200">Place where it lost</label>
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
        <label className="text-xs text-slate-200">Specific Description</label>
        <Input
          placeholder="Enter a description..."
          autoComplete="false"
          type="text"
          className="w-full border-[1px] border-white bg-black p-4 text-white placeholder:text-gray-500"
          {...register("description", {
            required: "Item description is required",
            validate: {
              matchDescription: (value) =>
                /^[a-zA-Z0-9\s.,!?-]+$/.test(value) ||
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
  );
}

export default ItemForm;
