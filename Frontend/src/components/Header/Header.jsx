import React from "react";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();

  const navItems = [
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
    <>
      <header className="sticky inset-x-0 top-0 z-50 w-full border-b border-white bg-[#121212] px-4">
        <nav className="mx-auto flex max-w-7xl items-center py-2">
          <div className="mr-4 w-12 shrink-0 sm:w-16">
            <LogoIcon />
          </div>
          <div className="relative mx-auto hidden w-full max-w-md overflow-hidden sm:block"></div>
          <Button className="group peer ml-auto flex w-6 shrink-0 flex-wrap gap-y-1.5 sm:hidden">
            <span className="block h-[2px] w-full bg-white group-hover:bg-[#ae7aff]"></span>
            <span className="block h-[2px] w-2/3 bg-white group-hover:bg-[#ae7aff]"></span>
            <span className="block h-[2px] w-full bg-white group-hover:bg-[#ae7aff]"></span>
          </Button>
          <div className="fixed inset-y-0 right-0 flex w-full max-w-xs shrink-0 translate-x-full flex-col border-l border-white bg-[#121212] duration-200 hover:translate-x-0 peer-focus:translate-x-0 sm:static sm:ml-4 sm:w-auto sm:translate-x-0 sm:border-none">
            <div className="relative flex w-full items-center justify-between border-b border-white px-4 py-2 sm:hidden text-white">
              <span className="inline-block w-12">
                <LogoIcon />
              </span>
              <Button className="inline-block w-8">
                <CancelButtonIcon />
              </Button>
            </div>
            <ul className="my-4 flex w-full flex-wrap gap-2 px-4 sm:hidden text-white">
              {navItems.map((item) => (
                <li key={item.slug} className="w-full">
                  <Button
                    onClick={() => navigate(item.slug)}
                    className="flex w-full items-center justify-start gap-x-4 border border-white px-4 py-1.5 text-left hover:bg-[#ae7aff] hover:text-black focus:border-[#ae7aff] focus:bg-[#ae7aff] focus:text-black"
                  >
                    <span className="inline-block w-full max-w-[20px] group-hover:mr-4 lg:mr-4">
                      {item.svg}
                    </span>
                    <span>{item.name}</span>
                  </Button>
                </li>
              ))}
            </ul>
            <div className="mb-8 mt-auto  flex w-full flex-wrap gap-4 px-4 sm:mb-0 sm:mt-0 sm:items-center sm:px-0">
              <AuthButtons />
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}

export default Header;
