import MovieCard, { MovieCardSkeleton } from "../../../../components/MovieCard";

export default function SimilarMovies() {
  return (
    <section className="my-10">
      <div className="my_container">
        <p className="text-textHead text-xl">მსგავსი</p>
        <div className="flex gap-3 justify-between mt-5 flex-wrap">
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
        </div>
      </div>
    </section>
  );
}
