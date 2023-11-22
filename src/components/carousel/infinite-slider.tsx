import { useDrag } from '@/components/drag/use-drag';
import useIsomorphicLayoutEffect from '@pit-ui/modules/hooks/useIsomorphicLayoutEffect';
import clsx from 'clsx';
import React, { useState } from 'react';

/**
 * This Component can work with flex box, but currently, it's not support for gap CSS property
 * and we are not fixed if the content list length less than screen
 * @param param0 
 * @returns 
 */
export const InfiniteSlider = ({ children, className, ...rest }: JSX.IntrinsicElements['div']) => {
  const [renderItems, setRenderItems] = useState(children as any);
  const containerRef = useDrag<HTMLDivElement>();

  useIsomorphicLayoutEffect(() => {
    if (!containerRef.current) return;
    const state = { margin: 0, rightCloneWidth: 0, leftCloneWidth: 0, sliderWidth: 0 };

    function scrollTo(pos: number) {
      containerRef.current?.scrollTo({ left: pos });
    }
    function handleScroll(this: HTMLDivElement, ev: Event) {
      const { margin, sliderWidth } = state;
      if (this.scrollLeft < margin) {
        scrollTo(this.scrollWidth - sliderWidth - state.rightCloneWidth - state.leftCloneWidth + 3 * margin);
      } else if (this.scrollLeft + sliderWidth > this.scrollWidth - margin) {
        scrollTo(state.leftCloneWidth + state.rightCloneWidth - 3 * margin);
      }
    }

    const updateState = () => {
      if (!containerRef.current) return;
      const parent = containerRef.current;
      const itemsWidth = Array.from(parent.children).map((el) => el.clientWidth);
      let parentSize = parent.clientWidth;
      const computedStyle = getComputedStyle(parent);
      const paddingLeft = parseFloat(computedStyle.paddingLeft);
      const paddingRight = parseFloat(computedStyle.paddingRight);
      parentSize -= paddingLeft + paddingRight;

      let rightCloneNum = 0;
      let rightCloneWidth = 0;
      for (let i = 0; i < itemsWidth.length; i++) {
        rightCloneWidth += itemsWidth[i];
        rightCloneNum++;
        if (rightCloneWidth > parentSize) {
          break;
        }
      }

      let leftCloneNum = 0;
      let leftCloneWidth = 0;
      for (let i = itemsWidth.length - 1; i > -1; i--) {
        leftCloneWidth += itemsWidth[i];
        leftCloneNum++;
        if (leftCloneWidth > parentSize) {
          break;
        }
      }

      const childs = React.Children.map(children, (child) => child) as any[];

      setRenderItems(
        childs
          .slice(-leftCloneNum)
          .map((child, index) => React.cloneElement(child, { key: 'clone_' + index, 'data-index': index }))
          .concat(
            childs,
            childs.slice(0, rightCloneNum).map((child, index) => React.cloneElement(child, { key: 'clone2_' + index, 'data-index': index }))
          )
      );

      state.sliderWidth = parentSize;
      state.margin = parentSize / 2;
      state.rightCloneWidth = rightCloneWidth + paddingRight;
      state.leftCloneWidth = leftCloneWidth + paddingLeft;
      scrollTo(leftCloneWidth - state.margin);
    };
    const handleResize: ResizeObserverCallback = (entires) => {
      updateState();
    };
    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(containerRef.current);

    containerRef.current.addEventListener('scroll', handleScroll);
    return () => {
      resizeObserver.disconnect();
      containerRef.current?.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={clsx('flex select-none overflow-x-auto', className)} {...rest} ref={containerRef}>
      {renderItems}
    </div>
  );
};
