import { useState } from "react";
import SideMenu from "./SideMenu";
import { Link } from "react-router";

export default function Navbar() {
  const [showMenu, setShowMenu] = useState<boolean>(false);
  return (
    <>
      <header>
        <nav className="h-navHeight w-full bg-navBg sticky top-0 items-center flex ">
          <div className="my_container flex justify-between">
            <div className="flex gap-5 items-center text-main font-mainMedium tracking-wider text-[20px]">
              <div
                className=" h-[16px] w-[22px] flex flex-col justify-between cursor-pointer"
                onClick={() => setShowMenu((prev) => !prev)}
              >
                <div className="w-full h-[2px] bg-[#686868]"></div>
                <div className="w-full h-[2px] bg-[#686868]"></div>
                <div className="w-full h-[2px] bg-[#686868]"></div>
              </div>
              <Link to="/" className="cursor-pointer">
                MYMOVIES
              </Link>
            </div>
            <div className="flex gap-4 w-[48%]">
              <div className=" w-full">
                <input
                  type="text"
                  className="h-[36px] bg-[#333333] border-2 border-[#3d3d3d] w-full placeholder:text-[#757575]"
                  placeholder="ძიება"
                />
              </div>
            </div>
            <div className="flex gap-4 items-center">ACTIONS</div>
          </div>
        </nav>
      </header>
      {showMenu && <SideMenu />}
    </>
  );
}
