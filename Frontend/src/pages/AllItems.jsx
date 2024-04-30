import React, { useEffect, useState } from "react";
import { Button, Loader, ListItems, Model } from "../components";
import itemService from "../api/item";
import { useNavigate } from "react-router-dom";
import { SideBar } from "../components";
import { Item } from "../assets";

function AllItems() {
  const [loading, setLoading] = useState(false);
  const [lostItems, setLostItems] = useState([]);
  const [itemFound, setItemFound] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    itemService
      .getLostItem()
      .then((response) => {
        const items = response.data.data;
        setLostItems(items);
      })
      .catch((err) => {
        console.log("Error in AllItems: ", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  function closeModel() {
    setItemFound(false);
  }

  function openModel() {
    setItemFound(true);
  }

  function handleFound(itemId) {
    itemService.itemFound({ itemId }).then(() => {
      navigate("/found-item");
    });
  }

  return !loading ? (
    <>
      {" "}
      <div className="h-screen overflow-y-auto bg-[#121212] text-white ">
        <div className="flex min-h-[calc(100vh-66px)] sm:min-h-[calc(100vh-82px)]">
          <SideBar />
          <section className="w-full pb-[70px] sm:ml-[70px] sm:pb-0 lg:ml-0">
            <div className="flex flex-col gap-4 p-4">
              {lostItems.length > 0 ? (
                lostItems.map((item) => (
                  <div key={item._id}>
                    <div>
                      <ListItems item={item} />
                    </div>
                    <div className="flex flex-row-reverse mb-10px">
                      <Button
                        onClick={openModel}
                        className="w-50% mt-1 bg-[#08ec5f] p-2 text-center font-bold text-black shadow-[5px_5px_0px_0px_#4f4e4e] transition-all duration-150 ease-in-out active:translate-x-[5px] active:translate-y-[5px] active:shadow-[0px_0px_0px_0px_#4f4e4e]"
                      >
                        Item Found
                      </Button>
                    </div>
                    {itemFound && (
                      <Model
                        key={item._id}
                        message={"Are you sure you found the item?"}
                        confirmButton={() => handleFound(item._id)}
                        closeModel={closeModel}
                      />
                    )}
                  </div>
                ))
              ) : (
                <div className="flex flex-col mt-20 items-center justify-center gap-4 text-white">
                  <Item />
                  <h1 className="text-4xl font-extrabold md:text-6xl">
                    No Lost item?
                  </h1>
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </>
  ) : (
    <Loader />
  );
}

export default AllItems;
