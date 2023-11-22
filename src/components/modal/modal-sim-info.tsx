import { useModal } from '@/libs/modal';
import useIsSticky from '@/hooks/useIsSticky';
import clsx from 'clsx';
import React, { useRef } from 'react';
import Svg from '../icon/svg';
import type { Model } from '@/types/model';

import styles from '@/styles/sim.module.scss';
import TagSale from '../tag-chip/tag-sale';
import { formatPhone } from '@/utilities/formatSimNumber';
import TagSim from '../tag-chip/tag-sim';
import TagVip from '../tag-chip/tag-vip';
import { toCurrency } from '@/utilities/currency';
import HeaderAppDefault from '../header/header-app-default';

type Props = {
  title?: string;

  item: Model.Sim;
  tags?: string[];
  type?: 'sheng_fui' | 'numerology';

  onAddToCart?(): void;
  onBuyNow?(): void;
};

const ModalSimInfo = ({ title, item, tags = [], onAddToCart, onBuyNow, type = 'sheng_fui' }: Props) => {
  const { close } = useModal();
  const ref = useRef<HTMLHRElement>(null);
  const isSticky = useIsSticky(ref, {});
  const content = undefined;

  const isMatch = true;
  const outOfStock = false;
  let discount = 0;

  const attributes = [
    { title: 'Mệnh', value: 'Hoả' },
    { title: 'Số nút', value: '7' },
    { title: 'Cát - hung', value: 'Đại Cát' }
  ];
  const message = isMatch
    ? outOfStock
      ? 'Sim phù hợp với bạn. Rất tiếc, sim không còn trong kho'
      : 'Sim phù hợp với bạn. Mua Sim ngay!'
    : 'Sim không phù hợp với bạn. Vui lòng chọn Sim khác';
  const isValidSale = item.sale_expiry ? new Date(item.sale_expiry).getTime() > Date.now() : false;

  return (
    <div>
      {/* Header */}
      <HeaderAppDefault type="fixed" mode="close" title={title} />
      <button
        type="button"
        className={clsx(
          'max-md:hidden left-4 md:left-auto md:right-4 absolute top-4 btn-tertiary md:bg-neutral-0 z-10 transition-default btn btn-sm btn-circle'
        )}
        onClick={close}
      >
        <Svg src="/icons/line/close.svg" width={24} height={24} />
      </button>
      {/* Main content */}
      <div className="container md:py-12">
        <div className="flex flex-wrap gap-10 bg-neutral-0">
          <div className="flex-1">
            {/* Banner */}
            <div className="md:mx-0 -mx-4 md:rounded-2xl overflow-hidden">
              <div className="block-img block-cinema xl:block-photo bg-transparent" data-theme="dark">
                <img
                  src={
                    type == 'sheng_fui'
                      ? '/images/sim-point-bg.png'
                      : 'https://res.cloudinary.com/dt1oay7cv/image/upload/v1685440663/itel/images/31fff1f852d79e1eadd8e64d5b1d83d5_wl7v4f.png'
                  }
                  alt="123"
                  className="object-cover"
                />
                {isValidSale && (
                  <div className="absolute bottom-0 left-0 flex">
                    <TagSale className="tag-sm md:tag-lg rounded-l">
                      <TagSale.Icon></TagSale.Icon>
                      <TagSale.Timer expiry={item.sale_expiry}></TagSale.Timer>
                    </TagSale>
                  </div>
                )}
                <div className="font-itel absolute top-[2.375rem] md:top-28 xl:top-44 left-20 text-center">
                  <div className="text-base md:text-h-xs">{type === 'sheng_fui' ? 'Điểm phong thuỷ' : 'Điểm THần số Học'}</div>
                  <div className="text-h-xl md:text-[7rem] md:leading-[1]">9/10</div>
                </div>
              </div>
            </div>
            <div className="mt-4 xl:mt-6">
              <div>
                <p className="flex items-center gap-2 text-h-xs leading-6 md:text-xl xl:text-h-md">
                  <b className="font-itel">{formatPhone(item.phone)}</b>
                  {item.is_vip ? <TagVip className="h-6 w-6 xl:h-10 xl:w-10" /> : <TagSim className="h-6 w-6 xl:h-10 xl:w-10" />}
                  <span>
                    <Svg src="/icons/bold/gift.svg" className="h-6 w-6 xl:h-10 xl:w-10" />
                  </span>
                </p>
                <ul className="md:hidden mt-2 space-x-1">
                  {tags.map((label) => (
                    <li key={`key-${label}`} className="tag tag-primary">
                      {label}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-4">
                <h2 className="xl:text-xl">
                  <strong>Điểm thần số học 9/10</strong>
                </h2>
                <p className="mt-2 xl:mt-4 text-neutral-500">
                  Thí chủ Nam mệnh Sơn đầu hỏa mang nghĩa “lửa trên núi”. Cùng là hành Hỏa nhưng sau khi đi kèm với yếu tố nạp âm, mệnh Sơn
                  Đầu Hỏa lại mang những đặc trưng khác biệt với những mệnh Hỏa khác. Thí chủ phù hợp với các số 3,7, 6 và kỵ với các số 1,
                  9, nên chọn các số thuộc mệnh Hỏa, mệnh Mộc và tránh lựa chọn các số thuê bao thuộc mệnh Thủy.
                </p>
              </div>
              <div className="flex -mx-4 items-stretch mt-4">
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
                <div className="max-xl:hidden">
                  <dt className="sr-only">Title</dt>
                  <dd className="text-xs md:text-sm text-neutral-500">Quẻ kinh dịch</dd>
                </div>
                <p className="font-bold text-md md:text-base md:mt-1">
                  Số vận thủ lĩnh, hương tận vinh hoa phú quý, quan lộc thăng tiến. Số vận thủ lĩnh, hương tận vinh hoa phú quý, quan lộc
                  thăng tiến
                </p>
              </div>
            </div>
            {/* Content */}
            <div className={styles.content} dangerouslySetInnerHTML={content ? { __html: content } : undefined}>
              <div>
                {/*  */}
                <h3>
                  <strong>Chỉ số sứ mệnh: 2</strong>
                </h3>
                <p>
                  Điểm chung của những người mang số 2 trong thần số học là muốn mọi người tập trung vào bạn. Bạn luôn là người kết nối hòa
                  giải mâu thuẫn cho người khác.
                </p>
                <h3>
                  <strong>Năm cá nhân: 2</strong>
                </h3>
                <p>
                  Hợp tác và cân bằng: Trong năm thứ hai, khi các kế hoạch đã được ươm mầm thì cần có sự chăm sóc bởi các yếu tố bên ngoài
                  khác từ sự giúp đỡ, hợp tác với những người xung quanh. Trong thời gian này bạn cần hiểu rõ giới hạn của bản thân, xem khả
                  năng của mình đến đâu và bổ sung sự thiếu sót bằng những mối quan hệ xung quanh.
                </p>
                <h3>
                  <strong>Biểu đồ ngày sinh</strong>
                </h3>
                <p>Trục mũi tên Quyết tâm (1.5.9): Bạn có đức tính kiên trì bền bỉ, sẵn sàng theo đuổi mục tiêu đến khi đạt được</p>
                <p>
                  <img
                    src="https://res.cloudinary.com/dt1oay7cv/image/upload/v1685431865/itel/images/11887cedd7affc37603d2e3af755065c_npnng5.png"
                    alt="Screenshot"
                    loading="lazy"
                  />
                </p>

                <h3>
                  <strong>Kim Tự Tháp Thần số học</strong>
                </h3>
                <p>
                  · Đỉnh cao sự nghiệp 1: 31 tuổi (2023)
                  <br />
                  · Đỉnh cao sự nghiệp 2: 40 tuổi (2039)
                  <br />
                  · Đỉnh cao sự nghiệp 3: 49 tuổi (2048)
                  <br />· Đỉnh cao sự nghiệp 4: 58 tuổi (2057)
                </p>
                <p>
                  Biểu đồ ngày sinh thiếu năng lượng các số: 2, 3, 4, 6, 8 Biểu đồ ngày sinh thiếu các trục: 1.2.3; 4.5.6; 7.8.9; 1.4.7;
                  2.5.8; 3.6.9; 3.5.7 Số đơn lẻ: 0
                </p>
                <p>
                  <img
                    src="https://res.cloudinary.com/dt1oay7cv/image/upload/v1685432233/itel/images/e1c55d35769aa04df958a3e7886fb403_wj4mtf.png"
                    alt="Screenshot"
                    loading="lazy"
                  />
                </p>
              </div>
            </div>
          </div>
          <div className="w-full xl:w-[25.5rem] pb-24 md:pb-16 xl:pb-0">
            <div className="xl:p-6">
              <div className="hidden xl:block">
                <div>
                  <p className="flex items-center gap-2 text-h-xs leading-6 md:text-xl xl:text-h-xs">
                    <b className="font-itel">{formatPhone(item.phone)}</b>
                    {item.is_vip ? <TagVip className="h-6 w-6" /> : <TagSim className="h-6 w-6" />}
                    <span>
                      <Svg src="/icons/bold/gift.svg" className="h-6 w-6" />
                    </span>
                  </p>
                  <ul className="md:hidden mt-2 space-x-1">
                    {tags.map((label) => (
                      <li key={`key-${label}`} className="tag tag-primary">
                        {label}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex -mx-4 items-stretch mt-4">
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
                  <div className="max-xl:hidden">
                    <dt className="sr-only">Title</dt>
                    <dd className="text-xs md:text-sm text-neutral-500">Quẻ kinh dịch</dd>
                  </div>
                  <p className="font-bold text-md md:text-base md:mt-1">
                    Số vận thủ lĩnh, hương tận vinh hoa phú quý, quan lộc thăng tiến. Số vận thủ lĩnh, hương tận vinh hoa phú quý, quan lộc
                    thăng tiến
                  </p>
                </div>
              </div>
              <div className="mt-4">
                <p>
                  <strong>Quà tăng kèm</strong>
                </p>
                <ul className="space-y-2 mt-4">
                  {Array.from({ length: 3 }).map((_, index) => (
                    <li key={index}>
                      <label className="relative px-4 py-3 md:py-2 flex items-center gap-3 md:gap-4 md:border rounded-xl md:bg-neutral-50 border-neutral-300">
                        <input className="relative z-10 md:hidden peer" type="radio" name="gift" />
                        <span className="md:hidden absolute inset-0 pointer-events-none border rounded-xl border-neutral-300 peer-checked:border-red-500 bg-neutral-50 peer-checked:bg-neutral-0" />
                        <div className="relative w-14">
                          <div className="block-img block-square rounded-lg overflow-hidden">
                            <img
                              src="https://res.cloudinary.com/dt1oay7cv/image/upload/v1686570456/itel/images/f9b1f8b6ed8c5f5ba1e2dff9927a73b7_uiun6p.png"
                              className="object-cover"
                              alt="gift"
                            />
                            <div className="absolute bottom-0 left-0 rounded-tr-xl bg-neutral-100 px-1 py-0.5">
                              <Svg src="/icons/others/gift.svg" width={16} height={16} />
                            </div>
                          </div>
                        </div>
                        <div className="relative flex-1 text-sm font-medium md:font-bold">Tai nghe không dây chụp tai Sony WH-1000XM4</div>
                        <div className="relative md:min-w-[5rem] text-right">
                          <p className="font-medium text-sm">{toCurrency(0)}</p>
                          <p className="text-xs text-subtle-content">
                            <s>{toCurrency(999_000)}</s>
                          </p>
                        </div>
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="fixed bottom-0 right-0 left-0 xl:relative bg-neutral-0 border-t border-neutral-200 xl:border-none pb-2 mt-4">
                <div className="container xl:px-0">
                  <div className="max-md:hidden flex xl:block items-center">
                    <p className="text-sm mr-1">Kết luận</p>
                    <p className="text-sm md:text-base text-red-500 font-bold xl:mt-1">{message}</p>
                  </div>
                  <div className="flex justify-between mt-4">
                    <div className="flex flex-1">
                      <div>
                        <p className="block md:text-xl">
                          <b>{toCurrency(item.discount_price ?? item.price)}</b>
                        </p>
                        {typeof item.discount_price === 'number' && (
                          <p className="block text-sm text-neutral-500 font-normal">
                            <s>{toCurrency(item.price)}</s>
                          </p>
                        )}
                      </div>
                      {(discount = item.discount_price ? Math.floor(((item.price - item.discount_price) / item.price) * 100) : 0) && (
                        <span className="max-md:hidden">
                          <span className="badge badge-sale ml-2">{-discount + '%'}</span>
                        </span>
                      )}
                    </div>
                    <div className="flex items-center md:mt-2">
                      <button type="button" className="btn-tertiary btn btn-sm btn-circle mr-3" onClick={onAddToCart}>
                        <Svg src="/icons/bold/cart.svg" className="inline h-5 w-5" />
                      </button>
                      <button className="btn-primary btn btn-sm flex-1 whitespace-nowrap rounded-full" onClick={onBuyNow}>
                        Mua ngay
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalSimInfo;
