import { Model } from '@/types/model';
import { SimModel } from '@/types/pick-sim';
import { toCurrency } from '@/utilities/currency';
import { formatPhone } from '@/utilities/formatSimNumber';
import clsx from 'clsx';
import Svg from '../icon/svg';
import TagSim from '../tag-chip/tag-sim';

type Props = {
  title?: string;
  mobileTitle?: string;
  point: number;
  type?: 'numberlogy' | 'feng_shui';
  attributes?: SimModel.fongSiu[];
  phone?: string;
  outOfStock?: boolean;
  isMatch?: boolean;
  meaningSim?: string;
  concludeSim?: string;
  item: Model.Sim;
  onBuy?(): void;
  onCart?(): void;
  onSelectPhone?(): void;
};

const SectionSimScore = ({
  title,
  mobileTitle = title,
  point,
  type = 'numberlogy',
  isMatch,
  outOfStock,
  attributes,
  phone,
  meaningSim,
  concludeSim,
  item,
  onBuy,
  onCart,
  onSelectPhone
}: Props) => {
  let discount = 0;
  const message = isMatch
    ? outOfStock
      ? 'Sim phù hợp với bạn. Rất tiếc, sim không còn trong kho'
      : 'Sim phù hợp với bạn. Mua Sim ngay!'
    : 'Sim không phù hợp với bạn. Vui lòng chọn Sim khác';

  return (
    <section className="bg-neutral-0 md:bg-transparent mt-4">
      <div className="container py-6 md:py-0">
        <div className="px-2 md:p-6 xl:p-8 bg-neutral-0 rounded-2xl">
          <div className="grid grid-cols-1 xl:grid-cols-2" style={{ gridTemplateRows: 'max-content auto 1fr' }}>
            <div className="col-start-1 row-start-1 col-end-3 xl:col-end-2 xl:row-span-3 xl:mr-10">
              <div className={clsx('block-img', type === 'feng_shui' ? 'block-cinema md:block-photo' : 'block-photo')}>
                <img
                  src={type === 'numberlogy' ? '/images/sim-numerology-bg-2.png' : '/images/sim-point-bg.png'}
                  alt="12"
                  className={clsx('object-cover', type === 'numberlogy' ? 'rounded-2xl' : 'rounded-xl')}
                />
                <div className="absolute left-12 md:left-20 top-6 md:top-28 xl:top-20 font-itel">
                  <div className="text-base font-bold text-neutral-0 md:text-2xl">
                    <span className="max-md:hidden">{title}</span>
                    <span className="md:hidden">{mobileTitle}</span>
                  </div>
                  <div className="itel text-h1 font-bold text-neutral-0 md:text-[7rem] md:leading-[7rem]">{`${point}/10`}</div>
                </div>
              </div>
            </div>
            {/* Price */}
            <div className="row-start-2 col-start-1 xl:col-start-2 xl:row-start-1 mt-4 xl:mt-0">
              <p className="flex items-center gap-1 text-h-xs leading-6 md:text-xl xl:text-2xl">
                <b className="font-itel">{formatPhone(phone || '')}</b>
                {!item.phone ? (
                  ''
                ) : (
                  <>
                    <TagSim />
                    {/* <span><Svg src="/icons/bold/gift.svg" width={24} height={24} />
                    </span> */}
                  </>
                )}
              </p>
            </div>

            {/* Tag Sale */}

            {/* Information */}
            <div className="col-span-2 xl:col-start-2 xl:col-span-2 xl:row-start-2 mt-4">
              <div className="rounded-2xl md:bg-neutral-50 md:py-4 md:px-6">
                <div className="flex -mx-4 items-stretch">
                  {attributes
                    ?.map(({ title, value }, index) => (
                      <div key={index} className="w-1/3 px-4 md:px-4">
                        <dt className="text-xs md:text-sm text-neutral-500 whitespace-nowrap">{title}</dt>
                        <dd className="text-sm md:text-base font-bold">{value}</dd>
                      </div>
                    ))
                    .reduce(
                      (prev, curr, index) =>
                        [prev, <hr key={'separate_' + index} className="border-l my-auto py-4 border-neutral-400" />, curr] as any
                    )}
                </div>
                <div className="mt-4">
                  <div>
                    <dt className="sr-only">Title</dt>
                    <dd className="text-xs md:text-sm text-neutral-500">Quẻ kinh dịch</dd>
                  </div>
                  <p className={clsx(type === 'numberlogy' ? 'font-medium' : 'font-bold', 'text-md md:text-base mt-1')}>{meaningSim}</p>
                </div>
              </div>
            </div>
            {/* Action and conclude */}
            <div className="col-span-2 xl:col-start-2 xl:col-span-2 xl:row-start-3">
              <div className="block items-end md:flex">
                <div className="flex flex-col-reverse md:block flex-1 md:mr-4 mt-4">
                  <div className="mt-4 md:mt-0 pt-3 md:pt-0 border-t border-neutral-200 md:border-none">
                    <div className="max-md:hidden text-sm">Kết luận</div>
                    <div className="text-sm md:text-base text-red-500 font-bold md:mt-1">{concludeSim}</div>
                  </div>
                  {/* <button className="btn-ghost btn btn-sm hover:bg-transparent px-0 gap-x-2 justify-normal">
                    Xem chi tiết luận giải Sim
                    <Svg src="/icons/line/arrow-right.svg" width={20} height={20} />
                  </button> */}
                </div>
                {!item.phone ? (
                  <div className="flex justify-between md:block mt-4">
                    <div className="flex md:items-center">
                      <span className="md:flex items-center">
                        <span className="block md:inline-block md:text-xl">
                          <b>Số không có sẵn</b>
                        </span>
                      </span>
                    </div>
                    <div className="flex items-center md:mt-2"><button type="button" className="btn btn-sm flex-1 bg-primary whitespace-nowrap rounded-full" onClick={onSelectPhone}>
                        Vui lòng chọn số khác
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex justify-between md:block mt-4">
                    <div className="flex md:items-center">
                      <span className="md:flex items-center">
                        <span className="block md:inline-block md:text-xl">
                          <b>{toCurrency(item.price || 0)}</b>
                        </span>
                        {/* { (
                          <span className="block md:inline-block text-sm text-neutral-500 md:ml-1 font-normal">
                            <s>{item.SimPrice}</s>
                          </span>
                        )} */}
                      </span>
                      {/* {(discount = item.EsimPrice ? Math.floor(((item.PackPrice - item.SimPrice) / item.EsimPrice) * 100) : 0) && (
                        <span>
                          <span className="badge badge-sale ml-2">{-discount + '%'}</span>
                        </span>
                      )} */}
                    </div>
                    <div className="flex items-center md:mt-2">
                      <button type="button" className="btn-tertiary btn btn-sm btn-circle mr-3" onClick={onCart}>
                        <Svg src="/icons/bold/cart.svg" className="inline h-5 w-5" />
                      </button>
                      <button className="btn-primary btn btn-sm flex-1 whitespace-nowrap rounded-full" onClick={onBuy}>
                        Mua ngay
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionSimScore;