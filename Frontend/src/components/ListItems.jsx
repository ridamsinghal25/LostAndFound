import React from "react";

function ListItems({ item }) {
  return (
    <div key={item._id}>
      <div className="w-full max-w-3xl gap-x-4 md:flex">
        <div className="relative mb-2 w-full md:mb-0 md:w-5/12">
          <div className="w-full pt-[56%]">
            <div className="absolute inset-0">
              <img
                src={item.itemPhoto?.url}
                alt="Item Photo"
                className="h-full w-full"
              />
            </div>
            <span className="absolute bottom-1 right-1 inline-block rounded bg-black px-1.5 text-sm">
              {item.type === "lost" ? "lost" : "found"}
            </span>
          </div>
        </div>
        <div className="flex gap-x-2 md:w-7/12">
          <div className="w-full">
            <h6 className="mb-1 font-semibold md:max-w-[75%]">
              {item.itemName}
            </h6>
            <p className="flex text-sm text-gray-200 sm:mt-3">
              {item.placeAtItemLost}
            </p>
            <div className="flex items-center gap-x-4">
              <div className="mt-2 hidden h-10 w-10 shrink-0 md:block">
                <img
                  src={item.owner[0]?.avatar.url}
                  alt=""
                  className="h-full w-full rounded-full"
                />
              </div>
              <p className="text-sm text-gray-200">{item.owner[0]?.fullName}</p>
            </div>
            <p className="mt-2 text-sm md:block">{item.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListItems;
