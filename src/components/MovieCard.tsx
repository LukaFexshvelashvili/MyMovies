import { IMDbIcon } from "../assets/icons/MyIcons";

export default function MovieCard() {
  return (
    <div className="w-[350px] hover:bg-[#323232] pb-2.5 cursor-pointer transition-colors">
      <div className="relative w-full aspect-video bg-[#3b3b3b]">
        <img
          src="https://cdn.moviesgo.ge/uploads/823/tQyTM1H.webp"
          alt=""
          className="h-full w-full object-cover"
        />
        <div className="bg-gradient-to-t from-[rgba(0,0,0,0.8)] to-transparent absolute bottom-0 left-0 h-2/4 w-full"></div>
        <div className=" px-2.5 absolute z-[2] bottom-3">
          <div className="flex items-center gap-2 font-mainSemiBold text-sm tracking-wider">
            <IMDbIcon className="w-[40px] h-[18px]" />
            7.1
          </div>
        </div>
      </div>
      <div className="flex items-start justify-between px-2.5 pr-1  mt-2.5">
        <div className="flex flex-col gap-1 case_up uppercase tracking-wider">
          <p className="text-textHead font-mainMedium text-[16px]">
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
