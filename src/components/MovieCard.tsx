import { IMDbIcon, TrailerIcon } from "../assets/icons/MyIcons";

type TMovieCard = {
  small?: boolean;
};
export default function MovieCard({ small }: TMovieCard) {
  return (
    <div
      className={` ${
        small ? "w-[290px]" : "w-[365px]"
      } group/card duration-200 cursor-pointer transition-colors shrink-0`}
    >
      <div className="relative w-full aspect-video bg-[#3b3b3b]">
        <div className="top-0 right-0 color-white absolute text-[13px] flex group-hover/card:opacity-0  pointer-events-none">
          <span className="bg-[#2c2c2cbb] px-1.5 py-0.5 flex justify-center items-center">
            ინგ
          </span>
          <span className="bg-main px-1.5 py-0.5 flex justify-center items-center">
            ქარ
          </span>
        </div>
        <div className="h-full w-full absolute top-0 left-0 bg-[rgba(0,0,0,0.5)]  pointer-events-none group-hover/card:pointer-events-auto opacity-0 group-hover/card:opacity-100 z-90">
          <div
            className="absolute top-3 right-3 my_tooltip flex justify-center"
            aria-title="თრეილერი"
          >
            <TrailerIcon className="h-5 aspect-square" />
          </div>
        </div>
        <img
          src="https://cdn.moviesgo.ge/uploads/823/tQyTM1H_sm2.webp"
          alt=""
          loading="lazy"
          className="h-full w-full object-cover"
        />
        <div className="bg-gradient-to-t from-[rgba(0,0,0,0.85)] to-transparent absolute bottom-0 left-0 h-2/4 w-full"></div>
        <div className=" px-2.5 absolute z-[2] bottom-2">
          <div className="flex items-center gap-2 font-mainSemiBold text-sm tracking-wider">
            <IMDbIcon className="w-[40px] h-[18px]" />
            7.1
          </div>
        </div>
      </div>
      <div className="flex items-start justify-between px-2.5 pr-1 pt-2.5  pb-2.5 group-hover/card:bg-[#ffffff]/10">
        <div className="flex flex-col gap-1 case_up uppercase tracking-wide">
          <p className="text-textHead font-robotoGeoCaps text-[16px]">
            ლილო და სტიჩი
          </p>
          <p className="text-textDesc text-[15px]">Lilo & Stitch</p>
        </div>
        <div className="h-[32px] aspect-square flex justify-center items-center rounded-full transition-colors hover:bg-[rgba(255,255,255,0.1)] cursor-pointer">
          <div className="flex flex-col gap-[3px] cursor-pointer">
            <div className="bg-[rgba(255,255,255,0.8)] h-[3px] aspect-square rounded-[6px]"></div>
            <div className="bg-[rgba(255,255,255,0.8)] h-[3px] aspect-square rounded-[6px]"></div>
            <div className="bg-[rgba(255,255,255,0.8)] h-[3px] aspect-square rounded-[6px]"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
