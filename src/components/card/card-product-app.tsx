import { toCurrency } from '@/utilities/currency';
import React from 'react';

type Props = {
  name: string;
  image: string;
  price?: number;
};

const CardProductApp = ({ name, image, price }: Props) => {
  return (
    <div className="py-4 flex items-center">
      <div className="w-12">
        <div className="block-img block-square">
          <img src={image} className="object-cover rounded-lg" alt={name} />
        </div>
      </div>
      <div className="ml-3">
        <p className="truncate">
          <b>{name}</b>
        </p>
        <p className="text-sm font-medium text-neutral-500">{toCurrency(price ?? 0)}</p>
      </div>
    </div>
  );
};

export default CardProductApp;
