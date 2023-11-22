import { toCurrency } from '@/utilities/currency';
import { forwardRef } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import Svg from '../icon/svg';
import Tooltip from '../tooltip/tooltip';

type Props = {
  strongFirstInfo?: boolean;
  discountPrice?: number;
  price: number;
  title?: string;
  value?: string | number;
  onClickDetail?(): void;
  onClickInfor?(): void;
  inputProps?: Partial<UseFormRegisterReturn>;
  ThoiGianCamKet?: number;
};

const CardDataSelect = forwardRef(function CardDataSelect(
  {
    strongFirstInfo = true,
    title,
    value,
    onClickInfor,
    onClickDetail,
    discountPrice,
    price,
    // input props
    ThoiGianCamKet,
    inputProps
  }: Props,
  ref: any
) {
  const getInfoPackByName = (name: string) => {
    switch (name) {
      case 'MAY':
        return [
          { content: '4GB/ngày' },
          { content: 'Miễn phí cuộc gọi nội mạng iTel và VinaPhone (Áp dụng cuộc gọi dưới 20 phút, tối đa 1.000 phút)' },
          { content: 'Miễn phí 60 SMS nội mạng' }
        ];
      case 'ITEL100':
        return [{ content: '1GB/ngày (tối đa 20GB/tháng)' }, { content: 'Miễn phí 100 phút gọi nội mạng iTel và Vinaphone' }];
      case 'ITEL149':
        return [{ content: '3GB/ngày (tối đa 25GB/tháng)' }, { content: 'Miễn phí 1000 phút gọi nội mạng Vinaphone và iTel' }];
      case 'ITEL199':
        return [{ content: '5GB/ngày (tối đa 30GB/tháng)' }, { content: 'Miễn phí 1000 phút gọi nội mạng Vinaphone và iTel' }];
    }
  };

  const getCommitmentByName = ({ name = 'MAY' }: { name: string }) => {
    if (name === 'MAY') return 24;
    return 36;
  };

  const packInfos = getInfoPackByName(title ?? 'MAY');

  return (
    <div className="w-full h-full flex flex-col relative rounded-2xl bg-neutral-0">
      <div className="flex-1 p-3 pb-0 xl:p-4">
        <div className="bg-neutral-50 rounded-2xl px-3 xl:px-4 pb-4 xl:pb-6 ">
          {inputProps && (
            <input type="radio" className="!absolute top-2.5 right-2.5 peer !bg-neutral-0" value={value} {...inputProps} disabled={true} />
          )}
          <span className="absolute inset-0 rounded-2xl border-neutral-300 border peer-checked:border-red-500 pointer-events-none" />
          <div className="border-b mb-4 border-neutral-200">
            <p className="flex items-center py-2">
              <span className="font-itel text-h-xxs  md:font-bold mr-1">{title}</span>
              <span className="tag tag-primary tag-sm">Gói tháng</span>
            </p>
          </div>
          {/* Content */}
          <div className="text-sm">
            <ul className="font-medium whitespace-pre-line">
              {packInfos &&
                packInfos.map(({ content }, idx) => (
                  <li
                    key={idx}
                    className={'flex mt-2 ' + (strongFirstInfo && !idx ? 'text-h-xxs xl:text-h-xs font-bold font-itel' : undefined)}
                  >
                    <span>
                      <Svg src="/icons/bold/tick-circle.svg" className="text-orange mr-2" width={20} height={20} />
                    </span>
                    <p>{content}</p>
                  </li>
                ))}
            </ul>
            {ThoiGianCamKet && ThoiGianCamKet > 0 ? (
              <p className="mt-2 flex items-center gap-1">
                Cam kết {ThoiGianCamKet} tháng

                <Tooltip
                  withArrow
                  className="max-md:hidden"
                  content={
                    <b>
                      Yêu cầu sử dụng gói cước {title} trong thời gian tối thiểu {ThoiGianCamKet} tháng sau khi kích hoạt Sim.
                    </b>
                  }
                >
                  <Svg src="/icons/line/information.svg" width={16} height={16} />
                </Tooltip>
              </p>
            ) : null}
          </div>
        </div>
      </div>
      <div className="px-6 pb-5 pt-2 xl:pb-4 flex items-center">
        <div className="text-xs flex-1">
          <p>
            <span>
              <b className="text-sm md:text-base">{toCurrency(discountPrice ?? price)}</b>
              <span className="md:text-sm text-subtle-content">/tháng</span>
            </span>
          </p>
          {typeof discountPrice === 'number' && (
            <p className="text-subtle-content">
              <s>{toCurrency(price)}</s>
            </p>
          )}
        </div>
        {onClickDetail && (
          <div className="text-sm">
            <button type="button" onClick={onClickDetail}>
              <b>Chi tiết</b>
            </button>
          </div>
        )}
      </div>
    </div>
  );
});

export default CardDataSelect;
