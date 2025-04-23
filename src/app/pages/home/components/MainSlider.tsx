import { IMDbIcon } from "../../../../assets/icons/MyIcons";

export default function MainSlider() {
  return (
    <div className="relative h-[470px] bg-black flex justify-center">
      <div className="relative w-full h-full">
        <div className="my_container relative z-20 h-full flex items-end py-10">
          <div className="flex flex-col tracking-wider">
            <h3 className="text-head text-[20px]">პადინგტონი პერუში</h3>
            <h4 className="text-textDesc text-[18px]">
              Paddington in Peru (2024)
            </h4>
            <div className="flex items-center gap-4 font-mainSemiBold text-md tracking-wider mt-1">
              <IMDbIcon className="h-[30px] w-[40px]" />
              7.1
            </div>
            <button className="h-[38px] w-[150px] bg-main cursor-pointer transition-colors hover:bg-mainHover text-white text-lg flex items-center gap-2 justify-center mt-4">
              უყურე
            </button>
          </div>
        </div>
        <div className="absolute w-full top-0 left-0 h-full z-[2] bg-gradient-to-r from-bodyBg/80 to-bodyBg/10"></div>
        <img
          src="https://cdn.moviesgo.ge/uploads/227/tQXhDuK.webp"
          alt=""
          className="h-full w-full top-0 left-0 absolute object-cover object-[0px_-200px]"
        />
      </div>
      <div className="my_container  h-6 z-20 bottom-0 absolute">
        <div className="flex gap-3 items-center absolute h-6 bottom-7 right-0 px-[15px]">
          <div className="h-[12px] cursor-pointer aspect-square bg-white rounded-xl"></div>
          <div className="h-[12px] cursor-pointer aspect-square bg-white/50 rounded-xl transition-colors hover:bg-white/80 "></div>
          <div className="h-[12px] cursor-pointer aspect-square bg-white/50 rounded-xl transition-colors hover:bg-white/80 "></div>
          <div className="h-[12px] cursor-pointer aspect-square bg-white/50 rounded-xl transition-colors hover:bg-white/80 "></div>
          <div className="h-[12px] cursor-pointer aspect-square bg-white/50 rounded-xl transition-colors hover:bg-white/80 "></div>
          <div className="h-[12px] cursor-pointer aspect-square bg-white/50 rounded-xl transition-colors hover:bg-white/80 "></div>
        </div>
      </div>
    </div>
  );
}
