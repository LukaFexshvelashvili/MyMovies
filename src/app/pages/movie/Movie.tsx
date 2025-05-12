import { useQuery } from "@tanstack/react-query";
import {
  BookmarkIcon,
  HeartIcon,
  IMDbIcon,
  RatingStarClearIcon,
  WarningIcon,
} from "../../../assets/icons/MyIcons";
import MovieComments from "./components/MovieComments";

import { useParams } from "react-router";
import { fetchMovie } from "../../../api/ServerFunctions";

import { TMovie, TMovieCard } from "../../types/MovieTypes";
import { useEffectSkipFirst } from "../../hooks/useEffectSkipFirst";
import { useWatchHistory } from "../../store/useWatchHistory";
import { decodeHtmlEntities } from "../../hooks/Customs";
import SimilarMovies from "./components/SimilarMovies";
import useAlerts from "../../store/useAlerts";

export default function Movie() {
  const { addToHistory } = useWatchHistory();
  const { id } = useParams();
  const { addAlert } = useAlerts();
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
    <main className="pb-20">
      <div className="h-[160px] w-full bg-[#0E0101] flex justify-center">
        <img
          src="/decorations/movieBanner.png"
          role="decorative"
          alt=""
          className="max-w-full"
        />
      </div>
      <section className="mt-6">
        <div className="my_container">
          <div className="w-full h-[590px] flex">
            <div className="h-full aspect-video bg-[rgb(36,36,36)]"></div>
            <div className="h-full w-full bg-[rgb(40,40,40)]"></div>
          </div>
          <div className="flex items-center gap-3 py-5">
            <div
              onClick={() =>
                addAlert({
                  id: Math.random() * 600,
                  title: "ფილმი მოწონებულია",
                })
              }
              className="h-[36px] aspect-square rounded-[20px] flex justify-center items-center cursor-pointer bg-white/0 transition-colors hover:bg-white/10"
            >
              <HeartIcon height={16} className="text-icon" />
            </div>
            <div
              onClick={() =>
                addAlert({
                  id: Math.random() * 600,
                  title: "ფილმი შენახულია",
                })
              }
              className="h-[36px] aspect-square rounded-[20px] flex justify-center items-center cursor-pointer bg-white/0 transition-colors hover:bg-white/10"
            >
              <BookmarkIcon height={16} className="text-icon" />
            </div>

            <div className="h-[36px] aspect-square rounded-[20px] flex justify-center items-center cursor-pointer bg-white/0 transition-colors hover:bg-white/10">
              <WarningIcon height={16} className="text-icon" />
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="my_container">
          <div className="flex items-start gap-8">
            <div className="w-[240px] flex flex-col shrink-0 gap-4">
              <div className="aspect-[2/3] w-full bg-[rgb(37,37,37)]">
                {data?.movie.poster_url && (
                  <img
                    src={"https://cdn.moviesgo.ge/" + data.movie.poster_url}
                    alt={data.movie.name + " | " + data.movie.name_eng}
                  />
                )}
              </div>
              <div className="py-3.5 px-3 text-textDesc bg-[rgb(37,37,37)] flex flex-col gap-3 text-sm">
                <p>რეიტინგი</p>

                <div className="flex items-center gap-3 text-textHead font-mainSemiBold text-sm">
                  <IMDbIcon height={30} width={35} />
                  <SkeletonSection
                    isLoading={isLoading}
                    placeholder="OS"
                    show={<p>{data?.movie.imdb}</p>}
                  />
                  <span className="text-textDesc font-mainRegular tracking-wide">
                    (-)
                  </span>
                </div>
                <p>მომხმარებლების რეიტინგი</p>

                <div className="flex gap-3 items-center">
                  <div className="flex gap-0.5">
                    <RatingStarClearIcon height={17} />
                    <RatingStarClearIcon height={17} />
                    <RatingStarClearIcon height={17} />
                    <RatingStarClearIcon height={17} />
                    <RatingStarClearIcon height={17} />
                  </div>
                  <p className="text-textHead font-mainSemiBold">2.7</p>
                  <span className="text-textDesc font-mainRegular tracking-wide">
                    (10)
                  </span>
                </div>
              </div>
            </div>
            <div className="w-full flex flex-col gap-2">
              <div className="flex flex-col gap-3 tracking-wider">
                <SkeletonSection
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
                <SkeletonSection
                  isLoading={isLoading}
                  placeholder="Garfield 202"
                  show={
                    <h2 className="text-textDesc uppercase text-[18px]">
                      {decodeHtmlEntities(
                        data?.movie.name_eng
                          ? data.movie.name_eng
                          : "MOVIE_NAME"
                      )}
                    </h2>
                  }
                />
              </div>
              <div className="flex gap-2 text-white/40 mt-2 text-[14px]">
                <SkeletonSection
                  isLoading={isLoading}
                  placeholder="Garfield"
                  show={
                    addons.includes("ქართულად") && (
                      <div className="language">ქართულად</div>
                    )
                  }
                />
                <SkeletonSection
                  isLoading={isLoading}
                  placeholder="Garfield"
                  show={
                    addons.includes("ინგლისურად") && (
                      <div className="language">ინგლისურად</div>
                    )
                  }
                />
                <SkeletonSection
                  isLoading={isLoading}
                  placeholder="Garfield"
                  show={
                    addons.includes("რუსულად") && (
                      <div className="language">რუსულად</div>
                    )
                  }
                />
              </div>
              <SkeletonSection
                isLoading={isLoading}
                placeholder="Garfield ispreparing for awild adventure. Aftersurprise visit from his long-lostfather'scatVicky,Garfield and Odie areforcedto giveuptheir comfortable lives andfollowVickyonan incredible, risky heist."
                show={
                  <p
                    className="`mt-2  text-[16px]  leading-6.5 
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

              <div className="flex items-start gap-5 mt-5">
                <div className="flex flex-col gap-0.5 [&>p]:h-[32px] [&>p]:flex [&>p]:items-center [&>p]:ml-auto [&>p]:text-[15px] [&>p]:text-white/40 text-end">
                  <SkeletonSection
                    isLoading={isLoading}
                    placeholder="OnSe"
                    show={<p>წელი:</p>}
                  />
                  <SkeletonSection
                    isLoading={isLoading}
                    placeholder="OnService"
                    show={<p>ხანგრძლივობა:</p>}
                  />
                  <SkeletonSection
                    isLoading={isLoading}
                    placeholder="OnServi"
                    show={<p>ქვეყანა:</p>}
                  />
                  <SkeletonSection
                    isLoading={isLoading}
                    placeholder="OnServic"
                    show={<p>სტუდია:</p>}
                  />
                  <SkeletonSection
                    isLoading={isLoading}
                    placeholder="OnServ"
                    show={<p>ჟანრი:</p>}
                  />{" "}
                  <SkeletonSection
                    isLoading={isLoading}
                    placeholder="OnService"
                    show={<p>რეჟისორი:</p>}
                  />
                </div>
                <div className="flex flex-col gap-0.5 [&>p]:h-[32px] [&>p]:flex [&>p]:items-center [&>p]:text-[14px] [&>p]:text-white/70 uppercase">
                  <SkeletonSection
                    isLoading={isLoading}
                    placeholder="Luka"
                    show={<p>{data?.movie.year}</p>}
                  />
                  <SkeletonSection
                    isLoading={isLoading}
                    placeholder="Was"
                    show={<p>- წუთი</p>}
                  />
                  <SkeletonSection
                    isLoading={isLoading}
                    placeholder="Here"
                    show={<p>- წუთი</p>}
                  />
                  <SkeletonSection
                    isLoading={isLoading}
                    placeholder="OnService"
                    show={<p>{data?.movie.country}</p>}
                  />

                  <p className="flex  gap-3">
                    <SkeletonSection
                      isLoading={isLoading}
                      placeholder="OnService Luka Fexshvelashvili"
                      show={
                        data?.movie.genres
                          ? JSON.parse(data.movie.genres).map(
                              (genre: string, index: number) => (
                                <a
                                  href=""
                                  key={index}
                                  className="py-1 flex items-center px-3 bg-white/5 cursor-pointer text-white/50 hover:bg-white/10 hover:text-main transition-colors"
                                >
                                  {genre}
                                </a>
                              )
                            )
                          : null
                      }
                    />
                  </p>
                  <SkeletonSection
                    isLoading={isLoading}
                    placeholder="OS Digital"
                    show={<p>{data?.movie.creator}</p>}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <SimilarMovies
        isLoading={isLoading}
        list={data?.similar_movies ? data.similar_movies : []}
      />
      <MovieComments movie_id={id ? id : ""} />
    </main>
  );
}

function SkeletonSection(props: {
  isLoading: boolean;
  placeholder: string;
  show: React.JSX.Element;
}) {
  return (
    <>
      {props.isLoading ? (
        <span
          className={`text-[22px] leading-7 h-full tracking-normal font-blockfont animate-pulse text-textDescDark2`}
        >
          {props.placeholder}
        </span>
      ) : (
        props.show
      )}
    </>
  );
}
