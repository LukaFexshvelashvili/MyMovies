import { useState } from "react";
import {
  AnimationsIcon,
  AnimesIcon,
  GenresIcon,
  MovieIcon,
  TvShowIcon,
} from "../../../../assets/icons/MyIcons";
import MovieSlider from "../../../../components/MovieSlider";
import { fetchMoviesList } from "../../../../api/ServerFunctions";
import { useQuery } from "@tanstack/react-query";
import { THomeList } from "../Home";
import GenresSelector from "./GenresSelector";

export default function SelectorSection() {
  const [active, setActive] = useState(0);
  const { data: moviesList } = useQuery<THomeList>({
    queryKey: ["moviesList"],
    queryFn: () => fetchMoviesList(),
    staleTime: 1000000,
  });
  const lists = [
    { id: 0, title: "ჟანრები", icon: <GenresIcon /> },
    { id: 1, title: "ფილმები", icon: <MovieIcon className="h-4.5" /> },
    { id: 2, title: "სერიალები", icon: <TvShowIcon className="h-5" /> },
    { id: 3, title: "ანიმაციები", icon: <AnimationsIcon className="h-5" /> },
    { id: 4, title: "ანიმეები", icon: <AnimesIcon className="h-5" /> },
  ];
  return (
    <>
      <div className="bg-gradient-to-b from-[#111111] to-[#141414] w-full h-[105px] mobile:h-[120px] flex items-center overflow-x-auto py-5 custom_scrollbar no_mobile_scrollbar ">
        <div className="my_container flex items-center gap-5 h-full">
          {lists.map((list) => (
            <SelectorItem
              key={list.id}
              title={list.title}
              setActive={() => setActive(list.id)}
              active={list.id == active}
              icon={list.icon}
            />
          ))}
        </div>
      </div>
      <div className="my_container my-5">
        {active == 0 && <GenresSelector />}
        {active == 1 && (
          <MovieSlider
            isLoading={false}
            list={moviesList?.movies}
            clear_skeletons
            icon={<MovieIcon />}
            title="ფილმები"
            link="/movies"
          />
        )}
        {active == 2 && (
          <MovieSlider
            isLoading={false}
            list={moviesList?.series}
            clear_skeletons
            icon={<TvShowIcon />}
            title="სერიალები"
            link="/tv-shows"
          />
        )}
        {active == 3 && (
          <MovieSlider
            isLoading={false}
            list={moviesList?.animations}
            clear_skeletons
            icon={<AnimationsIcon />}
            title="ანიმაციები"
            link="/animations"
          />
        )}
        {active == 4 && (
          <MovieSlider
            isLoading={false}
            list={moviesList?.animes}
            clear_skeletons
            icon={<AnimesIcon />}
            title="ანიმეები"
            link="/animes"
          />
        )}
      </div>
    </>
  );
}
function SelectorItem({
  setActive,
  active,
  title,
  icon,
}: {
  setActive: Function;
  active: boolean;
  title: string;
  icon: any;
}) {
  return (
    <div
      className={`mobile:w-[300px] relative  ${
        active ? "bg-bodyBgDark arrow_after" : "bg-bodyBg hover:bg-bodyBgDark"
      } h-full flex justify-center items-center gap-3 cursor-pointer select-none  w-[220px] min-w-[220px]`}
      onClick={() => {
        setActive();
      }}
    >
      <div
        className={`h-7 aspect-square flex justify-center items-center rounded-[10px] ${
          active ? "text-main " : ""
        }`}
      >
        {icon}
      </div>
      <p>{title}</p>
    </div>
  );
}
