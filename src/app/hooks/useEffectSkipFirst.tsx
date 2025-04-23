import { useEffect, useRef } from "react";

export function useEffectSkipFirst(
  effect: () => void | (() => void),
  deps: any[]
) {
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    return effect();
  }, deps);
}
