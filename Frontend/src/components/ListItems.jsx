import React from "react";

function ListItems({ item }) {
  return (
    <div key={item._id} className="mb-20">
      <div className="w-full max-w-3xl gap-x-4 md:flex">
        <div className="relative mb-2 w-full md:mb-0 md:w-5/12">
          <div className="w-full pt-[56%] md:pt-[56%]">
            <div className="absolute inset-0">
              <img
                src={item.photos[0].url}
                alt="Image not found"
                className="h-full w-full"
              />
            </div>
          </div>
        </div>
        <div className="flex gap-x-2 md:w-7/12">
          <div className="w-full">
            <h6 className="mb-1 font-semibold md:max-w-[75%]">
              Product Name: {item.itemName}
            </h6>
            <p className="flex text-sm text-gray-200 sm:mt-3">
              Place: {item.placeAtItemLost}
            </p>
            <div className="flex items-center gap-x-4">
              <p className="text-sm mt-2 text-gray-200">
                Username: {item.username}
              </p>
              <p className="text-sm mt-2 text-gray-200">
                Phone: {item.phoneNumber}
              </p>
            </div>
            <p className="mt-2 hidden text-sm md:block">
              Specific Description: {item.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListItems;
