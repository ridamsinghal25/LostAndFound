import React, { useEffect, useState } from "react";
import { Button, Loader, ListItems, Model } from "../components";
import itemService from "../api/item";
import { useNavigate } from "react-router-dom";
import { SideBar } from "../components";
import { Item } from "../assets";
import { useSelector } from "react-redux";

function AllLostItems() {
  const [loading, setLoading] = useState(false);
  const [lostItems, setLostItems] = useState([]);
  const [itemFound, setItemFound] = useState(false);
  const [updateItem, setUpdateItem] = useState(false);
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  useEffect(() => {
    setLoading(true);
    itemService
      .getLostItems()
      .then((response) => {
        const items = response.data.data;
        setLostItems(items);
      })
      .catch((err) => {
        console.log("Error in AllLostItems: ", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  function closeFoundModel() {
    setItemFound(false);
  }

  function openFoundModel() {
    setItemFound(true);
  }

  function closeUpdateModel() {
    setUpdateItem(false);
  }

  function openUpdateModel() {
    setUpdateItem(true);
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
                    <div className="flex flex-row-reverse gap-4 mb-10px">
                      {userData?._id === item.owner[0]._id ? (
                        <div className="flex flex-row-reverse mb-10px">
                          <Button
                            onClick={openUpdateModel}
                            className="w-50% mt-1 bg-[#08ec5f] p-2 text-center font-bold text-black shadow-[5px_5px_0px_0px_#4f4e4e] transition-all duration-150 ease-in-out active:translate-x-[5px] active:translate-y-[5px] active:shadow-[0px_0px_0px_0px_#4f4e4e]"
                          >
                            Update Item
                          </Button>
                          {updateItem && (
                            <Model
                              key={item._id}
                              message={"Do you really want to update item?"}
                              confirmButton={() =>
                                navigate(`/update-item/${item._id}`)
                              }
                              closeModel={closeUpdateModel}
                              buttonName={"Update"}
                            />
                          )}
                        </div>
                      ) : null}
                      <Button
                        onClick={openFoundModel}
                        className="w-50% mt-1 bg-[#08ec5f] p-2 text-center font-bold text-black shadow-[5px_5px_0px_0px_#4f4e4e] transition-all duration-150 ease-in-out active:translate-x-[5px] active:translate-y-[5px] active:shadow-[0px_0px_0px_0px_#4f4e4e]"
                      >
                        Item Found
                      </Button>
                      {itemFound && (
                        <Model
                          key={item._id}
                          message={"Are you sure you found the item?"}
                          confirmButton={() => handleFound(item._id)}
                          closeModel={closeFoundModel}
                        />
                      )}
                    </div>
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

export default AllLostItems;
