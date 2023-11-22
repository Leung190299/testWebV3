import Svg from '@/components/icon/svg';
import Tooltip from '@/components/tooltip/tooltip';
import { toCurrency } from '@/utilities/currency';

import clsx from 'clsx';

type RowItemProps = {
  isRoot?: boolean;
  price: number;
  discountPrice?: number | null;
  type?: 'product' | 'sim' | 'pack';
  img?: string;
  imgClassName?: string;
  typeSim?: string;
  title?: string;
  desc?: string;
  subtitle?: string;
  subDesc?: React.ReactNode;
  children?: React.ReactNode;
  thoiGianCamket?:string
};
export const CheckoutRowItem = ({
  img = '/images/iconCart.png',
  isRoot,
  price,
  discountPrice,
  type = 'product',
  title,
  desc,
  subDesc,
  subtitle,
  children,
  typeSim='Sim',
  imgClassName = 'object-cover',
  thoiGianCamket
}: RowItemProps) => {
  return (
    <div className="flex items-center gap-x-3 md:gap-x-4">
      <div className={!isRoot ? 'w-10' : 'w-18'}>
        <div className={clsx('block-img block-square bg-neutral-100', !isRoot ? 'rounded-md' : 'rounded-lg')}>
          {type === 'sim' ? (
            <div className="absolute inset-0 rounded-lg bg-dark-blue center-by-grid">
              <span className="text-center font-itel text-xs leading-[0.875rem] text-neutral-0">{typeSim}</span>
            </div>
          ) : type == 'pack' ? (
            <div className="absolute inset-0 rounded-lg bg-blue-500 center-by-grid">
              <span className="text-center font-itel text-xs leading-[0.875rem] text-neutral-0">Gói cước</span>
            </div>
          ) : typeof img === 'string' ? (
            <img src={img} alt={img} className={clsx('rounded-lg', imgClassName)} />
          ) : null}
        </div>
      </div>
      <div className="flex items-center flex-1">
        {children ?? (
          <>
            <div className="md:w-2/3 flex-1">
              <p className={clsx('text-sm flex gap-1', isRoot && 'md:text-base ')}>
                <b>{title}</b>
                {type=='pack'&&( <Tooltip
              withArrow
              content={

                <b>{`Yêu cầu sử dụng gói cước ${title} hàng tháng, trong thời gian ${thoiGianCamket}  tháng liên tục sau khi kích hoạt`}</b>
              }
            >
              <Svg src="/icons/line/information.svg" width={20} height={20} />
            </Tooltip>)}
              </p>
              <p className={clsx('text-xs', isRoot && 'md:text-sm')}>{desc}</p>
            </div>
            <div className="md:w-1/3">
              <p>{subtitle}</p>
              <p className="text-xs md:text-sm text-neutral-500">{subDesc}</p>
            </div>
          </>
        )}
      </div>
      <div className="md:w-[7.5rem]">
        <div className="flex flex-col justify-center h-full text-right">
          <p className={isRoot ? 'md:text-base font-bold text-sm' : 'md:text-sm text-xs font-medium text-neutral-500'}>
            {toCurrency(discountPrice ?? price)}
          </p>
          {typeof discountPrice == 'number' ? (
            <p className={clsx('text-xs text-neutral-500', isRoot ? 'md:text-sm' : '')}>
              <span className={clsx(isRoot ? 'line-through' : '')}>{toCurrency(price)}</span>
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
};
export default CheckoutRowItem;
