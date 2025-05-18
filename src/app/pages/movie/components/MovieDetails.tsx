import { MovieSkeletonSection } from "../Watch";
import { TMovie } from "../../../types/MovieTypes";
import { genres as allGenres, TGenre } from "../../../../api/themes";
import { Link } from "react-router";
export default function MovieDetails({
  movie,
  isLoading,
}: {
  movie: TMovie | undefined;
  isLoading: boolean;
}) {
  const selectedTitles = movie?.genres ? JSON.parse(movie.genres) : [];

  const wrappedGenres = allGenres.filter((genre: TGenre) =>
    selectedTitles.includes(genre.title)
  );
  return (
    <div className="flex items-start gap-5 mt-5">
      <div className="flex flex-col  gap-1  ">
        <div className="flex gap-4">
          <div className="flex-1 key text-white/40">
            <MovieSkeletonSection
              isLoading={isLoading}
              placeholder="OnSe"
              show={<p>წელი:</p>}
            />
          </div>
          <div className="flex-1 text-start value text-textHead2">
            {" "}
            <MovieSkeletonSection
              isLoading={isLoading}
              placeholder="Luka"
              show={<p>{movie?.year}</p>}
            />
          </div>
        </div>
        <div className="flex gap-4">
          <div className="flex-1 key text-white/40">
            <MovieSkeletonSection
              isLoading={isLoading}
              placeholder="OnService"
              show={<p>ხანგრძლივობა:</p>}
            />
          </div>
          <div className="flex-1 text-start value text-textHead2">
            {" "}
            <MovieSkeletonSection
              isLoading={isLoading}
              placeholder="Was"
              show={<p>-</p>}
            />
          </div>
        </div>
        <div className="flex gap-4">
          <div className="flex-1 key text-white/40">
            {" "}
            <MovieSkeletonSection
              isLoading={isLoading}
              placeholder="OnServi"
              show={<p>ქვეყანა:</p>}
            />
          </div>
          <div className="flex-1 text-start value text-textHead2">
            {" "}
            <MovieSkeletonSection
              isLoading={isLoading}
              placeholder="OnService"
              show={<p>{movie?.country}</p>}
            />
          </div>
        </div>
        <div className="flex gap-4">
          <div className="flex-1 key text-white/40">
            {" "}
            <MovieSkeletonSection
              isLoading={isLoading}
              placeholder="OnServic"
              show={<p>სტუდია:</p>}
            />
          </div>
          <div className="flex-1 text-start value text-textHead2">
            {" "}
            <MovieSkeletonSection
              isLoading={isLoading}
              placeholder="Here"
              show={<p>- </p>}
            />
          </div>
        </div>
        <div className="flex gap-4">
          <div className="flex-1 key text-white/40">
            {" "}
            <MovieSkeletonSection
              isLoading={isLoading}
              placeholder="OnServ"
              show={<p>ჟანრი:</p>}
            />
          </div>
          <div className="flex-1 text-start value text-textHead2">
            {" "}
            <p className="flex gap-3 flex-wrap !h-auto">
              <MovieSkeletonSection
                isLoading={isLoading}
                placeholder="OnService Luka Fexshvelashvili"
                show={
                  <>
                    {wrappedGenres.map((genre: TGenre, index: number) => (
                      <Link
                        to={`/search/a?genres=%5B"${genre.title}"%5D`}
                        key={index}
                        className="py-1 flex items-center px-3 bg-white/5 cursor-pointer text-white/50 hover:bg-white/10 hover:text-main transition-colors"
                      >
                        {genre.title}
                      </Link>
                    ))}
                  </>
                }
              />
            </p>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="flex-1 key text-white/40 ">
            {" "}
            <MovieSkeletonSection
              isLoading={isLoading}
              placeholder="OnService"
              show={<p>რეჟისორი:</p>}
            />
          </div>
          <div className="flex-1 text-start value text-textHead2">
            {" "}
            <MovieSkeletonSection
              isLoading={isLoading}
              placeholder="OS Digital"
              show={<p>{movie?.creator}</p>}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
