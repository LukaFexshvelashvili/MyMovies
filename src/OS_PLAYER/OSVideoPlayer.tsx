import { useCallback, useEffect, useRef, useState } from "react";
import VideoContainer from "./components/OSVideoContainer";
import { OSVideoContext } from "./components/useOSPlayer";

export type TLanguageOptions = {
  HD?: string;
  SD?: string;
};

export type TEpisode = {
  title?: string;
  languages: {
    GEO?: TLanguageOptions;
    ENG?: TLanguageOptions;
  };
};

export type TSeriesData = {
  [season: number]: TEpisode[];
};

export type TplayerSettings = {
  lang: string;
  quality: string;
  speed: number;
};

type TOSplayer = {
  id: string | number;
  episodes?: TSeriesData;
  source: TEpisode;
  thumbnail: string;
  alt?: string;
  srcset?: string;
  autoplay?: boolean;
  isMovie: boolean;
  trailer: string;
  preroll: { link: string; video: string } | null;
};

export default function OSVideoPlayer({
  id,
  episodes,
  source,
  thumbnail,
  preroll,
  alt,
  srcset,
  autoplay,
  isMovie,
  trailer,
}: TOSplayer) {
  // Replace with your ad video URL
  const videoRef = useRef<null | HTMLVideoElement>(null);
  const playerRef = useRef<null | HTMLDivElement>(null);

  const [adPlayed, setAdPlayed] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [sound, setSound] = useState(1);
  const [previousVolume, setPreviousVolume] = useState(1);
  const [duration, setDuration] = useState(0);
  const [firstLoad, setFirstLoad] = useState(true);
  const [fullscreen, setFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [currentSource, setCurrentSource] = useState<TEpisode>(source);
  const [playerSettings, setPlayerSettings] = useState<TplayerSettings>({
    lang: "GEO",
    quality: "HD",
    speed: 1,
  });

  const [videoSource, setVideoSource] = useState(
    source.languages.GEO?.HD
      ? source.languages.GEO?.HD
      : source.languages.ENG?.HD
  );

  const handleVideoEvents = useCallback((video: HTMLVideoElement) => {
    const handleLoadedMetadata = () => {
      if (!isNaN(video.duration)) {
        setDuration(video.duration);
      }
      setIsLoading(false);
      if (autoplay) {
        play();
      }
    };
    video.addEventListener("loadeddata", handleLoadedMetadata);

    return () => {
      video.removeEventListener("loadeddata", handleLoadedMetadata);
    };
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      handleVideoEvents(videoRef.current);
    }
  }, [videoRef.current]);
  useEffect(() => {
    const handleFullscreenChange = () => {
      const isFullscreen = !!document.fullscreenElement;
      setFullscreen(isFullscreen);

      if (!isFullscreen) {
        try {
          (screen.orientation as any).unlock();
        } catch (e) {}
      }
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  const play = () => {
    videoRef.current?.play();
    setIsPlaying(true);
  };

  const pause = () => {
    videoRef.current?.pause();
    setIsPlaying(false);
  };

  const togglePlay = () => {
    videoRef.current?.paused ? play() : pause();
  };

  const toggleSound = () => {
    if (!videoRef.current) return;

    if (videoRef.current.volume > 0) {
      setPreviousVolume(videoRef.current.volume);
      videoRef.current.volume = 0;
      setSound(0);
    } else {
      videoRef.current.volume = previousVolume;
      setSound(previousVolume);
    }
  };
  const FullscreenOn = () => {
    setFullscreen(true);
    playerRef.current?.requestFullscreen();
    (screen.orientation as any).lock("landscape");
  };
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      playerRef.current?.requestFullscreen().then(() => setFullscreen(true));
      (screen.orientation as any).lock("landscape");
    } else {
      document.exitFullscreen().then(() => setFullscreen(false));
      (screen.orientation as any).unlock("landscape");
    }
  };

  const changeVideoTime = (time: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = time;
    }
  };

  const changeVideoVolume = (volume: number) => {
    if (videoRef.current) {
      videoRef.current.volume = volume;
    }
  };

  return (
    <OSVideoContext.Provider
      value={{
        id,
        preroll,
        videoRef,
        playerRef,
        episodes,
        isPlaying,
        sound,
        duration,
        videoSource,
        currentSource,
        playerSettings,
        fullscreen,
        showControls,
        play,
        firstLoad,
        pause,
        thumbnail,
        autoplay,
        adPlayed,
        setAdPlayed,
        alt,
        srcset,
        isLoading,
        togglePlay,
        toggleSound,
        toggleFullscreen,
        changeVideoTime,
        setVideoSource,
        setCurrentSource,
        setPlayerSettings,
        changeVideoVolume,
        setShowControls,
        FullscreenOn,
        setFirstLoad,
        setIsLoading,
        isMovie,
        trailer,
      }}
    >
      <VideoContainer />
    </OSVideoContext.Provider>
  );
}
