import {
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
import { fetchMovies } from "../../../api/ServerFunctions";
import { useParams, useSearchParams } from "react-router";
import { TSearchResponse } from "../search/Search";

export default function Movies() {
  const params = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState<object>({
    ...params,
    ...Object.fromEntries(searchParams),
  });
  const { data, isPending } = useQuery<TSearchResponse>({
    queryKey: ["movies", { filters }],
    queryFn: () => fetchMovies({ types: JSON.stringify([0]), ...filters }),
  });

  const [sortCard, setSortCard] = useState<"card" | "wide">("card");
  return (
    <main>
      <div className="bg-[rgb(17,_17,_17)] h-[200px] bg-[url('decorations/background.svg')] bg-no-repeat bg-cover bg-center w-full"></div>
      <RatedMovies
        title="რჩეული ფილმები"
        image="decorations/movies.png"
        type={0}
      />
      <Filters
        type_off
        initialFilters={filters}
        setFilters={(new_filters: object) => {
          setFilters(new_filters);
          setSearchParams(() => ({
            ...new_filters,
          }));
        }}
      />
      <div className="my_container flex justify-between items-center py-5">
        <div className="flex items-center gap-5">
          <p className="text-textDesc">{data?.total_rows} შედეგი</p>
          <div className="flex gap-2 flex-wrap"></div>
        </div>
        <div className="flex items-center gap-5">
          {/* <div className=" border border-white/5 text-textDescLight h-[36px] gap-2 flex items-center px-4 cursor-pointer hover:bg-white/5 transition-colors">
            დამატების თარიღით{" "}
            <DropDownIcon className="h-[12px] aspect-square " />
          </div> */}
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
        {isPending ? (
          sortCard == "card" ? (
            <div className="flex gap-6 flex-wrap">
              <MovieCardSkeleton mobile_full small />
              <MovieCardSkeleton mobile_full small />
              <MovieCardSkeleton mobile_full small />
              <MovieCardSkeleton mobile_full small />
              <MovieCardSkeleton mobile_full small />
            </div>
          ) : (
            <>
              <MovieCardWideSkeleton />
              <MovieCardWideSkeleton />
              <MovieCardWideSkeleton />
              <MovieCardWideSkeleton />
            </>
          )
        ) : null}
        {sortCard === "card" ? (
          <div className="flex gap-6 justify-between flex-wrap py-3">
            {data?.query.map((movie: TMovieCard) => (
              <MovieCard mobile_full small key={movie.id} movie={movie} />
            ))}{" "}
          </div>
        ) : (
          <div className="flex flex-col py-3 divide-y divide-white/5">
            {data?.query.map((movie: TMovieCard) => (
              <MovieCardWide key={movie.id} movie={movie} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
