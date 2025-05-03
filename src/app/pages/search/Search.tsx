import { useParams, useSearchParams } from "react-router";
import Filters from "../../../components/Filters";
import { TMovieCard } from "../../types/MovieTypes";
import { useQuery } from "@tanstack/react-query";
import { fetchSearch } from "../../../api/ServerFunctions";
import MovieCard, { MovieCardSkeleton } from "../../../components/MovieCard";
import { useEffect, useState } from "react";
import SearchPagination from "./components/SearchPagination";

type TSearchResponse = { total_rows: number; query: TMovieCard[] };
export default function Search() {
  const params = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState<number>(
    searchParams.get("page") ? parseInt(searchParams.get("page")!) : 1
  );

  const page_limit = 32;
  const { data: moviesList, isLoading } = useQuery<TSearchResponse>({
    queryKey: ["search", { query: params.search_query, page: currentPage }],
    queryFn: () =>
      fetchSearch({ query: params.search_query, page: currentPage }),
    staleTime: 1000000,
  });

  let pages = moviesList?.total_rows
    ? Math.ceil(moviesList?.total_rows / page_limit)
    : 1;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  return (
    <main>
      <section>
        <Filters />
        <div className="my_container my-5">
          <h1 className="text-textDesc">
            ძიება - {params.search_query} | ნაპოვნია: {moviesList?.total_rows}
          </h1>
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
            ) : (
              moviesList?.query.map((movie: TMovieCard) => (
                <MovieCard key={movie.id} movie={movie} />
              ))
            )}
          </div>
          <SearchPagination
            setSearchParams={setSearchParams}
            setCurrentPage={setCurrentPage}
            pages={pages}
            currentPage={currentPage}
          />
        </div>
      </section>
    </main>
  );
}
