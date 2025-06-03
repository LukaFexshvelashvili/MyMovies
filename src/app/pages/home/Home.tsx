import { Link } from "react-router";
import {
  AnimationsIcon,
  AnimesIcon,
  ContinueWatchIcon,
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

// SEO MetaTags Component
function MetaTags({ data }: { data?: THomeList }) {
  // Base title and description
  const seo_title = "MYMOVIES | ფილმები ქართულად | Filmebi Qartulad";
  const seo_title2 = "ფილმები ქართულად | Filmebi Qartulad | MyMovies";

  const seo_desc =
    "უყურე ფილმებს, სერიალებს და ანიმეებს ქართულად MyMovies-ზე | ფილმები ქართულად, სერიალები ქართულად, ანიმეები ქართულად | Filmebi Qartulad | Serialebi Qartulad ";

  // Keywords based on available content
  const keywords =
    "ფილმები ქართულად, სერიალები ქართულად, ანიმეები ქართულად, " +
    "filmebi qartulad, serialebi qartulad, animebi qartulad, MyMovies";

  // Current URL
  const url = window.location.href;

  // Schema.org data for movie website
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": url,
    url: url,
    name: "MyMovies",
    description: seo_desc,
    potentialAction: {
      "@type": "SearchAction",
      target: "https://mymovies.cc/search/{search_term_string}",
      "query-input": "required name=search_term_string",
    },
    // Adding latest movies as ItemList
    about: {
      "@type": "ItemList",
      itemListElement:
        data?.news?.slice(0, 10).map((movie: TMovieCard, index: number) => ({
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
    },
  };

  return (
    <>
      <title>{seo_title}</title>
      <meta name="title" content={seo_title2} />
      <meta name="description" content={seo_desc} />
      <meta name="keywords" content={keywords} />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={url} />
      <link
        rel="icon"
        type="image/png"
        href="/assets/meta/icon.png"
        sizes="512x512"
      />
      <link rel="apple-touch-icon" href="/assets/meta/icon.png" />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={seo_title} />
      <meta property="og:description" content={seo_desc} />
      <meta property="og:url" content={url} />
      <meta property="og:locale" content="ka_GE" />
      <meta property="og:site_name" content="mymovies" />
      <meta
        property="og:image"
        content={data?.main_slider?.[0]?.poster_url || "/assets/meta/icon.png"}
      />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seo_title} />
      <meta name="twitter:description" content={seo_desc} />
      <meta
        name="twitter:image"
        content={data?.main_slider?.[0]?.poster_url || "/assets/meta/icon.png"}
      />

      {/* JSON-LD */}
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
    </>
  );
}

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
      <MetaTags data={moviesList} />
      <main>
        <h1 className="hidden">
          ფილმები ქართულად | Filmebi Qartulad | Serialebi Qartulad | Animeebi
          Qartulad | MyMovies
        </h1>
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
          className="bg-[rgb(17,_17,_17)] mobile:py-10 py-5 bg-[url('/decorations/animesBg.webp')] bg-no-repeat bg-cover bg-center"
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
          className="bg-[rgb(17,_17,_17)] mobile:py-10 py-5 bg-[url('/decorations/tvShowsBg.webp')] bg-no-repeat bg-cover bg-center"
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
          className="bg-[rgb(17,_17,_17)] mobile:py-10 py-5 bg-[url('/decorations/animationsBg.webp')] bg-no-repeat bg-cover bg-center"
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
              <div className="relative max-mobile:w-full" key={movie.id}>
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
