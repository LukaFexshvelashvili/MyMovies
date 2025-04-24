import { useEffect, useRef } from "react";
import MovieSlider from "./MovieSlider";
import { NewsIcon } from "../assets/icons/MyIcons";

export default function QuickSearch(props: { hideSearch: Function }) {
  const searchInput = useRef<null | HTMLInputElement>(null);
  useEffect(() => {
    if (searchInput.current) {
      searchInput.current.focus();
    }
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="fixed h-full w-full top-0 left-0  z-30 py-10">
      <div
        className="absolute top-0 left-0 h-full w-full bg-black/70 z-0"
        onClick={() => props.hideSearch()}
      ></div>
      <div className="my_container relative">
        <div className="w-full">
          <input
            type="text"
            className="h-[46px] bg-[#1a1a1a] border-2 border-[#2b2b2b] w-full placeholder:text-[#757575] font-mainRegular"
            placeholder="ძიება"
            ref={searchInput}
          />
        </div>
        <p className="text-textDesc my-6 text-center text-lg font-mainSemiBold">
          მოძებნეთ...
        </p>
        <div className="mt-10">
          <MovieSlider icon={<NewsIcon />} title="ახალი დამატებული" link="" />
        </div>
      </div>
    </div>
  );
}
