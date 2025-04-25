import axios from "axios";
import {
  DropDownIcon,
  SortHorizontalIcon,
  SortVerticalIcon,
} from "../../../assets/icons/MyIcons";
import Filters from "../../../components/Filters";
import MovieCard, {
  MovieCardSkeleton,
  MovieCardWide,
  MovieCardWideSkeleton,
} from "../../../components/MovieCard";
import { useQuery } from "@tanstack/react-query";
import { TMovieCard } from "../../types/MovieTypes";
import RatedMovies from "./components/RatedMovies";
import { useState } from "react";

const fetchMovies = async () => {
  const { data } = await axios.get("https://moviesgo.ge/server/getmovies.php");
  return data;
};
export default function Movies() {
  const { data, isPending } = useQuery({
    queryKey: ["movies"],
    queryFn: fetchMovies,
  });

  const [sortCard, setSortCard] = useState<"card" | "wide">("wide");
  return (
    <main>
      <div className="bg-[rgb(17,_17,_17)] h-[200px] bg-[url('decorations/background.svg')] bg-no-repeat bg-cover bg-center w-full"></div>
      <RatedMovies
        title="რჩეული ფილმები"
        image="decorations/movies.png"
        list={data}
      />
      <Filters />
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
          <div
            onClick={() => setSortCard("card")}
            className="h-5 aspect-square flex justify-center items-center cursor-pointer"
          >
            <SortHorizontalIcon
              className={`h-[15px] aspect-square  ${
                sortCard == "card"
                  ? "[&>path]:fill-main"
                  : "[&>path]:fill-lightBlack"
              }`}
            />
          </div>
          <div
            onClick={() => setSortCard("wide")}
            className="h-5 aspect-square flex justify-center items-center cursor-pointer"
          >
            <SortVerticalIcon
              className={`h-[15px] aspect-square ${
                sortCard == "wide"
                  ? "[&>path]:fill-main"
                  : "[&>path]:fill-lightBlack"
              }`}
            />
          </div>
        </div>
      </div>
      <div className="my_container">
        {!isPending || (
          <>
            <MovieCardWideSkeleton />
            <MovieCardWideSkeleton />
            <MovieCardWideSkeleton />
            <MovieCardWideSkeleton />
          </>
        )}
        {sortCard === "card" ? (
          <div className="flex gap-6 justify-between flex-wrap py-5">
            {data?.map((movie: TMovieCard) => (
              <MovieCard small key={movie.id} movie={movie} />
            ))}{" "}
          </div>
        ) : (
          <div className="flex flex-col py-5 divide-y divide-white/5">
            {data?.map((movie: TMovieCard) => (
              <MovieCardWide key={movie.id} movie={movie} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
