import { Link } from "react-router";
import {
  AnimationsIcon,
  AnimesIcon,
  ContinueWatchIcon,
  NewsIcon,
  PlayIcon,
  PopularsIcon,
} from "../../../assets/icons/MyIcons";
import MovieCard from "../../../components/MovieCard";
import MainSlider from "./components/MainSlider";

export default function Home() {
  return (
    <main>
      <MainSlider />
      <div className="my_container my-10">
        <ContinueWatchSection />
      </div>
      <div className="bg-[rgb(17,_17,_17)] py-10 bg-[url('decorations/background.svg')] bg-no-repeat bg-cover bg-center">
        <div className="my_container">
          <SliderSection icon={<NewsIcon />} title="ახალი დამატებული" link="" />
        </div>
      </div>
      <div className="my_container my-10">
        <PopularsSection icon={<PopularsIcon />} title="პოპულარული" link="" />
      </div>
      <div
        className="bg-[rgb(17,_17,_17)] py-10 bg-[url('decorations/animesBg.png')] bg-no-repeat bg-cover bg-center"
        style={{ "--color-main": "#E24456" } as React.CSSProperties}
      >
        <div className="my_container">
          <SliderSection icon={<AnimesIcon />} title="ანიმეები" link="" />
        </div>
      </div>
      <div className="my_container my-10">
        <SliderSection
          icon={<PlayIcon className="h-4 " />}
          title="თრეილერები"
          link=""
        />
      </div>
      <div
        className="bg-[rgb(17,_17,_17)] py-10 bg-[url('decorations/tvShowsBg.png')] bg-no-repeat bg-cover bg-center"
        style={{ "--color-main": "#1093cf" } as React.CSSProperties}
      >
        <div className="my_container">
          <SliderSection icon={<AnimationsIcon />} title="სერიალები" link="" />
        </div>
      </div>
      <div
        className="bg-[rgb(17,_17,_17)] py-10 bg-[url('decorations/animationsBg.png')] bg-no-repeat bg-cover bg-center"
        style={{ "--color-main": "#01b698" } as React.CSSProperties}
      >
        <div className="my_container">
          <SliderSection icon={<AnimationsIcon />} title="ანიმაციები" link="" />
        </div>
      </div>

      {/* <div className="my_loader"></div> */}
    </main>
  );
}

type TPopularsSection = {
  title: string;
  icon: React.ReactNode;
  link: string;
};
function PopularsSection({ title, icon, link }: TPopularsSection) {
  return (
    <>
      <div className="flex items-center gap-4 mb-6 case_up">
        <div className="h-8 aspect-square rounded-[20px] bg-main flex justify-center items-center p-1.5">
          {icon}
        </div>
        <p className="text-textHead font-mainMedium  text-xl tracking-wider">
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
      <div className="flex gap-5 overflow-x-hidden overflow-y-auto flex-wrap justify-between">
        <MovieCard small />
        <MovieCard small />
        <MovieCard small />
        <MovieCard small />
        <MovieCard small />
        <MovieCard small />
        <MovieCard small />
        <MovieCard small />
        <MovieCard small />
        <MovieCard small />
      </div>
    </>
  );
}

type TSliderSection = {
  title: string;
  icon: React.ReactNode;
  link: string;
};
function SliderSection({ title, icon, link }: TSliderSection) {
  return (
    <>
      <div className="flex items-center gap-4 mb-6 case_up">
        <div
          className={`h-8 aspect-square rounded-[20px] bg-main flex justify-center items-center p-1.5`}
        >
          {icon}
        </div>
        <p className="text-textHead font-mainMedium  text-xl tracking-wider">
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
    </>
  );
}

function ContinueWatchSection() {
  return (
    <>
      <div className="flex items-center gap-4 mb-6 case_up">
        <div className="h-8 aspect-square rounded-[20px] bg-main flex justify-center items-center p-1.5">
          <ContinueWatchIcon />
        </div>
        <p className="text-textHead font-mainMedium  text-xl tracking-wider">
          განაგრძე ყურება{" "}
        </p>
        <div className="flex items-center gap-2.5">
          <span className="text-textDesc">/</span>
          <Link
            to={""}
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
    </>
  );
}
