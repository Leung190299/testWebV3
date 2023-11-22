import CartService from '@/services/cartService';
import { getVoucher } from '@/store/cart/selector';
import { addVoucher } from '@/store/fees/feesSlice';
import { toCurrency } from '@/utilities/currency';
import { modal } from '@pit-ui/modules/modal';
import _ from 'lodash';
import { ChangeEvent, useEffect, useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import ButtonLoading from '../button/button-loading';
import Svg from '../icon/svg';

type DropdownVoucherProps = {
  total: number;
  selectedIds?: string[];
  done(): void;
  methods:UseFormReturn<cartModel.PaymentInfo>
  simSimData?: cartModel.ProductCart[];
};

const DropdownVoucher = ({ total, done, selectedIds, simSimData,methods }: DropdownVoucherProps) => {

  const voucher = useSelector(getVoucher);
  const dispatch = useDispatch();
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoad] = useState<boolean>(false);
  const [promotionCode, setPromotionCode] = useState<string>('');
  const shipmentType = methods.watch('cart_info.shipment_type') || 'home';
  const handleSubmit = () => {
    if (_.isEmpty(promotionCode)) {
      return setError('Bạn chưa nhập mã Ưu đã');
    }
    const values = methods.getValues();
    const _values: Pick<cartModel.PaymentInfo, 'cart_info' | 'Source' | 'cart' | 'PromotionCode' | 'ShipmentFee' > = {
      ...values,
      PromotionCode: promotionCode,
      ShipmentFee: 0,
      cart: simSimData
    };

    setIsLoad(true);
    CartService.getCheckCode(_values)
      .then((res) => {
        if (res.result?.body?.message == 'SUCCESS') {
          dispatch(
            addVoucher({
              voucher: {
                PromotionCode: res.result?.body?.result?.PromotionCode!,
                DiscountAmount: res.result?.body?.result?.DiscountAmount!,
                event:res.result?.body?.result?.Event!,
              },
              sims:res.result?.body?.result?.cart||[]
            })
            );
            setPromotionCode('')
          return;
        }
        modal.confirm({
          title: 'Thông báo',
          content: res.result?.body?.message == 'APPLICABLE_NOT_MEET_CONDITION' ? 'Mã chỉ áp dụng cho sim data' : res.result?.body?.message,
          rejectLable: 'Đóng',
          onDone: close
        });
      })
      .catch((error) => console.log(error))
      .finally(() => {
        setIsLoad(false);
        done();
      });
  };

  useEffect(() => {
    if (!_.isEmpty(promotionCode)) {
      handleSubmit();
    }
  }, [shipmentType]);

  return (
    <form>
      <div className="max-h-[37.5rem] overflow-auto">
        <div className="p-6">
          <p className="font-bold">Voucher iTel</p>
          <div className="mt-4 input-leading-icon relative">
            <input
              className="input rounded-full border-none bg-neutral-100 py-4 pl-14 outline-none"
              type="text"
              placeholder="Nhập mã Voucher"
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setPromotionCode(e.target.value);
              }}
            />

            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-5">
              <Svg src="/icons/bold/iclub.svg" className="block h-6 w-6" />
            </div>
          </div>
          {!_.isEmpty(error) && (
            <p className="flex items-center text-sm text-primary mt-2">
              <Svg className="mr-1 h-4 w-4" src="/icons/line/danger-circle.svg" />
              {error}
            </p>
          )}

          <div className="mt-4">{/* <VoucherList totalPrice={total} vouchers={{ ids, byId: vouchers.byId }} /> */}</div>
        </div>
        <div className="sticky bottom-0">
          <div className="flex gap-2 border-t border-neutral-200 bg-neutral-0 p-6 pt-4">
            <div className="flex-1">
              {voucher.DiscountAmount != 0 && <p className="text-subtle-content">Đã thêm 1 ưu đãi</p>}
              <p className="text-orange">
                <b>Giảm {toCurrency(voucher.DiscountAmount || 0)}</b>
              </p>
            </div>
            ´
            <ButtonLoading
              isLoading={isLoading}
              type="button"
              disabled={_.isEmpty(promotionCode)}
              onClick={() => handleSubmit()}
              className="btn-primary btn flex-1 rounded-full"
            >
              Áp dụng
            </ButtonLoading>
          </div>
          ´
        </div>
      </div>
    </form>
  );
};

export default DropdownVoucher;
