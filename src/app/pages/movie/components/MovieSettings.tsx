import React from "react";
import useAlerts from "../../../store/useAlerts";
import { useBookmarks } from "../../../store/useBookmarks";
import {
  BookmarkIcon,
  HeartIcon,
  WarningIcon,
} from "../../../../assets/icons/MyIcons";

export default function MovieSettings({ id }: { id: number | string }) {
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
    <div className="flex items-center gap-3 py-5 select-none">
      <div
        onClick={() =>
          addAlert({
            title: "ფილმი მოწონებულია",
          })
        }
        className="h-[36px] aspect-square rounded-[20px] flex justify-center items-center cursor-pointer bg-white/0 transition-colors hover:bg-white/10"
        aria-label="Like Movie Button"
      >
        <HeartIcon height={16} className="text-icon" />
      </div>
      <div
        onClick={toggleBookmark}
        className="h-[36px] aspect-square rounded-[20px] flex justify-center items-center cursor-pointer bg-white/0 transition-colors hover:bg-white/10"
        aria-label="Bookmark Movie Button"
      >
        <BookmarkIcon
          height={16}
          className={`${
            !bookmarks.includes(Number(id)) ? "text-icon" : "text-main"
          }`}
        />
      </div>

      <div
        className="h-[36px] aspect-square rounded-[20px] flex justify-center items-center cursor-pointer bg-white/0 transition-colors hover:bg-white/10"
        aria-label="Report Movie Problem Button"
      >
        <WarningIcon height={16} className="text-icon" />
      </div>
    </div>
  );
}
