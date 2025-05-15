import axios from "axios";
import {
  DropDownIcon,
  SortHorizontalIcon,
  SortVerticalIcon,
} from "../../../assets/icons/MyIcons";
// import Filters from "../../../components/Filters";
import { MovieCardWideSkeleton } from "../../../components/MovieCard";
import { useQuery } from "@tanstack/react-query";
import { TMovieCard } from "../../types/MovieTypes";
// import RatedMovies from "./components/RatedMovies";

const fetchTvShows = async () => {
  const { data } = await axios.get("https://moviesgo.ge/server/getmovies.php");
  return data;
};
export default function TvShows() {
  const { data, isPending } = useQuery({
    queryKey: ["TvShows"],
    queryFn: fetchTvShows,
  });

  return (
    <main>
      <div className="bg-[rgb(17,_17,_17)] h-[200px] bg-[url('decorations/background.svg')] bg-no-repeat bg-cover bg-center w-full"></div>
      {/* <RatedMovies
        title="რჩეული სერიალები"
        image="decorations/tvShowsRated.png"
      /> */}

      {/* <Filters /> */}
      <div className="my_container flex justify-between items-center py-5">
        <div className="flex items-center gap-5">
          <p className="text-textDesc">329 შედეგი</p>
          <div className="flex gap-2 flex-wrap"></div>
        </div>
        <div className="flex items-center gap-5">
          <div className=" border border-white/5 text-textDescLight h-[36px] gap-2 flex items-center px-4 cursor-pointer hover:bg-white/5 transition-colors">
            დამატების თარიღით{" "}
            <DropDownIcon className="h-[12px] aspect-square " />
          </div>
          <div className="h-5 aspect-square flex justify-center items-center cursor-pointer">
            <SortHorizontalIcon className="h-[15px] aspect-square [&>path]:fill-main" />
          </div>
          <div className="h-5 aspect-square flex justify-center items-center cursor-pointer">
            <SortVerticalIcon className="h-[15px] aspect-square [&>path]:fill-lightBlack" />
          </div>
        </div>
      </div>
      <div className="my_container">
        <div className="flex flex-col py-5 divide-y divide-white/5">
          {isPending || <MovieCardWideSkeleton />}
          {data?.map((movie: TMovieCard) => (
            <MovieCardWideSkeleton key={movie.id} />
            // <MovieCardWide key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    </main>
  );
}
