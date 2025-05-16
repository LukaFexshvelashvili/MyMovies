import { useQuery } from "@tanstack/react-query";

import MovieComments from "./components/MovieComments";

import { useParams } from "react-router";
import { fetchMovie } from "../../../api/ServerFunctions";

import { TMovie, TMovieCard } from "../../types/MovieTypes";
import { useEffectSkipFirst } from "../../hooks/useEffectSkipFirst";
import { useWatchHistory } from "../../store/useWatchHistory";
import { decodeHtmlEntities } from "../../hooks/Customs";
import SimilarMovies from "./components/SimilarMovies";
import MoviePlayer from "./components/MoviePlayer";
import MovieSettings from "./components/MovieSettings";
import MovieInformation from "./components/MovieInformation";
import { useEffect, useState } from "react";

export default function Watch() {
  const { addToHistory } = useWatchHistory();
  const [activeOption, setActiveOption] = useState(-1);
  const { id } = useParams();
  const { data, isLoading } = useQuery<{
    movie: TMovie;
    similar_movies: TMovieCard[];
  }>({
    queryKey: ["movie", id],
    queryFn: () => fetchMovie(id ? parseInt(id) : 0),
    staleTime: 300000,
    refetchOnWindowFocus: false,
  });
  useEffectSkipFirst(() => {
    if (!id) return;
    setActiveOption(-1);
    const WatchTimeout = setTimeout(() => {
      addToHistory(id);
    }, 10000);

    return () => {
      clearTimeout(WatchTimeout);
    };
  }, [id]);

  // const genres = data?.movie.genres ? JSON.parse(data.movie.genres) : [];
  useEffect(() => {
    if (window.scrollY > 450) {
      window.scrollTo(0, 200);
    }
  }, [activeOption]);

  const optionList = [
    { id: 0, title: "ინფორმაცია" },
    { id: 1, title: "მსგავსი" },
    { id: 2, title: "კომენტარები" },
  ];

  return (
    <>
      <MetaHeaders movie={data?.movie} />
      <main className="pb-20">
        <div className="mobile:h-[160px] h-auto  w-full bg-[#0E0101] flex justify-center">
          <img
            src="/decorations/movieBanner.png"
            role="decorative"
            alt=""
            className="max-w-full"
          />
        </div>
        <section className="mobile:mt-6 mt-0  overflow-x-hidden ">
          <div className="my_container max-mobile:!p-0">
            <MoviePlayer />
            <div className="px-3">
              <div className="mobile:hidden mobile_info mt-4">
                <div className="flex flex-col gap-1 tracking-wider  mobile:hidden">
                  <MovieSkeletonSection
                    isLoading={isLoading}
                    placeholder="Garfield"
                    show={
                      <h1
                        className={`text-[17px] font-robotoGeoCaps tracking-wider text-textHead`}
                      >
                        {decodeHtmlEntities(
                          data?.movie.name ? data.movie.name : ""
                        )}
                      </h1>
                    }
                  />
                  <MovieSkeletonSection
                    isLoading={isLoading}
                    placeholder="Garfield 202"
                    show={
                      <h2 className="text-textDesc uppercase text-[14px]">
                        {decodeHtmlEntities(
                          data?.movie.name_eng
                            ? data.movie.name_eng + ` (${data.movie.year})`
                            : ""
                        )}
                      </h2>
                    }
                  />
                </div>
              </div>
              <MovieSettings
                id={id ? id : -1}
                movie={data?.movie}
                isLoading={isLoading}
              />
            </div>
          </div>
        </section>
        <div className="mobile:hidden flex w-full overflow-x-auto bg-navBg h-[40px] sticky top-[98px] z-10 no_scrollbar">
          {optionList.map((option) => (
            <button
              onClick={() => setActiveOption(option.id)}
              className={`px-7 text-textHead2 text-[15px] flex-1 h-full shrink-0  transition-all ${
                activeOption == option.id
                  ? "border-t-2 border-main text-main bg-bodyBg"
                  : option.id == 0 && activeOption == -1
                  ? "border-t-2 border-main text-main bg-bodyBg"
                  : "border-t-2 bg-navBg border-white/5"
              } `}
            >
              {option.title}
            </button>
          ))}
        </div>
        <MovieInformation
          isActive={activeOption == 0 || activeOption == -1}
          movie={data?.movie}
          isLoading={isLoading}
        />
        <SimilarMovies
          isActive={activeOption == 1}
          isLoading={isLoading}
          list={data?.similar_movies ? data.similar_movies : []}
        />
        <MovieComments isActive={activeOption == 2} movie_id={id ? id : ""} />
      </main>
    </>
  );
}

export function MovieSkeletonSection(props: {
  isLoading: boolean;
  placeholder: string;
  show: React.JSX.Element;
}) {
  return (
    <>
      {props.isLoading ? (
        <span
          className={`text-[22px]  leading-7 h-full tracking-normal font-blockfont animate-pulse text-textDescDark2`}
        >
          {props.placeholder}
        </span>
      ) : (
        props.show
      )}
    </>
  );
}
function MetaHeaders({ movie }: { movie: TMovie | undefined }) {
  if (!movie) return;
  const getMovieSchemaType = (type: number): "Movie" | "TVSeries" => {
    return [1, 3].includes(type) ? "TVSeries" : "Movie";
  };

  const fullTitle = `${movie.name} ქართულად / ${movie.name_eng} Qartulad - MyMovies`;
  const description = `${movie.name_eng} (${
    movie.year
  }) ქართულად - ${movie.description.slice(0, 150)}...`;
  const keywords = `${movie.name} ქართულად, ${movie.name_eng}, MyMovies - ${movie.name}`;
  const url = `https://mymovies.cc/watch/${movie.id}-${movie.name_eng.replace(
    /\s+/g,
    "-"
  )}`;
  const image = "https://cdn.moviesgo.ge/" + movie.thumbnail_url;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": getMovieSchemaType(movie.type),
    "@id": url,
    url: url,
    name: movie.name_eng,
    description: movie.description,
    image: movie.poster_url || "",
    thumbnailUrl: movie.thumbnail_url || "",
    genre: movie.genres?.split(",").map((g) => g.trim()) || [],
    datePublished: movie.year,
    director: [
      {
        "@type": "Person",
        name: movie.creator,
      },
    ],
  };

  return (
    <>
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
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
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:locale" content="ka_GE" />
      <meta property="og:site_name" content="mymovies" />

      {/* Twitter */}
      <meta name="twitter:card" content={image} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* JSON-LD */}
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
    </>
  );
}
