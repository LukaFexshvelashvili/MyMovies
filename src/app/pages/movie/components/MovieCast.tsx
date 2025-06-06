import { TCast } from "../../../types/MovieTypes";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  SliderLeftArrowIcon,
  SliderRightArrowIcon,
  AvatarFallbackIcon,
} from "../../../../assets/icons/MyIcons";
import { useRef, useState } from "react";

const SkeletonCard = () => (
  <div className="w-[140px] mobile:w-[180px] h-[225px] mobile:h-[285px] bg-[#1f1f1f] overflow-hidden animate-pulse">
    <div className="w-[140px] mobile:w-[180px] h-[140px] mobile:h-[180px] bg-black/20" />
    <div className="p-3 mobile:p-4 space-y-3">
      <div className="h-3 mobile:h-4 bg-white/10 w-3/4" />
      <div className="h-3 mobile:h-4 bg-white/5" />
    </div>
  </div>
);

export default function MovieCast({
  casts,
  castsLoading,
}: {
  casts: { cast: TCast[] | null } | undefined;
  castsLoading: boolean;
}) {
  const swiperRef = useRef<any>(null);
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  if (casts?.cast?.length == 0 && !castsLoading) return null;

  const handleImageError = (actorId: string | number) => {
    setImageErrors((prev) => ({ ...prev, [actorId.toString()]: true }));
  };

  return (
    <>
      <div className="flex items-center justify-between mobile:mb-5 mb-3 mt-6">
        <h2 className="text-textHead mobile:text-xl text-lg block">
          მსახიობები
        </h2>
        <div className="flex items-center justify-end gap-4 h-10 text-textDesc select-none">
          <SliderLeftArrowIcon
            type="button"
            className="hover:text-textHead cursor-pointer transition-colors duration-200"
            onClick={() => swiperRef.current?.slidePrev()}
          />
          <SliderRightArrowIcon
            type="button"
            className="hover:text-textHead cursor-pointer transition-colors duration-200"
            onClick={() => swiperRef.current?.slideNext()}
          />
        </div>
      </div>
      <Swiper
        spaceBetween={12}
        slidesPerView="auto"
        freeMode={true}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        className="w-full select-none"
        lazyPreloadPrevNext={1}
      >
        {castsLoading ? (
          <>
            {[...Array(10)].map((_, index) => (
              <SwiperSlide
                key={`skeleton-${index}`}
                className="!w-[140px] mobile:!w-[180px]"
              >
                <SkeletonCard />
              </SwiperSlide>
            ))}
          </>
        ) : (
          casts?.cast?.map((actor) => (
            <SwiperSlide
              key={actor.id}
              className="!w-[140px] mobile:!w-[180px]"
            >
              <div className="group relative flex flex-col bg-black/15 w-[140px] mobile:w-[180px] h-[225px] mobile:h-[285px] overflow-hidden transition-all duration-300 hover:shadow-2xl hover:bg-black/20">
                <div className="relative w-[140px] mobile:w-[180px] h-[140px] mobile:h-[180px] overflow-hidden">
                  {imageErrors[actor.id.toString()] ? (
                    <div className="w-full h-full flex items-center justify-center bg-black/20">
                      <AvatarFallbackIcon className="text-white/25 w-12 mobile:w-16 h-12 mobile:h-16" />
                    </div>
                  ) : (
                    <img
                      src={
                        "https://media.themoviedb.org/t/p/w235_and_h235_face" +
                        actor.profile_path
                      }
                      className="w-full h-full object-cover transition-all duration-300 group-hover:brightness-110"
                      height={180}
                      width={180}
                      alt={"Actor | " + actor.name}
                      onError={() => handleImageError(actor.id)}
                      loading="lazy"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="relative flex flex-col p-3 mobile:p-4 gap-1 transition-all duration-300 group-hover:translate-y-[-4px]">
                  <p className="text-textHead text-[14px] mobile:text-[16px] font-medium line-clamp-1 group-hover:text-white transition-colors duration-300 tracking-wider">
                    {actor.name}
                  </p>
                  <p className="text-textDesc text-[12px] mobile:text-[14px] font-medium line-clamp-2 min-h-[32px] mobile:min-h-[40px] group-hover:text-white/80 transition-colors duration-300">
                    {actor.character}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))
        )}
      </Swiper>
    </>
  );
}
