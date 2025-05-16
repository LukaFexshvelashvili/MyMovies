import { Link } from "react-router";
import MovieCard, { MovieCardSkeleton } from "./MovieCard";
import { TMovieCard } from "../app/types/MovieTypes";
import { Swiper, SwiperSlide } from "swiper/react";
import "../swiper.css";
type TMovieSlider = {
  isLoading: boolean;
  title: string;
  icon: React.ReactNode;
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
  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center gap-3 case_up">
        <div
          className={`mobile:h-8 h-8 aspect-square rounded-[20px] bg-main flex justify-center items-center p-1.5`}
        >
          {icon}
        </div>
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
      <div className="flex gap-5 overflow-x-hidden overflow-y-auto ">
        {isLoading ? (
          <>
            <MovieCardSkeleton bg_clear={clear_skeletons} />
            <MovieCardSkeleton bg_clear={clear_skeletons} />
            <MovieCardSkeleton bg_clear={clear_skeletons} />
            <MovieCardSkeleton bg_clear={clear_skeletons} />
            <MovieCardSkeleton bg_clear={clear_skeletons} />
          </>
        ) : list ? (
          <Swiper
            lazyPreloadPrevNext={1}
            slidesPerView="auto"
            spaceBetween={10}
            centeredSlides={false}
            watchOverflow={true}
            resistanceRatio={0}
            slidesOffsetAfter={10}
            className="w-full"
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
              <SwiperSlide key={movie.id} className="max-mobile:!w-[290px] ">
                <MovieCard movie={movie} />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : null}
      </div>
    </div>
  );
}
