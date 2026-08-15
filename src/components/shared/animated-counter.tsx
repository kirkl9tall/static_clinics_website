"use client";

import { useEffect, useRef, useState } from "react";

export default function AnimatedCounter({ end, suffix = "", duration = 2 }: { end: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          observer.disconnect();
          
          let start = 0;
          const endValue = end;
          const totalFrames = Math.round(duration * 60);
          const increment = endValue / totalFrames;
          
          let currentFrame = 0;
          const timer = setInterval(() => {
            currentFrame++;
            start += increment;
            
            if (currentFrame >= totalFrames) {
              setCount(endValue);
              clearInterval(timer);
            } else {
              setCount(Math.floor(start));
            }
          }, 1000 / 60);
        }
      },
      { threshold: 0.1 }
    );
    
    if (ref.current) {
      observer.observe(ref.current);
    }
    
    return () => observer.disconnect();
  }, [end, duration]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}
