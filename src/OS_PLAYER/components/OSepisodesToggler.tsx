import { useEffect, useState } from "react";
import OSepisodesSelector from "./OSepisodesSelector";
import useOSPlayer from "./useOSPlayer";

export default function OSepisodesToggler() {
  const { showControls, setShowControls, episodes } = useOSPlayer();
  if (!episodes) return;
  const [show, _] = useState(false);
  useEffect(() => {
    if (show) {
      setShowControls(true);
    }
  }, [showControls]);

  return <OSepisodesSelector />;
}
