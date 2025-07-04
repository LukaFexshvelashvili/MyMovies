import { SoundIcon, SoundOffIcon } from "./OsIcons";
import useOSPlayer from "./useOSPlayer";

import { ControlButton } from "./OScontrols";
import { useState } from "react";
import { OSkeyHandler } from "./OSkeyHandler";

export default function OScontrolSound() {
  const { playerRef, toggleSound, videoRef } = useOSPlayer();
  const [sound, setSound] = useState(1);
  const [isMuted, setIsMuted] = useState(sound == 0);

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!videoRef.current) return;
    const newVolume = parseFloat(e.target.value) / 100;
    videoRef.current.volume = newVolume;
    setSound(newVolume);
    if (newVolume > 0 && isMuted) {
      setIsMuted(false);
    } else if (newVolume === 0 && !isMuted) {
      setIsMuted(true);
    }
  };

  const handleToggleSound = () => {
    toggleSound();
    setIsMuted(!isMuted);
    setSound(videoRef.current?.volume || 0);
  };

  const volumeUp = () => {
    if (videoRef.current) {
      setSound((state) => {
        videoRef.current!.volume = state + 0.1 > 1 ? 1 : state + 0.1;
        return state + 0.1 > 1 ? 1 : state + 0.1;
      });
    }
    if (sound >= 0 && isMuted) {
      setIsMuted(false);
    }
  };
  const volumeDown = () => {
    if (videoRef.current) {
      setSound((state) => {
        videoRef.current!.volume = state - 0.1 < 0 ? 0 : state - 0.1;
        return state - 0.1 < 0 ? 0 : state - 0.1;
      });
    }
    if (sound === 0 && !isMuted) {
      setIsMuted(true);
    }
  };
  OSkeyHandler(
    {
      ArrowUp: volumeUp,
      ArrowDown: volumeDown,
    },
    playerRef
  );
  return (
    <div className="flex items-center gap-2 group">
      <ControlButton
        className="flex justify-center"
        onClick={handleToggleSound}
      >
        {!isMuted ? (
          <SoundIcon className="h-5 cursor-pointer" />
        ) : (
          <SoundOffIcon className="h-5 cursor-pointer" />
        )}
      </ControlButton>

      <div className="w-0 items-center overflow-hidden transition-[width] hidden group-hover:flex group-hover:w-12">
        <input
          type="range"
          id="os_sound_slider"
          min="0"
          max="100"
          value={isMuted ? 0 : sound * 100}
          onChange={handleVolumeChange}
          style={{ "--progress": `${sound * 100}%` } as React.CSSProperties}
        />
      </div>
    </div>
  );
}
