import useDetailsOverlay from "../../store/useDetailsOverlay";
import { fetchMovie } from "../../../api/ServerFunctions";
import { useQuery } from "@tanstack/react-query";
import { TMovie, TMovieCard } from "../../types/MovieTypes";
import { IMDbIcon, RatingStarClearIcon } from "../../../assets/icons/MyIcons";
import { decodeHtmlEntities } from "../../hooks/Customs";

export default function DetailsOverlay() {
  const { detailsId, setDetailsId } = useDetailsOverlay();
  console.log(detailsId);

  if (detailsId == null) return null;
  return (
    <div className="fixed z-80  h-full w-full top-0 left-0 flex justify-center items-center">
      <div
        onClick={() => setDetailsId(null)}
        className="absolute top-0 left-0 h-full w-full z-0 bg-black/50"
      ></div>
      <GetDetails movieId={detailsId} />
    </div>
  );
}

function GetDetails({ movieId }: { movieId: number }) {
  const { data, isLoading, error } = useQuery<{
    movie: TMovie;
    similar_movies: TMovieCard[];
  }>({
    queryKey: ["movie", movieId],
    queryFn: () => fetchMovie(movieId),
    staleTime: 300000,
    refetchOnWindowFocus: false,
  });
  const addons = data?.movie.addons ? JSON.parse(data.movie.addons) : [];

  return (
    <div className="relative bg-bodyBg aspect-video w-full max-w-[900px] p-3 ">
      <div className="flex items-stretch gap-3 overflow-hidden">
        <div className="w-[240px] flex flex-col shrink-0 gap-3">
          <div className="aspect-[2/3] w-full bg-[rgb(37,37,37)]">
            <img
              src={"https://cdn.moviesgo.ge/" + data?.movie.poster_url}
              alt=""
            />
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
        <div className="flex-1 flex flex-col gap-1 overflow-hidden">
          <div className="flex flex-col gap-1 tracking-wider">
            <SkeletonSection
              isLoading={isLoading}
              placeholder="Garfie"
              show={
                <h1
                  className={`text-[21px] font-robotoGeoCaps tracking-wider text-textHead line-clamp-2`}
                >
                  {decodeHtmlEntities(
                    data?.movie.name ? data.movie.name : "MOVIE_NAME"
                  )}
                </h1>
              }
            />
            <SkeletonSection
              isLoading={isLoading}
              placeholder="Garfield"
              show={
                <h2 className="text-textDesc uppercase text-[18px] line-clamp-2">
                  {decodeHtmlEntities(
                    data?.movie.name_eng ? data.movie.name_eng : "MOVIE_NAME"
                  )}
                </h2>
              }
            />
          </div>
          <div className="flex gap-2 text-white/40 mt-1 text-[14px]">
            <SkeletonSection
              isLoading={isLoading}
              placeholder="Garfi"
              show={
                addons.includes("ქართულად") && (
                  <div className="language">ქართულად</div>
                )
              }
            />
            <SkeletonSection
              isLoading={isLoading}
              placeholder="Garfi"
              show={
                addons.includes("ინგლისურად") && (
                  <div className="language">ინგლისურად</div>
                )
              }
            />
            <SkeletonSection
              isLoading={isLoading}
              placeholder="Garfi"
              show={
                addons.includes("რუსულად") && (
                  <div className="language">რუსულად</div>
                )
              }
            />
          </div>
          <SkeletonSection
            isLoading={isLoading}
            placeholder="__________ _________________
            _______________________ _____
            _____________ ______________________"
            show={
              <p
                className="`mt-2  text-[15px]  leading-6.5 
                           font-mainRegular tracking-wider text-textDescLight2  w-full line-clamp-6"
              >
                {data?.movie.description}
              </p>
            }
          />

          <div className="flex items-start gap-5 mt-5">
            <div className="flex flex-col gap-0.5 [&>p]:h-[32px] [&>p]:flex [&>p]:items-center [&>p]:text-[15px] [&>p]:text-white/40 text-start">
              <SkeletonSection
                isLoading={isLoading}
                placeholder="OnServ"
                show={<p>წელი:</p>}
              />
              <SkeletonSection
                isLoading={isLoading}
                placeholder="OnServ"
                show={<p>ხანგრძლივობა:</p>}
              />
              <SkeletonSection
                isLoading={isLoading}
                placeholder="OnServ"
                show={<p>ქვეყანა:</p>}
              />
              <SkeletonSection
                isLoading={isLoading}
                placeholder="OnServ"
                show={<p>სტუდია:</p>}
              />
              <SkeletonSection
                isLoading={isLoading}
                placeholder="OnServ"
                show={<p>ჟანრი:</p>}
              />{" "}
              <SkeletonSection
                isLoading={isLoading}
                placeholder="OnServ"
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

              <SkeletonSection
                isLoading={isLoading}
                placeholder="OnService"
                show={
                  <>
                    <p className="flex  gap-3">
                      {data?.movie.genres
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
                        : null}
                    </p>
                  </>
                }
              />
              <SkeletonSection
                isLoading={isLoading}
                placeholder="Digital"
                show={
                  <p>{decodeHtmlEntities(data ? data.movie.creator : "")}</p>
                }
              />
            </div>
          </div>
        </div>
      </div>
    </div>
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
          className={`text-[24px] leading-6 tracking-normal font-blockfont animate-pulse text-textDescDark2`}
        >
          {props.placeholder}
        </span>
      ) : (
        props.show
      )}
    </>
  );
}
