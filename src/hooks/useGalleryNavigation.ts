import { useEffect, useRef, useState } from 'react';
import type { TouchEvent } from 'react';

const mobileQuery = '(max-width: 900px), (pointer: coarse)';

export default function useGalleryNavigation(move: (direction: -1 | 1) => void) {
  const [isMobile, setIsMobile] = useState(() => window.matchMedia(mobileQuery).matches);
  const start = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const query = window.matchMedia(mobileQuery);
    const update = () => setIsMobile(query.matches);
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);

  return {
    isMobile,
    swipeHandlers: {
      onTouchStart: (event: TouchEvent) => {
        start.current = event.touches.length === 1
          ? { x: event.touches[0].clientX, y: event.touches[0].clientY }
          : null;
      },
      onTouchCancel: () => { start.current = null; },
      onTouchEnd: (event: TouchEvent) => {
        const origin = start.current;
        start.current = null;
        if (!origin || !event.changedTouches.length) return;
        const dx = event.changedTouches[0].clientX - origin.x;
        const dy = event.changedTouches[0].clientY - origin.y;
        if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy) * 1.5) {
          // Prevent the swipe's synthetic click from selecting the previous card.
          event.preventDefault();
          move(dx < 0 ? 1 : -1);
        }
      },
    },
  };
}
