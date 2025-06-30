import { MovieSkeletonSection } from "../Watch";
import { decodeHtmlEntities } from "../../../hooks/Customs";
import { TCast, TMovie } from "../../../types/MovieTypes";
import RateMovie from "./RateMovie";
import MovieDetails from "./MovieDetails";
import { useBreakpoint } from "../../../hooks/useBreakpoint";
import MovieCast from "./MovieCast";

export default function MovieInformation({
  isActive,
  movie,
  isLoading,
  casts,
  castsLoading,
}: {
  isActive: boolean;
  movie: TMovie | undefined;
  isLoading: boolean;
  casts: { cast: TCast[] | null } | undefined;
  castsLoading: boolean;
}) {
  const isMobile = useBreakpoint(768);
  const addons = movie?.addons ? JSON.parse(movie.addons) : [];

  return (
    <section className={`${isActive ? "block" : "hidden mobile:block"}`}>
      <div className="my_container">
        <div className="mobile:flex block items-start gap-8 max-mobile:gap-4">
          <div className="mobile:w-[240px] w-full mobile:flex mobile:flex-col shrink-0 gap-4 ">
            <div className="aspect-[2/3] w-full bg-[rgb(37,37,37)] max-w-[140px] mobile:max-w-[unset] mobile:float-none mobile:mr-0 float-left mr-3 mobile:m-0">
              {movie?.poster_url && (
                <img
                  className=""
                  src={"https://cdn.moviesgo.ge/" + movie.poster_url}
                  alt={movie.name + " | " + movie.name_eng}
                />
              )}
            </div>
            <MovieSkeletonSection
              isLoading={isLoading}
              placeholder="Garfield ispreparing for awild adventure. Aftersurprise visit from his long-lostfather'scatVicky,Garfield and Odie areforcedto giveuptheir comfortable lives andfollowVickyonan incredible, risky heist."
              show={
                <p
                  className="mt-2  text-[16px]  max-mobile:text-sm  leading-6.5 
                     font-mainRegular tracking-wider text-textDescLight2  mobile:hidden"
                >
                  {decodeHtmlEntities(
                    movie?.description ? movie?.description : ""
                  )}
                </p>
              }
            />
            <RateMovie movie={movie} isLoading={isLoading} />
          </div>
          <div className="w-full flex flex-col gap-2">
            <div className="flex flex-col gap-3 tracking-wider max-mobile:hidden">
              <MovieSkeletonSection
                isLoading={isLoading}
                placeholder="Garfield"
                show={
                  <h1
                    className={`text-[21px] font-robotoGeoCaps tracking-wider text-textHead`}
                  >
                    {decodeHtmlEntities(movie?.name ? movie.name : "")}
                  </h1>
                }
              />
              <MovieSkeletonSection
                isLoading={isLoading}
                placeholder="Garfield 202"
                show={
                  <h2 className="text-textDesc uppercase text-[18px]">
                    {decodeHtmlEntities(
                      movie?.name_eng ? movie.name_eng + ` (${movie.year})` : ""
                    )}
                  </h2>
                }
              />
            </div>
            <div className="flex gap-2 text-white/40 mt-2 text-[14px] max-mobile:hidden">
              <MovieSkeletonSection
                isLoading={isLoading}
                placeholder="Garfield"
                show={
                  addons.includes("ქართულად") && (
                    <div className="language">ქართულად</div>
                  )
                }
              />
              <MovieSkeletonSection
                isLoading={isLoading}
                placeholder="Garfield"
                show={
                  addons.includes("ინგლისურად") && (
                    <div className="language">ინგლისურად</div>
                  )
                }
              />
              <MovieSkeletonSection
                isLoading={isLoading}
                placeholder="Garfield"
                show={
                  addons.includes("რუსულად") && (
                    <div className="language">რუსულად</div>
                  )
                }
              />
            </div>
            <div className="hidden mobile:block">
              <MovieSkeletonSection
                isLoading={isLoading}
                placeholder="Garfield ispreparing for awild adventure. Aftersurprise visit from his long-lostfather'scatVicky,Garfield and Odie areforcedto giveuptheir comfortable lives andfollowVickyonan incredible, risky heist."
                show={
                  <p
                    className="mt-2  text-[16px]  max-mobile:text-sm  leading-6.5 
                     font-mainRegular tracking-wider text-textDescLight2"
                  >
                    {decodeHtmlEntities(
                      movie?.description ? movie?.description : ""
                    )}
                  </p>
                }
              />
            </div>

            {!isMobile && <MovieDetails movie={movie} isLoading={isLoading} />}
          </div>
        </div>
        {isMobile && <MovieDetails movie={movie} isLoading={isLoading} />}
      </div>
      {(casts?.cast?.length == 0 && !castsLoading) || (
        <>
          <div className="w-full h-[2px] bg-white/5 my-5 mobile:invisible"></div>
          <div className="my_container">
            <MovieCast casts={casts} castsLoading={castsLoading} />
          </div>
        </>
      )}
    </section>
  );
}
