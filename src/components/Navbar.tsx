import { useState } from "react";
import SideMenu from "./SideMenu";
import { Link, useLocation } from "react-router";
import QuickSearch from "./QuickSearch";
import { useEffectSkipFirst } from "../app/hooks/useEffectSkipFirst";
import { BookmarkIcon, ContinueWatchIcon } from "../assets/icons/MyIcons";
import useOverlayStore from "../app/store/useOverlay";
import useUser from "../app/store/useUser";

export default function Navbar() {
  const { user } = useUser();
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [showSearch, setShowSearch] = useState<boolean>(false);
  const { setAuthOverlay } = useOverlayStore();
  const location = useLocation();
  useEffectSkipFirst(() => {
    setShowSearch(false);
    setShowMenu(false);
  }, [location.pathname]);

  return (
    <>
      <header className=" sticky top-0 z-50">
        <nav className="h-navHeight w-full bg-navBg items-center flex ">
          <div className="my_container flex justify-between">
            <div className="flex gap-5 items-center text-main font-mainMedium tracking-wider text-[20px]">
              <div
                className=" h-[22px] w-[22px] flex flex-col justify-center items-center gap-1 cursor-pointer"
                onClick={() => setShowMenu((prev) => !prev)}
              >
                <div
                  className={`w-full h-[2px] bg-[#686868] transition-transform ${
                    showMenu ? "translate-y-1.5 rotate-45" : ""
                  } `}
                ></div>
                <div
                  className={`w-full h-[2px] bg-[#686868] transition-opacity ${
                    showMenu ? "opacity-0" : ""
                  } `}
                ></div>
                <div
                  className={`w-full h-[2px] bg-[#686868] transition-transform ${
                    showMenu ? "-translate-y-1.5 -rotate-45" : ""
                  } `}
                ></div>
              </div>
              <Link to="/" className="cursor-pointer">
                MYMOVIES
              </Link>
            </div>
            <div className="flex gap-4 w-[48%]">
              <div className=" w-full">
                <input
                  type="text"
                  className="h-[36px] bg-[#333333] border-2 border-[#3d3d3d] w-full placeholder:text-[#757575] font-mainRegular"
                  placeholder="ძიება"
                  onFocus={() => setShowSearch(true)}
                />
              </div>
            </div>
            <div className="flex gap-2 items-center">
              <div
                onClick={() => {}}
                className="h-[32px] aspect-square rounded-[20px] flex justify-center items-center cursor-pointer bg-white/0 transition-colors hover:bg-white/10"
              >
                <ContinueWatchIcon height={16} className="text-icon" />
              </div>
              <div
                onClick={() => {}}
                className="h-[32px] aspect-square rounded-[20px] flex justify-center items-center cursor-pointer bg-white/0 transition-colors hover:bg-white/10"
              >
                <BookmarkIcon height={16} className="text-icon" />
              </div>
              {!user?.id ? (
                <button
                  onClick={() => setAuthOverlay(true)}
                  className="ml-3 flex-1 h-[34px] min-w-[150px] text-sm text-textHead bg-main cursor-pointer hover:bg-mainHover"
                >
                  ავტორიზაცია
                </button>
              ) : (
                <Link
                  to={`/logout?returnTo=${encodeURIComponent(
                    window.location.href
                  )}`}
                  className="ml-3 flex-1 h-[34px] min-w-[150px] text-sm text-textHead bg-main cursor-pointer hover:bg-mainHover flex justify-center items-center"
                >
                  გასვლა
                </Link>
              )}
            </div>
          </div>
        </nav>
      </header>
      <SideMenu active={showMenu} closeSideMenu={() => setShowMenu(false)} />
      {showSearch && <QuickSearch hideSearch={() => setShowSearch(false)} />}
    </>
  );
}
