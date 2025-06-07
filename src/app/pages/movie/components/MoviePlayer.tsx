import { useParams } from "react-router";
import OSVideoPlayer, {
  TEpisode,
  TLanguageOptions,
  TSeriesData,
} from "../../../../OS_PLAYER/OSVideoPlayer";
import { useMemo } from "react";
import { fetchMovie } from "../../../../api/ServerFunctions";
import { TMovie, TMovieCard } from "../../../types/MovieTypes";
import { useQuery } from "@tanstack/react-query";

interface MovieResponse {
  movie: TMovie;
  similar_movies: TMovieCard[];
}

export default function MoviePlayer() {
  const { id } = useParams();
  const { data, isLoading } = useQuery<MovieResponse>({
    queryKey: ["movie", id],
    queryFn: () => fetchMovie(id ? parseInt(id) : 0),
    staleTime: 300000, // Keep data fresh for 5 minutes
    gcTime: 1800000, // Keep in cache for 30 minutes
    refetchOnWindowFocus: false,
  });

  const { playerData, isMovie } = useMemo(() => {
    if (!data?.movie.players || isLoading) {
      return { playerData: null, isMovie: false, error: null };
    }

    try {
      const parsedPlayers = JSON.parse(data.movie.players);
      if (!parsedPlayers[1]) {
        throw new Error("Invalid player data format");
      }

      if (parsedPlayers[1].GEO || parsedPlayers[1].ENG) {
        return {
          playerData: {
            initial: {
              languages: parsedPlayers[1] as {
                GEO?: TLanguageOptions;
                ENG?: TLanguageOptions;
              },
            },
            episodes: null,
          },
          isMovie: true,
          error: null,
        };
      } else {
        return {
          playerData: {
            episodes: parsedPlayers[1] as TSeriesData,
            initial: { ...parsedPlayers[1][1][0] } as TEpisode,
          },
          isMovie: false,
          error: null,
        };
      }
    } catch (err) {
      console.error("Error parsing player data:", err);
      return {
        playerData: null,
        isMovie: false,
        error: "Failed to load video player data",
      };
    }
  }, [data, isLoading]);

  const basename = "https://cdn.moviesgo.ge/";

  const addStringToThumbnail = useMemo(() => {
    return (thumbnailUrl: string, stringToAdd: string) => {
      if (!thumbnailUrl) return "";
      const fileName = thumbnailUrl.split(".").slice(0, -1).join(".");
      const fileExtension = thumbnailUrl.split(".").pop();
      return `${fileName}${stringToAdd}.${fileExtension}`;
    };
  }, []);

  return (
    <>
      {!data?.movie.players || !playerData?.initial || isLoading ? (
        <div className="w-full mobile:h-[590px] aspect-video flex font-blockfont text-xl tracking-[-1px]">
          <div className="h-full aspect-video bg-[rgb(36,36,36)]"></div>
          <div className="h-full w-full bg-[rgb(40,40,40)]">
            <div className={`w-full h-full overflow-hidden bg-[rgb(40,40,40)]`}>
              <div className="h-13 shrink-0 w-full bg-[#111111] text-[#474747]">
                <div className="animate-pulse px-3 w-full h-full flex items-center gap-2">
                  OnService
                  <span className="animate-pulse text-[#363636] text-sm ml-auto">
                    GE
                  </span>
                </div>
                <EpisodeSkeleton />
                <EpisodeSkeleton />
                <EpisodeSkeleton />
                <EpisodeSkeleton />
                <EpisodeSkeleton />
                <EpisodeSkeleton />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full mobile:h-[590px] aspect-video flex">
          <OSVideoPlayer
            preroll={null}
            key={`${data.movie.id}`}
            isMovie={isMovie}
            id={data.movie.id}
            source={playerData.initial}
            thumbnail={basename + data.movie.thumbnail_url}
            alt={
              data.movie.name +
              " ქართულად | " +
              data.movie.name_eng +
              " Qartulad"
            }
            trailer={data.movie.trailer || ""}
            srcset={`
              ${
                basename +
                addStringToThumbnail(data.movie.thumbnail_url || "", "_sm2")
              } 480w,
              ${
                basename +
                addStringToThumbnail(data.movie.thumbnail_url || "", "_sm")
              } 780w,
              ${basename + data.movie.thumbnail_url} 1200w
            `}
            episodes={
              isMovie && playerData.initial
                ? ({
                    1: [
                      { title: data.movie.name_eng, ...playerData.initial },
                      {
                        title: "TRAILER",
                        languages: {
                          ENG: {
                            HD: data.movie.trailer || undefined,
                          },
                        },
                      },
                    ],
                  } as TSeriesData)
                : playerData.episodes || undefined
            }
          />
        </div>
      )}
    </>
  );
}

function EpisodeSkeleton() {
  return (
    <div
      className={`select-none h-[90px] py-2 flex gap-3 items-start px-3 text-white font-os_medium tracking-normal cursor-pointer text-[13px] max-os_player_mobile:text-[12px] outline-b border-l-main transition-colors outline-[rgba(255,255,255,0.05)]`}
    >
      <div className="animate-pulse h-[70px] w-[120px] relative bg-[#3a3a3a] overflow-hidden">
        <div className="absolute z-[1] h-full w-full top-0 left-0"></div>
        <div className="absolute h-[70px] w-[120px] object-cover top-0 left-0" />
        <div
          className={`animate-pulse absolute bottom-0 left-0 h-7 px-2.5 flex justify-center items-center text-[#474747] text-[15px] font-blockfont`}
        >
          11
        </div>
      </div>
      <div className="flex flex-col py-0.5 h-full gap-2">
        <p className="animate-pulse uppercase font-blockfont text-[#474747] text-xl">
          EPISODE_NAME
        </p>
        <div className="flex gap-2">
          <div className={`animate-pulse bg-[#474747] h-4 w-8`}></div>
          <div className={`animate-pulse bg-[#474747] h-4 w-8`}></div>
        </div>
      </div>
    </div>
  );
}
