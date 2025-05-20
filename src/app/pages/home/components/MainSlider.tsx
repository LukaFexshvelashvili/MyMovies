import { useEffect, useRef, useState } from "react";
import { IMDbIcon } from "../../../../assets/icons/MyIcons";
import { useQuery } from "@tanstack/react-query";
import { THomeList } from "../Home";
import { fetchMoviesList } from "../../../../api/ServerFunctions";
import { useWatchHistory } from "../../../store/useWatchHistory";
import { TMovieCard } from "../../../types/MovieTypes";

export default function MainSlider() {
  const { history } = useWatchHistory();
  const { data: moviesList, isLoading } = useQuery<THomeList>({
    queryKey: ["moviesList"],
    queryFn: () => fetchMoviesList(history),
    staleTime: 1000000,
  });

  const SliderList: TMovieCard[] | null[] = moviesList?.main_slider
    ? moviesList.main_slider
    : [];

  const SliderContainer = useRef<HTMLDivElement | null>(null);
  const startX = useRef<number | null>(null);
  const endX = useRef<number | null>(null);
  const isDragging = useRef(false);
  const [activeSlider, setActiveSlider] = useState(0);

  const handleStart = (x: number) => {
    startX.current = x;
    isDragging.current = true;
  };

  const handleMove = (x: number) => {
    if (isDragging.current) {
      endX.current = x;
    }
  };

  const handleEnd = () => {
    if (!isDragging.current || startX.current === null || endX.current === null)
      return;

    const deltaX = startX.current - endX.current;

    if (Math.abs(deltaX) > 50) {
      if (deltaX > 0) {
        setActiveSlider((state) =>
          state === SliderList.length - 1 ? 0 : state + 1
        );
      } else {
        setActiveSlider((state) =>
          state === 0 ? SliderList.length - 1 : state - 1
        );
      }
    }

    isDragging.current = false;
    startX.current = null;
    endX.current = null;
  };

  useEffect(() => {
    SliderContainer.current?.scrollTo({
      left: SliderContainer.current.offsetWidth * activeSlider,
      behavior: "smooth",
    });
  }, [activeSlider]);

  useEffect(() => {
    if (isLoading) return;

    const interval = setInterval(() => {
      setActiveSlider((prev) =>
        prev === SliderList.length - 1 ? 0 : prev + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [isLoading]);

  return (
    <div className="relative medium:h-[380px] h-[300px] bg-black flex justify-center">
      <div className="bg-gradient-to-b from-transparent to-[#111111] absolute h-full w-full top-0 left-0 z-10"></div>
      <div
        className="h-full w-full flex overflow-hidden select-none"
        ref={SliderContainer}
        onTouchStart={(e) => handleStart(e.touches[0].clientX)}
        onTouchMove={(e) => handleMove(e.touches[0].clientX)}
        onTouchEnd={handleEnd}
        onMouseDown={(e) => handleStart(e.clientX)}
        onMouseMove={(e) => handleMove(e.clientX)}
        onMouseUp={handleEnd}
        onMouseLeave={handleEnd}
        onDragStart={(e) => e.preventDefault()}
      >
        {isLoading
          ? Array.from({ length: 3 }).map((_, id) => (
              <SliderCardSkeleton key={id} />
            ))
          : SliderList.map((movie: TMovieCard, i: number) =>
              movie ? (
                <SliderCard eager={i == 0} key={movie.id} movie={movie} />
              ) : null
            )}
      </div>
      <div className="my_container h-6 z-20 bottom-0 absolute right-2 mobile:right-auto">
        <div
          className={`flex mobile:gap-3 gap-2.5 items-center absolute h-6 mobile:bottom-7 bottom-3 right-0 px-[15px] ${
            isLoading ? "animate-pulse" : ""
          } `}
        >
          {SliderList.map((_, i) => (
            <div
              key={i}
              onClick={() => setActiveSlider(i)}
              className={`mobile:h-[12px] h-[10px] cursor-pointer aspect-square rounded-xl ${
                activeSlider === i
                  ? "bg-white"
                  : "bg-white/50 transition-colors hover:bg-white/80"
              }`}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SliderCard({ movie, eager }: { movie: TMovieCard; eager?: boolean }) {
  return (
    <div className="relative w-full h-full shrink-0 select-none ">
      <div className="my_container relative z-20 h-full flex items-end mobile:py-10 py-4 ">
        <div className="flex flex-col tracking-wider mobile:gap-0 gap-1">
          <h3 className="text-head mobile:text-[20px] text-[18px] ">
            {movie.name}
          </h3>
          <h4 className="text-white/60 mobile:text-[18px] text-[16px]">
            {movie.name_eng} ({movie.year})
          </h4>
          <div className="flex items-center mobile:gap-4 gap-2  text-[15px] tracking-wider mt-1">
            <IMDbIcon className="mobile:h-[30px] mobile:w-[40px]  w-[36px]" />
            {Number(movie.imdb).toFixed(1)}
          </div>
          <button className="h-[38px] w-[150px] mobile:flex hidden bg-main cursor-pointer transition-colors hover:bg-mainHover text-white text-lg items-center gap-2 justify-center mt-4">
            უყურე
          </button>
        </div>
      </div>
      <div className="absolute w-full top-0 left-0 h-full z-[2] bg-gradient-to-r from-bodyBg/80 to-bodyBg/10"></div>
      <img
        src={"https://cdn.moviesgo.ge/" + movie.thumbnail_url}
        alt={movie.name + " | " + movie.name_eng}
        loading={eager ? "eager" : "lazy"}
        className="h-full w-full min-h-full top-0 left-0 absolute object-cover medium:object-[0px_-200px]"
      />
    </div>
  );
}

function SliderCardSkeleton() {
  return (
    <div className="relative w-full h-full shrink-0 select-none ">
      <div className="my_container relative z-20 h-full flex items-end py-10 tracking-[-1px]">
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
