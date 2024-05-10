import React, { useState } from "react";
import { SideBar, ItemForm } from "../components";
import { useNavigate } from "react-router-dom";
import itemService from "../api/item";

function AddItem() {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const addLostItem = async (data) => {
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
            <ItemForm onSubmit={addLostItem} />
          </div>
        </div>
      </div>
    </>
  );
}

export default AddItem;
