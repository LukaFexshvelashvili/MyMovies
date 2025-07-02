import { Link } from "react-router";
import RoutesList from "../routes/NavigationList";
import { CensoredContentIcon } from "../assets/icons/MyIcons";

export default function Footer() {
  return (
    <footer className="bg-[#111] pt-15 pb-2">
      <div className="my_container">
        <div className="flex items-start gap-10 max-992:flex-col  max-992:items-center">
          <div className="flex gap-5 items-center text-main font-mainMedium tracking-wider text-[26px] relative">
            <Link to="https://mymovies.cc/" className="cursor-pointer">
              MYMOVIES
            </Link>
          </div>
          <ul className="flex-1 flex flex-wrap">
            {RoutesList.mainRoutes.map((route, i) => (
              <li key={i} className=" min-w-1/3 max-992:min-w-2/4 h-[42px] ">
                <Link
                  key={i}
                  to={route.path}
                  className="inline-flex items-center gap-4  text-textDesc hover:text-textHead "
                >
                  <span className="h-[1px] w-1 bg-textDesc"></span>
                  {route.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="py-15 flex items-center gap-5 justify-center">
          <span className="h-[1px] w-50 bg-white/10 max-992:w-[20%]"></span>
          <Link
            to={"https://record.moviesgo.cc/?to=https://onservice.ge"}
            target="_blank"
            className="flex items-center gap-4 opacity-60 hover:opacity-80 "
            aria-label="OnService.ge - ციფრული სერვისები"
          >
            <img
              src="/decorations/onservice.png"
              alt="OnService.ge - ციფრული სერვისები"
              height={40}
              width={200}
            />
          </Link>
          <span className="h-[1px] w-50 bg-white/10 max-992:w-[20%]"></span>
        </div>
        <div className="border-t border-white/10 h-[80px] flex justify-between items-center px-5  max-992:flex-col  max-992:h-auto  max-992:py-5  max-992:gap-5">
          <CensoredContentIcon />
          <Link
            to={"https://moviesgo.ge/"}
            className="text-textDescDark2 hover:text-textDesc"
          >
            MOVIESGO.GE
          </Link>{" "}
          <Link
            to={"https://mymovies.cc/"}
            className="text-textDescDark2 hover:text-textDesc"
          >
            © MYMOVIES 2025
          </Link>
        </div>
      </div>
    </footer>
  );
}
