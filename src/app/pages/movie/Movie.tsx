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
import RateMovie from "./components/RateMovie";
import MovieSettings from "./components/MovieSettings";
import MovieDetails from "./components/MovieDetails";

export default function Movie() {
  const { addToHistory } = useWatchHistory();
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
    const WatchTimeout = setTimeout(() => {
      addToHistory(id);
    }, 10000);

    return () => {
      clearTimeout(WatchTimeout);
    };
  }, [id]);

  const addons = data?.movie.addons ? JSON.parse(data.movie.addons) : [];
  // const genres = data?.movie.genres ? JSON.parse(data.movie.genres) : [];

  return (
    <>
      <MetaHeaders movie={data?.movie} />
      <main className="pb-20 overflow-x-hidden">
        <div className="mobile:h-[160px] h-auto  w-full bg-[#0E0101] flex justify-center">
          <img
            src="/decorations/movieBanner.png"
            role="decorative"
            alt=""
            className="max-w-full"
          />
        </div>
        <section className="mobile:mt-6 mt-0 ">
          <div className="my_container max-mobile:!p-0">
            <MoviePlayer />
            <div className="px-3">
              <div className="mobile_info mt-4">
                <div className="flex flex-col gap-1 tracking-wider  mobile:hidden">
                  <MovieSkeletonSection
                    isLoading={isLoading}
                    placeholder="Garfield"
                    show={
                      <h1
                        className={`text-[17px] font-robotoGeoCaps tracking-wider text-textHead`}
                      >
                        {decodeHtmlEntities(
                          data?.movie.name ? data.movie.name : "MOVIE_NAME"
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
                            : "MOVIE_NAME"
                        )}
                      </h2>
                    }
                  />
                </div>
              </div>
              <MovieSettings id={id ? id : -1} />
            </div>
          </div>
        </section>
        <section>
          <div className="my_container">
            <div className="mobile:flex block items-start gap-8 max-mobile:gap-4">
              <div className="mobile:w-[240px] w-full mobile:flex mobile:flex-col shrink-0 gap-4 ">
                <div className="aspect-[2/3] w-full bg-[rgb(37,37,37)] max-w-[140px] mobile:max-w-[unset] mobile:float-none mobile:mr-0 float-left mr-3 mobile:m-0">
                  {data?.movie.poster_url && (
                    <img
                      className=""
                      src={"https://cdn.moviesgo.ge/" + data.movie.poster_url}
                      alt={data.movie.name + " | " + data.movie.name_eng}
                    />
                  )}
                </div>
                <MovieSkeletonSection
                  isLoading={isLoading}
                  placeholder="Garfield ispreparing for awild adventure. Aftersurprise visit from his long-lostfather'scatVicky,Garfield and Odie areforcedto giveuptheir comfortable lives andfollowVickyonan incredible, risky heist."
                  show={
                    <p
                      className="mt-2  text-[16px]  max-mobile:text-sm  leading-6.5 
                     font-mainRegular tracking-wider text-textDescLight2  mobile:hidden"
                    >
                      {decodeHtmlEntities(
                        data?.movie.description
                          ? data?.movie.description
                          : "MOVIE_DESCRIPTION"
                      )}
                    </p>
                  }
                />
                <RateMovie data={data} isLoading={isLoading} />
              </div>
              <div className="w-full flex flex-col gap-2">
                <div className="flex flex-col gap-3 tracking-wider max-mobile:hidden">
                  <MovieSkeletonSection
                    isLoading={isLoading}
                    placeholder="Garfield"
                    show={
                      <h1
                        className={`text-[21px] font-robotoGeoCaps tracking-wider text-textHead`}
                      >
                        {decodeHtmlEntities(
                          data?.movie.name ? data.movie.name : "MOVIE_NAME"
                        )}
                      </h1>
                    }
                  />
                  <MovieSkeletonSection
                    isLoading={isLoading}
                    placeholder="Garfield 202"
                    show={
                      <h2 className="text-textDesc uppercase text-[18px]">
                        {decodeHtmlEntities(
                          data?.movie.name_eng
                            ? data.movie.name_eng + ` (${data.movie.year})`
                            : "MOVIE_NAME"
                        )}
                      </h2>
                    }
                  />
                </div>
                <div className="flex gap-2 text-white/40 mt-2 text-[14px] max-mobile:hidden">
                  <MovieSkeletonSection
                    isLoading={isLoading}
                    placeholder="Garfield"
                    show={
                      addons.includes("ქართულად") && (
                        <div className="language">ქართულად</div>
                      )
                    }
                  />
                  <MovieSkeletonSection
                    isLoading={isLoading}
                    placeholder="Garfield"
                    show={
                      addons.includes("ინგლისურად") && (
                        <div className="language">ინგლისურად</div>
                      )
                    }
                  />
                  <MovieSkeletonSection
                    isLoading={isLoading}
                    placeholder="Garfield"
                    show={
                      addons.includes("რუსულად") && (
                        <div className="language">რუსულად</div>
                      )
                    }
                  />
                </div>
                <div className="hidden mobile:block">
                  <MovieSkeletonSection
                    isLoading={isLoading}
                    placeholder="Garfield ispreparing for awild adventure. Aftersurprise visit from his long-lostfather'scatVicky,Garfield and Odie areforcedto giveuptheir comfortable lives andfollowVickyonan incredible, risky heist."
                    show={
                      <p
                        className="mt-2  text-[16px]  max-mobile:text-sm  leading-6.5 
                     font-mainRegular tracking-wider text-textDescLight2"
                      >
                        {decodeHtmlEntities(
                          data?.movie.description
                            ? data?.movie.description
                            : "MOVIE_DESCRIPTION"
                        )}
                      </p>
                    }
                  />
                </div>
                <div className="hidden mobile:flex">
                  <MovieDetails data={data} isLoading={isLoading} />
                </div>
              </div>
            </div>
            <div className="flex mobile:hidden">
              <MovieDetails data={data} isLoading={isLoading} />
            </div>
          </div>
        </section>
        <SimilarMovies
          isLoading={isLoading}
          list={data?.similar_movies ? data.similar_movies : []}
        />
        <MovieComments movie_id={id ? id : ""} />
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
