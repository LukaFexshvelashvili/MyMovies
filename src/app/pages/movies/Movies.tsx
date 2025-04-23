import {
  DropDownIcon,
  SortHorizontalIcon,
  SortVerticalIcon,
} from "../../../assets/icons/MyIcons";
import Filters from "../../../components/Filters";
import MovieCard, { MovieCardWide } from "../../../components/MovieCard";

export default function Movies() {
  return (
    <main>
      <div className="bg-[rgb(17,_17,_17)] h-[200px] bg-[url('decorations/background.svg')] bg-no-repeat bg-cover bg-center w-full"></div>
      <RatedMovies />
      <Filters />
      <div className="my_container flex justify-between items-center py-5">
        <div className="flex items-center gap-5">
          <p className="text-textDesc">329 შედეგი</p>
          <div className="flex gap-2 flex-wrap"></div>
        </div>
        <div className="flex items-center gap-5">
          <div className=" border border-white/5 text-textDescLight h-[36px] gap-2 flex items-center px-4 cursor-pointer hover:bg-white/5 transition-colors">
            დამატების თარიღით{" "}
            <DropDownIcon className="h-[12px] aspect-square " />
          </div>
          <div className="h-5 aspect-square flex justify-center items-center cursor-pointer">
            <SortHorizontalIcon className="h-[15px] aspect-square [&>path]:fill-main" />
          </div>
          <div className="h-5 aspect-square flex justify-center items-center cursor-pointer">
            <SortVerticalIcon className="h-[15px] aspect-square [&>path]:fill-lightBlack" />
          </div>
        </div>
      </div>
      <div className="my_container">
        <div className="flex flex-col py-5 divide-y divide-white/5">
          <MovieCardWide />
          <MovieCardWide />
          <MovieCardWide />
          <MovieCardWide />
        </div>
      </div>
    </main>
  );
}

function RatedMovies() {
  return (
    <div className="h-[350px] relative bg-black bg-[url('decorations/movies.png')] w-full">
      <div className="absolute top-0 left-0 h-full w-full bg-black/70"></div>
      <div className="my_container relative h-full flex items-center overflow-hidden gap-8">
        <div className="flex flex-col text-xl shrink-0">რჩეული ფილმები</div>
        <div className="">
          <div className="flex gap-3 overflow-x-hidden overflow-y-auto">
            <MovieCard small />
            <MovieCard small />
            <MovieCard small />
            <MovieCard small />
            <MovieCard small />
          </div>
        </div>
      </div>
    </div>
  );
}
