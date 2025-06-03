import { useQuery } from "@tanstack/react-query";
import { fetchMostViews } from "../../../../api/ServerFunctions";
import MovieCard, { MovieCardSkeleton } from "../../../../components/MovieCard";
import { TMovieCard } from "../../../types/MovieTypes";
// import { useBreakpoint } from "../../../hooks/useBreakpoint";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { useRef } from "react";
import {
  SliderLeftArrowIcon,
  SliderRightArrowIcon,
} from "../../../../assets/icons/MyIcons";

export default function RatedMovies(props: {
  image: string;
  title: string;
  type: number;
}) {
  // const isSmall = useBreakpoint(768);
  const swiperRef = useRef<any>(null); // Swiper ref

  const { data, isLoading } = useQuery<TMovieCard[]>({
    queryKey: ["most_viewed", props.type],
    queryFn: () => fetchMostViews(props.type),
  });

  // if (isSmall) return null;

  return (
    <div
      className={`mobile:min-h-[350px] overflow-hidden h-auto  py-5 relative bg-black w-full`}
    >
      <img
        src={props.image}
        className="absolute h-full w-full object-cover top-0 left-0 z-0"
        alt={props.title}
      />
      <div className="absolute top-0 left-0 h-full w-full bg-black/70"></div>
      <div className="my_container relative h-full w-full flex items-center overflow-hidden   gap-0 flex-col ">
        <div className="flex flex-col  shrink-0 text-lg">{props.title}</div>
        <div className="flex-col flex-1 gap-4 overflow-hidden  items-center relative w-full">
          {!isLoading && data ? (
            <>
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
              <Swiper
                modules={[Navigation]}
                slidesPerView={4.2}
                onSwiper={(swiper) => (swiperRef.current = swiper)}
                className="w-full"
                spaceBetween={10}
                breakpoints={{
                  "300": {
                    slidesPerView: 1.2,
                  },
                  "400": {
                    slidesPerView: 1.5,
                  },
                  "600": {
                    slidesPerView: 2.6,
                  },
                  "768": {
                    slidesPerView: 1.55,
                  },
                  "992": {
                    slidesPerView: 2.3,
                  },
                  "1200": {
                    slidesPerView: 3,
                  },
                  "1400": {
                    slidesPerView: 3.6,
                  },
                  "1680": {
                    slidesPerView: 4.5,
                  },
                }}
              >
                {data.map((movie: TMovieCard) => (
                  <SwiperSlide key={movie.id}>
                    <MovieCard small movie={movie} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </>
          ) : (
            <div className="flex gap-5 max-mobile:mt-5">
              <MovieCardSkeleton />
              <MovieCardSkeleton />
              <MovieCardSkeleton />
              <MovieCardSkeleton />
              <MovieCardSkeleton />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
