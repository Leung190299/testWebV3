import CartService from '@/services/cartService';
import { getVoucher } from '@/store/cart/selector';
import { addMGT, addVoucher, removeMGT, removeVoucher } from '@/store/fees/feesSlice';
import type { Model } from '@/types/model';
import useBoolean from '@pit-ui/modules/hooks/useBoolean';
import { modal } from '@pit-ui/modules/modal';
import _ from 'lodash';
import { ChangeEvent, useRef, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import ButtonLoading from '../button/button-loading';
import Svg from '../icon/svg';

export type VoucherSelectorProps = {
  totalPrice: number;
  selectedVouchers?: Model.DiscountCode[];

  onSelectedVouchers(data: Model.DiscountCode[]): void;
  simSimData?: cartModel.ProductCart[];
};

const VoucherSelector = ({ totalPrice, selectedVouchers, onSelectedVouchers, simSimData }: VoucherSelectorProps) => {
  const isShow = useBoolean(false);
  const ref = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const voucher = useSelector(getVoucher);
  const methods = useFormContext<cartModel.PaymentInfo>();
  const [promotionCode, setPromotionCode] = useState<string>('');
  const [isLoading, setIsLoad] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [phoneMGT, setPhoneMGT] = useState<string>('');

  const handleSubmit = async () => {
    if (_.isEmpty(promotionCode)) {
      return setError('Bạn chưa nhập mã Ưu đã');
    }
    const values = methods.getValues();
    setIsLoad(true);
    const paramMGT: Pick<cartModel.PaymentInfo, 'cart_info' | 'Source' | 'cart' | 'ShipmentFee' | 'MGT' | 'TotalPrice'> = {
      ...values,
      MGT: promotionCode,
      ShipmentFee: 0,
      cart: simSimData,
      TotalPrice: totalPrice
    };
    const paramCode: Pick<cartModel.PaymentInfo, 'cart_info' | 'Source' | 'cart' | 'PromotionCode' | 'ShipmentFee' | 'TotalPrice'> = {
      ...values,
      PromotionCode: promotionCode,
      ShipmentFee: 0,
      cart: simSimData,
      TotalPrice: totalPrice
    };

    const [resMGT, resCode] = await Promise.all([CartService.getCheckMGT(paramMGT), CartService.getCheckCode(paramCode)]);
    if (resMGT.result) {
      dispatch(addMGT(promotionCode));
      dispatch(removeVoucher());
      setIsLoad(false);
      setPromotionCode('');
      return setPhoneMGT(resMGT.result.phoneMGT || '');
    }
    if (resCode.result?.body?.message == 'SUCCESS') {
      dispatch(
        addVoucher({
          voucher: {
            PromotionCode: resCode.result?.body?.result?.PromotionCode!,
            DiscountAmount: resCode.result?.body?.result?.DiscountAmount!,
            event: resCode.result?.body?.result?.Event!
          }
        })
      );
      setIsLoad(false);
      dispatch(removeMGT());
      setPromotionCode('');
      setPhoneMGT('');
      return;
    }
    setPhoneMGT('');
    setIsLoad(false);
    modal.confirm({
      title: 'Thông báo',
      content:
        resCode.result?.body?.message == 'APPLICABLE_NOT_MEET_CONDITION' ? 'Mã chỉ áp dụng cho sim data' : resCode.result?.body?.message,
      rejectLable: 'Đóng',
      onDone: close
    });
  };

  return (
    <div className="relative space-y-2 md:space-y-4 px-4 py-4" ref={containerRef}>
      <p className='text-lg'>
        <b>4. Nhập mã giới thiệu/ưu đãi</b>
      </p>
      <hr className="max-md:hidden border-neutral-200" />
      <div className="text-left flex items-center gap-2 text-sm font-medium leading-6">
        <div className="flex-1">
          <input
            className="input rounded-lg border-none bg-neutral-100 py-3 px-4 outline-none w-full"
            type="text"
            placeholder="Nhập mã"
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setPromotionCode(e.target.value);
            }}
          />
          {!_.isEmpty(error) && (
            <p className="flex items-center text-sm text-primary mt-2">
              <Svg className="mr-1 h-4 w-4" src="/icons/line/danger-circle.svg" />
              {error}
            </p>
          )}
        </div>
        <ButtonLoading
          isLoading={isLoading}
          type="button"
          onClick={handleSubmit}
          disabled={_.isEmpty(promotionCode)}
          className="btn-primary btn  rounded-lg"
        >
          Áp dụng
        </ButtonLoading>
      </div>
      {!_.isEmpty(phoneMGT) && (
        <p className="text-sm italic">
          Mã giới thiệu hợp lệ! iTel sẽ tặng ngay 20.000đ vào TKC cho số TB {phoneMGT} khi Bạn hoàn thành thanh toán và kích hoạt SIM thành
          công.
        </p>
      )}
    </div>
  );
};

export default VoucherSelector;
