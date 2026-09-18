import { renderHook } from '@testing-library/react';
import useGalleryScrollLock from './useGalleryScrollLock';

beforeEach(() => {
  window.scrollTo = jest.fn();
  Object.defineProperty(window, 'scrollY', { configurable: true, value: 640 });
  document.body.style.cssText = '';
  document.documentElement.style.cssText = '';
});

test('leaves normal page scrolling alone until a viewer opens', () => {
  const { rerender } = renderHook(({ open }) => useGalleryScrollLock(open), {
    initialProps: { open: false },
  });
  expect(document.body.style.position).toBe('');
  expect(document.documentElement.style.overflow).toBe('');
  rerender({ open: true });
  expect(document.body.style.position).toBe('fixed');
  expect(document.body.style.top).toBe('-640px');
  expect(document.documentElement.style.overflow).toBe('hidden');
  rerender({ open: true });
  expect(window.scrollTo).not.toHaveBeenCalled();
  rerender({ open: false });
  expect(document.body.style.position).toBe('');
  expect(document.body.style.overflow).toBe('');
  expect(document.documentElement.style.overflow).toBe('');
  expect(window.scrollTo).toHaveBeenCalledWith({ left: 0, top: 640, behavior: 'auto' });
});

test('restores prior styles and scroll position when leaving an open gallery', () => {
  document.body.style.position = 'relative';
  document.body.style.width = '95%';
  document.documentElement.style.overflow = 'auto';
  const { unmount } = renderHook(() => useGalleryScrollLock(true));
  unmount();
  expect(document.body.style.position).toBe('relative');
  expect(document.body.style.width).toBe('95%');
  expect(document.documentElement.style.overflow).toBe('auto');
  expect(window.scrollTo).toHaveBeenCalledWith({ left: 0, top: 640, behavior: 'auto' });
});
