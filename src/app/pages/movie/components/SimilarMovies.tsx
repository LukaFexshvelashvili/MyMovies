import MovieCard, { MovieCardSkeleton } from "../../../../components/MovieCard";
import { TMovieCard } from "../../../types/MovieTypes";

export default function SimilarMovies({
  isActive,
  isLoading,
  list,
}: {
  isActive: boolean;
  isLoading: boolean;
  list: TMovieCard[];
}) {
  return (
    <section
      className={`${isActive ? "block" : "hidden mobile:block"} mobile:my-10`}
    >
      <div className="my_container">
        <p className="text-textHead text-xl mobile:block hidden">მსგავსი</p>
        <div className="flex gap-3 justify-between mt-5 flex-wrap">
          {isLoading ? (
            <>
              <MovieCardSkeleton mobile_full small />
              <MovieCardSkeleton mobile_full small />
              <MovieCardSkeleton mobile_full small />
              <MovieCardSkeleton mobile_full small />
              <MovieCardSkeleton mobile_full small />
              <MovieCardSkeleton mobile_full small />
              <MovieCardSkeleton mobile_full small />
              <MovieCardSkeleton mobile_full small />
              <MovieCardSkeleton mobile_full small />
              <MovieCardSkeleton mobile_full small />
            </>
          ) : (
            list.map((movie: TMovieCard) => (
              <MovieCard mobile_full key={movie.id} movie={movie} />
            ))
          )}
        </div>
      </div>
    </section>
  );
}
