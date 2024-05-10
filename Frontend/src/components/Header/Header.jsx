import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  LogoIcon,
  CancelButtonIcon,
  HomeIcon,
  PlusIcon,
  CollectionIcon,
  SettingIcon,
} from "../../assets";
import { Button, AuthButtons } from "../index";

function Header() {
  const [navBar, setNavBar] = useState(true);

  function toggleNavBar() {
    setNavBar(!navBar);
  }

  return (
    <>
      <header className="sticky inset-x-0 top-0 z-50 w-full border-b border-white bg-[#121212] px-4">
        <nav className="mx-auto flex max-w-7xl items-center py-2">
          <div className="mr-4 w-12 shrink-0 sm:w-16">
            <LogoIcon />
          </div>
          <div className="relative mx-auto hidden w-full max-w-md overflow-hidden sm:block"></div>
          <Button
            onClick={toggleNavBar}
            className="group peer ml-auto flex w-6 shrink-0 flex-wrap gap-y-1.5 sm:hidden"
          >
            <span className="block h-[2px] w-full bg-white group-hover:bg-[#ae7aff]"></span>
            <span className="block h-[2px] w-2/3 bg-white group-hover:bg-[#ae7aff]"></span>
            <span className="block h-[2px] w-full bg-white group-hover:bg-[#ae7aff]"></span>
          </Button>
          <div className="fixed inset-y-0 right-0 flex w-full max-w-xs shrink-0 translate-x-full flex-col border-l border-white bg-[#121212] duration-200 hover:translate-x-0 peer-focus:translate-x-0 sm:static sm:ml-4 sm:w-auto sm:translate-x-0 sm:border-none">
            {navBar && (
              <div>
                <div className="relative flex w-full items-center justify-between border-b border-white px-4 py-2 sm:hidden text-white">
                  <span className="inline-block w-12">
                    <LogoIcon />
                  </span>
                  <Button onClick={toggleNavBar} className="inline-block w-8">
                    <CancelButtonIcon />
                  </Button>
                </div>
                <ul className="my-4 flex w-full flex-wrap gap-2 px-4 sm:hidden text-white">
                  <li className="w-full">
                    <NavLink
                      to="/"
                      className={({ isActive }) =>
                        `flex w-full items-center justify-start ${
                          isActive
                            ? "bg-[#ae7aff] border-white"
                            : "bg-[#121212]"
                        } gap-x-4 border border-white px-4 py-1.5 text-left hover:bg-[#ae7aff] hover:text-black focus:border-[#ae7aff] focus:bg-[#ae7aff] focus:text-black`
                      }
                    >
                      <span className="inline-block w-full max-w-[20px] group-hover:mr-4 lg:mr-4">
                        <HomeIcon />
                      </span>
                      <span>Home</span>
                    </NavLink>
                  </li>
                  <li className="w-full">
                    <NavLink
                      to="/add-item"
                      className={({ isActive }) =>
                        `flex w-full items-center justify-start ${
                          isActive
                            ? "bg-[#ae7aff] border-white"
                            : "bg-[#121212]"
                        } gap-x-4 border border-white px-4 py-1.5 text-left hover:bg-[#ae7aff] hover:text-black focus:border-[#ae7aff] focus:bg-[#ae7aff] focus:text-black`
                      }
                    >
                      <span className="inline-block w-full max-w-[20px] group-hover:mr-4 lg:mr-4">
                        <PlusIcon />
                      </span>
                      <span>Add Item</span>
                    </NavLink>
                  </li>
                  <li className="w-full">
                    <NavLink
                      to="/found-item"
                      className={({ isActive }) =>
                        `flex w-full items-center justify-start ${
                          isActive
                            ? "bg-[#ae7aff] border-white"
                            : "bg-[#121212]"
                        } gap-x-4 border border-white px-4 py-1.5 text-left hover:bg-[#ae7aff] hover:text-black focus:border-[#ae7aff] focus:bg-[#ae7aff] focus:text-black`
                      }
                    >
                      <span className="inline-block w-full max-w-[20px] group-hover:mr-4 lg:mr-4">
                        <CollectionIcon />
                      </span>
                      <span>Found Item</span>
                    </NavLink>
                  </li>
                  <li className="w-full">
                    <NavLink
                      to="/user-lost-items"
                      className={({ isActive }) =>
                        `flex w-full items-center justify-start ${
                          isActive
                            ? "bg-[#ae7aff] border-white"
                            : "bg-[#121212]"
                        } gap-x-4 border border-white px-4 py-1.5 text-left hover:bg-[#ae7aff] hover:text-black focus:border-[#ae7aff] focus:bg-[#ae7aff] focus:text-black`
                      }
                    >
                      <span className="inline-block w-full max-w-[20px] group-hover:mr-4 lg:mr-4">
                        <CollectionIcon />
                      </span>
                      <span>Your lost Items</span>
                    </NavLink>
                  </li>
                  <li className="w-full">
                    <NavLink
                      to="/user-found-items"
                      className={({ isActive }) =>
                        `flex w-full items-center justify-start ${
                          isActive
                            ? "bg-[#ae7aff] border-white"
                            : "bg-[#121212]"
                        } gap-x-4 border border-white px-4 py-1.5 text-left hover:bg-[#ae7aff] hover:text-black focus:border-[#ae7aff] focus:bg-[#ae7aff] focus:text-black`
                      }
                    >
                      <span className="inline-block w-full max-w-[20px] group-hover:mr-4 lg:mr-4">
                        <CollectionIcon />
                      </span>
                      <span>Your found Items</span>
                    </NavLink>
                  </li>
                </ul>
                <div className="mb-8 mt-auto  flex w-full flex-wrap gap-4 px-4 sm:mb-0 sm:mt-0 sm:items-center sm:px-0">
                  <AuthButtons />
                </div>
              </div>
            )}
          </div>
        </nav>
      </header>
    </>
  );
}

export default Header;
