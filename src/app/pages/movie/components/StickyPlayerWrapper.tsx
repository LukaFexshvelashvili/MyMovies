import { useRef, useState, useEffect, ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const StickyPlayerWrapper = ({ children }: Props) => {
  const sentinelRef = useRef<HTMLDivElement>(null);
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsSticky(!entry.isIntersecting);
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

  return (
    <>
      {/* Sentinel is invisible but in flow */}
      <div ref={sentinelRef} className="h-1" />
      <div
        className={`transition-none duration-500 ease-in-out flex justify-center items-center ${
          isSticky
            ? "fixed bottom-4 right-4 h-52 aspect-video shadow-lg rounded-lg overflow-hidden bg-black z-70"
            : "relative h-full w-full"
        }`}
      >
        {children}
      </div>
    </>
  );
};

export default StickyPlayerWrapper;
