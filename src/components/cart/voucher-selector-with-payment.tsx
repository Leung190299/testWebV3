import useWalletOption from '@/hooks/useWalletOption';
import { modal } from '@/libs/modal';
import { formattedPrice } from '@/utilities';
import { withTablet } from '@/utilities/function';
import { useCallback } from 'react';
import { useFormContext } from 'react-hook-form';
import Svg from '../icon/svg';
import { selectPaymentMethod } from '../modal/modal-select-payment';
import { PaymentOption, SectionPaymentMethodProps } from '../pages/checkout/section-payment';
import VoucherModal from './voucher-modal';
import { VoucherSelectorProps } from './voucher-selector';

type Props = VoucherSelectorProps &
  SectionPaymentMethodProps & {
    paymentMethod: PaymentOption;
    onChangePaymentMethod?(method: PaymentOption): void;
  };
const VoucherSelectorWithPayment = ({
  totalPrice,
  selectedVouchers,
  onSelectedVouchers,
  paymentOptions,
  paymentMethod,
  onChangePaymentMethod,
  simSimData
}: Props) => {
  const methods = useFormContext<cartModel.PaymentInfo>();
  const handleShowModal = useCallback(() => {
    modal.open({
      render(props) {
        return (
          <VoucherModal
            totalPrice={totalPrice}
            simSimData={simSimData}
            methods={methods}
            selectedIds={selectedVouchers?.map((v) => String(v.id))}
            done={() => props.done}
          />
        );
      },
      closeButton: true,
      transition: false,
      className: 'modal-box shadow-itel md:max-w-[35rem]',
      classNameContainer: 'modal-full md:modal-middle',
      classNameOverlay: 'bg-neutral-100 md:bg-neutral-900 md:bg-opacity-50',
      onDone: onSelectedVouchers
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalPrice, selectedVouchers?.length]);

  const handlePaymenOption = useCallback(() => {
    selectPaymentMethod(
      {
        defaultOption: paymentMethod,
        paymentOptions,
        totalPrice
      },
      onChangePaymentMethod ? onChangePaymentMethod : console.log
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paymentMethod]);
  const walletOption = useWalletOption();

  return (
    <div className="py-2">
      <div className="py-2">
        <h3 className="md:text-xl">
          <b>Phương thức TT & Voucher iTel</b>
        </h3>
      </div>
      <div onClick={handlePaymenOption}>
        {paymentMethod ? (
          paymentMethod.id === 'wallet' ? (
            <div className="gap-x-3 py-4 flex items-center">
              <Svg className="inline-block text-red-500" src={walletOption.logoPath} width={40} height={40} />
              <div className="flex-1">
                <p className="text-base font-medium">{walletOption.name}</p>
                <p className="text-sm text-neutral-500">
                  Số dư <b className="text-primary">{formattedPrice(walletOption.value)}. </b>
                  {totalPrice > walletOption.value ? (
                    <>
                      <br className="md:hidden" />
                      Cần thêm {formattedPrice(totalPrice - walletOption.value)} để thanh toán
                    </>
                  ) : null}
                </p>
              </div>
              <div>
                <Svg src="/icons/line/chevron-right.svg" width={24} height={24} />
              </div>
            </div>
          ) : (
            <div className="gap-x-3 py-4 flex items-center">
              <Svg className="inline-block text-red-500" src={paymentMethod.logoPath} width={40} height={40} />
              <div className="flex-1">
                <p className="text-base font-medium">{paymentMethod.name}</p>
                {/* <p className="text-sm text-neutral-500">
                  Giảm đến <b className="text-primary">{formattedPrice(paymentMethod.salePrice)}</b>
                </p> */}
              </div>
              <div>
                <Svg src="/icons/line/chevron-right.svg" width={24} height={24} />
              </div>
            </div>
          )
        ) : (
          <div className="gap-x-3 py-4 flex items-center">
            <div className="flex-1">
              <p className="text-base font-medium">Chọn phương thức thanh toán</p>
            </div>
            <div>
              <Svg src="/icons/line/chevron-right.svg" width={24} height={24} />
            </div>
          </div>
        )}
      </div>
      <hr className="border-neutral-200" />
      <div className="gap-x-3 py-4 flex items-center" onClick={withTablet(handleShowModal)}>
        <Svg className="inline-block text-red-500" src="/icons/bold/iclub.svg" width={40} height={24} />
        <p className="flex-1 text-sm font-medium">
          {selectedVouchers?.length ? `Đã áp dụng ${selectedVouchers.length} mã ưu đãi` : 'Chọn hoặc nhập mã Voucher'}
        </p>
        <div>
          <Svg src="/icons/line/chevron-right.svg" width={24} height={24} />
        </div>
      </div>
    </div>
  );
};

export default VoucherSelectorWithPayment;
