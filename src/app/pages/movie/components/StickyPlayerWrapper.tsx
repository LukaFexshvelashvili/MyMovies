import { useRef, useState, useEffect, ReactNode } from "react";
import { CloseIcon } from "../../../../assets/icons/MyIcons";

type Props = {
  children: ReactNode;
};

const StickyPlayerWrapper = ({ children }: Props) => {
  const sentinelRef = useRef<HTMLDivElement>(null);
  const [isSticky, setIsSticky] = useState(false);
  const [isClosed, setIsClosed] = useState(false);
  const lastScrollYRef = useRef(0);
  const scrollDirectionRef = useRef<"up" | "down">("down");

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      scrollDirectionRef.current =
        currentScrollY > lastScrollYRef.current ? "down" : "up";
      lastScrollYRef.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting && scrollDirectionRef.current === "down") {
          setIsSticky(true);
        } else if (entry.isIntersecting) {
          setIsSticky(false);
        }
      },
      { threshold: 0.1 }
    );

    if (sentinelRef.current) {
      observer.observe(sentinelRef.current);
    }

    return () => {
      if (sentinelRef.current) {
        observer.unobserve(sentinelRef.current);
      }
    };
  }, []);

  const handleClose = () => {
    setIsClosed(true);
  };

  const shouldShowSticky = isSticky && !isClosed;

  return (
    <>
      <div ref={sentinelRef} className="h-1" />
      <div
        className={`transition-none flex justify-center items-center ${
          shouldShowSticky
            ? "fixed bottom-4 right-4 h-52 aspect-video shadow-lg rounded-lg overflow-hidden bg-black z-70"
            : "relative h-full w-full"
        }`}
      >
        {isSticky ? (
          <button
            onClick={handleClose}
            className="absolute top-2 right-2 cursor-pointer  text-lg h-9 aspect-square rounded-[30px] transition-colors bg-black/40 flex justify-center items-center text-white p-1 z-20 hover:bg-black/50"
          >
            <CloseIcon height={22} width={22} />
          </button>
        ) : null}
        {children}
      </div>
    </>
  );
};

export default StickyPlayerWrapper;
