import React, { forwardRef } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

type Props = {
  disabled?: boolean;
  image: string;
  title: string;
  desc?: string;
  sub?: string;

  message?: string;
  value?: any;

  children?: React.ReactNode;
  inputProps?: Partial<UseFormRegisterReturn>;
};

const ItemOffer = forwardRef(function ItemOffer(
  { disabled, image, title, desc, sub, message, value, inputProps, children, ...rest }: Props,
  ref: any
) {
  return (
    <label role="button" aria-disabled={disabled} className="group block py-4 aria-disabled:cursor-not-allowed" {...rest}>
      <div className="flex gap-4 group-aria-disabled:mix-blend-luminosity">
        <div className="h-12 w-12">
          <img src={image} alt="any" className="h-full w-full rounded-xl object-cover" />
        </div>
        <div className="flex-1 space-y-1">
          <h3 className="text-base-content group-aria-disabled:text-neutral-400">
            <b>{title}</b>
          </h3>
          <p className="text-sm group-aria-disabled:text-neutral-400">{desc}</p>
          <p className="text-xs">{sub}</p>
        </div>
        <input type="checkbox" hidden={disabled} disabled={disabled} value={value} {...inputProps} />
      </div>
      {children}
    </label>
  );
});

export default ItemOffer;
