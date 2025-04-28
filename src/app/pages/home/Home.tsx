import { Link } from "react-router";
import {
  AnimationsIcon,
  AnimesIcon,
  ContinueWatchIcon,
  NewsIcon,
  PlayIcon,
  PopularsIcon,
} from "../../../assets/icons/MyIcons";
import MovieCard, { MovieCardSkeleton } from "../../../components/MovieCard";
import MainSlider from "./components/MainSlider";
import MovieSlider from "../../../components/MovieSlider";
import { useQuery } from "@tanstack/react-query";
import { fetchMoviesList } from "../../../api/ServerFunctions";
import { TMovieCard } from "../../types/MovieTypes";
import { useWatchHistory } from "../../store/useWatchHistory";

export type THomeList = {
  watch_history: TMovieCard[];
  news: TMovieCard[];
  main_slider: TMovieCard[];
  movies: TMovieCard[];
  series: TMovieCard[];
  animations: TMovieCard[];
  animes: TMovieCard[];
};

export default function Home() {
  const { history } = useWatchHistory();
  const {
    data: moviesList,
    isLoading,
    error,
  } = useQuery<THomeList>({
    queryKey: ["moviesList"],
    queryFn: () => fetchMoviesList(history),
    staleTime: 1000000,
  });
  return (
    <main>
      <MainSlider />
      <div className="my_container my-10">
        <MovieSlider
          isLoading={isLoading}
          list={moviesList?.watch_history}
          icon={<ContinueWatchIcon />}
          title="განაგრძე ყურება"
          link=""
        />
      </div>
      <div className="bg-[rgb(17,_17,_17)] py-10 bg-[url('decorations/background.svg')] bg-no-repeat bg-cover bg-center">
        <div className="my_container">
          <MovieSlider
            isLoading={isLoading}
            list={moviesList?.news}
            clear_skeletons
            icon={<NewsIcon />}
            title="ახალი დამატებული"
            link=""
          />
        </div>
      </div>
      <div className="my_container my-10">
        <PopularsSection
          isLoading={isLoading}
          icon={<PopularsIcon />}
          title="პოპულარული"
          link=""
          list={moviesList?.news ? moviesList.news : []}
        />
      </div>
      <div
        className="bg-[rgb(17,_17,_17)] py-10 bg-[url('decorations/animesBg.png')] bg-no-repeat bg-cover bg-center"
        style={{ "--color-main": "#E24456" } as React.CSSProperties}
      >
        <div className="my_container">
          <MovieSlider
            isLoading={isLoading}
            list={moviesList?.animes}
            clear_skeletons
            icon={<AnimesIcon />}
            title="ანიმეები"
            link=""
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
        className="bg-[rgb(17,_17,_17)] py-10 bg-[url('decorations/tvShowsBg.png')] bg-no-repeat bg-cover bg-center"
        style={{ "--color-main": "#1093cf" } as React.CSSProperties}
      >
        <div className="my_container">
          <MovieSlider
            isLoading={isLoading}
            list={moviesList?.series}
            clear_skeletons
            icon={<AnimationsIcon />}
            title="სერიალები"
            link=""
          />
        </div>
      </div>
      <div
        className="bg-[rgb(17,_17,_17)] py-10 bg-[url('decorations/animationsBg.png')] bg-no-repeat bg-cover bg-center"
        style={{ "--color-main": "#01b698" } as React.CSSProperties}
      >
        <div className="my_container">
          <MovieSlider
            isLoading={isLoading}
            list={moviesList?.animations}
            clear_skeletons
            icon={<AnimationsIcon />}
            title="ანიმაციები"
            link=""
          />
        </div>
      </div>

      {/* <div className="my_loader"></div> */}
    </main>
  );
}

type TPopularsSection = {
  title: string;
  icon: React.ReactNode;
  link: string;
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
  return (
    <>
      <div className="flex items-center gap-4 mb-6 case_up">
        <div className="flex items-center gap-3 case_up">
          <div
            className={`h-8 aspect-square rounded-[20px] bg-main flex justify-center items-center p-1.5`}
          >
            {icon}
          </div>
          <p className="text-textHead font-mainMedium  text-[17px] tracking-wider">
            {title}
          </p>
          <div className="flex items-center gap-2.5">
            <span className="text-textDesc">/</span>
            <Link
              to={link}
              className="text-textDesc font-mainMedium  hover:text-main transition-colors"
            >
              ყველა
            </Link>
          </div>
        </div>
      </div>
      <div className="flex gap-5 overflow-x-hidden overflow-y-auto flex-wrap justify-between">
        {isLoading ? (
          <>
            <MovieCardSkeleton small />
            <MovieCardSkeleton small />
            <MovieCardSkeleton small />
            <MovieCardSkeleton small />
            <MovieCardSkeleton small />
            <MovieCardSkeleton small />
            <MovieCardSkeleton small />
            <MovieCardSkeleton small />
            <MovieCardSkeleton small />
            <MovieCardSkeleton small />
          </>
        ) : (
          list.map((movie: TMovieCard) => <MovieCard small movie={movie} />)
        )}
      </div>
    </>
  );
}
