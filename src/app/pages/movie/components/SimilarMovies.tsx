import MovieCard, { MovieCardSkeleton } from "../../../../components/MovieCard";
import { TMovieCard } from "../../../types/MovieTypes";

export default function SimilarMovies({
  isLoading,
  list,
}: {
  isLoading: boolean;
  list: TMovieCard[];
}) {
  return (
    <section className="my-10">
      <div className="my_container">
        <p className="text-textHead text-xl">მსგავსი</p>
        <div className="flex gap-3 justify-between mt-5 flex-wrap">
          {isLoading ? (
            <>
              <MovieCardSkeleton small />
              <MovieCardSkeleton small />
              <MovieCardSkeleton small />
              <MovieCardSkeleton small />
              <MovieCardSkeleton small />
              <MovieCardSkeleton small />
              <MovieCardSkeleton small />
              <MovieCardSkeleton small />
              <MovieCardSkeleton small />
              <MovieCardSkeleton small />
            </>
          ) : (
            list.map((movie: TMovieCard) => (
              <MovieCard key={movie.id} movie={movie} />
            ))
          )}
        </div>
      </div>
    </section>
  );
}
