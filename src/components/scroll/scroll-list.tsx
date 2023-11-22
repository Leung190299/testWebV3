import { PropsOf, Props } from '@/types/element-type';
import React from 'react';

type ScrollList = {
  children?: React.ReactNode;
  centerChild?: boolean;
};

const ScrollList = <T extends React.ElementType = 'div'>({ as, ref, centerChild, ...rest }: Props<T, ScrollList>) => {
  const Element = as || 'div';
  const onClick: React.MouseEventHandler<HTMLDivElement> = (e) => {
    const child = e.target as HTMLElement;
    const parent = e.currentTarget;
    if (child !== parent && parent.contains(child)) {
      const bcr = parent.getBoundingClientRect();
      parent.scrollTo({
        left: child.offsetLeft - bcr.width / 2 + child.clientWidth / 2,
        behavior: 'smooth'
      });
    }
  };
  return <Element onClick={onClick} {...rest}></Element>;
};

export default ScrollList;
