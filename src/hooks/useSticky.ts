import { debounce } from '@/utilities/debounce';
import React, { useEffect, useRef } from 'react';

type Options = {
  offsetTop?: number;
  offsetBottom?: number;
};
type State = {
  direction: Direction;
  height: number;
  parentOffsetTop: number;
  offset: [number, number];

  top: number;
  bottom: number;
};
enum Direction {
  UP,
  DOWN
}
type ScrollElement = (HTMLElement | Window) & { oldScroll: number };

const useSticky = <T extends HTMLElement>({ offsetBottom = 0, offsetTop = 0 }: Options = {}) => {
  const ref = useRef<T>(null);

  const state = useRef<State>({ direction: Direction.DOWN, height: 0, parentOffsetTop: 0, offset: [0, 0], top: 0, bottom: 0 }).current;
  const setState = (s: Partial<State>) => {
    Object.assign(state, s);
  };

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    const parent = ref.current.parentElement!;
    if (!parent) return;

    const scroller = window;
    const block = document.createElement('div');
    block.id = '__sticky-block';

    const calculate = () => {
      el.before(block);
      const bcr = parent.getBoundingClientRect();
      const top = bcr.top + scrollY;
      const diff = innerHeight - el.clientHeight;
      setState({
        height: el.clientHeight,
        parentOffsetTop: top,
        offset: [top, top],
        bottom: diff < 0 ? diff - top - offsetTop : innerHeight - (top + offsetTop) - el.clientHeight,
        top: diff < 0 ? diff + offsetBottom : top + offsetTop
      });
      setBlockHeight(0);
      setElementPosition(diff < 0 ? diff + offsetBottom : state.top);
    };
    const setBlockHeight = (height: number) => {
      block.style.height = Math.max(0, height) + 'px';
    };
    function isDirection(dir: Direction) {
      if (state.direction === dir) return true;
      setState({ direction: dir });
      return false;
    }
    function setElementPosition(top?: number, bottom?: number) {
      if (ref.current) {
        ref.current.style.bottom = typeof bottom === 'number' ? bottom + 'px' : '';
        ref.current.style.top = typeof top === 'number' ? top + 'px' : '';
      }
    }
    function handleScrollUp(el: ScrollElement) {
      if (ref.current) {
        if (isDirection(Direction.UP)) return;
        const bcr = ref.current.getBoundingClientRect();
        setBlockHeight(bcr.top + scrollY - state.parentOffsetTop);
        if (state.top) setElementPosition(undefined, state.bottom);
      }
    }
    function handleScrollDown(el: ScrollElement) {
      if (ref.current) {
        if (isDirection(Direction.DOWN)) return;
        const bcr = ref.current.getBoundingClientRect();
        setBlockHeight(bcr.top + scrollY - state.parentOffsetTop);
        setElementPosition(state.top);
      }
    }

    function handleScroll(this: ScrollElement, ev: Event) {
      var st = window.pageYOffset || document.documentElement.scrollTop;
      if (st > this.oldScroll) {
        handleScrollDown(this);
        // downscroll code
      } else if (st < this.oldScroll) {
        handleScrollUp(this);
        // upscroll code
      } // else was horizontal scroll
      this.oldScroll = st <= 0 ? 0 : st;
    }
    const handleResize = debounce(calculate, 300, false, true);
    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(ref.current);

    calculate();
    scroller.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);

    const clear = () => {
      window.removeEventListener('resize', handleResize);
      scroller.removeEventListener('scroll', handleScroll);
      block.remove();
      resizeObserver.disconnect();
    };
    return clear;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [offsetBottom, offsetTop]);
  return ref;
};

export default useSticky;
