export const variantsTranslate = {
  enter: (direction: number) => {
    return {
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0
    };
  },
  center: {
    x: 0,
    opacity: 1
  },
  exit: (direction: number) => {
    return {
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0
    };
  }
};
export const variantsTranslateWithoutOpacity = {
  enter: (direction: number) => {
    return {
      x: direction > 0 ? '100%' : '-100%'
    };
  },
  center: {
    x: 0
  },
  exit: (direction: number) => {
    return {
      x: direction < 0 ? '100%' : '-100%'
    };
  }
};
export const variantsRotate = {
  enter: (direction: number) => {
    return {
      // x: direction > 0 ? '100%' : '-100%',
      zIndex: 9,
      rotateY: direction > 0 ? -180 : 180
      // opacity: 0
    };
  },
  center: {
    zIndex: 10,
    rotateY: 0
    // opacity: 1,
  },
  exit: (direction: number) => {
    return {
      // x: direction < 0 ? '100%' : '-100%',
      zIndex: 10,
      rotateY: direction < 0 ? -180 : 180
      // opacity: 0
    };
  }
};
