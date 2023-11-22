import type { Model } from '@/types/model';
import { toCurrency } from '@/utilities/currency';
import { formatNumber, getDiscountPercentage } from '@/utilities/number';
import clsx from 'clsx';
import Svg from '../icon/svg';
import TagSale from '../tag-chip/tag-sale';
import TagVip from '../tag-chip/tag-vip';
import Tooltip from '../tooltip/tooltip';

type SimInforProps = {
  item: Model.Sim;
  pack: Model.PackOfData;
  gift?: Model.Gift;
  onAddToCart?(): void;
  onBuy?(): void;

  tags?: { id: number | string; name: string }[];
  onSelectTag?(tag: any): void;

  className?: string;
};

const SimRowItem = ({ item, onAddToCart, onBuy, pack, gift, tags = [], onSelectTag, className }: SimInforProps) => {
  const handleOpenAddToCardModal = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onAddToCart ? onAddToCart() : void 0;
  };
  const handleOnBuy = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    onBuy ? onBuy() : void 0;
  };

  const discountPercentage = getDiscountPercentage(true, item.SimType == 10 ? 50000 : item.price, item.discount_price);

  const showCommitTime = item.ThoiGianCamKet ? item.ThoiGianCamKet > 0 : false;

  return (
    <tr className={clsx('group relative flex-wrap border-b border-neutral-200 py-5 max-md:flex  rounded-[10px] md:rounded-none mt-2  bg-neutral-0 px-4 md:px-0', className)}>
      {/* Infor */}
      <td className="table-cell w-full max-w-xs md:w-auto md:py-6 md:pb-6 md:pl-4 md:pr-3">
        <span className="transition-default pointer-events-none absolute inset-0 rounded-xl border border-transparent duration-200 group-hover:border-red-500 max-md:hidden"></span>
        <p className="flex items-center gap-1 text-h-xxs leading-6 md:text-xl xl:text-2xl">
          <span className="font-itel text-neutral-500" dangerouslySetInnerHTML={{__html:item.PhoneFormated!}} />
          {item.is_vip ? <TagVip /> : null}
          <span className="hidden md:block xl:hidden">
            <Tooltip
              content={
                <div className="flex gap-4">
                  <img src="/images/gift-bonus.png" alt="gift bonus" className="h-14 w-14 object-cover" />
                  <div>
                    <p className="mb-1 text-sm font-bold">{gift?.name}</p>
                    <p className="text-sm font-bold">
                      0đ <span className="ml-1 text-xs text-neutral-500 line-through">{gift?.price}</span>
                    </p>
                  </div>
                </div>
              }
              preventDefault
              className="cursor-default"
            >
              <Svg src="/icons/bold/gift.svg" width={16} height={16} />
            </Tooltip>
          </span>
        </p>
        <p className="xl:hidden text-sm mt-1 md:mt-0">
          <b className="text-base">Gói {pack.name} </b>

          <b>
            {'('}
            {formatNumber(pack.data, ['B', 'KB', 'GB'])}
          </b>
          <span className="text-neutral-500">/ngày</span>
          <span> | </span>
          <b>{formatNumber(pack.price)}</b>
          <span className="text-neutral-500">/tháng{')'}</span>
          {item.SimType == 10 && <s className="ml-2">{formatNumber(77_000)}/tháng</s>}
        </p>

        <div className="mt-3 md:hidden xl:flex">{/* <GiftTooltip /> */}</div>
        {showCommitTime && (
          <p className="mt-1  text-xs text-neutral-500 xl:hidden">
            Cam kết trong <b>{item.ThoiGianCamKet} tháng</b>
          </p>
        )}
      </td>
      {/* type */}
      <td className='table-cell w-full max-w-xs md:w-auto md:py-6 md:pb-6 md:pl-4 md:pr-3'>
      <ul className="mt-2 space-x-1">
          {tags.map((tag) => (
            <li
              key={tag.id}
              className={clsx('tag tag-primary tag-sm ', tag.id != 0 && 'cursor-pointer')}
              onClick={
                onSelectTag && tag.id != 0
                  ? (e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      onSelectTag(tag);
                    }
                  : void 0
              }
            >
              {tag.name}
            </li>
          ))}
        </ul>
      </td>
      {/* Pack data */}
      <td className="px-3 py-6 text-left max-md:hidden">
        <div className="flex items-center gap-1 md:mb-1">
          <p className="md:text-sm xl:text-base">
            <b>{pack.name}</b>
          </p>
          {showCommitTime ? (
            <Tooltip
              withArrow
              content={

                <b>{`Yêu cầu sử dụng gói cước ${pack.name} hàng tháng, trong thời gian ${item.ThoiGianCamKet}  tháng liên tục sau khi kích hoạt`}</b>
              }
            >
              <Svg src="/icons/line/information.svg" width={20} height={20} />
            </Tooltip>
          ) : (
            <Tooltip
              withArrow
              content={
                <b>{`Được đăng ký gói cước ${pack.name} siêu ưu đãi
                ${formatNumber(pack.data, ['B', 'KB', 'GB'])}/ngày, miễn phí gọi nội mạng VinaPhone & iTel`}</b>
              }
            >
              <Svg src="/icons/line/information.svg" width={20} height={20} />
            </Tooltip>
          )}
          {showCommitTime && (
            <p className="mt-1  hidden text-xs text-neutral-500 xl:block">
              Cam kết trong <b>{item.ThoiGianCamKet} tháng</b>
            </p>
          )}
        </div>
        <div className="items-center text-xs xl:flex">
          <div>
            <b className="xl:text-sm">{formatNumber(pack.data, ['B', 'KB', 'GB'])}</b>
            <span className="text-neutral-500">/ngày</span>
          </div>
          <span className="mx-2 hidden text-sm text-neutral-500 xl:block">|</span>
          <div>
            <b className="xl:text-sm">{formatNumber(pack.price)}</b>
            <span className="text-neutral-500">/tháng</span>
          </div>
          {item.SimType && item.SimType == 10 && (
            <span className="ml-1">
              {' '}
              ( <s>{formatNumber(77000)}/tháng </s>)
            </span>
          )}
        </div>
        {showCommitTime && (
          <p className="mt-1  text-xs text-neutral-500 xl:block">
            Cam kết trong <b>{item.ThoiGianCamKet} tháng</b>
          </p>
        )}
      </td>
      {/* Price */}
      <td className="mt-3 w-full md:w-auto md:px-3 md:py-6">
        <div className="flex min-w-max flex-wrap items-center md:items-start justify-between md:flex-nowrap">
          <div className="flex-1">
            <div className="price-info items-start">
              <div className="flex items-center gap-1 md:block">
                <p className="text-base md:text-sm xl:text-base">
                  <b>{toCurrency(item.discount_price ?? item.price)}</b>
                </p>

                {discountPercentage && item.discount_price! > 0 && (
                  <p className="text-xs font-normal text-neutral-500">
                    <s>{toCurrency(item.price)}</s>
                  </p>
                )}
              </div>
              {discountPercentage && item.discount_price! > 0 && (
                <span className="badge badge-sale hidden md:flex"> -{discountPercentage}%</span>
              )}
            </div>
            {item.sale_expiry && (
              <TagSale className="absolute right-0 top-6 md:static tag-xs xl:tag-sm rounded-l md:mt-1">
                <TagSale.Icon className="hidden xl:block" />
                <TagSale.Timer expiry={item.sale_expiry} />
              </TagSale>
            )}
          </div>
          {/* Action */}
          <div className="flex gap-3">
            <button className="btn-tertiary btn btn-sm btn-circle" onClick={handleOpenAddToCardModal}>
              <Svg src="/icons/bold/cart.svg" className="inline h-5 w-5" />
            </button>
            <button className="btn-secondary btn btn-sm rounded-full" onClick={handleOnBuy}>
              Mua ngay
            </button>
          </div>
        </div>
      </td>
      {/* {isOpenAddToCartModal && (
        <ModalAddToCart handleCloseModal={() => setIsOpenAddToCartModal(false)} haveGiftBonus={simItem.gift ? true : false} />
      )}
      {isOpenModalPickSim && (
        <ModalPickSim handleCloseModal={() => setIsOpenModalPickSim(false)} haveGiftBonus={simItem.gift ? true : false} />
      )} */}
    </tr>
  );
};

export default SimRowItem;
