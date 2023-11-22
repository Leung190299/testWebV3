/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useState } from 'react';
export enum MediaScreen {
  /** Mobile device */
  Mobile,
  /** larger than 1200px */
  Desktop,
  /** larger than 760px */
  Tablet
}

function getName(m: MediaScreen) {
  switch (m) {
    case MediaScreen.Mobile:
      return 'mobile';
    case MediaScreen.Desktop:
      return 'desktop';
    case MediaScreen.Tablet:
      return 'tablet';
    default:
      return 'unkown';
  }
}

const screenSize = {
  tablet: '(min-width: 760px) and (min-height: calc(480px + 1px))',
  desktop: '(min-width: 1200px) and (min-height: calc(480px + 1px))'
};
export const matchesScreen = () =>
  'undefined' === typeof window || 'undefined' === typeof window.matchMedia
    ? MediaScreen.Mobile
    : window.matchMedia(screenSize.desktop).matches
    ? MediaScreen.Desktop
    : window.matchMedia(screenSize.tablet).matches
    ? MediaScreen.Tablet
    : MediaScreen.Mobile;

function useMediaQuery(initial?: MediaScreen, cb?: (matchedScreen: MediaScreen) => void): MediaScreen {
  const [state, setState] = useState(
    initial ||
      (() => {
        const matchedScreen = matchesScreen();
        return matchedScreen;
      })
  );
  const update = useCallback(() => {
    const matchedScreen = matchesScreen();
    setState(matchedScreen);
    cb?.(matchedScreen);
  }, []);

  useEffect(() => {
    update();
    const mediaQueryTablet = window.matchMedia(screenSize.tablet),
      mediaQueryDesktop = window.matchMedia(screenSize.desktop);
    if (mediaQueryTablet.addEventListener)
      return (
        mediaQueryTablet.addEventListener('change', update),
        mediaQueryDesktop.addEventListener('change', update),
        () => {
          mediaQueryTablet.removeEventListener &&
            (mediaQueryTablet.removeEventListener('change', update), mediaQueryDesktop.removeEventListener('change', update));
        }
      );
  }, [update]);

  return state;
}

export default useMediaQuery;
