import { useParams, useSearchParams } from "react-router";
import Filters from "../../../components/Filters";
import { TMovieCard } from "../../types/MovieTypes";
import { useQuery } from "@tanstack/react-query";
import { fetchSearch } from "../../../api/ServerFunctions";
import MovieCard, {
  MovieCardSkeleton,
  MovieCardWide,
} from "../../../components/MovieCard";
import { useEffect, useState } from "react";
import SearchPagination from "./components/SearchPagination";
import {
  SortHorizontalIcon,
  SortVerticalIcon,
} from "../../../assets/icons/MyIcons";

export type TSearchResponse = { total_rows: number; query: TMovieCard[] };
export default function Search() {
  const params = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState<object>({
    ...params,
    ...Object.fromEntries(searchParams),
  });
  const [currentPage, setCurrentPage] = useState<number>(
    searchParams.get("page") ? parseInt(searchParams.get("page")!) : 1
  );

  const page_limit = 32;
  const { data: moviesList, isLoading } = useQuery<TSearchResponse>({
    queryKey: [
      "search",
      { query: params.search_query, page: currentPage, filters },
    ],
    queryFn: () =>
      fetchSearch({
        query: params.search_query,
        page: currentPage,
        ...filters,
      }),
    staleTime: 1000000,
  });

  let pages = moviesList?.total_rows
    ? Math.ceil(moviesList?.total_rows / page_limit)
    : 1;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const [sortCard, setSortCard] = useState<"card" | "wide">("card");

  return (
    <main>
      <section>
        <Filters
          initialFilters={filters}
          setFilters={(new_filters: object) => {
            setFilters(new_filters);
            setCurrentPage(1);
            setSearchParams(() => ({
              page: "1",
              ...new_filters,
            }));
          }}
        />
        <div className="my_container my-5 flex justify-between">
          <h1 className="text-textDesc">
            ძიება - {params.search_query} | ნაპოვნია: {moviesList?.total_rows}
          </h1>
          <div className="flex items-center gap-5">
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
      </section>
      <section>
        <div className="my_container">
          <div className="flex gap-4 justify-between w-full flex-wrap">
            {isLoading ? (
              <>
                <MovieCardSkeleton />
                <MovieCardSkeleton />
                <MovieCardSkeleton />
                <MovieCardSkeleton />
                <MovieCardSkeleton />
                <MovieCardSkeleton />
                <MovieCardSkeleton />
                <MovieCardSkeleton />
                <MovieCardSkeleton />
                <MovieCardSkeleton />
                <MovieCardSkeleton />
                <MovieCardSkeleton />
              </>
            ) : sortCard === "card" ? (
              <div className="flex gap-6 justify-between flex-wrap py-5">
                {moviesList?.query.map((movie: TMovieCard) => (
                  <MovieCard key={movie.id} movie={movie} />
                ))}{" "}
              </div>
            ) : (
              <div className="flex flex-col py-5 divide-y divide-white/5">
                {moviesList?.query.map((movie: TMovieCard) => (
                  <MovieCardWide key={movie.id} movie={movie} />
                ))}
              </div>
            )}
          </div>
          <SearchPagination
            setSearchParams={(new_params) =>
              setSearchParams((old_params) => ({
                ...Object.fromEntries(old_params), // convert to object first
                ...new_params,
              }))
            }
            setCurrentPage={setCurrentPage}
            pages={pages}
            currentPage={currentPage}
          />
        </div>
      </section>
    </main>
  );
}
