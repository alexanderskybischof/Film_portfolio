import { useEffect } from 'react';

// Keep the document as the only page scroller. Freeze it only while a viewer is open.
export default function useGalleryScrollLock(isOpen: boolean) {
  useEffect(() => {
    if (!isOpen) return;

    const { body, documentElement } = document;
    const x = window.scrollX;
    const y = window.scrollY;
    const previous = {
      position: body.style.position,
      top: body.style.top,
      left: body.style.left,
      width: body.style.width,
      overflow: body.style.overflow,
    };
    const previousRootOverflow = documentElement.style.overflow;

    Object.assign(body.style, {
      position: 'fixed',
      top: `${-y}px`,
      left: `${-x}px`,
      width: '100%',
      overflow: 'hidden',
    });
    documentElement.style.overflow = 'hidden';

    return () => {
      Object.assign(body.style, previous);
      documentElement.style.overflow = previousRootOverflow;
      window.scrollTo({ left: x, top: y, behavior: 'auto' });
    };
  }, [isOpen]);
}
