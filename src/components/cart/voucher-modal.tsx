import useIsClient from '@/hooks/useIsClient';
import CartService from '@/services/cartService';
import { getVoucher } from '@/store/cart/selector';
import { addVoucher } from '@/store/fees/feesSlice';
import { toCurrency } from '@/utilities/currency';
import { modal } from '@pit-ui/modules/modal';
import _ from 'lodash';
import { ChangeEvent, useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import ButtonLoading from '../button/button-loading';
import HeaderAppDefault from '../header/header-app-default';
import Svg from '../icon/svg';
import HeaderMiddle from '../modal/header/header-middle';

type Props = {
  totalPrice: number;
  simSimData?: cartModel.ProductCart[];
  done(): void;
  selectedIds?: string[];
  methods: UseFormReturn<cartModel.PaymentInfo>;
};

const VoucherModal = ({ totalPrice, done, simSimData, methods }: Props) => {
  useIsClient();

  const voucher = useSelector(getVoucher);
  const dispatch = useDispatch();
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoad] = useState<boolean>(false);
  const [promotionCode, setPromotionCode] = useState<string>(voucher.PromotionCode);

  const handleSubmit = () => {
    if (_.isEmpty(promotionCode)) {
      return setError('Bạn chưa nhập mã Ưu đã');
    }
    const values = methods.getValues();

    const _values: Pick<cartModel.PaymentInfo, 'cart_info' | 'Source' | 'cart' | 'PromotionCode' | 'ShipmentFee'> = {
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
                event: res.result?.body?.result?.Event!
              },
              sims: res.result?.body?.result?.cart || []
            })
          );
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

  return (
    <>
      <HeaderAppDefault title="Voucher iTel" mode="close">
        <div className="mobile-container">
          <div className="input-leading-icon relative flex-1 mr-2 py-2">
            <input
              className="input text-sm py-2.5 border-none pl-11 outline-none bg-neutral-100 w-full"
              style={{ borderRadius: '0.5rem' }}
              type="text"
              autoFocus
              placeholder="Nhập Ưu đãi"
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setPromotionCode(e.target.value);
              }}
            />
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
              <Svg src="/icons/bold/vector.svg" className="block" width={20} height={20} />
            </div>
          </div>
        </div>
      </HeaderAppDefault>
      <HeaderMiddle title="Voucher iTel" />
      <form className="mt-2 md:mt-8 pb-24 md:pb-0">
        <div className="md:max-h-[37.5rem] overflow-auto bg-neutral-0 mobile-container">
          <div className="max-md:hidden input-leading-icon relative">
            <input
              className="input rounded-full border-none bg-neutral-100 py-4 pl-14 outline-none"
              type="text"
              placeholder="Nhập mã Voucher"
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setPromotionCode(e.target.value);
              }}
            />
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-5">
              <Svg src="/icons/bold/vector.svg" className="block h-6 w-6" />
            </div>
          </div>

          <div className="mobile-container fixed w-full left-0 md:sticky bottom-0">
            <div className="flex gap-2 border-t border-neutral-200 bg-neutral-0 py-4">
              <div className="flex-1">
                <p className="text-subtle-content">Đã chọn {voucher.PromotionCode} ưu đãi</p>
                <p className="text-orange">
                  <b>Giảm {toCurrency(voucher.DiscountAmount)}</b>
                </p>
              </div>
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
          </div>
        </div>
      </form>
    </>
  );
};

export default VoucherModal;
