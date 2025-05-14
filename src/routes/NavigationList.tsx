import {
  AnimationsIcon,
  AnimesIcon,
  MovieIcon,
  TrailerIcon,
  TvShowIcon,
} from "../assets/icons/MyIcons";

const RoutesList = {
  mainRoutes: [
    { title: "მთავარი", path: "/", icon: MovieIcon, mobile: true },
    { title: "ფილმები", path: "/movies", icon: MovieIcon },
    { title: "სერიალები", path: "/tv_shows", icon: TvShowIcon },
    { title: "ანიმაციები", path: "/animations", icon: AnimationsIcon },
    { title: "ანიმეები", path: "/animes", icon: AnimesIcon },
    { title: "თრეილერები", path: "/trailers", icon: TrailerIcon },
  ],
};
export default RoutesList;
