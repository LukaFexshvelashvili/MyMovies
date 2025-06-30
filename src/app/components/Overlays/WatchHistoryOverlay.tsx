import { useQuery } from "@tanstack/react-query";
import { TMovieCard } from "../../types/MovieTypes";
import MovieCard, { MovieCardSkeleton } from "../../../components/MovieCard";
import useOverlayStore from "../../store/useOverlay";
import { fetchHistory } from "../../../api/ServerFunctions";
import { useWatchHistory } from "../../store/useWatchHistory";
import { CloseIcon } from "../../../assets/icons/MyIcons";

export default function WatchHistoryOverlay() {
  const { historyOverlay, setHistoryOverlay } = useOverlayStore();
  const { history } = useWatchHistory();
  const { data, isPending } = useQuery<TMovieCard[] | null>({
    queryKey: ["watch_history", history],
    queryFn: () =>
      history.length ? fetchHistory(history) : Promise.resolve([]),
  });
  if (historyOverlay == false) return null;

  return (
    <div
      className={`fixed h-full w-full top-0 z-50 transition-all duration-300 flex justify-end translate-x`}
    >
      <div
        className={`h-full w-[260px] mobile:w-[350px] bg-sidebarBg relative top-0 right-0 z-10 case_up duration-250 transition-transform flex flex-col slideInAnimate`}
      >
        <div
          onClick={() => setHistoryOverlay(false)}
          className="absolute right-3 top-2 text-lg text-textHead2 h-8 aspect-square z-20 cursor-pointer rounded-[20px] bg-white/5 hover:bg-white/10 p-1 transition-colors"
        >
          <CloseIcon />
        </div>
        <div className="border-b border-white/10 py-3 text-textDesc text-center ">
          {" "}
          ბოლოს ნანახი
        </div>
        <div className="flex flex-col py-5 px-2 items-center  mobile:gap-5 gap-3 overflow-y-auto flex-1 no_mobile_scrollbar">
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
        onClick={() => setHistoryOverlay(false)}
      ></div>
    </div>
  );
}
