import { Link } from "react-router";
import MovieCard, { MovieCardSkeleton } from "./MovieCard";
import { TMovieCard } from "../app/types/MovieTypes";
import { Swiper, SwiperSlide } from "swiper/react";
import "../swiper.css";
import { useRef } from "react";
import {
  SliderLeftArrowIcon,
  SliderRightArrowIcon,
} from "../assets/icons/MyIcons";
type TMovieSlider = {
  isLoading: boolean;
  title: string;
  icon?: React.ReactNode;
  link?: string;
  clear_skeletons?: boolean;
  list: TMovieCard[] | undefined;
};
export default function MovieSlider({
  isLoading,
  title,
  icon,
  link,
  clear_skeletons,
  list,
}: TMovieSlider) {
  const swiperRef = useRef<any>(null); // Swiper ref

  if (!list && !isLoading) return;

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center gap-3 justify-between">
        <div className="flex items-center gap-3 case_up">
          {icon ? (
            <div
              className={`mobile:h-8 h-8 aspect-square rounded-[20px] bg-main flex justify-center items-center p-1.5`}
            >
              {icon}
            </div>
          ) : null}
          <p className="text-textHead font-mainMedium  mobile:text-[17px] text-[15px] tracking-wider">
            {title}
          </p>
          {link && (
            <div className="flex items-center gap-2.5">
              <span className="text-textDesc">/</span>
              <Link
                to={link}
                className="text-textDesc font-mainMedium  hover:text-main transition-colors"
              >
                ყველა
              </Link>
            </div>
          )}
        </div>
        <div className="flex items-center justify-end gap-3 h-10 text-textDesc">
          <SliderLeftArrowIcon
            className="hover:text-textHead cursor-pointer"
            onClick={() => swiperRef.current?.slidePrev()}
          />
          <SliderRightArrowIcon
            className="hover:text-textHead cursor-pointer"
            onClick={() => swiperRef.current?.slideNext()}
          />
        </div>
      </div>
      <div className="flex gap-5 overflow-x-hidden overflow-y-auto ">
        <div className="flex-col flex-1 gap-4 overflow-hidden  items-center relative w-full">
          {!isLoading && list ? (
            <>
              <Swiper
                lazyPreloadPrevNext={1}
                slidesPerView="auto"
                spaceBetween={10}
                onSwiper={(swiper) => (swiperRef.current = swiper)}
                centeredSlides={false}
                watchOverflow={true}
                resistanceRatio={0}
                slidesOffsetAfter={10}
                className="w-full"
                freeMode={true}
                breakpoints={{
                  "600": {
                    slidesPerView: 1.9,
                  },
                  "992": {
                    slidesPerView: 2.5,
                  },
                  "1200": {
                    slidesPerView: 3.05,
                  },
                  "1400": {
                    slidesPerView: 3.6,
                  },
                  "1680": {
                    slidesPerView: 4.1,
                  },
                }}
              >
                {list.map((movie: TMovieCard) => (
                  <SwiperSlide
                    key={movie.id}
                    className="max-mobile:!w-[290px] "
                  >
                    <MovieCard movie={movie} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </>
          ) : (
            <div className="flex gap-5 items-start">
              <MovieCardSkeleton bg_clear={clear_skeletons} />
              <MovieCardSkeleton bg_clear={clear_skeletons} />
              <MovieCardSkeleton bg_clear={clear_skeletons} />
              <MovieCardSkeleton bg_clear={clear_skeletons} />
              <MovieCardSkeleton bg_clear={clear_skeletons} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
