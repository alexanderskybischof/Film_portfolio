import { act, renderHook } from '@testing-library/react';
import type { TouchEvent } from 'react';
import useGalleryNavigation from './useGalleryNavigation';

const touch = (x: number, y: number, count = 1) => ({
  touches: Array.from({ length: count }, () => ({ clientX: x, clientY: y })),
  changedTouches: [{ clientX: x, clientY: y }],
  preventDefault: jest.fn(),
}) as unknown as TouchEvent;

beforeEach(() => {
  window.matchMedia = jest.fn().mockReturnValue({
    matches: true,
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
  });
});

test('horizontal swipes navigate once and suppress the trailing click', () => {
  const move = jest.fn();
  const { result } = renderHook(() => useGalleryNavigation(move));
  const end = touch(40, 100);
  act(() => {
    result.current.swipeHandlers.onTouchStart(touch(200, 100));
    result.current.swipeHandlers.onTouchEnd(end);
    result.current.swipeHandlers.onTouchEnd(end);
  });
  expect(move).toHaveBeenCalledTimes(1);
  expect(move).toHaveBeenCalledWith(1);
  expect(end.preventDefault).toHaveBeenCalled();
  act(() => {
    result.current.swipeHandlers.onTouchStart(touch(40, 100));
    result.current.swipeHandlers.onTouchEnd(touch(200, 100));
  });
  expect(move).toHaveBeenLastCalledWith(-1);
});

test('taps, vertical movement, multitouch and cancelled gestures do not navigate', () => {
  const move = jest.fn();
  const { result } = renderHook(() => useGalleryNavigation(move));
  act(() => {
    result.current.swipeHandlers.onTouchStart(touch(100, 100));
    result.current.swipeHandlers.onTouchEnd(touch(105, 100));
    result.current.swipeHandlers.onTouchStart(touch(100, 100));
    result.current.swipeHandlers.onTouchEnd(touch(160, 250));
    result.current.swipeHandlers.onTouchStart(touch(100, 100, 2));
    result.current.swipeHandlers.onTouchEnd(touch(200, 100));
    result.current.swipeHandlers.onTouchStart(touch(100, 100));
    result.current.swipeHandlers.onTouchCancel();
    result.current.swipeHandlers.onTouchEnd(touch(200, 100));
  });
  expect(move).not.toHaveBeenCalled();
});
