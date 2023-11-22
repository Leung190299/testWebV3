import { CheckoutType } from '@/constants/checkout.constants';
import useDeliveryOptions from '@/hooks/useDeliveryOptions';
import { getFee } from '@/store/cart/selector';
import { useAppSelector } from '@/store/hooks';
import _ from 'lodash';
import { useMemo } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { useSelector } from 'react-redux';

type Props = {};

const FieldDeliveryOption = (props: Props) => {
  const methods = useFormContext<cartModel.PaymentInfo>();

  const [CityId, DistrictId, WardId, addr, HamletId, IsFast, paymentChannel] = useWatch<cartModel.PaymentInfo>({
    name: [
      'cart_info.CityId',
      'cart_info.DistrictId',
      'cart_info.WardId',
      'cart_info.addr',
      'cart_info.HamletId',
      'cart_info.IsFast',
      'cart_info.paymentChannel'
    ],
    control: methods.control
  });
  const data = useAppSelector((state) => state.cart.checkoutData);

  function getPriceFromMerchandise(data: { discount_price?: number | null; price: number }) {
    return data.discount_price ?? data.price;
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const products = data?.type === CheckoutType.Item ? data.products : [];

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const Sims = data?.type === CheckoutType.Item ? data.sims : [];

  const total = useMemo(() => {
    let total = 0;
    total = products.reduce(
      (total, { dataCart }) => (total += dataCart.price! * dataCart.quantity! + dataCart.gift!.reduce((res, item) => res + item.price!, 0)),
      total
    );
    total = Sims.reduce(
      (total, { merchandise }) =>
        (total += merchandise.reduce((subtotal, { data, sim }) => {
          return (subtotal += getPriceFromMerchandise(data) + getPriceFromMerchandise(sim));
        }, 0)),
      total
    );
    return total;
  }, [products, Sims]);

  const IsBaseus: boolean = useMemo(() => {
    let _isBaseus: boolean = false;
    products.forEach((item) => {
      if (item.dataCart.productType == 9) {
        _isBaseus = true;
      }
    });
    return _isBaseus;
  }, [products]);
  const isProduct: boolean = useMemo(() => !_.isEmpty(products), [products]);
  const isSim: boolean = useMemo(() => !_.isEmpty(Sims), [Sims]);
  const paramGHN: cartModel.paramFee = useMemo(() => {
    if (CityId && DistrictId && WardId) {
      return {
        province: CityId?.id,
        district: DistrictId?.id,
        ward: WardId?.id,
        address: addr,
        totalPrice: total,
        fast: IsFast||0,
        paymentChannel:paymentChannel||'VNPAY'
      };
    }

    return {};
  }, [CityId, DistrictId, WardId, products, Sims, IsFast, total, paymentChannel]);

  const { deliveryOptions } = useDeliveryOptions(paramGHN, IsBaseus, isSim, isProduct);

  return (
    <div className="flex flex-col gap-4 mt-2">
      {deliveryOptions.map((item) => (
        <label key={item.id} className="flex items-center flex-1 relative px-4 xl:px-6 py-3.5">
          <input type="radio" className="peer mr-4 disabled:opacity-100" {...methods.register('cart_info.IsFast')} value={item.id} checked={item.id==IsFast} />
          <span className="absolute inset-0 peer-checked:border-red-600 border border-neutral-300 rounded-xl pointer-events-none" />
          <div className="flex-1 mr-3">
            <p className="text-base font-medium">{item.name}</p>
            <p className="text-sm text-neutral-500">{item.desc}</p>
          </div>
          <div></div>
        </label>
      ))}
    </div>

    // <Controller
    //   name="cart_info.IsFast"
    //   control={methods.control}
    //   shouldUnregister
    //   defaultValue={-1}
    //   render={({ field: { value, onChange } }) => {
    //     return (
    //       <SelectListOption
    //         options={deliveryOptions}
    //         value={deliveryOptions.find((item) => item.id === value)}
    //         onChange={(item) => {
    //           onChange(item.id);
    //           methods.setValue('ShipmentFee', item.totalPrice);
    //           methods.setValue('cart_info.ghtk_fee', item.totalPrice);
    //         }}
    //         placeholder="Chọn"
    //         className="w-full"
    //         onClick={handleSelectDeliveryOption}
    //         renderItem={(option) => (
    //           <div className="flex items-center gap-4 flex-1 text-sm">
    //             <div className="flex-1">
    //               <p>
    //                 <b>{option.name}</b>
    //               </p>
    //               <p className="mt-1 text-xs text-neutral-500">{option.desc}</p>
    //             </div>
    //             <div>
    //               {!_.isArray(option.price) ? (
    //                 <p>
    //                   <b>{toCurrency(option.price)}</b>
    //                 </p>
    //               ) : (
    //                 option.price.map((item) => (
    //                   <p key={item.value}>
    //                     <b>{item.title}</b>
    //                     <b>{toCurrency(item.value)}</b>
    //                   </p>
    //                 ))
    //               )}
    //             </div>
    //           </div>
    //         )}
    //       />
    //     );
    //   }}
    // />
  );
};

export default FieldDeliveryOption;
