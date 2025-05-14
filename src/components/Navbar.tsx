import { useState } from "react";
import SideMenu from "./SideMenu";
import { Link, useLocation } from "react-router";
import QuickSearch from "./QuickSearch";
import { useEffectSkipFirst } from "../app/hooks/useEffectSkipFirst";
import { BookmarkIcon, ContinueWatchIcon } from "../assets/icons/MyIcons";
import useOverlayStore from "../app/store/useOverlay";
import useUser from "../app/store/useUser";
import RoutesList from "../routes/NavigationList";

export default function Navbar() {
  const { setHistoryOverlay, setBookmarksOverlay } = useOverlayStore();

  const { user } = useUser();
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [showSearch, setShowSearch] = useState<boolean>(false);
  const { setAuthOverlay } = useOverlayStore();
  const location = useLocation();
  useEffectSkipFirst(() => {
    setShowSearch(false);
    setShowMenu(false);
    setHistoryOverlay(false);
    setBookmarksOverlay(false);
  }, [location.pathname]);

  return (
    <>
      <header className=" sticky top-0 z-50">
        <nav className="h-navHeight w-full bg-navBg items-center flex ">
          <div className="my_container flex justify-between w-full ">
            <div className="flex gap-5 items-center text-main font-mainMedium tracking-wider text-[20px] relative">
              <div
                className=" h-[30px] w-[30px] p-1.5 flex flex-col justify-center items-center gap-1 cursor-pointer absolute mobile:relative mobile:left-auto left-1"
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
              <Link to="/" className="cursor-pointer hidden mobile:block">
                MYMOVIES
              </Link>
            </div>
            <div className="flex gap-4 mobile:w-[48%] w-full pr-3">
              <div className=" w-full">
                <input
                  type="text"
                  className="h-[36px] bg-[#333333] border-2 border-[#3d3d3d] w-full placeholder:text-[#757575] font-mainRegular mobile:!pl-3 !pl-10"
                  placeholder="ძიება"
                  onFocus={() => setShowSearch(true)}
                />
              </div>
            </div>
            <div className="flex gap-2 items-center">
              <div
                onClick={() => {
                  setHistoryOverlay(true);
                }}
                className="h-[32px] aspect-square rounded-[20px] flex justify-center items-center cursor-pointer bg-white/0 transition-colors hover:bg-white/10"
              >
                <ContinueWatchIcon height={18} className="text-icon" />
              </div>
              <div
                onClick={() => {
                  setBookmarksOverlay(true);
                }}
                className="h-[32px] aspect-square rounded-[20px] flex justify-center items-center cursor-pointer bg-white/0 transition-colors hover:bg-white/10"
              >
                <BookmarkIcon height={16} className="text-icon" />
              </div>
              <div className="hidden mobile:block">
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
          </div>
        </nav>
        <div className="mobile:hidden h-11 w-full bg-navBg border-t border-white/5">
          <div className="flex items-stretch w-full h-full overflow-x-scroll no_scrollbar">
            {RoutesList.mainRoutes.map((route) => (
              <Link
                to={route.path}
                className="px-3.5 h-full text-textDesc text-[15px]]"
              >
                <button className="h-full w-full">{route.title}</button>
              </Link>
            ))}
          </div>
        </div>
      </header>
      <SideMenu active={showMenu} closeSideMenu={() => setShowMenu(false)} />
      {showSearch && <QuickSearch hideSearch={() => setShowSearch(false)} />}
    </>
  );
}
