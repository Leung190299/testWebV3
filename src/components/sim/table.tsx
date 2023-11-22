import type { Model } from '@/types/model';
import { toCurrency } from '@/utilities/currency';
import { formatNumber, getDiscountPercentage } from '@/utilities/number';
import clsx from 'clsx';
import ButtonGift from '../button/button-gift';
import Svg from '../icon/svg';
import TagSale from '../tag-chip/tag-sale';
import TagSim from '../tag-chip/tag-sim';
import Tooltip from '../tooltip/tooltip';

type SimTableProps = {
  simItem: Model.Sim;
  pack: Model.PackOfData;
  gift?: Model.Gift;
  inSearchResult?: boolean;
  isCardNumerologySim?: boolean;
  disablePattern?: boolean;
  tags?: { id: number | string; name: string }[];

  onViewCommentary?(): void;
  onAddToCart?(): void;
  onBuy?(): void;
  onSelectTag?(tag: { id: number | string; name: string }): void;
};

const SimTable = ({
  simItem,
  inSearchResult = false,
  isCardNumerologySim = false,
  disablePattern,
  onViewCommentary,
  gift,
  pack,
  onAddToCart,
  onBuy,
  tags = [],
  onSelectTag
}: SimTableProps) => {
  const isHasGift = Boolean(gift);
  const discountPrice = getDiscountPercentage(true, simItem.SimType == 10 ? 50000 : simItem.price, simItem.discount_price);
  const showCommitTime = simItem.ThoiGianCamKet ? simItem.ThoiGianCamKet > 0 : false;

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
  const attributes: Array<{ title: string; titleMobile?: string; value: string; tooltip?: string }> = isCardNumerologySim
    ? [
        { title: 'Năng lượng Sim', titleMobile: 'Năng lượng', value: 'Số 9' },
        { title: 'Số ô lấp đầy', value: '7/9' },
        { title: 'Số trục mũi tên', titleMobile: 'Số trục', value: '7/9' }
      ]
    : [
        { title: 'Mệnh', value: 'Hỏa' },
        { title: 'Số nút', value: '7', tooltip: '123123123' },
        { title: 'Cát - hung', value: 'Đại Cát' }
      ];

  return (
    <div className="flex flex-col relative rounded-2xl bg-neutral-0">
      {/* Header */}
      <div
        className={clsx(
          'realtive px-4 md:px-5 xl:px-6 py-4 rounded-t-2xl',
          disablePattern ? 'border-b border-neutral-200' : 'bg-[#f6f6f6] '
        )}
        style={
          disablePattern
            ? undefined
            : isCardNumerologySim
            ? {
                backgroundImage:
                  "linear-gradient(to bottom, rgba(255,255,255,.9) 0%,rgba(255,255,255,.9) 100%), url('https://res.cloudinary.com/dgkrchato/image/upload/v1684718918/itel-web/sim-banner-2_vtmpmi.png')"
              }
            : { backgroundImage: "url('/images/pattern.png')", backgroundSize: '80px' }
        }
      >
        {inSearchResult && (
          <div className="absolute top-0 right-0">
            <span className="tag tag-vector-1 bg-dark-blue text-xl h-14 w-[5.025rem] rounded-tr-2xl">9/10</span>
          </div>
        )}

        <div>
          <div className="flex items-center gap-2">
            <div className={'font-itel font-bold text-xl xl:text-h5 whitespace-nowrap'}>
              <span className="max-md:hidden text-neutral-500" dangerouslySetInnerHTML={{__html:simItem.PhoneFormated!}} />
              <span className="md:hidden text-neutral-500" dangerouslySetInnerHTML={{__html:simItem.PhoneFormated!}} />
            </div>
            {simItem.ThoiGianCamKet && simItem.ThoiGianCamKet > 0 ? <TagSim /> : null}
            <div className={`${inSearchResult ? 'hidden' : 'md:block xl:hidden'}`}>
              <ButtonGift isHaveGift={isHasGift} />
            </div>
          </div>
        </div>
        <ul>
          {tags.map((tag, index) => (
            <li
              key={tag.id}
              className={clsx(
                'tag tag-md tag-sim-list mr-1 cursor-pointer border-none md:text-xs md:font-medium',
                index > 1 && 'max-xl:hidden'
              )}
              onClick={
                onSelectTag
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
      </div>
      {/* content */}
      <div className="flex-1 py-3 px-4 md:py-4 md:px-5 xl:px-6">
        {inSearchResult ? (
          <div className="mb-5 rounded-2xl bg-transparent p-0 md:bg-neutral-50 md:p-3 xl:p-4">
            <div className="flex -mx-4">
              {attributes
                .map(({ title, titleMobile, value, tooltip }) => (
                  <div key={title} className="w-1/3 px-4">
                    <p className="text-xs text-neutral-500">
                      <span className="max-xl:hidden">{title}</span>
                      <span className="xl:hidden">{titleMobile || title}</span>
                      {tooltip && (
                        <Tooltip className="max-md:hidden inline-block ml-1" content={tooltip}>
                          <Svg src="/icons/line/information.svg" className="inline-block" width={16} height={16} />
                        </Tooltip>
                      )}
                    </p>
                    <p className="text-sm mt-1">
                      <b>{value}</b>
                    </p>
                  </div>
                ))
                .reduce(
                  (pre, next, index) => [pre, <div key={'separte' + index} className="border-l border-neutral-400 my-2" />, next] as any
                )}
            </div>
            {!isCardNumerologySim && (
              <div className="mt-3 md:mt-4">
                <div className="text-xs font-medium text-neutral-500">Quẻ kinh dịch</div>
                <div className="mt-1 text-sm font-bold">Quý nhân phù trợ, tấn tài tấn lộc</div>
              </div>
            )}
          </div>
        ) : (
          <div className="mb-5">
            <div className="flex items-center gap-1">
              <div className="font-bold md:text-sm xl:text-base">{pack.name}</div>
              {showCommitTime ? (
                <Tooltip
                  content={
                    <b>
                      Yêu cầu sử dụng gói cước {pack.name} trong thời gian tối thiểu {simItem.ThoiGianCamKet} tháng sau khi kích hoạt Sim.
                    </b>
                  }
                >
                  <Svg src="/icons/line/information.svg" className="md:h-4 md:w-4 w-5 h-5" />
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
            </div>
            <div className="mb-1 text-sm font-bold">
              {formatNumber(pack?.data, ['B', 'KB', 'GB'])}
              <span className="text-xs font-medium text-neutral-500">/ngày</span>
              <span> | </span>
              {formatNumber(pack?.price)}
              <span className="text-xs font-medium text-neutral-500">/tháng</span>
              {simItem.SimType == 10 && <s className="ml-2 font-medium">{formatNumber(77_000)}/tháng</s>}
            </div>
            {showCommitTime ? (
              <div className="text-xs font-normal italic text-neutral-700 md:hidden xl:block">
                Cam kết trong <span className="font-bold">{simItem.ThoiGianCamKet} tháng</span>
              </div>
            ) : (
              <div className="text-xs font-normal italic text-neutral-700 md:hidden xl:block">
                <span className="font-bold">{'miễn phí gọi nội mạng VinaPhone & iTel'} tháng</span>
              </div>
            )}
          </div>
        )}
        <div className="flex md:flex-col flex-row justify-between">
          <div className="mb-1 flex items-center justify-start md:justify-between">
            <div className="flex items-center justify-start gap-1">
              <div className="font-bold text-neutral-800 md:text-sm lg:text-base">
                {toCurrency(simItem.discount_price || simItem.price)}
              </div>
              {discountPrice && simItem.discount_price! > 0 && (
                <>
                  <div className="text-xs font-medium text-neutral-500 line-through">{toCurrency(simItem.SimType == 10 ? 50000 : simItem.price)}</div>
                  <div className="rounded bg-red-500 px-1 py-0.5 text-center text-xs font-medium text-neutral-0 hidden md:block">
                    {-discountPrice + '%'}
                  </div>
                </>
              )}
            </div>
            <div className={`${inSearchResult ? 'md:block' : 'md:hidden xl:block'} ml-1`}>
              <ButtonGift isHaveGift={isHasGift} />
            </div>
          </div>
          {simItem.sale_expiry && (
            <TagSale className="tag-xs xl:tag-sm">
              <TagSale.Icon className="max-xl:hidden" />
              <TagSale.Timer expiry={simItem.sale_expiry} />
            </TagSale>
          )}
        </div>
      </div>
      {/* Action */}
      <div className="px-4 md:px-5 xl:px-6">
        <div className="flex items-center justify-between border-t border-neutral-200 py-3 md:py-4">
          {inSearchResult && (
            <button className="text-sm font-bold" type="button" onClick={onViewCommentary}>
              Xem luận giải
            </button>
          )}
          <div className={`flex items-center gap-4 ${inSearchResult ? 'md:flex md:w-max xl:w-[52%]' : 'w-full'}`}>
            <button className="btn-tertiary btn btn-sm btn-circle" onClick={handleOpenAddToCardModal}>
              <Svg src="/icons/bold/cart.svg" className="inline h-5 w-5" />
            </button>
            <button className="btn-secondary btn btn-sm flex-1 rounded-full" data-theme="light" onClick={handleOnBuy}>
              Mua ngay
            </button>
          </div>
        </div>
      </div>
      {/* {isOpenAddToCartModal && (
        <ModalAddToCart handleCloseModal={() => setIsOpenAddToCartModal(false)} haveGiftBonus={simItem.gift ? true : false} />
      )}
      {isOpenModalPickSim && (
        <ModalPickSim handleCloseModal={() => setIsOpenModalPickSim(false)} haveGiftBonus={simItem.gift ? true : false} />
      )} */}
    </div>
  );
};

export default SimTable;
