import React, { useEffect, useRef, ReactNode } from "react";

interface ScrollComponentProps {
  children: ReactNode;
  onReachBottom: () => void;
  onReachTop: () => void;
  onScroll?: (currentPosition: number, prevPosition: number) => void;
  position?: number;
}

const ScrollComponent = ({
  children,
  onReachBottom,
  onReachTop,
  onScroll,
  position = 0,
}: ScrollComponentProps) => {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const prevScroll = useRef(0);

  useEffect(() => {
    if (position && scrollerRef.current) {
      setScrollPosition(position);
    }
  }, [position]);

  const setScrollPosition = (position: number = 0) => {
    if (scrollerRef.current) {
      scrollerRef.current.scrollTop = position;
      prevScroll.current = position;
    }
  };

  const handleVerticalScroll = () => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const { scrollTop, offsetTop, offsetHeight } = scroller;
    const topEdge = (scroller.firstChild as HTMLDivElement).offsetTop;
    const bottomEdge =
      (scroller.lastChild?.lastChild?.lastChild as HTMLElement)?.offsetTop +
      (scroller.lastChild?.lastChild?.lastChild as HTMLElement)?.offsetHeight;

    const scrolledUp = scrollTop + topEdge;
    const scrolledDown = scrolledUp + offsetHeight;

    if (bottomEdge && scrolledDown >= bottomEdge - 2) {
      onReachBottom();
    } else if (topEdge && scrolledUp - 1 <= topEdge) {
      onReachTop();
    }
  };

  const handleScroll = () => {
    if (!scrollerRef.current) return;

    handleVerticalScroll();
    const scrolledTo = scrollerRef.current.scrollTop;

    if (onScroll) onScroll(scrolledTo, prevScroll.current);
    prevScroll.current = scrolledTo;
  };

  return (
    <div
      ref={scrollerRef}
      style={{
        overflow: "auto",
        height: "inherit",
        width: "inherit",
        WebkitOverflowScrolling: "inherit",
        whiteSpace: "normal",
      }}
      onScroll={handleScroll}
    >
      {children}
    </div>
  );
};

export default ScrollComponent;
