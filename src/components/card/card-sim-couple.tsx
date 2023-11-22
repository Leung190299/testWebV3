import Svg from '../icon/svg';
import GiftTooltip from '../tag-chip/gift-tooltip';

import { formatPhoneNumber } from '@/utilities/formatSimNumber';

import type { Model } from '@/types/model';
import { toCurrency } from '@/utilities/currency';
import { formatNumber } from '@/utilities/number';
import { useCallback } from 'react';
import IconWithTooltip from '../tag-chip/icon-with-tooltip';
import TagSale from '../tag-chip/tag-sale';
import Tooltip from '../tooltip/tooltip';

import useSimAction from '@/store/cart/hooks/sim';
import { SimModalMode } from '../modal/modal-add-sim';

type CardSimCoupleProps = {
  sims: Array<Model.Sim>;
  image: string;
  pack: Model.PackOfData;
};

const CardSimCouple = ({ sims, image, pack }: CardSimCoupleProps) => {
  const { nextStepSelectType } = useSimAction();

  const handleOpenSlectSim = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      nextStepSelectType(sims[0]);
    },
    [nextStepSelectType, sims]
  );

  let totalPrice = 0;
  let discountPrice = 0;
  let discount = 0;
  return (
    <div>
      <div className="relative md:flex-row-reverse flex items-stretch p-4 md:p-0">
        {/* Right content */}
        <div className="flex-shrink-0 md:bg-neutral-0 relative w-[7.5rem] md:w-1/2 rounded-t-2xl md:p-4 mr-3 md:mr-0">
          <figure className="block-img block-square md:pb-0 md:h-full">
            <img src={image} alt="sim-couple" className="object-cover rounded-lg md:rounded-xl" />
          </figure>
          {sims[0].sale_expiry && (
            <TagSale className="absolute bottom-0 left-0 md:hidden tag-xs rounded-l-md">
              <TagSale.Timer expiry={sims[0].sale_expiry} />
            </TagSale>
          )}
        </div>

        {/* Separate line */}
        <div className="w-3 flex-shrink-0 hidden md:flex">
          <div className="w-full mt-auto" style={{ height: 'calc(100% - 18px)' }}>
            <div className="bg-neutral-0 h-full flex -mx-1" style={{ mask: 'radial-gradient(circle 6px at top,#0000 98%,#000) top right' }}>
              <hr className="border-dashed h-full border-r mx-auto border-neutral-200" />
            </div>
          </div>
        </div>

        {/* Left content */}
        <div className="md:w-1/2 rounded-t-2xl bg-neutral-0 md:px-6 md:py-4 flex-grow">
          <div className="font-itel text-xl md:text-h-xs">
            {sims.map((sim) => {
              totalPrice += sim.price;
              discountPrice += sim.discount_price ?? 0;
              return (
                <div key={sim.phone} className="flex items-center gap-2">
                  <div>
                    <b>{formatPhoneNumber(sim.phone)}</b>
                  </div>
                  <Tooltip content={sim.is_vip ? <b>Sim Vip</b> : <b>Sim cam kết</b>}>
                    <Svg src={sim.is_vip ? '/icons/bold/vip.svg' : '/icons/bold/commit.svg'} className="h-6 w-6 xl:w-8 xl:h-8" />
                  </Tooltip>
                </div>
              );
            })}
          </div>
          <hr className="max-md:hidden mt-2 border-neutral-200" />
          <div className="mt-2">
            <div className="max-md:hidden text-xs font-normal">Gói cước mỗi Sim</div>
            <div className="md:block flex items-center">
              <div className="flex items-center gap-1 md:mb-1 mr-1">
                <p className="md:text-sm xl:text-base">
                  <b>{pack.name}</b>
                </p>
                <span className="max-md:hidden">
                  <IconWithTooltip className="h-5 w-5">
                    <b>Yêu cầu sử dụng gói cước ITEL149 trong thời gian tối thiểu 36 tháng sau khi kích hoạt Sim.</b>
                  </IconWithTooltip>
                </span>
              </div>
              <div className="items-center text-xs md:flex text-neutral-500">
                <b className="xl:text-sm text-base-content">({formatNumber(pack.data, ['B', 'KB', 'GB'])}</b>
                /ngày
                <span className="md:mx-2 text-sm"> | </span>
                <b className="xl:text-sm text-base-content">{formatNumber(pack.price)}</b>
                /tháng)
              </div>
              <p className="mt-1 hidden text-xs text-neutral-500 xl:block">
                Cam kết trong <b>36 tháng</b>
              </p>
            </div>
          </div>
          <div className="mt-2 truncate line-clamp-1">
            <GiftTooltip />
          </div>
        </div>
      </div>
      <hr className="max-md:hidden border-neutral-200" />
      <div className="flex md:items-center justify-between rounded-b-2xl md:bg-neutral-0 px-4 md:px-6 pb-4 md:pb-0 whitespace-nowrap">
        <div>
          <div className="flex md:block">
            <span>
              <span className="block md:inline-block">
                <b>{toCurrency(discountPrice ?? totalPrice)}</b>
              </span>
              {typeof discountPrice === 'number' && (
                <span className="block md:inline-block text-xs text-neutral-500 md:ml-1 font-normal">
                  <s>{toCurrency(totalPrice)}</s>
                </span>
              )}
            </span>
            {(discount = discountPrice ? Math.floor(((totalPrice - discountPrice) / totalPrice) * 100) : 0) && (
              <span>
                <span className="badge badge-sale ml-2">{-discount + '%'}</span>
              </span>
            )}
          </div>
          {sims[0].sale_expiry && (
            <TagSale className="mt-2 max-md:hidden tag-sm rounded-l-md">
              <TagSale.Icon />
              <TagSale.Timer expiry={sims[0].sale_expiry} />
            </TagSale>
          )}
        </div>
        <div className="flex items-center gap-4 md:py-5 flex-shrink-0">
          <button className="btn-tertiary btn btn-sm btn-circle" onClick={handleOpenSlectSim}>
            <Svg src="/icons/bold/cart.svg" className="inline h-5 w-5" />
          </button>
          <button className="btn-secondary btn btn-sm flex-1 rounded-full" data-theme="light" data-buy onClick={handleOpenSlectSim}>
            Mua ngay
          </button>
        </div>
      </div>
      <hr className="md:hidden border-neutral-200" />
    </div>
  );
};

export default CardSimCouple;
