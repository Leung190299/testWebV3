import type { Model } from '@/types/model';
import { randomBetween } from '@/utilities/number';
import { generateRandomSKU, stringToASCII } from '@/utilities/string';
import { useEffect, useMemo, useState } from 'react';
import useDebounced from './useDebounce';

type Props = {};

const names = [
  'Giảm 10% mùa hè',
  'Chương trình mùa hè',
  'Ưu đãi sinh nhật',
  'Giảm giá Black Friday',
  'Khuyến mãi đặc biệt',
  'Chương trình tháng ưu đãi',
  'Deal cuối tuần',
  'Giảm 5% mua thẻ'
];
type State = { ids: number[]; byId: Record<number | string, Model.DiscountCode & { q: string }> };
let discountCodes: Model.DiscountCode[];
function getVouchers() {
  discountCodes ||= Array.from({ length: 12 }).map((_, id) => {
    const isFixed = Math.random() > 0.5 ? true : false;
    const expires_at = new Date();
    expires_at.setDate(expires_at.getDate() + 1);
    return {
      id: id + 1,
      code: generateRandomSKU(8),
      is_fix: isFixed,
      discount_amount: isFixed ? randomBetween(1, 5) * 40_000 : randomBetween(5, 20),
      minimum_order_amount: randomBetween(1, 8) * 20_000,
      maximum_discount_amount: isFixed ? 0 : randomBetween(5, 10) * 20_000,
      expires_at: expires_at.toISOString(),
      image: 'https://res.cloudinary.com/dt1oay7cv/image/upload/v1686568281/itel/images/784308c1c65fafb58b00c215f71d4c42_loptz7.png',
      max_uses: 999,
      max_uses_user: 2,
      name: names[Math.floor(Math.random() * names.length)],
      uses: 0
    };
  });
  return discountCodes.reduce(
    (object: State, voucher) => {
      object.ids.push(voucher.id);
      object.byId[voucher.id] = Object.assign(voucher, { q: stringToASCII(voucher.name).toLowerCase() });
      return object;
    },
    { ids: [], byId: {} }
  );
}
const useVouchers = (props: Props) => {
  const [vouchers, setVouchers] = useState<State>(getVouchers);
  const [q, setQuery] = useState('');
  const setQueryDebounced = useDebounced((s) => setQuery(stringToASCII(s).toLowerCase()), [], 300, true, false);

  useEffect(() => {
    !vouchers.ids.length && setVouchers(getVouchers);
  }, [vouchers]);
  const filteredData = useMemo(() => {
    if (q) {
      let text = q.split(' ');
      return vouchers.ids.filter((id) => text.every((t) => vouchers.byId[id].q.includes(t)));
    }
    return vouchers.ids;
  }, [q, vouchers]);

  return { vouchers, ids: filteredData, setQuery: setQueryDebounced };
};

export default useVouchers;
