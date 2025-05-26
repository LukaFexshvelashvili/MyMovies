import useDetailsOverlay from "../../store/useDetailsOverlay";
import { fetchMovie } from "../../../api/ServerFunctions";
import { useQuery } from "@tanstack/react-query";
import { TMovie, TMovieCard } from "../../types/MovieTypes";
import {
  CloseIcon,
  CopyIcon,
  FacebookIcon,
  IMDbIcon,
  // TelegramIcon,
  RatingStarClearIcon,
} from "../../../assets/icons/MyIcons";
import {
  decodeHtmlEntities,
  get_type_link,
  image_resize,
  movie_link_generate,
} from "../../hooks/Customs";
import { MovieSkeletonSection } from "../../pages/movie/Watch";
import { Link } from "react-router";
import useAlerts from "../../store/useAlerts";

export default function DetailsOverlay() {
  const { detailsId, setDetailsId } = useDetailsOverlay();

  if (detailsId == null) return null;
  return (
    <div className="fixed z-80  h-full w-full top-0 left-0 flex justify-center items-center">
      <div
        onClick={() => setDetailsId(null)}
        className="absolute top-0 left-0 h-full w-full z-0 bg-black/50"
      ></div>
      <GetDetails movieId={detailsId} closeDetails={() => setDetailsId(null)} />
    </div>
  );
}

function GetDetails({
  movieId,
  closeDetails,
}: {
  movieId: number;
  closeDetails: Function;
}) {
  const { addAlert } = useAlerts();
  const { data, isLoading } = useQuery<{
    movie: TMovie;
    similar_movies: TMovieCard[];
  }>({
    queryKey: ["movie", movieId],
    queryFn: () => fetchMovie(movieId),
    staleTime: 300000,
    refetchOnWindowFocus: false,
  });
  const addons = data?.movie.addons ? JSON.parse(data.movie.addons) : [];

  const movie_link = data
    ? `https://mymovies.cc/watch/${get_type_link(data.movie.type)}/${
        data.movie.id
      }/${movie_link_generate(decodeHtmlEntities(data.movie.name_eng))}`
    : "";
  const copyLink = () => {
    if (movie_link) {
      navigator.clipboard
        .writeText(movie_link)
        .then(() => {
          addAlert({
            title: "ბმული კოპირებულია",
          });
        })
        .catch((err) => {
          console.error("Clipboard copy failed:", err);
          addAlert({
            title: "ბმულის კოპირება ვერ მოხერხდა",
          });
        });
    }
  };
  return (
    <div className="relative bg-bodyBg aspect-video w-[94%] max-w-[900px] p-3 ">
      <div className="flex items-stretch gap-5 overflow-hidden ">
        <div
          onClick={() => closeDetails()}
          className="absolute right-2  text-lg text-textHead2 h-8 aspect-square z-20 cursor-pointer rounded-[20px] bg-white/5 hover:bg-white/10 p-1 transition-colors"
        >
          <CloseIcon />
        </div>
        <div className="w-[240px]  flex-col shrink-0 gap-3 hidden mobile:flex relative z-10">
          <div className="aspect-[2/3] w-full bg-[rgb(37,37,37)]">
            {data && (
              <img
                src={"https://cdn.moviesgo.ge/" + data?.movie.poster_url}
                alt={data ? data.movie.name + " | " + data.movie.name_eng : ""}
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
        <div className="mobile:flex-1 flex flex-col gap-1 overflow-hidden">
          <div className="z-0 absolute top-0 left-0 w-full h-full before:content-[''] before:absolute before:top-0 before:left-0 before:bg-gradient-to-t before:from-bodyBg before:to-bodyBg/70 before:h-full before:w-full">
            {data && (
              <img
                src={image_resize(data?.movie.thumbnail_url).medium}
                className="h-full w-full object-cover max-h-full object-top"
                alt={data.movie.name + " | " + data.movie.name_eng}
              />
            )}
          </div>
          <div className="flex flex-col gap-1 tracking-wider relative">
            <SkeletonSection
              isLoading={isLoading}
              placeholder="Garfie"
              show={
                <h1
                  className={`mobile:text-[21px] text-[19px]  font-robotoGeoCaps tracking-wider text-textHead line-clamp-2`}
                >
                  {decodeHtmlEntities(data?.movie.name ? data.movie.name : "")}
                </h1>
              }
            />
            <SkeletonSection
              isLoading={isLoading}
              placeholder="Garfield"
              show={
                <h2 className="text-white/50 uppercase mobile:text-[18px] text-[17px]  line-clamp-2">
                  {decodeHtmlEntities(
                    data?.movie.name_eng ? data.movie.name_eng : ""
                  )}
                </h2>
              }
            />
          </div>
          <div className="flex gap-2.5 text-white/40 mt-1 text-[14px] relative">
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
                           font-mainRegular tracking-wider text-textDescLight2  w-full line-clamp-6 relative"
              >
                {decodeHtmlEntities(
                  data?.movie.description ? data?.movie.description : ""
                )}
              </p>
            }
          />

          <MovieDetailsOverlay movie={data?.movie} isLoading={isLoading} />
          <div className="flex items-center gap-3 relative z-10 mt-auto ml-auto pt-5">
            <Link
              target="_blank"
              to={"https://www.facebook.com/sharer/sharer.php?u=" + movie_link}
              className="flex items-center bg-white/5 h-[34px] w-[150px] cursor-pointer hover:bg-white/10 transition-colors"
            >
              <div className="h-[34px] aspect-square bg-[#0077ff] flex justify-center items-center p-2">
                <FacebookIcon className="h-full text-[#ffffff]" />
              </div>
              <p className="text-textDescLight text-sm ml-4">გაზიარება</p>
            </Link>
            {/* <Link
              to={"https://t.me/share/url?url=" + movie_link}
              className="flex items-center bg-white/5 h-[34px] w-[150px] cursor-pointer hover:bg-white/10 transition-colors"
            >
              <div className="h-[34px] aspect-square bg-[#24a1de] flex justify-center items-center p-2">
                <TelegramIcon className="h-full text-[#ffffff]" />
              </div>
              <p className="text-textDescLight text-sm ml-4">გაზიარება</p>
            </Link> */}
            <div
              onClick={copyLink}
              className="flex items-center bg-white/5 h-[34px] w-[150px] cursor-pointer hover:bg-white/10 transition-colors select-none"
            >
              <div className="h-[34px] aspect-square bg-main flex justify-center items-center p-2">
                <CopyIcon className="h-full text-white" />
              </div>
              <p className="text-textDescLight text-sm ml-4">კოპირება</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export function SkeletonSection(props: {
  isLoading: boolean;
  placeholder: string;
  show: React.JSX.Element;
}) {
  return (
    <>
      {props.isLoading ? (
        <span
          className={`text-[24px] leading-6 -tracking-[5px] font-blockfont animate-pulse text-textDescDark2`}
        >
          {props.placeholder}
        </span>
      ) : (
        props.show
      )}
    </>
  );
}

export function MovieDetailsOverlay({
  movie,
  isLoading,
}: {
  movie: TMovie | undefined;
  isLoading: boolean;
}) {
  return (
    <div className="flex items-start gap-5 mt-5 relative">
      <div className="flex flex-col  gap-1  text-end">
        <div className="flex gap-4">
          <div className="mobile:flex-1 key text-white/40">
            <MovieSkeletonSection
              isLoading={isLoading}
              placeholder="OnSe"
              show={<p>წელი:</p>}
            />
          </div>
          <div className="mobile:flex-[2.5] text-start value text-textHead2">
            {" "}
            <MovieSkeletonSection
              isLoading={isLoading}
              placeholder="Luka"
              show={<p>{movie?.year}</p>}
            />
          </div>
        </div>
        <div className="flex gap-4">
          <div className="mobile:flex-1 key text-white/40">
            <MovieSkeletonSection
              isLoading={isLoading}
              placeholder="OnService"
              show={<p>ხანგრძლივობა:</p>}
            />
          </div>
          <div className="mobile:flex-[2.5] text-start value text-textHead2">
            {" "}
            <MovieSkeletonSection
              isLoading={isLoading}
              placeholder="Was"
              show={<p>-</p>}
            />
          </div>
        </div>
        <div className="flex gap-4">
          <div className="mobile:flex-1 key text-white/40">
            {" "}
            <MovieSkeletonSection
              isLoading={isLoading}
              placeholder="OnServi"
              show={<p>ქვეყანა:</p>}
            />
          </div>
          <div className="mobile:flex-[2.5] text-start value text-textHead2">
            {" "}
            <MovieSkeletonSection
              isLoading={isLoading}
              placeholder="OnService"
              show={<p>{movie?.country}</p>}
            />
          </div>
        </div>
        <div className="flex gap-4">
          <div className="mobile:flex-1 key text-white/40">
            {" "}
            <MovieSkeletonSection
              isLoading={isLoading}
              placeholder="OnServic"
              show={<p>სტუდია:</p>}
            />
          </div>
          <div className="mobile:flex-[2.5] text-start value text-textHead2">
            {" "}
            <MovieSkeletonSection
              isLoading={isLoading}
              placeholder="Here"
              show={<p>- </p>}
            />
          </div>
        </div>
        <div className="flex gap-4">
          <div className="mobile:flex-1 key text-white/40">
            {" "}
            <MovieSkeletonSection
              isLoading={isLoading}
              placeholder="OnServ"
              show={<p>ჟანრი:</p>}
            />
          </div>
          <div className="mobile:flex-[2.5] text-start value text-textHead2">
            {" "}
            <p className="flex gap-3 flex-wrap !h-auto">
              <MovieSkeletonSection
                isLoading={isLoading}
                placeholder="OnService Luka Fexshvelashvili"
                show={
                  movie?.genres
                    ? JSON.parse(movie.genres).map(
                        (genre: string, index: number) => (
                          <Link
                            to={`/search/a?genres=%5B"${genre}"%5D`}
                            key={index}
                            className="py-1 flex items-center px-3 bg-white/5 cursor-pointer text-white/50 hover:bg-white/10 hover:text-main transition-colors"
                          >
                            {genre}
                          </Link>
                        )
                      )
                    : null
                }
              />
            </p>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="mobile:flex-1 key text-white/40 ">
            {" "}
            <MovieSkeletonSection
              isLoading={isLoading}
              placeholder="OnService"
              show={<p>რეჟისორი:</p>}
            />
          </div>
          <div className="mobile:flex-[2.5] text-start value text-textHead2">
            {" "}
            <MovieSkeletonSection
              isLoading={isLoading}
              placeholder="OS Digital"
              show={<p>{movie?.creator}</p>}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
