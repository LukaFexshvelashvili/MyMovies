import { Link } from "react-router";
import {
  BookmarkIcon,
  HeartIcon,
  IMDbIcon,
  InfoIcon,
  TrailerIcon,
} from "../assets/icons/MyIcons";
import { TMovieCard } from "../app/types/MovieTypes";
import useTrailerOverlay from "../app/store/useTrailerOverlay";
import {
  decodeHtmlEntities,
  image_resize,
  movie_link_generate,
} from "../app/hooks/Customs";
import { useState } from "react";
import useDetailsOverlay from "../app/store/useDetailsOverlay";

export default function MovieCard({
  small,
  movie,
}: {
  movie: TMovieCard;
  small?: boolean;
}) {
  const [showMenu, setShowMenu] = useState<boolean>(false);

  const { setDetailsId } = useDetailsOverlay();
  const { setTrailerLink } = useTrailerOverlay();
  const addons = movie.addons ? JSON.parse(movie.addons) : [];

  return (
    <div
      className={` ${
        small ? "w-[290px]" : "w-[365px]"
      } group/card duration-200 cursor-pointer transition-colors shrink-0`}
    >
      <div className="relative w-full aspect-video bg-[#3b3b3b]">
        <div className="top-0 right-0 color-white absolute text-[13px] flex group-hover/card:opacity-0  pointer-events-none">
          {addons.includes("ინგლისურად") && (
            <span className="bg-[#2c2c2cbb] px-1.5 py-0.5 flex justify-center items-center">
              ინგ
            </span>
          )}
          {addons.includes("ქართულად") && (
            <span className="bg-main px-1.5 py-0.5 flex justify-center items-center">
              ქარ
            </span>
          )}
        </div>
        <div className="h-full w-full absolute top-0 left-0  pointer-events-none group-hover/card:pointer-events-auto opacity-0 group-hover/card:opacity-100 z-10">
          <Link
            to={`/movie/${movie.id}/${movie_link_generate(movie.name_eng)}`}
            className="h-full w-full top-0 left-0 bg-[rgba(0,0,0,0.5)] absolute"
          ></Link>
          <div className="absolute gap-1 top-1.5 right-1.5 flex items-center">
            <div
              onClick={() => setTrailerLink(movie.trailer ? movie.trailer : "")}
              className=" my_tooltip flex justify-center transition-colors hover:bg-white/10 rounded-[20px] p-2"
              aria-title="თრეილერი"
            >
              <TrailerIcon className="h-5 aspect-square" />
            </div>
            <div
              onClick={() => setDetailsId(Number(movie.id))}
              className="my_tooltip flex justify-center transition-colors hover:bg-white/10 rounded-[20px] p-2"
              aria-title="ინფორმაცია"
            >
              <InfoIcon className="h-5 aspect-square" />
            </div>
          </div>
        </div>
        <img
          src={
            "https://cdn.moviesgo.ge/" + image_resize(movie.thumbnail_url).small
          }
          alt=""
          loading="lazy"
          className="h-full w-full object-cover"
        />
        <div className="bg-gradient-to-t from-[rgba(0,0,0,0.85)] to-transparent absolute bottom-0 left-0 h-2/4 w-full"></div>
        <div className=" px-2.5 absolute z-[2] bottom-2">
          <div className="flex items-center  gap-2 font-mainMedium text-white text-sm tracking-wider">
            <IMDbIcon className="w-[40px] h-[18px]" />
            {movie.imdb ? parseInt(movie.imdb).toFixed(1) : "0.0"}
          </div>
        </div>
      </div>
      <div className="flex items-start justify-between px-2.5 pr-1 pt-2.5  pb-2.5 group-hover/card:bg-[#ffffff]/10">
        <div className="flex flex-col gap-0.5 case_up uppercase tracking-wide">
          <p className="text-textHead font-robotoGeoCaps text-[16px] truncate whitespace-normal line-clamp-1">
            {decodeHtmlEntities(movie.name)}
          </p>
          <p className="text-textDesc text-[14px] truncate whitespace-normal line-clamp-1">
            {decodeHtmlEntities(movie.name_eng)}
          </p>
        </div>
        <div
          onClick={() => setShowMenu((state) => !state)}
          className="relative h-[32px] aspect-square flex justify-center items-center rounded-full transition-colors hover:bg-[rgba(255,255,255,0.1)] cursor-pointer"
        >
          {showMenu && (
            <div className="absolute w-[200px]  bg-bodyBg bottom-12 right-2 z-30 text-sm">
              <div className="h-[36px] w-full flex items-center justify-center text-textDescLight2 hover:bg-white/5">
                გაზიარება
              </div>
              <div className="h-[36px] w-full flex items-center justify-center text-textDescLight2 hover:bg-white/5">
                ჩანიშვნა
              </div>
            </div>
          )}
          <div className="flex flex-col gap-[3px] cursor-pointer">
            <div className="bg-[rgba(255,255,255,0.8)] h-[3px] aspect-square rounded-[6px]"></div>
            <div className="bg-[rgba(255,255,255,0.8)] h-[3px] aspect-square rounded-[6px]"></div>
            <div className="bg-[rgba(255,255,255,0.8)] h-[3px] aspect-square rounded-[6px]"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
export function MovieCardSkeleton({
  small,
  bg_clear,
}: {
  small?: boolean;
  bg_clear?: boolean;
}) {
  return (
    <div
      className={` ${small ? "w-[290px]" : "w-[365px]"}  shrink-0 select-none ${
        bg_clear ? "bg-transparent" : "bg-bodyBg"
      }`}
    >
      <div className="relative w-full aspect-video shrink-0 bg-[#333]  animate-pulse"></div>

      <div className="flex items-start justify-between px-2 pr-1 pt-1.5 pb-5 group-hover/card:bg-[#ffffff]/10">
        <div className="flex flex-col gap-0.5">
          <p className=" text-[#333] text-lg font-blockfont animate-pulse leading-5">
            Angry Birds
          </p>
          <p className=" text-[#333] text-lg font-blockfont animate-pulse leading-5">
            AngryBirds going 3d
          </p>
        </div>
      </div>
    </div>
  );
}

export function MovieCardWide({ movie }: { movie: TMovieCard }) {
  const { setDetailsId } = useDetailsOverlay();
  const { setTrailerLink } = useTrailerOverlay();
  const HeartMovie = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    e.stopPropagation();
  };
  const BookmarkMovie = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    e.stopPropagation();
  };
  const addons = movie.addons ? JSON.parse(movie.addons) : [];
  const genres = movie.genres ? JSON.parse(movie.genres) : [];

  return (
    <div
      className={` w-full group/card duration-200 cursor-pointer transition-colors shrink-0 flex gap-5 px-4 py-5  bg-white/0 hover:bg-black/15`}
    >
      <div className="relative w-[300px] min-h-[170px] shrink-0 aspect-video bg-[#3b3b3b]">
        <div className="top-0 right-0 color-white absolute text-[13px] flex group-hover/card:opacity-0  pointer-events-none"></div>
        <div className="h-full w-full absolute top-0 left-0  pointer-events-none group-hover/card:pointer-events-auto opacity-0 group-hover/card:opacity-100 z-10">
          <Link
            to={`/movie/${movie.id}/${movie_link_generate(movie.name_eng)}`}
            className="h-full w-full top-0 left-0 bg-[rgba(0,0,0,0.5)] absolute"
          ></Link>
          <div className="absolute gap-1 top-1.5 right-1.5 flex items-center">
            <div
              onClick={() => setTrailerLink(movie.trailer ? movie.trailer : "")}
              className=" my_tooltip flex justify-center transition-colors hover:bg-white/10 rounded-[20px] p-2"
              aria-title="თრეილერი"
            >
              <TrailerIcon className="h-5 aspect-square" />
            </div>
            <div
              onClick={() => setDetailsId(Number(movie.id))}
              className="my_tooltip flex justify-center transition-colors hover:bg-white/10 rounded-[20px] p-2"
              aria-title="ინფორმაცია"
            >
              <InfoIcon className="h-5 aspect-square" />
            </div>
          </div>
        </div>
        <img
          src={"https://cdn.moviesgo.ge/" + movie.thumbnail_url}
          alt={movie.name + " | " + movie.name_eng}
          //       srcSet={`$poster_small2 480w,
          // $poster_small 780w,
          // $poster 1200w`}
          loading="lazy"
          className="h-full w-full object-cover"
        />
        <div className="bg-gradient-to-t from-[rgba(0,0,0,0.85)] to-transparent absolute bottom-0 left-0 h-2/4 w-full"></div>
        <div className=" px-2.5 absolute z-[2] bottom-2">
          <div className="flex items-center gap-2 font-mainMedium text-white text-sm tracking-wider">
            <IMDbIcon className="w-[40px] h-[18px]" />
            {parseInt(movie.imdb).toFixed(1)}
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2 w-full">
        <div className="flex flex-col gap-0.5 case_up uppercase tracking-wide">
          <div className="flex justify-between">
            <p className="text-textHead font-robotoGeoCaps text-[16px]">
              {decodeHtmlEntities(movie.name)}
            </p>
            <div className="flex gap-2 text-white/40 mt-1 text-[14px]">
              {addons.includes("ქართულად") && (
                <div className="language">ქართულად</div>
              )}
              {addons.includes("ინგლისურად") && (
                <div className="language">ინგლისურად</div>
              )}
            </div>
          </div>

          <p className="text-textDesc text-[14px]">
            {decodeHtmlEntities(movie.name_eng)}
          </p>
        </div>
        <p className="text-textDescLight text-[15px] mt-0.5 max-h-[100px] truncate whitespace-normal line-clamp-3">
          {movie.description}
        </p>{" "}
        <div className="flex items-center justify-between  mt-auto">
          <div className="flex gap-2 flex-wrap">
            {genres.map((genre: string) => (
              <div
                key={genre}
                className="py-1.5 px-3 bg-white/5 cursor-pointer text-sm text-white/50 hover:bg-white/10 hover:text-main transition-colors"
              >
                {genre}
              </div>
            ))}
          </div>
          <div className="flex items-center gap-2 ">
            <div
              onClick={(e) => HeartMovie(e)}
              className="h-[34px] aspect-square rounded-[20px] flex justify-center items-center cursor-pointer bg-white/0 transition-colors hover:bg-white/10"
            >
              <HeartIcon height={16} />
            </div>
            <div
              onClick={(e) => BookmarkMovie(e)}
              className="h-[34px] aspect-square rounded-[20px] flex justify-center items-center cursor-pointer bg-white/0 transition-colors hover:bg-white/10"
            >
              <BookmarkIcon height={16} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function MovieCardWideSkeleton() {
  return (
    <div className={` w-full  shrink-0 flex gap-3 px-4 py-5 select-none`}>
      <div className="relative w-[300px] min-h-[170px] shrink-0 aspect-video bg-[#333]  animate-pulse"></div>
      <div className="flex flex-col gap-2 w-full">
        <div className="flex flex-col gap-0.5">
          <div className="flex justify-between">
            <p className=" text-[#333] text-xl font-blockfont animate-pulse leading-3">
              Angry Birds
            </p>
            <div className="flex gap-2 leading-6  text-[#333] text-xl font-blockfont animate-pulse">
              <div className="language ">georgian</div>
              <div className="language ">english</div>
            </div>
          </div>

          <p className=" text-[#333] text-xl font-blockfont animate-pulse">
            mymovies
          </p>
        </div>
        <p className=" mt-0.5 max-h-[100px] truncate whitespace-normal line-clamp-3 text-[#333] text-xl font-blockfont animate-pulse">
          luka fexshvelashvili best dev ofc
        </p>{" "}
        <div className="flex items-center justify-between  mt-auto">
          <div className="flex gap-2 flex-wrap ">
            <p className="text-[#333] text-3xl font-blockfont animate-pulse">
              ons mym mvsg onh
            </p>
          </div>
          <div className="flex items-center gap-2 ">
            <p className="text-[#333] text-3xl font-blockfont animate-pulse">
              ons mym
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
