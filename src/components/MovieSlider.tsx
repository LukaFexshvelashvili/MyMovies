import { Link } from "react-router";
import MovieCard, { MovieCardSkeleton } from "./MovieCard";
import { TMovieCard } from "../app/types/MovieTypes";
import { Swiper, SwiperSlide } from "swiper/react";
import "../swiper.css";
type TMovieSlider = {
  isLoading: boolean;
  title: string;
  icon: React.ReactNode;
  link: string;
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
          className={`h-8 aspect-square rounded-[20px] bg-main flex justify-center items-center p-1.5`}
        >
          {icon}
        </div>
        <p className="text-textHead font-mainMedium  text-[17px] tracking-wider">
          {title}
        </p>
        <div className="flex items-center gap-2.5">
          <span className="text-textDesc">/</span>
          <Link
            to={link}
            className="text-textDesc font-mainMedium  hover:text-main transition-colors"
          >
            ყველა
          </Link>
        </div>
      </div>
      <div className="flex gap-5 overflow-x-hidden overflow-y-auto">
        {isLoading ? (
          <>
            <MovieCardSkeleton bg_clear={clear_skeletons} />
            <MovieCardSkeleton bg_clear={clear_skeletons} />
            <MovieCardSkeleton bg_clear={clear_skeletons} />
            <MovieCardSkeleton bg_clear={clear_skeletons} />
            <MovieCardSkeleton bg_clear={clear_skeletons} />
          </>
        ) : list ? (
          <Swiper spaceBetween={10} slidesPerView={4.1}>
            {list.map((movie: TMovieCard) => (
              <SwiperSlide key={movie.id}>
                <MovieCard movie={movie} />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : null}
      </div>
    </div>
  );
}
