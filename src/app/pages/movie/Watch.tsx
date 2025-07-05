import { useQuery } from "@tanstack/react-query";
import MovieComments from "./components/MovieComments";
import { Link, useParams } from "react-router";
import { fetchCasts, fetchMovie } from "../../../api/ServerFunctions";
import { TCast, TMovie, TMovieCard } from "../../types/MovieTypes";
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
  const { data: casts, isLoading: castsLoading } = useQuery<{
    cast: TCast[] | null;
  }>({
    queryKey: ["casts", data?.movie.mid],
    queryFn: () => fetchCasts(data?.movie.mid ? data?.movie.mid : -1),
    staleTime: 300000,
    refetchOnWindowFocus: false,
    enabled: data?.movie.mid ? true : false,
  });
  useEffect(() => {
    if (!id) return;
    setActiveOption(-1);

    const WatchTimeout = setTimeout(() => {
      addToHistory(id);
    }, 3000);

    return () => {
      clearTimeout(WatchTimeout);
    };
  }, [id]);

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
      {data?.movie && <MetaDataGenerate movie={data.movie} />}
      <main className="mobile:pb-20 pb-10">
        <div className="mobile:h-[160px] h-auto  w-full  bg-[#0c0c0c] bg-[url('/decorations/background.svg')] bg-repeat bg-center mobile:flex hidden justify-center"></div>
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
                      <h2
                        className={`text-[17px] font-robotoGeoCaps tracking-wider text-textHead`}
                      >
                        {decodeHtmlEntities(
                          data?.movie.name ? data.movie.name : ""
                        )}
                      </h2>
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
                id={id ? id : "-1"}
                movie={data?.movie}
                isLoading={isLoading}
              />
            </div>
          </div>
        </section>
        <div className="mobile:hidden flex w-full overflow-x-auto bg-navBg h-[40px] sticky top-[98px] z-10 no_scrollbar">
          {optionList.map((option) => (
            <button
              key={option.id}
              onClick={() => setActiveOption(option.id)}
              className={`px-7 text-textHead2 text-[14px] flex-1 h-full shrink-0  transition-all ${
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
          casts={casts}
          castsLoading={castsLoading}
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

function MetaDataGenerate({ movie }: { movie: TMovie }) {
  // Meta data generation
  const getMovieSchemaType = (type: number): "Movie" | "TVSeries" => {
    return [1, 3].includes(type) ? "TVSeries" : "Movie";
  };

  // Determine if movie has Georgian audio
  const is_geo = movie.addons
    ? JSON.parse(movie.addons).includes("ქართულად")
    : false;
  const ending_geo = is_geo ? "ქართულად" : "ინგლისურად";
  const ending_eng = is_geo ? "Qartulad" : "Inglisurad";

  // Optimize title length
  let seo_title = `${movie.name} ${ending_geo} / ${movie.name_eng} ${ending_eng}`;
  if (seo_title.length >= 60) {
    seo_title = `${movie.name} ${ending_geo}`;
  }
  if (seo_title.length <= 48) {
    seo_title += " | MyMovies";
  }

  // Optimize description length
  let seo_desc = `${movie.name_eng} (${
    movie.year
  }) ${ending_eng} - ${movie.description.slice(0, 150)}`;
  if (seo_desc.length >= 60) {
    seo_desc = `{movie.name_eng} (${
      movie.year
    }) ${ending_eng} - ${movie.description.slice(0, 150)}`;
  }
  if (seo_desc.length >= 135) {
    seo_desc = seo_desc.slice(0, 135) + "... ნახეთ MyMovies - ზე";
  }

  const keywords = `${movie.name} ქართულად, ${movie.name_eng} Qartulad, MyMovies - ${movie.name}`;
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
      <meta property="og:image" content={image} />
      <meta property="og:locale" content="ka_GE" />
      <meta property="og:site_name" content="mymovies" />

      {/* Twitter */}
      <meta name="twitter:card" content={image} />
      <meta name="twitter:title" content={seo_title} />
      <meta name="twitter:description" content={seo_desc} />
      <meta name="twitter:image" content={image} />

      {/* JSON-LD */}
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
    </>
  );
}
