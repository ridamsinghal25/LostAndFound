import React from "react";
import { useNavigate } from "react-router-dom";
import { HomeIcon, CollectionIcon, PlusIcon, SettingIcon } from "../assets";

function SideBar() {
  const navigate = useNavigate();
  const sideBarItems = [
    {
      name: "Home",
      slug: "/",
      svg: <HomeIcon />,
    },
    {
      name: "Add Items",
      slug: "/list-item",
      svg: <PlusIcon />,
    },
    {
      name: "Found Items",
      slug: "/found-item",
      svg: <CollectionIcon />,
    },
    {
      name: "Setting",
      slug: "/setting",
      svg: <SettingIcon />,
    },
  ];

  return (
    <aside className="group fixed inset-x-0 bottom-0 z-40 w-full shrink-0 border-t border-white bg-[#121212] px-2 py-2 sm:absolute sm:inset-y-0 sm:max-w-[70px] sm:border-r sm:border-t-0 sm:py-6 sm:hover:max-w-[250px] lg:sticky lg:max-w-[250px]">
      <ul className="flex gap-2 sm:sticky sm:top-[106px] sm:min-h-[calc(100vh-130px)] sm:flex-col lg:sticky lg:top-0">
        {sideBarItems.map((item) => (
          <li key={item.slug} className="hidden sm:block ">
            <button
              onClick={() => navigate(item.slug)}
              className="flex flex-col items-center justify-center border-white py-1 focus:text-[#ae7aff] sm:w-full sm:flex-row sm:border sm:p-1.5 sm:hover:bg-[#ae7aff] sm:hover:text-black sm:focus:border-[#ae7aff] sm:focus:bg-[#ae7aff] sm:focus:text-black sm:group-hover:justify-start sm:group-hover:px-4 lg:justify-start lg:px-4"
            >
              <span className="inline-block w-5 shrink-0 sm:group-hover:mr-4 lg:mr-4 text-white">
                {item.svg}
              </span>
              <span className="block sm:hidden sm:group-hover:inline lg:inline text-white">
                {item.name}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default SideBar;
