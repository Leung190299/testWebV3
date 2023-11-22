import { CheckoutType } from '@/constants/checkout.constants';
import { modal, useModal } from '@/libs/modal';
import Routers from '@/routes/routers';
import CartService from '@/services/cartService';
import useProduct from '@/store/cart/hooks/product';
import useProductDetail from '@/store/cart/hooks/product-detail';
import { toCurrency } from '@/utilities/currency';
import useBoolean from '@pit-ui/modules/hooks/useBoolean';
import clsx from 'clsx';
import _ from 'lodash';
import { useRouter } from 'next/router';
import { Dispatch, Fragment, SetStateAction, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import Svg from '../icon/svg';
import Stepper from '../stepper/stepper';
import HeaderModalSheet from './header/header-modal-sheet';
import VariantProduct from '../product/variant-product';

type Props = {
  data: imallModel.ProductDetail;
  dataCart: cartModel.ProductCart;
  flashSaleExpiry?: number;
  isFlashSale?: boolean;
  gifts: Array<imallModel.NewGift>;
  simGift: any;
  variant: imallModel.Variant[] | imallModel.VariantBaseus[];
  setPriceProduct: Dispatch<SetStateAction<{ price: number; base_price: number }>>;

  type?: 'buy' | 'installment';
};
const orderType = {
  oppo: 3,
  baseus: 4
};

const ModalSelectProduct = ({ data, setPriceProduct,dataCart, gifts, simGift, variant, flashSaleExpiry, isFlashSale, type = 'buy' }: Props) => {
  const { close, done } = useModal();
  const router = useRouter();
  const isOppo = useBoolean(false);
  const { likeItem, liked } = useProduct();
  const methods = useForm<cartModel.ProductCart & { variant: any; gift: imallModel.ResultSimSeach }>();
  const { handleCheckoutItem } = useProductDetail();
  const [selectVariant, setSelectVariant] = useState<boolean>(false);

  // Take variant from selectedOptionsValue
  // const variant = useMemo(() => {
  //   if (!product.options.length) return optimizedVariants.variants[0];
  //   if (selectedOptionValue && selectedOptionValue.every((v) => Boolean(v)))
  //     return optimizedVariants.variantByOption[selectedOptionValue.join('_')];
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [selectedOptionValue, optimizedVariants.variantByOption]);

  const handleBuy = (type: CheckoutType = CheckoutType.Item) => {
    if (type === CheckoutType.BuyCode || type == CheckoutType.BuyData || type === CheckoutType.Recharge) return;
    methods.handleSubmit((values) => {
      handleCheckoutItem(type, { ...dataCart, ...values });
      router.push(type === CheckoutType.Item ? Routers.CHECKOUT : Routers.CHECKOUT_INSTALLMENT);
    })();
  };
  const totalPrice: number = useMemo(
    () => methods.getValues('price')! * methods.getValues('quantity')!,
    [methods.watch('quantity'), methods.watch('productId')]
  );
  const handleAddToCart = (values: cartModel.ProductCart) => {
    if (typeof window !== 'undefined') {
      let cartId = localStorage.getItem('user') || '';
      const paramAdd: cartModel.ParamAdd = {
        userId: cartId,
        carts: [
          {
            orderType: orderType[data.origin_type || 'oppo'],
            cartDetails: [
              {
                ...dataCart,
                ...values
              }
            ],
            totalPrice
          }
        ]
      };
      addToCart(paramAdd);
    }
    close();
  };

  const addToCart = async (param: cartModel.ParamAdd) => {
    const res = await CartService.addProduct(param);
    let cartId = localStorage.getItem('user') || '';
    if (res.code === 200) {
      if (_.isEmpty(cartId)) localStorage.setItem('user', res.result);
      toast.success('Đã thêm sản phẩm vào giỏ hàng');
    }
  };
  const _variant: Array<imallModel.Variant & { selected: imallModel.VariantItem }> = methods.watch('variant');
  let isVariant = useMemo(() => {
    let _isVariant = true;
    if (_variant) {
      _variant.forEach((item) => {
        _isVariant = !item.selected;
      });
    }
    return _isVariant;
  }, [selectVariant]);
  return (
    <form onSubmit={methods.handleSubmit(handleAddToCart)} className="container pb-20 pt-6">
      <HeaderModalSheet />
      <div className="mt-4 space-y-6">
        <div className="flex">
          <div className="w-24">
            <div className="block-img block-square">
              <img src={dataCart.image} alt={data.product_name} className="object-cover rounded-lg" />
            </div>
          </div>
          <div className="ml-4">
            <div className="flex items-center">
              <p className="text-lg">
                <b>{toCurrency(dataCart.originPrice || 0)}</b>
              </p>
              <span className="badge badge-sale ml-2">-{20}%</span>
            </div>
            <p className="text-sm text-neutral-500">
              <s>{toCurrency(dataCart.price || 0)}</s>
            </p>
          </div>
        </div>
        <VariantProduct
                      setSelectVariant={setSelectVariant}
                      selectVariant={selectVariant}
                      changePrice={setPriceProduct}
                      methods={methods}
                      variants={variant}
                    />
        <div className="flex justify-between">
          <p>Số lượng</p>
          <Stepper
            className="w-min"
            min={1}
            max={100}
            {...methods.register('quantity', {
              min: 1,
              max: 100,
              valueAsNumber: true,
              value: 1
            })}
          />
        </div>
        <div>
          <p>Quà tặng kèm</p>
          <ul className="mt-2 space-y-2 md:space-y-4">
            {gifts.map(
              (gift, i) =>
                !_.isEmpty(gift) && (
                  <li key={i}>
                    <label className="relative group card card-side cursor-pointer items-center rounded-3xl text-sm py-3 px-4 md:p-0">
                      {/* <input type="radio" value={i} className="relative z-10 peer" {...methods.register('gift')} /> */}
                      <span className="md:hidden border border-neutral-300 bg-neutral-50 peer-checked:bg-neutral-0 peer-checked:border-red-500 absolute inset-0 pointer-events-none rounded-xl" />
                      <div className="ml-3 md:ml-4 relative w-14 flex justify-center items-center">
                        <Svg src="/icons/others/gift.svg" width={30} height={30} />
                      </div>
                      <div className="ml-3 md:ml-4 relative card-body p-0">
                        <h5 className="text-sm line-clamp-2 font-bold text-base-content">{gift.content}</h5>
                      </div>
                    </label>
                  </li>
                )
            )}

            <li>
              <label className="relative group card card-side cursor-pointer items-center rounded-3xl text-sm py-3 px-4 md:p-0">
                {/* <input type="radio" value={'sim'} className="relative peer z-10" {...methods.register('gift')} /> */}
                <span className="md:hidden border border-neutral-300 bg-neutral-50 peer-checked:bg-neutral-0 peer-checked:border-red-500 absolute inset-0 pointer-events-none rounded-xl" />
                <div className="ml-3 md:ml-4 relative w-14 flex-shrink-0">
                  <div className="card-image block-img block-square shrink-0 overflow-hidden rounded-lg md:rounded-2xl bg-base-200">
                    <img className="object-cover" src={simGift.image} alt={simGift.phone} />
                    <div className="absolute bottom-0 left-0 rounded-tr-xl bg-neutral-100 px-1 py-0.5">
                      <Svg src="/icons/others/gift.svg" width={16} height={16} />
                    </div>
                  </div>
                </div>
                <div className="ml-3 md:ml-4 relative card-body p-0">
                  <h5 className="text-sm line-clamp-2 font-bold text-base-content">Tặng Sim số {simGift.phone}</h5>
                  <p className="max-md:hidden card-desc text-xs">Gói cước iTel 77k</p>
                </div>
                <div className="ml-2 md:ml-4 relative flex items-center md:flex-row-reverse gap-x-2 md:gap-x-3">
                  <div className="div text-right">
                    <p className="font-bold text-base-content">{toCurrency(0)}</p>
                    <p className="text-xs">
                      <s>{toCurrency(simGift.price)}</s>
                    </p>
                  </div>
                  <button type="button" className="md:p-1 hover:animate-spin " style={{ animationDirection: 'reverse' }}>
                    <Svg src="/icons/line/feather-icon.svg" width={24} height={24} />
                  </button>
                </div>
              </label>
            </li>
          </ul>
        </div>
      </div>
      <div className="fixed bottom-0 bg-neutral-0 left-0 w-full z-10">
        <div className="container py-2 flex -mx-1.5">
          {(type === 'buy'
            ? [{ method: CheckoutType.Item, name: 'Mua ngay' }]
            : [
                { method: CheckoutType.Card, name: 'Trả góp qua thẻ tín dụng' },
                isOppo.value ? { method: CheckoutType.Profile, name: 'Trả góp qua TPBank' } : null
              ]
          ).map((item) => {
            if (!item) return null;
            return (
              <div className="px-1.5 w-full" key={item.method}>
                <button
                  disabled={isVariant}
                  type="button"
                  data-headlessui-focus-guard="true"
                  className={clsx(type === 'buy' ? ' btn-primary' : 'btn-outline', 'btn text-sm md:btn-lg rounded-full w-full px-7')}
                  onClick={() => handleBuy(item.method)}
                >
                  {item.name}
                </button>
              </div>
            );
          })}
        </div>
      </div>
      {/* <DebugUI>
        <div className="p-2 rounded-lg bg-neutral-0 shadow-itel">
          <label className="flex items-center gap-x-2 select-none">
            <input type="checkbox" checked={isOppo.value} onChange={isOppo.toggle} />
            Sản phẩm ốp pô
          </label>
        </div>
      </DebugUI> */}
    </form>
  );
};

export const modalSelectProduct = (props: Props) => {
  return modal.open({
    render: <ModalSelectProduct {...props} />,
    className: 'modal-box shadow-itel bg-neutral-0',
    classNameContainer: 'modal-bottom-sheet',
    classNameOverwrite: true
  });
};
export default ModalSelectProduct;
