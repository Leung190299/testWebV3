import { CheckoutType } from '@/constants/checkout.constants';
import { useAppDispatch } from '@/store/hooks';
import { Data, Model } from '@/types/model';
import _ from 'lodash';
import { useMemo } from 'react';
import { addToCheckout } from '../cartSlice';

type Props = {};

const useProductDetail = (product?: Data.ProductDetail) => {
  const dispatch = useAppDispatch();
  const optimizedVariants = useMemo(() => {
    if (!_.isEmpty(product)) {
      const variantByOption: Record<string, Model.Variant> = {};
      // 14
      const optionValueById = product!.options.reduce((v: Record<string, Model.OptionValue>, option) => {
        option.options.forEach((option) => {
          v[option.id] = option;
        });
        return v;
      }, {});
      //
      const optionValueAvaible = new Set<number>();

      // 40
      const variantById = product!.variants.reduce((obj: Record<number, Model.Variant & { options: Model.OptionValue[] }>, variant) => {
        obj[variant.id] = Object.assign({}, variant, { options: [] });
        return obj;
      }, {});

      // 80
      product?.optionCombinations.forEach(({ option_value_id, variant_id }) => {
        const optionValue = optionValueById[option_value_id];
        const variant = variantById[variant_id];
        variant.options.push(optionValue);

        if (variant.quantity > 0) {
          optionValueAvaible.add(option_value_id);
        }
        if (variant.options.length === product.options.length) {
          const key = variant.options
            .sort((a, b) => a.option_id - b.option_id)
            .map((v) => v.id)
            .join('_');
          variantByOption[key] = variant;
        }
      });
      return {
        variants: product?.variants as unknown as (Model.Variant & { options: Model.OptionValue[] })[],
        optionValueAvaible,
        variantByOption
      };
    }
    return {
      variants: [],
      optionValueAvaible: {},
      variantByOption: {}
    };
  }, [product]);

  const handleCheckoutItem = (type: CheckoutType, dataCart?: cartModel.ProductCart, dataDetail?: installmentModel.Cart[]) => {
    if (type === CheckoutType.BuyCode || type == CheckoutType.BuyData || type === CheckoutType.Recharge)
      throw new Error('Invalid type: type must must be one of `CheckoutType.Item`, `CheckoutType.Card`, `CheckoutType.Profile`');
    type === CheckoutType.Item
      ? dispatch(
          addToCheckout({
            type,
            products: [
              {
                dataCart:dataCart!
              }
            ],
            sims: []
          })
        )
      : dispatch(
          addToCheckout({
            type,
            products: dataDetail!
          })
        );
  };

  return { optimizedVariants, handleCheckoutItem };
};

export default useProductDetail;
