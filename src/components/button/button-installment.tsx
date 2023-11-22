import { ReactTag, Props } from '@/types/element-type';
import { forwardRefWithAs } from '@/utilities/render';
import React, { ForwardedRef } from 'react';
import Element from '../element/element';

type ButtonProps = {
  title: string;
  desc?: string;
};

const ButtonIntallment = forwardRefWithAs(function ButtonIntallment<TTag extends ReactTag = 'button'>(
  { title, desc, as = 'button' as TTag, children, ...rest }: Props<TTag, ButtonProps>,
  ref: ForwardedRef<HTMLButtonElement>
) {
  return (
    <Element
      as={as}
      defaultClassName="group btn-secondary btn btn-lg rounded-full border-neutral-800 text-sm text-neutral-800"
      {...rest}
      ref={ref}
    >
      <div>
        {title}
        <p className="text-xs text-subtle-content group-hover:text-neutral-200">{desc}</p>
      </div>
    </Element>
  );
});

export default ButtonIntallment;
