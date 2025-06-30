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
import { useEffect, useState } from "react";
import { fetchMovies } from "../../../api/ServerFunctions";
import { useParams, useSearchParams } from "react-router";
import { TSearchResponse } from "../search/Search";
import SearchPagination from "../../pages/search/components/SearchPagination";

export default function Movies({ type }: { type: number }) {
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
  const { data, isPending } = useQuery<TSearchResponse>({
    queryKey: ["movies", { filters, page: currentPage }, type],
    queryFn: () =>
      fetchMovies({
        types: JSON.stringify([type]),
        page: currentPage,
        ...filters,
      }),
  });

  const pages = data?.total_rows ? Math.ceil(data.total_rows / page_limit) : 1;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const [sortCard, setSortCard] = useState<"card" | "wide">("card");
  return (
    <main>
      <MetaTags type={type} filters={filters} data={data} />
      {/* <div className="bg-[rgb(17,_17,_17)] mobile:h-[200px] h-[100px] bg-[url('decorations/background.svg')] bg-no-repeat bg-cover bg-center w-full "></div> */}
      <RatedMovies
        title={"რჩეული " + getCategoryName(type)}
        image={getCategoryBg(type)}
        type={type}
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
          <div className="grid grid-cols-1 540:grid-cols-2  992:grid-cols-3  1250:grid-cols-4  1680:grid-cols-5 gap-4 py-5 w-full place-items-center">
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
    </main>
  );
}
// Utility function to get category name from type
const getCategoryName = (type: number): string => {
  switch (type) {
    case 0:
      return "ფილმები";
    case 1:
      return "სერიალები";
    case 2:
      return "ანიმაციები";
    case 3:
      return "ანიმეები";
    default:
      return "ფილმები";
  }
};
const getCategoryBg = (type: number): string => {
  switch (type) {
    case 0:
      return "decorations/moviesRated.webp";
    case 1:
      return "decorations/tvShowsRated.webp";
    case 2:
      return "decorations/animationsRated.webp";
    case 3:
      return "decorations/animesRated.webp";
    default:
      return "decorations/moviesRated.webp";
  }
};

// SEO MetaTags Component
function MetaTags({
  type,
  filters,
  data,
}: {
  type: number;
  filters: any;
  data?: TSearchResponse;
}) {
  const categoryName = getCategoryName(type);

  // Get currently active filters for title enhancement
  const activeFilters = Object.entries(filters)
    .filter(([key, value]) => value && key !== "page")
    .map(([_, value]) => `${value}`)
    .join(", ");

  // Base title and descriptions
  let seo_title = `${categoryName} ქართულად - MyMovies`;
  let seo_desc = `უყურე ${categoryName
    .toLowerCase()
    .slice(0, -1)}ს ქართულად MyMovies-ზე | `;

  // Add filter info if present
  if (activeFilters) {
    seo_title = `${categoryName} - ${activeFilters} ქართულად - MyMovies`;
    seo_desc += `${activeFilters}, `;
  }

  // Add total results if available
  if (data?.total_rows) {
    seo_desc += `${data.total_rows} ${categoryName.toLowerCase()} | `;
  }

  // Complete description with general site info
  seo_desc += "ფილმები ქართულად | Filmebi Qartulad | Serialebi Qartulad";

  // Optimize lengths
  if (seo_title.length >= 60) {
    seo_title = `${categoryName} ქართულად - MyMovies`;
  }
  if (seo_desc.length >= 160) {
    seo_desc = seo_desc.slice(0, 159);
  }

  // Current URL
  const url = window.location.href;

  // Keywords based on type and filters
  const keywords = `${categoryName} ქართულად, ${activeFilters}, MyMovies, ფილმები ქართულად, ${categoryName.toLowerCase()} ქართულად`;

  // Schema.org data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
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
