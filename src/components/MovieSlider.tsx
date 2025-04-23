import { Link } from "react-router";
import MovieCard from "./MovieCard";

type TMovieSlider = {
  title: string;
  icon: React.ReactNode;
  link: string;
};
export default function MovieSlider({ title, icon, link }: TMovieSlider) {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center gap-3 case_up">
        <div
          className={`h-8 aspect-square rounded-[20px] bg-main flex justify-center items-center p-1.5`}
        >
          {icon}
        </div>
        <p className="text-textHead font-mainMedium  text-[17px] tracking-wider">
          {title}
        </p>
        <div className="flex items-center gap-2.5">
          <span className="text-textDesc">/</span>
          <Link
            to={link}
            className="text-textDesc font-mainMedium  hover:text-main transition-colors"
          >
            ყველა
          </Link>
        </div>
      </div>
      <div className="flex gap-5 overflow-x-hidden overflow-y-auto">
        <MovieCard />
        <MovieCard />
        <MovieCard />
        <MovieCard />
        <MovieCard />
      </div>
    </div>
  );
}
