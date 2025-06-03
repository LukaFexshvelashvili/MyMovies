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
    { title: "სერიალები", path: "/tv-shows", icon: TvShowIcon },
    { title: "ანიმაციები", path: "/animations", icon: AnimationsIcon },
    { title: "ანიმეები", path: "/animes", icon: AnimesIcon },
    {
      title: "თრეილერები",
      path: `/search/?page=1&addons=%5B"თრეილერი"%5D`,
      icon: TrailerIcon,
    },
  ],
};
export default RoutesList;
