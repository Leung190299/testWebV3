import { useCallback, useState } from 'react';

// Need refactor positoin type
import BottomSheetAddToCart, { SimModalMode } from '@/components/modal/modal-add-sim';
import { CheckoutType } from '@/constants/checkout.constants';
import { modal } from '@/libs/modal';
import Routers from '@/routes/routers';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import type { Checkout, Model } from '@/types/model';
import { useRouter } from 'next/router';
import { PayloadAddSimToCart, addSimToCheckout, addToCheckout } from '../cartSlice';
import { addSim } from '../simTypeSlice';

const VALID_TYPE = [CheckoutType.Item];

function isValidData(data: any): data is Checkout.ProductAndSim {
  return VALID_TYPE.includes(data?.type);
}
const useSimAction = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const dataCheckout = useState(useAppSelector((state) => state.cart.checkoutData))[0];
  const handleBuyNow = useCallback(
    (data: PayloadAddSimToCart) => {
      const gift = data.gift?.options.find((op) => op.id === data.gift!.selected);
      if (!isValidData(dataCheckout)) {
        dispatch(
          addToCheckout({
            type: CheckoutType.Item,
            products: [],
            sims: [
              {
                id: data.sims[0].phone,
                gift,
                merchandise: data.sims.map((item) => {
                  return {
                    data: item.pack,
                    sim: item
                  };
                })
              }
            ]
          })
        );
      } else {
        dispatch(
          addSimToCheckout([
            {
              id: data.sims[0].phone,
              gift,
              merchandise: data.sims.map((item) => {
                return {
                  data: item.pack,
                  sim: item
                };
              })
            }
          ])
        );
      }
      router.push(Routers.CHECKOUT);
    },
    [dispatch, router]
  );
  const handleAddToCart = useCallback(
    (item: Model.Sim | Model.Sim[], mode?: SimModalMode) => {
      modal.open({
        render: <BottomSheetAddToCart items={Array.isArray(item) ? item : [item]} mode={mode} />,
        closeButton: false,
        transition: false,
        className: 'modal-box shadow-itel',
        classNameContainer: 'modal-full md:modal-bottom-sheet',
        classNameOverlay: 'bg-neutral-0 md:bg-neutral-900 md:bg-opacity-50',
        // Call back when click submit in modal,
        onDone: handleBuyNow
      });
    },
    [handleBuyNow]
  );

  const nextStepSelectType = (item: Model.Sim) => {
    dispatch(addSim(item));
    router.push(Routers.SIM_TYPE);
  };
  return { handleBuyNow, handleAddToCart, nextStepSelectType };
};

export default useSimAction;
