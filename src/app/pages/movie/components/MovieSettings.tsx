import React from "react";
import useAlerts from "../../../store/useAlerts";
import { useBookmarks } from "../../../store/useBookmarks";
import {
  BookmarkIcon,
  HeartIcon,
  IMDbIcon,
  ShareIcon,
  WarningIcon,
} from "../../../../assets/icons/MyIcons";
import { SkeletonSection } from "../../../components/Overlays/DetailOverlay";
import { TMovie } from "../../../types/MovieTypes";
import useDetailsOverlay from "../../../store/useDetailsOverlay";

export default function MovieSettings({
  id,
  movie,
  isLoading,
}: {
  id: number | string;
  movie: TMovie | undefined;
  isLoading: boolean;
}) {
  const { setDetailsId } = useDetailsOverlay();
  const { bookmarks, addToBookmarks, removeFromBookmarks } = useBookmarks();
  const { addAlert } = useAlerts();
  const toggleBookmark = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    e.stopPropagation();
    if (bookmarks.includes(Number(id))) {
      removeFromBookmarks(Number(id));
      addAlert({
        title: "ჩანიშვნა გაუქმებულია",
      });
    } else {
      addToBookmarks(Number(id));
      addAlert({
        title: "ჩანიშვნა დამატებულია",
      });
    }
  };
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center mobile:gap-3 gap-2 mobile:py-3 py-3 select-none">
        <div
          onClick={() =>
            addAlert({
              title: "ფილმი მოწონებულია",
            })
          }
          className="h-[36px] aspect-square rounded-[20px] flex justify-center items-center cursor-pointer bg-white/0 transition-colors hover:bg-white/10"
          aria-label="Like Movie Button"
        >
          <SkeletonSection
            isLoading={isLoading}
            placeholder="OS"
            show={<HeartIcon height={16} className="text-white/90" />}
          />
        </div>
        <div
          onClick={toggleBookmark}
          className="h-[36px] aspect-square rounded-[20px] flex justify-center items-center cursor-pointer bg-white/0 transition-colors hover:bg-white/10"
          aria-label="Bookmark Movie Button"
        >
          <SkeletonSection
            isLoading={isLoading}
            placeholder="OS"
            show={
              <BookmarkIcon
                height={16}
                className={`${
                  !bookmarks.includes(Number(id))
                    ? "text-white/90"
                    : "text-main"
                }`}
              />
            }
          />
        </div>

        <div
          className="h-[36px] aspect-square rounded-[20px] flex justify-center items-center cursor-pointer bg-white/0 transition-colors hover:bg-white/10"
          aria-label="Report Movie Problem Button"
        >
          <SkeletonSection
            isLoading={isLoading}
            placeholder="OS"
            show={<WarningIcon height={16} className="text-white/90" />}
          />
        </div>
        <div
          onClick={() => setDetailsId(Number(id))}
          className="h-[36px] aspect-square rounded-[20px] flex justify-center items-center cursor-pointer bg-white/0 transition-colors hover:bg-white/10"
          aria-label="Movie Share Button"
        >
          <SkeletonSection
            isLoading={isLoading}
            placeholder="OS"
            show={
              <>
                <ShareIcon height={18} className="text-white/90" />
              </>
            }
          />
        </div>
      </div>
      <div className="flex items-center gap-3 mobile:hidden tracking-wider text-white/90 text-[15px] font-robotoGeoCaps">
        <SkeletonSection
          isLoading={isLoading}
          placeholder="OS GE"
          show={
            <>
              <p className="">{movie?.imdb}</p>
              <IMDbIcon height={22} width={36} />
            </>
          }
        />
      </div>
    </div>
  );
}
