import type { Model } from '@/types/model';
import { toCurrency } from '@/utilities/currency';
import { formatNumber } from '@/utilities/number';
import { useFormContext } from 'react-hook-form';
import ItemOffer from '../list/item-voucher';

type Props = {
  vouchers: { ids: (number | string)[]; byId: Record<string | number, Model.DiscountCode & { q: string }> };
  totalPrice: number;
};

const VoucherList = ({ vouchers, totalPrice }: Props) => {
  const methods = useFormContext<{ vouchers: number[] }>();

  return (
    <ul className="divide-y divide-neutral-200 text-subtle-content">
      {vouchers.ids.map((id) => {
        const discount = vouchers.byId[id];
        const isInvalid = totalPrice < discount.minimum_order_amount;
        const desc = `Đơn Tối Thiểu ₫${formatNumber(discount.minimum_order_amount)} ${
          discount.is_fix
            ? `Giảm đ${formatNumber(discount.discount_amount)}`
            : `Giảm tối đa đ${formatNumber(discount.maximum_discount_amount)}`
        }`;
        return (
          <li key={id}>
            <ItemOffer
              title={discount.name}
              image={discount.image}
              desc={desc}
              sub="Thanh toán ít nhất 100.000đ"
              disabled={isInvalid}
              value={id}
              inputProps={methods.register('vouchers', { disabled: isInvalid })}
            >
              {isInvalid && (
                <p className="mt-2 text-sm font-medium text-red-500">
                  Cần thêm {toCurrency(discount.minimum_order_amount - totalPrice)} để dùng mã giảm giá này!
                </p>
              )}
            </ItemOffer>
          </li>
        );
      })}
    </ul>
  );
};

export default VoucherList;
