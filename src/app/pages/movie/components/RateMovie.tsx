import { useState } from "react";
import {
  IMDbIcon,
  RatingStarClearIcon,
} from "../../../../assets/icons/MyIcons";
import { SkeletonSection } from "../../../components/Overlays/DetailOverlay";
import { TMovie, TMovieCard } from "../../../types/MovieTypes";

export default function RateMovie(props: {
  data: { movie: TMovie; similar_movies: TMovieCard[] } | undefined;
  isLoading: boolean;
}) {
  const [userRating, setUserRating] = useState<number>(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  //   const submitRating = async () => {
  //     if (!userRating || !props.data) return;

  //     setIsSubmitting(true);
  //     try {
  //       // Replace this with your real API call:
  //       await new Promise((resolve) => setTimeout(resolve, 1000));

  //       alert(`Rated ${props.data.movie.name_eng} ${userRating} stars!`);
  //     } catch (err) {
  //       alert("Failed to submit rating.");
  //     } finally {
  //       setIsSubmitting(false);
  //     }
  //   };

  return (
    <div className="py-3.5 px-3 text-textDesc bg-[rgb(37,37,37)] hidden flex-col gap-3 text-sm mobile:flex">
      <p>რეიტინგი</p>
      <div className="flex items-center gap-3 text-textHead font-mainSemiBold text-sm">
        <IMDbIcon height={30} width={35} />
        <SkeletonSection
          isLoading={props.isLoading}
          placeholder="OS"
          show={<p>{props.data?.movie.imdb}</p>}
        />
        <span className="text-textDesc font-mainRegular tracking-wide">
          (-)
        </span>
      </div>

      <p>მომხმარებლების რეიტინგი</p>
      <div className="flex gap-3 items-center">
        <StarRating rating={userRating} onRate={setUserRating} />
        <p className="text-textHead font-mainSemiBold">{"-"}</p>

        <span className="text-textDesc font-mainRegular tracking-wide">
          (-)
        </span>
      </div>

      {userRating > 0 && (
        <button
          // onClick={submitRating}
          disabled={isSubmitting}
          className="mt-2 bg-main text-white py-1.5 hover:bg-mainHover transition text-sm font-robotoGeoCaps cursor-pointer"
        >
          შეფასება
        </button>
      )}
    </div>
  );
}

function StarRating({
  rating,
  onRate,
}: {
  rating: number;
  onRate?: (rate: number) => void;
}) {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <RatingStarClearIcon
          key={i}
          height={17}
          className={`cursor-pointer ${
            (hovered ?? rating) >= i ? "text-main" : "text-icon"
          }`}
          onMouseEnter={() => setHovered(i)}
          onMouseLeave={() => setHovered(null)}
          onClick={() => onRate?.(i)}
        />
      ))}
    </div>
  );
}
