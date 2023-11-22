import { forwardRefWithAs } from '@/utilities/render';
import clsx from 'clsx';
import React, { createElement, forwardRef } from 'react';

type Props = { as?: any; defaultClassName?: string; children?: React.ReactNode } & Record<string, any>;

const Element = forwardRefWithAs(({ as = 'div', children, defaultClassName, ...rest }: Props, ref: any) => {
  if ('className' in rest) {
    if (rest.className) rest.className = clsx(defaultClassName, rest.className);
    else rest.className = defaultClassName;
  } else rest.className = defaultClassName;

  return createElement(as, Object.assign({}, rest, { ref }), children);
});

export default Element;
