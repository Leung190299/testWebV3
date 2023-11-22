import usePrevious from '@pit-ui/modules/hooks/usePrevious';
import { useEffect, useMemo, useState } from 'react';
import { toast } from 'react-hot-toast';

import { useAppSelector } from '@/store/hooks';

import { toCurrency } from '@/utilities/currency';
import { formatPhoneNumber } from '@/utilities/formatSimNumber';

import { toggleEsim } from '@/components/modal/modal-e-sim';
import HrDashed from '../common/dashed';
import Svg from '../icon/svg';
import TagSim from '../tag-chip/tag-sim';

import useCartProduct from '@/hooks/useCartProduct';
import useIsClient from '@/hooks/useIsClient';
import Routers from '@/routes/routers';
import useSimAction from '@/store/cart/hooks/sim';
import type { Model } from '@/types/model';
import { getDiscountPercentage, randomBetween } from '@/utilities/number';
import { useRouter } from 'next/router';
import { FormProvider, useForm, useFormContext, useWatch } from 'react-hook-form';
import CardDataSelect from '../card/card-data-select';
import { useDataModal } from '../pages/pack-data/hooks';
import TagSale from '../tag-chip/tag-sale';

export enum SimModalMode {
  Cart,
  Buy,
  Change
}
export interface IFormSelectSim {
  sims: Array<{
    type: 'esim' | 'physic';
    pack: string;
  }>;

  paymentMethod: string;
}

type ModalAddToCartProps = {
  items: Array<Model.Sim>;
  mode?: SimModalMode;
  title?: string;
};
const BottomSheetAddToCart = ({ items, title = 'Chi tiết Sim' }: ModalAddToCartProps) => {
  useIsClient();

  const [selected, setSelected] = useState(0);
  const router = useRouter()
  const { addProduct } = useCartProduct();
  const{handleBuyNow}=useSimAction()
  const cartSimItem = useAppSelector((state) => state.cart.cartSimItem);
  // const packs = _.isEmpty(items[0].pack) ? [] : [items[0].pack];


  const [packs] = useState<Model.PackOfData[]>(
    Array.from({ length: 1 }, (e, idx) => ({
      data: randomBetween(1, 5) * 1_000_000,
      data_type: 'day',
      id: idx + 1,
      name: items[0].pack?.name || '',
      price: items[0].pack?.price || 0,
      discount_price: items[0].pack?.price || 0,
      price_type: 'month',
      ThoiGianCamKet: items[0].ThoiGianCamKet || 0
    }))
  );

  const [gifts] = useState(
    // Array.from({ length: randomBetween(1, 5) }, (e, idx) => ({
    //   ...pickRandomGift(),
    //   id: idx + 1,
    //   image: ImageService.random('artworks'),
    //   price: randomBetween(10, 20) * 50_000,
    //   count: 1
    // }))
    []
  );

  const defaultValues = useMemo(
    () => ({
      sims: items.map((item) => ({
        type: 'physic' as any,
        pack: String(packs[0].id)
      })),
      paymentMethod: 'card'
    }),
    [items, packs]
  );

  const methods = useForm<IFormSelectSim>({
    defaultValues,
    criteriaMode: 'all'
  });

  const handleSubmit = (mode: SimModalMode,) => {
    try {
      const values: IFormSelectSim = methods.getValues();
      const isExisted = cartSimItem.some((e) => {
        return e.merchandise.some((sim) => items.some((item) => item.phone == sim.sim.phone));
      });
      // if (isExisted) return toast.error('Số điện thoại đã có trong giỏ hàng');
      const simsSubmit = items.map((sim, index) => {
        const pack = packs.find((pack) => pack.id === Number(values.sims[index].pack));
        if (!pack) throw new Error('missing pack');
        return {
          ...sim,
          type: methods.getValues(`sims.${index}.type`),
          pack,
          price: values.sims[0].type == 'physic' ? sim.price! : sim.EsimPrice!
        };
      });

      if (mode === SimModalMode.Cart) {
        addProduct([
          {
            orderType: 1,
            cartDetails: simsSubmit
              .map((item) => ({
                price: item.price,
                eSim: values.sims[0].type == 'physic' ? 0 : 1,
                productId: item.phone,
                productType: 1
              }))
              .concat(
                simsSubmit.map((item) => ({
                  eSim: 0,
                  price: item.pack.price,
                  productType: 2,
                  productId: item.pack.name
                }))
              )
          }
        ]);
        router.push(Routers.CART)
      } else {
        handleBuyNow({
          sims: simsSubmit,
          gift: gifts ? { options: gifts, selected } : undefined
        })

      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const option = methods.watch();
  const simOptions = useMemo(
    () => [
      {
        id: 1,
        title: 'Sim vật lý',
        type: 'physic',
        price: 0,
        desc: 'Sim vật lý là thẻ sim nhựa được lắp vào máy'
      },
      {
        id: 2,
        title: 'Sử dụng eSim' + ` (+ ${toCurrency(items.reduce((total, item) => total + item.EsimPrice! - item.SimPrice!, 0))}) `,
        type: 'esim',
        price: items.reduce((total, item) => total + item.EsimPrice! - item.SimPrice!, 0),
        desc: 'eSIM là SIM điện tử, được gửi về email của Khách hàng, thay thế cho thẻ Sim vật lý. Chỉ dùng cho các dòng máy hỗ trợ eSIM.'
      }
    ],
    [items]
  );

  const totalPrice = useMemo(
    () =>
      items.reduce((total, item, index) => {
        total += item.discount_price ?? item.price;

        const type = methods.getValues(`sims.${index}.type`);

        if (type) {
          const simOption = simOptions.find((op) => op.type === type);
          if (simOption) total += simOption.price;
        }
        const packId = methods.getValues(`sims.${index}.pack`);
        if (packId) {
          const pack = packs.find((pack) => pack.id === Number(packId));
          if (pack) total += pack.discount_price ?? pack.price;
        }

        return total;
      }, 0),
    [option]
  );
  const pricePack = useMemo(
    () =>
      items.reduce((price, item, index) => {
        const packId = methods.getValues(`sims.${index}.pack`);
        if (packId) {
          const pack = packs.find((pack) => pack.id === Number(packId));
          if (pack) price += pack.discount_price ?? pack.price;
        }
        return price;
      }, 0),
    [items, methods, packs, option]
  );

  const priceSim = useMemo(
    () =>
      items.reduce((price, item, index) => {
        price += item.discount_price ?? item.price;

        const type = methods.getValues(`sims.${index}.type`);

        if (type) {
          const simOption = simOptions.find((op) => op.type === type);
          if (simOption) price += simOption.price;
        }
        return price;
      }, 0),
    [items, methods, simOptions, option]
  );

  return (
    <FormProvider {...methods} >
      <form  >


        <div className="container max-xl:max-w-none md:py-4 ">
          <div>
            {items
              .map((item, index) => (
                <SimPopupDetail
                  key={item.phone}
                  simOptions={simOptions}
                  data={item}
                  index={index}
                  packs={packs}
                  isMultipleSim={items.length > 1}
                />
              ))
              .reduce(
                (prev, cur, index) =>
                  [prev, <HrDashed key={'separeted_' + index} className="text-neutral-200 -mt-px max-md:hidden" />, cur] as any
              )}
          </div>
          {/* {!_.isEmpty && (
            <div className="mt-0 py-6 xl:mt-4 xl:rounded-2xl xl:bg-neutral-0 xl:px-8">
              <p className="text-xl">
                <b>Quà tặng kèm</b>
              </p>
              <div className="mt-4 flex flex-col items-center justify-between gap-2 xl:flex-row xl:gap-6">
                {gifts.map((item, index) => (
                  <CardSimBonusWithRadio
                    key={index}
                    cardGift={{
                      id: index,
                      image: item?.image || '',
                      name: item?.name || '',
                    }}
                    price={item?.price || 0}
                    isChecked={index === selected}
                    onChange={() => setSelected(index)}
                  />
                ))}
              </div>
            </div>
          )} */}
        </div>
        <div className="sticky bottom-0 z-10 border-t border-neutral-200 bg-neutral-0 mb-4">
          <div className="container pb-6 pt-4">
            <div className="flex items-center flex-wrap justify-center md:flex-row">
              <div className="flex-1 flex items-end  gap-2 md:gap-6">
                <div className="justify-between items-center  text-left">
                  <p className="text-sm font-normal text-subtle-content xl:text-base">Giá SIM</p>
                  <p className="text-lg xl:text-s-md">
                    <b>{toCurrency(priceSim)}</b>
                  </p>
                </div>
                <div className="text-s-sm xl:text-s-md">+</div>
                <div className=" justify-between items-center  text-left">
                  <p className="text-sm font-normal text-subtle-content xl:text-base">Gói cước</p>
                  <p className="text-lg xl:text-s-md">
                    <b>{toCurrency(pricePack)}</b>
                  </p>
                </div>
                <div className="text-s-sm xl:text-s-md">=</div>
                <div className=" justify-between items-center  text-left">
                  <p className="text-sm font-normal text-subtle-content xl:text-base">Tổng tiền</p>
                  <p className="text-lg xl:text-s-md text-primary">
                    <b>{toCurrency(totalPrice)}</b>
                  </p>
                </div>
              </div>

              <div className="w-full md:w-auto flex gap-3 xl:gap-4 py-2">
                <button type='button' onClick={()=>handleSubmit(SimModalMode.Cart)} className="w-[50px] h-[50px] p-2.5  rounded-[50px] bg-neutral-200   justify-center items-center gap-2 inline-flex">
                  <Svg src='/icons/bold/cart.svg' width={25} height={25} />
                </button>
                <button type="button" onClick={()=>handleSubmit(SimModalMode.Buy)} className="flex-1 btn-primary btn whitespace-nowrap rounded-full xl:btn-lg">
                  Thanh toán
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </FormProvider>
  );
};

const SimPopupDetail = ({
  data,
  index,
  packs,
  isMultipleSim,
  simOptions
}: {
  data: Model.Sim;
  index: number;
  packs: Model.PackOfData[];
  isMultipleSim?: boolean;
  simOptions: Array<{
    id: number;
    title: string;
    type: string;
    price: number;
    desc: string;
  }>;
}) => {
  const methods = useFormContext<IFormSelectSim>();
  const discountPercentage = getDiscountPercentage(true, data.price, data.discount_price);
  const { handleViewDetail } = useDataModal();

  const type = useWatch<IFormSelectSim, `sims.${number}.type`>({ name: `sims.${index}.type` });
  const prevType = usePrevious(type);

  useEffect(() => {
    if (prevType !== type && type === 'esim') toggleEsim(() => methods.setValue(`sims.${index}.type`, prevType!));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type]);

  return (
    <div className="bg-neutral-0 py-4 md:py-6 xl:p-8 rounded-2.5xl">
      <div className="flex relative bg-neutral-0">
        <div className="w-24 md:w-20 mr-4">
          <figure className="block-img block-square">
            <img src="/images/iconCart.png" alt="pick-sim" className="object-cover rounded-lg" />
          </figure>
        </div>
        <div className="md:flex items-center flex-1">
          <div className="flex-1">
            <p className="text-xs md:text-base font-normal text-neutral-500">
              {isMultipleSim ? `Sim đôi ưu đãi - Sim 0${index + 1}` : 'Số thuê bao bạn lựa chọn là'}
            </p>
            <div className="flex items-center mt-1">
              <p className="font-itel text-h-xs md:text-h4 xl:text-h3 mr-1">{formatPhoneNumber(data.phone)}</p>
              {data.ThoiGianCamKet && data.ThoiGianCamKet > 0 ? <TagSim className="w-6 h-6 md:h-8 md:w-8" /> : undefined}
            </div>
          </div>
          <div className="mt-2 md:mt-0">
            <div className="price-info items-center md:justify-end">
              <span className="md:flex items-center xl:text-xl">
                <p className="mr-2">
                  <b>{toCurrency(data.discount_price ?? data.price)}</b>
                </p>
                {data.discount_price! > 0 && (
                  <p className="block text-xs font-normal text-neutral-500">
                    <s>{toCurrency(data.price)}</s>
                  </p>
                )}
              </span>
              {discountPercentage && data.discount_price! > 0 && <span className="badge badge-sale">-{discountPercentage}%</span>}
            </div>
            <div className="absolute md:relative left-0 bottom-0 md:mt-2">
              {data.sale_expiry && (
                <TagSale className="tag-xs md:tag-sm">
                  <TagSale.Icon className="hidden xl:block" />
                  <TagSale.Timer expiry={data.sale_expiry} />
                </TagSale>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 md:mt-8 border-t-2 md:border-none border-neutral-200 pt-2 md:pt-0">
        <div className="text-md :text-xl font-bold">Chọn loại Sim</div>
        <div>
          <ul className="md:flex gap-10">
            {simOptions.map((option) => {
              return (
                <li key={option.id} className="mt-4">
                  <label className="flex md:items-center min-w-[12rem]">
                    <input type="radio" className="mr-4" value={option.type} {...methods.register(`sims.${index}.type`)} />
                    <div>
                      <p className="text-sm md:text-base">
                        <b>{option.title}</b>
                      </p>
                      <p className="text-xs md:text-sm mt-1">{option.desc}</p>
                    </div>
                  </label>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div className="mt-6 md:mt-8 bg-neutral-200 md:bg-neutral-0 mx-[-16px] md:mx-0 p-4 md:p-0">
        <p className="text-md :text-xl font-bold">Chọn gói cước</p>
        <div className="mt-4">
          <div className="flex -mx-4 px-2.5 md:px-12 md:-mx-14 xl:px-0 xl:-mx-2 overflow-auto scrollbar-hide">
            {packs.map(({ price, discount_price, id, name, ThoiGianCamKet }, idx) => (
              <div key={id} className="px-1.5 md:px-2 xl:w-1/4 flex-shrink-0">
                <label className="block w-[15rem] md:w-[13.75rem] xl:w-auto flex-shrink-0">
                  <CardDataSelect
                    title={name}
                    price={price}
                    discountPrice={discount_price == price ? undefined : discount_price}
                    value={id}
                    inputProps={methods.register(`sims.${index}.pack`)}
                    strongFirstInfo={name == 'MAY'}
                    ThoiGianCamKet={ThoiGianCamKet}
                  />
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BottomSheetAddToCart;
