import { useQuery } from "@tanstack/react-query";
import { TMovieCard } from "../../types/MovieTypes";
import MovieCard, { MovieCardSkeleton } from "../../../components/MovieCard";
import useOverlayStore from "../../store/useOverlay";
import { useBookmarks } from "../../store/useBookmarks";
import { fetchBookmarks } from "../../../api/ServerFunctions";
import { CloseIcon } from "../../../assets/icons/MyIcons";

export default function BookmarksOverlay() {
  const { bookmarksOverlay, setBookmarksOverlay } = useOverlayStore();
  const { bookmarks } = useBookmarks();
  const { data, isPending } = useQuery<TMovieCard[] | null>({
    queryKey: ["bookmarks", bookmarks],
    queryFn: () =>
      bookmarks.length ? fetchBookmarks(bookmarks) : Promise.resolve([]),
  });

  if (bookmarksOverlay == false) return null;

  return (
    <div
      className={`fixed h-full w-full top-0 z-50 transition-all duration-300 flex justify-end`}
    >
      <div
        className={`h-full w-[260px] mobile:w-[350px] bg-sidebarBg relative top-0 right-0 z-10 case_up duration-250 transition-transform flex flex-col slideInAnimate`}
      >
        <div
          onClick={() => setBookmarksOverlay(false)}
          className="absolute right-3 top-2 text-lg text-textHead2 h-8 aspect-square z-20 cursor-pointer rounded-[20px] bg-white/5 hover:bg-white/10 p-1 transition-colors"
        >
          <CloseIcon />
        </div>
        <div className="border-b border-white/10 py-3 text-textDesc text-center">
          {" "}
          ჩანიშნული ფილმები
        </div>
        <div className="flex flex-col py-5 px-2 items-center mobile:gap-5 gap-3 overflow-y-auto flex-1 no_mobile_scrollbar">
          {isPending ? (
            <>
              <MovieCardSkeleton bg_clear small />
              <MovieCardSkeleton bg_clear small />
              <MovieCardSkeleton bg_clear small />
              <MovieCardSkeleton bg_clear small />
            </>
          ) : (
            data?.map((data: TMovieCard) => (
              <MovieCard key={data.id} small movie={data} />
            ))
          )}
        </div>
      </div>
      <div
        className={`h-full w-full bg-[rgba(0,0,0,0.4)] transition-opacity opacity-100 absolute top-0 left-0`}
        onClick={() => setBookmarksOverlay(false)}
      ></div>
    </div>
  );
}
