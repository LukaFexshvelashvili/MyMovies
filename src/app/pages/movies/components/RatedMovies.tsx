import MovieCard, { MovieCardSkeleton } from "../../../../components/MovieCard";
import { TMovieCard } from "../../../types/MovieTypes";

export default function RatedMovies(props: {
  image: string;
  title: string;
  list?: undefined | TMovieCard[];
}) {
  return (
    <div className={`h-[350px] relative bg-black  w-full`}>
      <img
        src={props.image}
        className="absolute h-full w-full object-cover top-0 left-0 z-0"
        alt={props.title}
      />
      <div className="absolute top-0 left-0 h-full w-full bg-black/70"></div>
      <div className="my_container relative h-full flex items-center overflow-hidden gap-8">
        <div className="flex flex-col text-xl shrink-0">{props.title}</div>
        <div className="">
          <div className="flex gap-4 overflow-x-hidden overflow-y-auto">
            {props.list ? (
              props.list.map((movie: TMovieCard) => (
                <MovieCard small key={movie.id} movie={movie} />
              ))
            ) : (
              <>
                <MovieCardSkeleton small />
                <MovieCardSkeleton small />
                <MovieCardSkeleton small />
                <MovieCardSkeleton small />
                <MovieCardSkeleton small />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
