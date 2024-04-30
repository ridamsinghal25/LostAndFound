import React, { useState, useEffect } from "react";
import itemService from "../api/item";
import { Loader, ListItems } from "../components";
import { Item } from "../assets";
import { SideBar } from "../components";

function FoundItem() {
  const [loading, setLoading] = useState(false);
  const [founditem, setFoundItem] = useState([]);

  useEffect(() => {
    setLoading(true);
    itemService
      .getFoundItem()
      .then((response) => {
        const items = response.data.data;
        setFoundItem(items);
      })
      .catch((err) => {
        console.log("Error in found items: ", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return !loading ? (
    <>
      <div className="bottom-0 left-0 w-full h-screen overflow-y-auto bg-[#121212] text-white">
        <div className="flex min-h-[calc(100vh-66px)] sm:min-h-[calc(100vh-82px)]">
          <SideBar />
          <section className="w-full pb-[70px] sm:ml-[70px] sm:pb-0 lg:ml-0">
            <div className="flex flex-col gap-4 p-4">
              {founditem.length > 0 ? (
                founditem.map((item) => (
                  <ListItems key={item._id} item={item} />
                ))
              ) : (
                <div className="flex flex-col mt-20 items-center justify-center gap-4 text-white">
                  <Item />
                  <h1 className="text-4xl font-extrabold md:text-6xl">
                    No item found?
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
export default FoundItem;
