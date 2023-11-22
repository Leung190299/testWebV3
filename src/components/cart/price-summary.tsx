import { getFee } from '@/store/cart/selector';
import { toCurrency } from '@/utilities/currency';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import Svg from '../icon/svg';
import Tooltip from '../tooltip/tooltip';

type Props = {
  totalPrice: number;
  totalPriceCurrent?: number;
  discounts?: { DiscountAmount: number; PromotionCode: string; event: string };
  fees?: cartModel.Fee;

  awarded?: number;
  accumulatePoints?: boolean;
  onUpdatePhone?(): void;
  phoneAccumulatePoints?: string;

  headeType?: 'lg' | 'md';
};

const PriceSummary = ({
  totalPrice,
  discounts,
  fees,
  awarded,
  headeType,
  accumulatePoints,
  onUpdatePhone,
  phoneAccumulatePoints,
  totalPriceCurrent
}: Props) => {
  const feesRedux = useSelector(getFee);
  let total = useMemo(() => {
    let _total = 0;
    _total += totalPrice;
    _total += feesRedux.reduce((total, item) => total + item.discountedFee, 0);
    _total -= discounts?.DiscountAmount! || 0;
    return _total;
  }, [fees, feesRedux, discounts?.DiscountAmount, totalPrice]);

  return (
    <dl>
      {headeType === 'md' ? (
        <div className="pt-4">
          <b>Đơn hàng</b>
        </div>
      ) : headeType === 'lg' ? (
        <div className="md:border-b border-neutral-200 pt-4 md:py-5 md:text-lg">
          <b>Đơn hàng</b>
        </div>
      ) : null}
      <div className="text-sm pt-4">
        <div className="flex">
          <dt>
            Tổng tiền hàng:
            <Tooltip withArrow content="Đây là thông tin cần lưu ý" className="ml-2 inline-block align-middle">
              <Svg src="/icons/line/information.svg" width={20} height={20} />
            </Tooltip>
          </dt>
          <dd className="flex-1 text-right font-medium">{toCurrency(totalPriceCurrent || totalPrice)}</dd>
        </div>
        {feesRedux &&
          feesRedux.map((fee) => (
            <>
              <div key={fee.type} className="mt-3 flex">
                <dt>Tổng tiền phí vận chuyển: </dt>
                <dd className="flex-1 text-right font-medium flex flex-col">
                  <span>{toCurrency(fee.fee || 0)}</span>
                </dd>
              </div>
              <div key={fee.type} className="mt-1 flex">
                <dt>Giảm giá phí vận chuyển: </dt>
                <dd className="flex-1 text-right font-medium flex flex-col">
                  {fee.fee! - fee.discountedFee! != 0 && (
                    <span className="text-xs text-neutral-500">-{toCurrency(fee.fee! - fee.discountedFee! || 0)}</span>
                  )}
                </dd>
              </div>
            </>
          ))}

        {discounts?.PromotionCode && discounts?.DiscountAmount != 0 && (
          <div className="mt-3 flex">
            <dt> {discounts.event}</dt>
            <dd className="flex-1 text-right font-medium">{toCurrency(-discounts.DiscountAmount)}</dd>
          </div>
        )}
        {
          totalPriceCurrent && (

        <div className="mt-1 flex">
          <dt>iTel khuyến mãi: </dt>
          <dd className="flex-1 text-right font-medium flex flex-col">
            <span className="text-xs text-neutral-500">-{toCurrency(totalPriceCurrent - totalPrice)}</span>
          </dd>
        </div>
          )
        }
      </div>
      {(awarded || accumulatePoints) && (
        <div className="mt-4 space-y-2">
          {awarded ? (
            <div className="rounded-sm bg-green-100 px-3 py-2 text-xs text-green-600">
              Bạn được tặng <b>{awarded.toLocaleString('en')}</b> điểm khi thanh toán thành công
            </div>
          ) : null}
          {/* {accumulatePoints && status !== 'authenticated' && (
            <button
              type="button"
              onClick={onUpdatePhone}
              className={clsx(
                phoneAccumulatePoints ? '' : 'text-primary',
                'font-medium flex items-center gap-x-2 text-sm py-2 w-full text-left'
              )}
            >
              <div>
                <Svg src="/icons/line/phone.svg" width={24} height={24} />
              </div>
              <p className="flex-1">{phoneAccumulatePoints ? phoneAccumulatePoints : 'Nhập số điện thoại tích điểm'}</p>
              <div className="flex items-center gap-x-2">
                {phoneAccumulatePoints ? 'Nhập lại' : null}
                <Svg src="/icons/line/chevron-right.svg" width={24} height={24} />
              </div>
            </button>
          )} */}
        </div>
      )}
      <div className="mt-4 pt-4 pb-5 flex justify-between border-t border-neutral-200">
        <dt>
          <b>Tổng tiền thanh toán</b>
        </dt>
        <dd>
          <b>{toCurrency(total)}</b>
        </dd>
      </div>
    </dl>
  );
};

export default PriceSummary;
