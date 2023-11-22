import type { Model } from '@/types/model';
import React from 'react';

type ProductOption = Model.Option & {
  values: Model.OptionValue[];
};
type ProductVariant = Model.Variant & {
  selectedOptions: { name: string; value: number }[];
};
type OptimizedVariant = {
  id: string;
  availableForSale: boolean;
  params: URLSearchParams;
  [key: string]: string | boolean | URLSearchParams; // ie. { color: 'Red', size: 'Large', ... }
};
type Props = {
  options: ProductOption[];
  variants: ProductVariant[];
};

const VariantSelector = ({ options, variants }: Props) => {
  const optimizedVariants = variants.map((variant) => {
    const optimized = {
      id: variant.id,
      avaiableForSale: variant.quantity > 0,
      selectedOptions: variant.selectedOptions
    };
    return optimized;
  });

  return <div>VariantSelector</div>;
};

export default VariantSelector;
