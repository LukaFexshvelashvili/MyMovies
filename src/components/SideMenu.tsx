import { useState } from "react";
import { Link } from "react-router";
import RoutesList from "../routes/NavigationList";
import { genres } from "../api/themes";
import useUser from "../app/store/useUser";
import useOverlayStore from "../app/store/useOverlay";

export default function SideMenu(props: {
  active: boolean;
  closeSideMenu: Function;
}) {
  const [activeLink, setActiveLink] = useState<string>("მთავარი");
  const { user } = useUser();
  const { setAuthOverlay } = useOverlayStore();

  return (
    <div
      className={`fixed h-full w-full top-navHeight z-50 transition-all duration-300 ${
        props.active ? "visible opacity-1000" : "invisible opacity-0"
      }`}
    >
      <div
        className={`flex flex-col h-[calc(100dvh-54px)] w-[300px] bg-sidebarBg relative z-10 case_up duration-250 transition-transform ${
          props.active ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col py-5">
          <p className="px-5  text-textDesc tracking-wide text-[14px] ">
            სარჩევი
          </p>
          <div className="flex flex-col py-2 ">
            {RoutesList.mainRoutes.map((route) =>
              !route.mobile ? (
                <SideBarButton
                  key={route.title}
                  title={route.title}
                  icon={
                    <route.icon className="text-textDesc h-3.5 aspect-square group-hover:text-white" />
                  }
                  link={route.path}
                  setActive={setActiveLink}
                  active={activeLink}
                />
              ) : null
            )}
          </div>
        </div>
        <div className="w-full min-h-[2px] bg-[rgba(255,255,255,0.05)]"></div>
        <div className=" flex-col py-5 mobile:flex max-h-[calc(100vh-54px)] overflow-y-auto custom_scrollbar">
          <p className="px-5  text-textDesc tracking-wide text-[14px]">
            ჟანრები
          </p>
          <div className="flex flex-col py-2">
            {genres.map((genre) => (
              <SideBarButton
                key={genre.title}
                title={genre.title}
                link={`/search/a?genres=%5B"${genre.title}"%5D`}
                setActive={setActiveLink}
                active={activeLink}
              />
            ))}
          </div>
        </div>
        <div className="flex w-full justify-center mobile:hidden mt-auto py-5">
          {!user?.id ? (
            <button
              onClick={() => setAuthOverlay(true)}
              className="ml-3 h-[36px] w-[170px] text-[15px] text-textHead bg-main cursor-pointer hover:bg-mainHover"
            >
              ავტორიზაცია
            </button>
          ) : (
            <Link
              to={`/logout?returnTo=${encodeURIComponent(
                window.location.href
              )}`}
              className="ml-3 h-[36px] w-[170px] text-[15px] text-textHead bg-main cursor-pointer hover:bg-mainHover flex justify-center items-center"
            >
              გასვლა
            </Link>
          )}
        </div>
      </div>
      <div
        className={`h-full w-full bg-[rgba(0,0,0,0.4)] transition-opacity ${
          props.active ? "opacity-100" : "opacity-0"
        } absolute top-0 left-0`}
        onClick={() => props.closeSideMenu()}
      ></div>
    </div>
  );
}

type TSideBarButton = {
  active: string;
  setActive: React.Dispatch<React.SetStateAction<string>>;
  title: string;
  icon?: React.ReactNode;
  link: string;
};

function SideBarButton({
  title,
  icon,
  link,
  setActive,
  active,
}: TSideBarButton) {
  return (
    <Link
      to={link}
      onClick={() => setActive(title)}
      className={`h-[44px] mobile:h-[42px] w-full flex items-center  font-mainMedium tracking-wider text-[15px] mobile:text-[15px] cursor-pointer group side_line ${
        title == active
      } text-sidebarText hover:before:bg-main`}
    >
      {icon && (
        <div className="ml-5 h-[28px] aspect-square rounded-[20px] bg-[#2B2B2B] group-hover:bg-main transition-colors duration-100 flex justify-center items-center ">
          {icon}
        </div>
      )}
      <p
        className={`${
          icon ? "px-4" : "px-7"
        } group-hover:text-main transition-colors duration-100`}
      >
        {title}
      </p>
    </Link>
  );
}
