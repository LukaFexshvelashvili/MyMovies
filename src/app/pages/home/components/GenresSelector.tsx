import { Swiper, SwiperSlide } from "swiper/react";
import { genres, TGenre } from "../../../../api/themes";
import { Link } from "react-router";

export default function GenresSelector() {
  return (
    <div>
      {" "}
      <Swiper
        lazyPreloadPrevNext={1}
        slidesPerView="auto"
        spaceBetween={10}
        centeredSlides={false}
        watchOverflow={true}
        resistanceRatio={0}
        slidesOffsetAfter={10}
        className="w-full"
      >
        {" "}
        {genres.map((genre) => (
          <SwiperSlide className=" !w-[300px]">
            <GenreBlock genre={genre} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

function GenreBlock({ genre }: { genre: TGenre }) {
  return (
    <div className="relative h-[130px] w-[300px] select-none cursor-pointer group">
      <Link to={`/search/a?genres=%5B"${genre.title}"%5D`}>
        <img
          src={genre.image}
          className="absolute top-0 left-0 h-full w-full object-cover"
          alt={genre.title + " | " + "MYMOVIES"}
          loading="lazy"
        />
        <div className="h-full w-full bg-black/60 relative flex items-center justify-center group-hover:bg-black/70 transition-colors">
          <h2 className="font-robotoGeoCaps text-lg tracking-wider">
            {genre.title}
          </h2>
        </div>
      </Link>
    </div>
  );
}
