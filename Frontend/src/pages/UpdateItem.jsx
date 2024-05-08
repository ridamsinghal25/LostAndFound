import React, { useEffect, useState } from "react";
import { SideBar, Loader, ItemForm } from "../components";
import { useNavigate, useParams } from "react-router-dom";
import itemService from "../api/item";

function UpdateItem() {
  const [loading, setLoading] = useState(false);
  const [defaultValues, setDefaultValues] = useState({});
  const [error, setError] = useState("");
  const { itemId } = useParams();
  const navigate = useNavigate();

  const updateLostItem = async (data) => {
    setError("");
    try {
      const { itemPhoto, itemName, placeAtItemLost, description } = data;

      const updateItemDetails = await itemService.updateItemDetails({
        itemId,
        itemName,
        placeAtItemLost,
        description,
      });

      const updateItemPhoto = await itemService.updateItemPhoto({
        itemId,
        itemPhoto,
      });

      if (updateItemPhoto && updateItemDetails) {
        alert("Item updated successfully");
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
  };

  useEffect(() => {
    setLoading(true);
    itemService
      .getItemById({ itemId })
      .then((response) => {
        const itemDetails = response.data.data;
        setDefaultValues(itemDetails);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [itemId]);

  return !loading ? (
    <div className="overflow-y-auto h-screen bg-[#121212]">
      <div className="mx-auto flex w-full items-stretch justify-between gap-10">
        <SideBar />
        <div className="mx-auto mt-28 flex w-full flex-col items-center justify-center p-6 sm:max-w-4xl lg:px-10">
          <div className="w-full text-center">
            <h1 className="mb-3 text-5xl font-extrabold text-white">
              Update Item
            </h1>
          </div>
          {error && (
            <p className="text-red-500 mt-8 w-full text-center">{error}</p>
          )}
          <ItemForm onSubmit={updateLostItem} defaultValues={defaultValues} />
        </div>
      </div>
    </div>
  ) : (
    <Loader />
  );
}

export default UpdateItem;
