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

// SEO MetaTags Component
function MetaTags({
  searchQuery,
  data,
}: {
  searchQuery?: string;
  data?: TSearchResponse;
}) {
  // Get currently active filters for title enhancement

  // Base title and descriptions
  let seo_title = searchQuery
    ? `${searchQuery} - ძიების შედეგები MyMovies`
    : "ფილმების ძიება - MyMovies";

  let seo_desc = searchQuery
    ? `${searchQuery} - ${data?.total_rows || 0} შედეგი | `
    : "მოძებნე ფილმები, სერიალები ანიმაციები და ანიმეები ქართულად | MyMovies ";

  // Add filter info if present

  // Complete description with general site info
  seo_desc += "ფილმები ქართულად | Filmebi Qartulad | Serialebi Qartulad";

  // Optimize lengths
  if (seo_title.length >= 60) {
    seo_title = `${searchQuery} - ძიების შედეგები MyMovies`;
  }
  if (seo_desc.length >= 160) {
    seo_desc = seo_desc.slice(0, 159);
  }

  // Current URL
  const url = window.location.href;

  // Keywords based on search query and filters
  const keywords = `${searchQuery}, ${searchQuery} Qartulad, ${searchQuery} ქართულად, MyMovies, ფილმები ქართულად, ძიება`;

  // Schema.org data for search results
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SearchResultsPage",
    "@id": url,
    url: url,
    name: seo_title,
    description: seo_desc,
    numberOfItems: data?.total_rows || 0,
    itemListElement:
      data?.query?.map((movie: TMovieCard, index: number) => ({
        "@type": "Movie",
        "@id": `https://mymovies.cc/watch/${movie.id}`,
        position: index + 1,
        url: `https://mymovies.cc/watch/${movie.id}-${movie.name_eng.replace(
          /\s+/g,
          "-"
        )}`,
        name: movie.name,
        image: movie.poster_url,
        dateCreated: movie.year,
      })) || [],
  };

  return (
    <>
      <title>{seo_title}</title>
      <meta name="title" content={seo_title} />
      <meta name="description" content={seo_desc} />
      <meta name="keywords" content={keywords} />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={url} />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={seo_title} />
      <meta property="og:description" content={seo_desc} />
      <meta property="og:url" content={url} />
      <meta property="og:locale" content="ka_GE" />
      <meta property="og:site_name" content="mymovies" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={seo_title} />
      <meta name="twitter:description" content={seo_desc} />

      {/* JSON-LD */}
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
    </>
  );
}

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
      <MetaTags searchQuery={params.search_query} data={moviesList} />
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
                <MovieCardSkeleton mobile_full />
                <MovieCardSkeleton mobile_full />
                <MovieCardSkeleton mobile_full />
                <MovieCardSkeleton mobile_full />
                <MovieCardSkeleton mobile_full />
                <MovieCardSkeleton mobile_full />
                <MovieCardSkeleton mobile_full />
                <MovieCardSkeleton mobile_full />
                <MovieCardSkeleton mobile_full />
                <MovieCardSkeleton mobile_full />
                <MovieCardSkeleton mobile_full />
                <MovieCardSkeleton mobile_full />
              </>
            ) : sortCard === "card" ? (
              <div className="grid grid-cols-1 540:grid-cols-2  992:grid-cols-3  1250:grid-cols-4  1680:grid-cols-5 gap-4 py-5 w-full place-items-center">
                {moviesList?.query.map((movie: TMovieCard) => (
                  <MovieCard mobile_full small key={movie.id} movie={movie} />
                ))}
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
                ...Object.fromEntries(old_params),
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
