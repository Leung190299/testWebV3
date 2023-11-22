/* eslint-disable react-hooks/exhaustive-deps */
import { getTranslate } from '@/utilities/position';
import { useEffect, useRef } from 'react';

type FollowMouseOptions = {
  multiple?: number;
};

const useFollowMouse = <T extends HTMLElement = HTMLElement>({ multiple = 0.1 }: FollowMouseOptions, deps: any[]) => {
  const ref = useRef<T>(null);
  useEffect(() => {
    if (!ref.current) return;
    const element = ref.current; //.cloneNode(true)! as any;
    const bcr = element.getBoundingClientRect();
    const translate = getTranslate(element);
    const y = scrollY;
    const x = scrollX;

    const centerY = bcr.top + bcr.height / 2 - translate.y + y; // top off element in pageY
    const centerX = bcr.left + bcr.width / 2 - translate.x + x; // top off element in pageY
    const positions = {
      x: centerX,
      y: centerY
    };

    function handleMouseMove(ev: MouseEvent) {
      if (window.innerWidth < 1024) {
        window.removeEventListener('mousemove', handleMouseMove);
        return;
      }
      const { clientX: x, clientY: y } = ev;
      const coordX = Math.min(x - positions.x - scrollX, 500);
      const coordY = Math.min(y - (positions.y - scrollY), 500);

      // const coords = getCoordsFollow(coordX, coordY, 0.1);
      if (ref.current) ref.current.style.transform = `matrix(1,0,0,1,${coordX * multiple},${coordY * multiple})`;

      // ref.current.style.
    }
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [multiple, ...deps]);
  return ref;
};

export default useFollowMouse;
