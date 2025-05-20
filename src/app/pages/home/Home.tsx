import { Link } from "react-router";
import {
  AnimationsIcon,
  AnimesIcon,
  ContinueWatchIcon,
  GenresIcon,
  NewsIcon,
  PlayIcon,
  PopularsIcon,
  TvShowIcon,
} from "../../../assets/icons/MyIcons";
import MovieCard, { MovieCardSkeleton } from "../../../components/MovieCard";
import MainSlider from "./components/MainSlider";
import MovieSlider from "../../../components/MovieSlider";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchMoviesList } from "../../../api/ServerFunctions";
import { TMovieCard } from "../../types/MovieTypes";
import { useWatchHistory } from "../../store/useWatchHistory";
import { useState } from "react";
import { useBreakpoint } from "../../hooks/useBreakpoint";
import SelectorSection from "./components/SelectorSection";

export type THomeList = {
  watch_history: TMovieCard[];
  news: TMovieCard[];
  populars: TMovieCard[];
  main_slider: TMovieCard[];
  movies: TMovieCard[];
  series: TMovieCard[];
  animations: TMovieCard[];
  animes: TMovieCard[];
};

export default function Home() {
  const queryClient = useQueryClient();
  const { history } = useWatchHistory();
  const { data: moviesList, isLoading } = useQuery<THomeList>({
    queryKey: ["moviesList"],
    queryFn: () => fetchMoviesList(history),
    staleTime: 1000000,
  });
  queryClient.setQueryData(["watch_history", 1], moviesList?.watch_history);
  return (
    <>
      <title>ფილმები ქართულად | Filmebi Qartulad | MyMovies</title>
      <main>
        <MainSlider />
        <SelectorSection />
        <div className="my_container my-10">
          <MovieSlider
            isLoading={isLoading}
            list={moviesList?.watch_history}
            icon={<ContinueWatchIcon />}
            title="განაგრძე ყურება"
          />
        </div>
        <div className="bg-[rgb(17,_17,_17)] mobile:py-10 py-5 bg-[url('/decorations/background.svg')] bg-no-repeat bg-cover bg-center">
          <div className="my_container">
            <MovieSlider
              isLoading={isLoading}
              list={moviesList?.news}
              clear_skeletons
              icon={<NewsIcon />}
              title="ახალი დამატებული"
            />
          </div>
        </div>
        <div className="my_container my-10">
          <PopularsSection
            isLoading={isLoading}
            icon={<PopularsIcon />}
            title="პოპულარული"
            list={moviesList?.populars ? moviesList.populars : []}
          />
        </div>
        <div
          className="bg-[rgb(17,_17,_17)] mobile:py-10 py-5 bg-[url('/decorations/animesBg.png')] bg-no-repeat bg-cover bg-center"
          style={{ "--color-main": "#E24456" } as React.CSSProperties}
        >
          <div className="my_container">
            <MovieSlider
              isLoading={isLoading}
              list={moviesList?.animes}
              clear_skeletons
              icon={<AnimesIcon />}
              title="ანიმეები"
              link="/animes"
            />
          </div>
        </div>
        <div className="my_container my-10">
          <MovieSlider
            isLoading={isLoading}
            list={moviesList?.news}
            icon={<PlayIcon className="h-4 " />}
            title="თრეილერები"
            link=""
          />
        </div>
        <div
          className="bg-[rgb(17,_17,_17)] mobile:py-10 py-5 bg-[url('/decorations/tvShowsBg.png')] bg-no-repeat bg-cover bg-center"
          style={{ "--color-main": "#1093cf" } as React.CSSProperties}
        >
          <div className="my_container">
            <MovieSlider
              isLoading={isLoading}
              list={moviesList?.series}
              clear_skeletons
              icon={<TvShowIcon />}
              title="სერიალები"
              link="/tv-shows"
            />
          </div>
        </div>
        <div
          className="bg-[rgb(17,_17,_17)] mobile:py-10 py-5 bg-[url('/decorations/animationsBg.png')] bg-no-repeat bg-cover bg-center"
          style={{ "--color-main": "#01b698" } as React.CSSProperties}
        >
          <div className="my_container">
            <MovieSlider
              isLoading={isLoading}
              list={moviesList?.animations}
              clear_skeletons
              icon={<AnimationsIcon />}
              title="ანიმაციები"
              link="/animations"
            />
          </div>
        </div>

        {/* <div className="my_loader"></div> */}
      </main>
    </>
  );
}

type TPopularsSection = {
  title: string;
  icon: React.ReactNode;
  link?: string;
  list: TMovieCard[];
  isLoading: boolean;
};
function PopularsSection({
  title,
  icon,
  link,
  list,
  isLoading,
}: TPopularsSection) {
  const [showAll, setShowAll] = useState(false);
  const isMobile = useBreakpoint(768);

  const visibleList = isMobile && !showAll ? list.slice(0, 3) : list;

  return (
    <>
      <div className="flex items-center gap-4 mb-6 case_up">
        <div className="flex items-center gap-3 case_up">
          <div className="mobile:h-8 h-8 aspect-square rounded-[20px] bg-main flex justify-center items-center p-[7px] text-white">
            {icon}
          </div>
          <p className="text-textHead font-mainMedium mobile:text-[17px] text-[15px] tracking-wider">
            {title}
          </p>
          {link && (
            <div className="flex items-center gap-2.5">
              <span className="text-textDesc">/</span>
              <Link
                to={link}
                className="text-textDesc font-mainMedium hover:text-main transition-colors"
              >
                ყველა
              </Link>
            </div>
          )}
        </div>
      </div>

      <div className="flex gap-5 overflow-x-hidden overflow-y-auto flex-wrap justify-between">
        {isLoading
          ? Array.from({ length: 10 }).map((_, i) => (
              <MovieCardSkeleton small key={i} />
            ))
          : visibleList.map((movie: TMovieCard, i: number) => (
              <div className="relative" key={movie.id}>
                <div className="absolute top-0 left-0 text-textHead text-lg font-mainRegular bg-navBg h-9 aspect-square justify-center items-center flex z-10 pointer-events-none select-none">
                  {i + 1}
                </div>
                <MovieCard small movie={movie} />
              </div>
            ))}
      </div>

      {!isLoading && isMobile && list.length > 5 && (
        <div className="mt-4 flex justify-center">
          <button
            onClick={() => setShowAll((prev) => !prev)}
            className="ml-3 h-[36px] w-[170px] text-[15px] text-textHead bg-main cursor-pointer hover:bg-mainHover flex justify-center items-center"
          >
            {showAll ? "ნაკლების ჩვენება" : "მეტის ნახვა"}
          </button>
        </div>
      )}
    </>
  );
}
