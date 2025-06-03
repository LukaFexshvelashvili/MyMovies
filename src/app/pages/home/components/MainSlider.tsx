import { IMDbIcon, InfoIcon } from "../../../../assets/icons/MyIcons";
import { useQuery } from "@tanstack/react-query";
import { THomeList } from "../Home";
import { fetchMoviesList } from "../../../../api/ServerFunctions";
import { useWatchHistory } from "../../../store/useWatchHistory";
import { TMovieCard } from "../../../types/MovieTypes";

// Swiper imports
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import { useRef, useState } from "react";
import {
  decodeHtmlEntities,
  get_type_link,
  image_resize,
  movie_link_generate,
} from "../../../hooks/Customs";
import { Link } from "react-router";
import useDetailsOverlay from "../../../store/useDetailsOverlay";

export default function MainSlider() {
  const { setDetailsId } = useDetailsOverlay();
  const { history } = useWatchHistory();
  const { data: moviesList, isLoading } = useQuery<THomeList>({
    queryKey: ["moviesList"],
    queryFn: () => fetchMoviesList(history),
    staleTime: 1000000,
  });

  const SliderList: TMovieCard[] | null[] = moviesList?.main_slider
    ? moviesList.main_slider
    : [];

  const swiperRef = useRef<any>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="relative medium:h-[410px] h-[300px] bg-black flex justify-center">
      <Swiper
        modules={[Autoplay, EffectFade]}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        loop={true}
        effect="fade"
        className="h-full w-full"
        fadeEffect={{ crossFade: true }}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        pagination={false} // Disable built-in pagination
        lazyPreloadPrevNext={0}
      >
        {isLoading
          ? Array.from({ length: 3 }).map((_, id) => (
              <SwiperSlide key={id}>
                <SliderCardSkeleton />
              </SwiperSlide>
            ))
          : SliderList.map((movie: TMovieCard, i: number) =>
              movie ? (
                <SwiperSlide key={movie.id}>
                  <SliderCard
                    eager={i === 0}
                    movie={movie}
                    getDetails={() => setDetailsId(movie.id)}
                  />
                </SwiperSlide>
              ) : null
            )}
      </Swiper>
      {/* Custom Pagination */}
      <div className="my_container h-6 z-20 bottom-0 absolute max-mobile:right-0 ">
        <div
          className={`flex gap-3 items-center absolute h-6 mobile:bottom-7 bottom-4 right-0 px-[15px] `}
        >
          {SliderList.map(
            (movie, idx) =>
              movie && (
                <button
                  key={movie.id}
                  onClick={() => swiperRef.current?.slideToLoop(idx)}
                  className={`h-[11px] cursor-pointer aspect-square rounded-xl ${
                    activeIndex === idx
                      ? "bg-white"
                      : "bg-white/50 transition-colors hover:bg-white/80"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              )
          )}
        </div>
      </div>
    </div>
  );
}

function SliderCard({
  movie,
  eager,
  getDetails,
}: {
  movie: TMovieCard;
  eager?: boolean;
  getDetails: () => void;
}) {
  const movie_link = `/${get_type_link(movie.type)}/${
    movie.id
  }/${movie_link_generate(decodeHtmlEntities(movie.name_eng))}`;
  const optimized_image = image_resize(movie.thumbnail_url);
  return (
    <div className="relative w-full h-full shrink-0 select-none z-90">
      <div className="bg-gradient-to-b from-transparent to-[#111111] absolute h-full w-full top-0 left-0 z-10"></div>
      <div className="my_container relative z-20 h-full flex items-end mobile:py-10 py-4 ">
        <Link
          to={movie_link}
          className="flex flex-col tracking-wider mobile:gap-0 gap-1 items-start"
        >
          <h2 className="text-head mobile:text-[20px] text-[18px] line-clamp-1">
            {movie.name}
          </h2>
          <h3 className="text-white/60 mobile:text-[18px] text-[16px] line-clamp-1">
            {movie.name_eng} ({movie.year})
          </h3>
          <div className="flex items-center mobile:gap-4 gap-2 text-[15px] tracking-wider mt-1">
            <IMDbIcon className="mobile:h-[30px] mobile:w-[40px] w-[36px]" />
            {Number(movie.imdb).toFixed(1)}
          </div>
          <div className="flex gap-5 items-center mt-4">
            <button className="h-[38px] w-[150px] mobile:flex hidden bg-main cursor-pointer transition-colors hover:bg-mainHover text-white text-lg items-center gap-2 justify-center">
              უყურე
            </button>
            <button
              title="ინფორმაცია"
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                getDetails();
              }}
              className="flex justify-center items-center absolute mobile:static mobile:left-3 right-3 top-3 text-lg text-textHead mobile:h-9.5 h-8 aspect-square z-20 cursor-pointer rounded-[20px] mobile:bg-white/5 bg-black/25 mobile:hover:bg-white/10 p-1 transition-colors"
            >
              <InfoIcon className="mobile:h-4.5 h-4" />
            </button>
          </div>
        </Link>
      </div>
      <div className="absolute inset-0">
        <picture>
          {/* Mobile: small image */}
          <source
            media="(max-width: 480px)"
            srcSet={optimized_image.small}
            type="image/webp"
          />
          {/* Tablet: medium image */}
          <source
            media="(max-width: 780px)"
            srcSet={optimized_image.medium}
            type="image/webp"
          />
          {/* Desktop: high-res image */}
          <img
            src={optimized_image.high}
            alt={`${movie.name} | ${movie.name_eng}`}
            loading={eager ? "eager" : "lazy"}
            width="1920"
            height="410"
            decoding="async"
            fetchPriority={eager ? "high" : "auto"}
            className="absolute top-0 left-0 h-full w-full object-cover medium:object-[0px_-200px]"
          />
        </picture>
      </div>
    </div>
  );
}

function SliderCardSkeleton() {
  return (
    <div className="relative w-full h-full shrink-0 select-none ">
      <div className="bg-gradient-to-b from-transparent to-[#111111]  absolute h-full w-full top-0 left-0 z-10"></div>

      <div className="my_container relative z-20 h-full flex items-end py-10 tracking-[-1px]">
        <div className="absolute top-6 mobile:top-10 left-4  z-10 cursor-pointer line-clamp-1 text-textDesc animate-pulse font-blockfont">
          <span className="">movie</span>
          <span className="">genre</span> <span className="">genre</span>
        </div>
        <div className="flex flex-col ">
          <h3 className="text-[20px] text-textDesc animate-pulse font-blockfont">
            movie.name
          </h3>
          <h4 className="text-[18px] text-textDescDark animate-pulse font-blockfont">
            movie.name_eng (2024)
          </h4>
          <div className="flex items-center gap-4 text-md mt-1 text-textDescDark animate-pulse font-blockfont">
            IMDB 2.2
          </div>
          <button className="h-[38px] w-[150px] animate-pulse bg-main transition-colors text-white text-lg flex items-center gap-2 justify-center mt-4"></button>
        </div>
      </div>
      <div className="absolute w-full top-0 left-0 h-full z-[2] bg-gradient-to-r from-bodyBg/80 to-bodyBg/10"></div>
    </div>
  );
}
