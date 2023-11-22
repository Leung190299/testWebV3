import { toCurrency } from '@/utilities/currency';
import React, { forwardRef } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

type Props = {
  image?: string;
  title: string;
  price: number;
  discountPrice?: number;

  checked?: boolean;
} & Pick<
  JSX.IntrinsicElements['input'],
  'onChange' | 'onBlur' | 'ref' | 'name' | 'min' | 'max' | 'maxLength' | 'minLength' | 'pattern' | 'required' | 'disabled'
>;

const CardGiftSelect = forwardRef(function CardGiftSelect(
  {
    image,
    title: title,
    price,
    discountPrice,
    checked,
    //
    onChange,
    onBlur,
    name,
    min,
    max,
    maxLength,
    minLength,
    pattern,
    required,
    disabled
  }: Props,
  ref: any
) {
  return (
    <label className="relative flex w-full cursor-pointer items-center justify-between gap-x-2 rounded-xl p-4">
      <input
        type="radio"
        checked={checked}
        className="peer"
        {...{ onChange, onBlur, name, min, max, maxLength, minLength, pattern, required, disabled, ref }}
      />
      <span className="absolute inset-0 rounded-xl border border-neutral-300 peer-checked:border-red-500" />
      <img src={image} alt="gift bonus" className="h-14 w-14 rounded-lg object-cover" />
      <p className="flex-1 text-sm">
        <b>{title}</b>
      </p>
      <div className="min-w-[5rem] text-right">
        <p className="font-medium">{toCurrency(discountPrice ?? price)}</p>
        {typeof discountPrice === 'number' && (
          <p className="text-xs text-subtle-content">
            <s>{toCurrency(price)}</s>
          </p>
        )}
      </div>
    </label>
  );
});

export default CardGiftSelect;
