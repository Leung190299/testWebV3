import type { Model } from '@/types/model';
import { toCurrency } from '@/utilities/currency';
import { formatNumber, getDiscountPercentage } from '@/utilities/number';
import clsx from 'clsx';
import IconWithTooltip from '../tag-chip/icon-with-tooltip';

type SimInforProps = {
  title?: string;
  mobileTitle?: string;

  children?: React.ReactNode;
};

const CardSimLottery = ({ title, mobileTitle, children }: SimInforProps) => {
  return (
    <div className="relative bg-modern-red rounded-2xl xl:rounded-2.5xl p-4 md:p-6 xl:pb-10 xl:px-10" data-theme="dark">
      <div className="absolute -right-2 -top-3 md:-right-0.5 md:-top-5 xl:-right-3 xl:-top-4">
        <div className="w-[8.5rem] md:w-[12.5rem] xl:w-[17.5rem] md:block hidden">
          <div className="block-img block-tivi">
            <img src="/images/chat-icon.png" alt="chat-icon" className="object-cover" />
          </div>
        </div>
      </div>
      <p className="relative hidden md:block">
        <b>{title}</b>
      </p>
      <p className="md:hidden relative text-sm font-medium text-center">{mobileTitle}</p>
      <SimLotteryContent className="flex flex-wrap md:flex-nowrap xl:bg-layer-red rounded-2.5xl mt-2 md:mt-3 xl:mt-4 xl:px-10 xl:py-6 justify-between items-center gap-3 md:gap-2 xl:gap-8 xl:mr-[7.8125rem] z-10 relative">
        {children}
      </SimLotteryContent>
    </div>
  );
};
function SimLotteryContent(rest: JSX.IntrinsicElements['div']) {
  return <div {...rest} />;
}
function PackOfData({ pack }: { pack: Model.PackOfData }) {
  return (
    <>
      <p className="md:hidden text-sm w-full">
        <span className="text-base font-bold">{pack.name}</span>
        <b  className='ml-1'>
          {'('}
          {formatNumber(pack.data, ['B', 'KB', 'GB'])}
        </b>
        /ngày
        <span> | </span>
        <b>{formatNumber(pack.price)}</b>/tháng)
        {pack.SimType && pack.SimType == 10 && <s className='ml-2'> {formatNumber(77000)}/tháng</s>}
        <p className='text-xs'>( Ưu đãi giá gói áp dụng cho tháng đầu tiên )</p>
      </p>

      <div className="hidden md:block md:flex-1 w-full md:w-auto">
        <div className="flex items-center gap-1 md:mb-1">
          <p className="md:text-base xl:text-xl">
            <b>{pack.name}</b>
          </p>
          {pack.ThoiGianCamKet && pack.ThoiGianCamKet > 0 ? (
            <IconWithTooltip className="h-5 w-5">
              <b>
                Yêu cầu sử dụng gói cước {pack.name} trong thời gian tối thiểu {pack.ThoiGianCamKet} tháng sau khi kích hoạt Sim.
              </b>
            </IconWithTooltip>
          ) : (
            <IconWithTooltip className="h-5 w-5">
              <b>
                Được đăng ký gói cước {pack.name} siêu ưu đãi {formatNumber(pack.data, ['B', 'KB', 'GB'])}/ngày, miễn phí gọi nội mạng
                VinaPhone & iTel
              </b>
            </IconWithTooltip>
          )}
        </div>
        <div className="items-center text-xs xl:flex">
          <div>
            <span className="xl:text-base xl:font-bold">{formatNumber(pack.data, ['B', 'KB', 'GB'])}</span>
            <span>/ngày</span>
          </div>
          <span className="mx-2 hidden xl:block">|</span>
          <div>
            <span className="xl:text-base xl:font-bold">{formatNumber(pack.price)}</span>
            <span>/tháng</span>
          </div>
          {pack.SimType && pack.SimType == 10 && (
            <span className="ml-1">
              {' '}
              ( <s>{formatNumber(77000)}/tháng </s>)
            </span>
          )}
        </div>
        <p className='text-sm'>( Ưu đãi giá gói áp dụng cho tháng đầu tiên )</p>
      </div>
    </>
  );
}
function Price({
  discountPrice,
  price,
  discountPercentage,
  className
}: {
  discountPrice?: number;
  price: number;
    discountPercentage?: number | boolean;
    className?: string;
}) {
  let discount = getDiscountPercentage(discountPercentage, price, discountPrice);
  return (
    <div className={clsx("flex-1",className)}>
      <div className="price-info items-start">
        <div>
          <div className="text-base xl:text-xl">
            <b>{toCurrency(discountPrice || price)}</b>
          </div>
          {discountPrice && (
            <div className="block text-xs md:text-sm font-normal opacity-80">
              <s>{toCurrency(price)}</s>
            </div>
          )}
        </div>
        {discount ? <span className="badge badge-sale flex mt-0.5 xl:mt-1">{-discount + '%'}</span> : null}
      </div>
      {/* {sim.sale_expiry ? <TagSaleSim expiry={sim.sale_expiry} className="absolute right-0 top-6 md:static" /> : null} */}
    </div>
  );
}
function RightContent({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex-1 w-full md:min-w-max xl:min-w-min">
      <div className="flex min-w-max flex-wrap justify-between md:flex-nowrap gap-8">{children}</div>
    </div>
  );
}
CardSimLottery.Content = SimLotteryContent;
CardSimLottery.PackOfData = PackOfData;
CardSimLottery.RightContent = RightContent;
CardSimLottery.Price = Price;

export default CardSimLottery;
