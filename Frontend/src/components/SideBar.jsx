import React from "react";
import { NavLink } from "react-router-dom";
import { HomeIcon, CollectionIcon, PlusIcon, SettingIcon } from "../assets";

function SideBar() {
  return (
    <aside className="group fixed inset-x-0 bottom-0 z-40 w-full shrink-0 border-t border-white bg-[#121212] px-2 py-2 sm:absolute sm:inset-y-0 sm:max-w-[70px] sm:border-r sm:border-t-0 sm:py-6 sm:hover:max-w-[250px] lg:sticky lg:max-w-[250px]">
      <ul className="flex gap-2 sm:sticky sm:top-[106px] sm:min-h-[calc(100vh-130px)] sm:flex-col lg:sticky lg:top-0">
        <li className="hidden sm:block ">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex flex-col items-center justify-center ${
                isActive ? "bg-[#ae7aff] border-white" : "bg-[#121212]"
              } border-white py-1 focus:text-[#ae7aff] sm:w-full sm:flex-row sm:border sm:p-1.5 sm:hover:bg-[#ae7aff] sm:hover:text-black sm:focus:border-[#ae7aff] sm:focus:bg-[#ae7aff] sm:focus:text-black sm:group-hover:justify-start sm:group-hover:px-4 lg:justify-start lg:px-4`
            }
          >
            <span className="inline-block w-5 shrink-0 sm:group-hover:mr-4 lg:mr-4 text-white">
              <HomeIcon />
            </span>
            <span className="block sm:hidden sm:group-hover:inline lg:inline text-white">
              Home
            </span>
          </NavLink>
        </li>
        <li className="hidden sm:block ">
          <NavLink
            to="/list-item"
            className={({ isActive }) =>
              `flex flex-col items-center justify-center ${
                isActive ? "bg-[#ae7aff] border-white" : "bg-[#121212]"
              } border-white py-1 focus:text-[#ae7aff] sm:w-full sm:flex-row sm:border sm:p-1.5 sm:hover:bg-[#ae7aff] sm:hover:text-black sm:focus:border-[#ae7aff] sm:focus:bg-[#ae7aff] sm:focus:text-black sm:group-hover:justify-start sm:group-hover:px-4 lg:justify-start lg:px-4`
            }
          >
            <span className="inline-block w-5 shrink-0 sm:group-hover:mr-4 lg:mr-4 text-white">
              <PlusIcon />
            </span>
            <span className="block sm:hidden sm:group-hover:inline lg:inline text-white">
              Add Item
            </span>
          </NavLink>
        </li>
        <li className="hidden sm:block ">
          <NavLink
            to="/found-item"
            className={({ isActive }) =>
              `flex flex-col items-center justify-center ${
                isActive ? "bg-[#ae7aff] border-white" : "bg-[#121212]"
              } border-white py-1 focus:text-[#ae7aff] sm:w-full sm:flex-row sm:border sm:p-1.5 sm:hover:bg-[#ae7aff] sm:hover:text-black sm:focus:border-[#ae7aff] sm:focus:bg-[#ae7aff] sm:focus:text-black sm:group-hover:justify-start sm:group-hover:px-4 lg:justify-start lg:px-4`
            }
          >
            <span className="inline-block w-5 shrink-0 sm:group-hover:mr-4 lg:mr-4 text-white">
              <CollectionIcon />
            </span>
            <span className="block sm:hidden sm:group-hover:inline lg:inline text-white">
              Found Item
            </span>
          </NavLink>
        </li>
        <li className="hidden sm:block ">
          <NavLink
            to="/setting"
            className={({ isActive }) =>
              `flex flex-col items-center justify-center ${
                isActive ? "bg-[#ae7aff] border-white" : "bg-[#121212]"
              } border-white py-1 focus:text-[#ae7aff] sm:w-full sm:flex-row sm:border sm:p-1.5 sm:hover:bg-[#ae7aff] sm:hover:text-black sm:focus:border-[#ae7aff] sm:focus:bg-[#ae7aff] sm:focus:text-black sm:group-hover:justify-start sm:group-hover:px-4 lg:justify-start lg:px-4`
            }
          >
            <span className="inline-block w-5 shrink-0 sm:group-hover:mr-4 lg:mr-4 text-white">
              <SettingIcon />
            </span>
            <span className="block sm:hidden sm:group-hover:inline lg:inline text-white">
              Setting
            </span>
          </NavLink>
        </li>
      </ul>
    </aside>
  );
}

export default SideBar;
