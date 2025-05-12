import { useEffect, useRef, useState } from "react";
import MovieSlider from "./MovieSlider";
import { NewsIcon } from "../assets/icons/MyIcons";
import { useQuery } from "@tanstack/react-query";
import useDebounce from "../app/hooks/useDebounce";
import { fetchMoviesList, fetchQuickSearch } from "../api/ServerFunctions";
import MovieCard from "./MovieCard";
import { TMovieCard } from "../app/types/MovieTypes";
import { THomeList } from "../app/pages/home/Home";
import { useWatchHistory } from "../app/store/useWatchHistory";
import { useNavigate } from "react-router";

export default function QuickSearch(props: { hideSearch: Function }) {
  const { history } = useWatchHistory();
  const { data: moviesList, isLoading } = useQuery<THomeList>({
    queryKey: ["moviesList"],
    queryFn: () => fetchMoviesList(history),
    staleTime: 1000000,
  });
  return (
    <div className="fixed h-full w-full top-0 left-0  z-70 py-10">
      <div
        className="absolute top-0 left-0 h-full w-full bg-black/80 z-0"
        onClick={() => props.hideSearch()}
      ></div>
      <div className="my_container relative">
        <QuickSearchAction />
        {/* <div className="mt-10">
          <p className="text-textHead font-mainMedium  text-[17px] tracking-wider text-center case_up">
            კატეგორიები
          </p>
          <div className="flex items-center justify-center flex-wrap gap-5 mt-8">
            <button className="w-[200px] h-[44px] bg-bodyBg border-2 border-[#2b2b2b] cursor-pointer hover:bg-[#242424]">
              ფილმები
            </button>
            <button className="w-[200px] h-[44px] bg-bodyBg border-2 border-[#2b2b2b] cursor-pointer hover:bg-[#242424]">
              სერიალები
            </button>
            <button className="w-[200px] h-[44px] bg-bodyBg border-2 border-[#2b2b2b] cursor-pointer hover:bg-[#242424]">
              ანიმეები
            </button>
            <button className="w-[200px] h-[44px] bg-bodyBg border-2 border-[#2b2b2b] cursor-pointer hover:bg-[#242424]">
              ანიმაციები
            </button>
            <button className="w-[200px] h-[44px] bg-bodyBg border-2 border-[#2b2b2b] cursor-pointer hover:bg-[#242424]">
              თურქული
            </button>
            <button className="w-[200px] h-[44px] bg-bodyBg border-2 border-[#2b2b2b] cursor-pointer hover:bg-[#242424]">
              დორამები
            </button>
          </div>
        </div> */}
        <div className="mt-10">
          <MovieSlider
            isLoading={isLoading}
            list={moviesList?.news}
            icon={<NewsIcon />}
            clear_skeletons
            title="ახალი დამატებული"
            link=""
          />
        </div>
      </div>
    </div>
  );
}

function QuickSearchAction() {
  const navigate = useNavigate();
  const searchInput = useRef<null | HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState("");
  const debouncedInput = useDebounce(inputValue, 500);

  const {
    data: movies,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["quickSearch", debouncedInput],
    queryFn: () => fetchQuickSearch(debouncedInput),
    enabled: !!debouncedInput,
    staleTime: 100000,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (searchInput.current) {
      searchInput.current.focus();
    }
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate("/search/" + inputValue);
  };
  return (
    <>
      {" "}
      <div className="w-full">
        <form onSubmit={(e) => handleSubmit(e)}>
          <input
            type="text"
            className="h-[46px] bg-[#1a1a1a] border-2 border-[#2b2b2b] w-full placeholder:text-[#757575] font-mainRegular"
            placeholder="ძიება"
            ref={searchInput}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </form>
      </div>
      {debouncedInput ? (
        <div className="mt-4">
          {isLoading && (
            <div className="relative h-[150px]">
              <div className="my_loader"></div>
            </div>
          )}
          {isError && (
            <p className="text-center text-lg text-rose-600">
              სერვერზე ხარვეზია სცადეთ მოგვიანებით
            </p>
          )}
          {movies?.length > 0 ? (
            <div className="flex gap-3">
              {movies.map((movie: TMovieCard) => {
                return <MovieCard movie={movie} />;
              })}
            </div>
          ) : (
            !isLoading && (
              <p className="text-center text-lg text-textDescLight">
                შედეგი ვერ მოიძებნა
              </p>
            )
          )}
        </div>
      ) : (
        <p className="text-textDesc my-6 text-center text-lg font-mainSemiBold">
          ძიება...
        </p>
      )}
    </>
  );
}
