import { useState } from "react";
import { Link } from "react-router";
import RoutesList from "../routes/NavigationList";

export default function SideMenu(props: {
  active: boolean;
  closeSideMenu: Function;
}) {
  const [activeLink, setActiveLink] = useState<string>("მთავარი");

  return (
    <div
      className={`fixed h-full w-full top-navHeight z-50 transition-all duration-300 ${
        props.active ? "visible opacity-1000" : "invisible opacity-0"
      }`}
    >
      <div
        className={`h-full w-[300px] bg-sidebarBg relative z-10 case_up duration-250 transition-transform ${
          props.active ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col py-5">
          <p className="px-5  text-textDesc tracking-wide text-[14px]">
            სარჩევი
          </p>
          <div className="flex flex-col py-2">
            {RoutesList.mainRoutes.map((route) => (
              <SideBarButton
                key={route.title}
                title={route.title}
                icon={<></>}
                link={route.path}
                setActive={setActiveLink}
                active={activeLink}
              />
            ))}
          </div>
        </div>
        <div className="w-full h-[2px] bg-[rgba(255,255,255,0.05)]"></div>
        <div className="flex flex-col py-5">
          <p className="px-5  text-textDesc tracking-wide text-[14px]">
            ჟანრები
          </p>
          <div className="flex flex-col py-2">
            {RoutesList.mainRoutes.map((route) => (
              <SideBarButton
                key={route.title}
                title={route.title}
                link={route.path}
                setActive={setActiveLink}
                active={activeLink}
              />
            ))}
          </div>
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
      className={`h-[40px] w-full flex items-center  font-mainMedium tracking-wider text-[14px] cursor-pointer group side_line ${
        title == active
      } text-sidebarText hover:before:bg-main`}
    >
      {icon && (
        <div className="ml-5 h-[24px] aspect-square rounded-[20px] bg-[#2B2B2B] group-hover:bg-main transition-colors duration-100 ">
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
