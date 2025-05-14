import { useEffect, useState } from "react";
import OSepisodesSelector from "./OSepisodesSelector";
import useOSPlayer from "./useOSPlayer";
import { EpisodeSelectorIcon } from "../../assets/icons/MyIcons";

export default function OSepisodesToggler() {
  const { showControls, setShowControls, episodes } = useOSPlayer();
  const [episodesToggler, setEpisodesToggler] = useState<boolean>(false);
  if (!episodes) return;
  const [show, _] = useState(false);
  useEffect(() => {
    if (show) {
      setShowControls(true);
    }
  }, [showControls]);

  return (
    <>
      {" "}
      <div
        className={`h-full flex-1 min-w-[350px] shrink-0 max-mobile:w-full max-mobile:h-[100dvh] max-mobile:fixed max-mobile:top-0 max-mobile:left-0 max-mobile:z-60 transition-transform  ${
          episodesToggler
            ? "max-mobile:translate-x-0"
            : "max-mobile:translate-x-4/4"
        }`}
      >
        <OSepisodesSelector closeToggler={() => setEpisodesToggler(false)} />{" "}
      </div>
      <div
        onClick={() => setEpisodesToggler(true)}
        className="h-[50px] w-[65px] bg-navBg absolute bottom-0 z-20 right-0 translate-y-4/4 justify-center items-center flex mobile:hidden"
      >
        <EpisodeSelectorIcon />
      </div>
    </>
  );
}
