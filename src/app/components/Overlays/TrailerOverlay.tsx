import { useEffect } from "react";
import useTrailerOverlay from "../../store/useTrailerOverlay";

export default function TrailerOverlay() {
  const { trailerLink, setTrailerLink } = useTrailerOverlay();
  if (!trailerLink) return null;
  return (
    <div className="fixed z-50  h-full w-full top-0 left-0 flex justify-center items-center">
      <div
        onClick={() => setTrailerLink("")}
        className="absolute top-0 left-0 h-full w-full z-0 bg-black/50"
      ></div>
      <GetTrailer link={trailerLink} />
    </div>
  );
}

function GetTrailer(props: { link: string }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const getEmbedUrl = (url: string): string => {
    if (url.includes("youtu.be/")) {
      const videoId = url.split("youtu.be/")[1];
      return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1`;
    }
    return url;
  };
  return (
    <div className="relative bg-bodyBg aspect-video w-full max-w-[900px] p-3">
      {props.link.includes("youtu") ? (
        <iframe
          src={getEmbedUrl(props.link)}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          className="h-full w-full"
        />
      ) : (
        <video src={props.link} className="h-full w-full" controls autoPlay />
      )}
    </div>
  );
}
