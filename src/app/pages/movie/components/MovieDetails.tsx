import React from "react";
import { MovieSkeletonSection } from "../Movie";
import { TMovie, TMovieCard } from "../../../types/MovieTypes";

export default function MovieDetails({
  data,
  isLoading,
}: {
  data:
    | {
        movie: TMovie;
        similar_movies: TMovieCard[];
      }
    | undefined;
  isLoading: boolean;
}) {
  return (
    <div className="flex items-start gap-5 mt-5">
      <div className="flex flex-col  gap-1  text-end">
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
              show={<p>{data?.movie.year}</p>}
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
              show={<p>- წუთი</p>}
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
              show={<p>{data?.movie.country}</p>}
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
                  data?.movie.genres
                    ? JSON.parse(data.movie.genres).map(
                        (genre: string, index: number) => (
                          <a
                            href=""
                            key={index}
                            className="py-1 flex items-center px-3 bg-white/5 cursor-pointer text-white/50 hover:bg-white/10 hover:text-main transition-colors"
                          >
                            {genre}
                          </a>
                        )
                      )
                    : null
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
              show={<p>{data?.movie.creator}</p>}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
