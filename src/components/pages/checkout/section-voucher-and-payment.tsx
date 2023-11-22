import { VoucherSelectorProps } from '@/components/cart/voucher-selector';
import VoucherSelectorWithPayment from '@/components/cart/voucher-selector-with-payment';
import { useState } from 'react';
import { PaymentOption, SectionPaymentMethodProps } from './section-payment';


type Props = VoucherSelectorProps & SectionPaymentMethodProps & { setPaymentMethod: (data: string) => void; paymentMethod: string };

const SectionVoucherAndPayment = (props: Props) => {
  const [paymentMethod, setPaymentMethod] = useState<PaymentOption|undefined>(() => {
    const opt: PaymentOption|undefined= props.paymentOptions.find((item) => item.id == props.paymentMethod);
    return opt ;
  });
  const onchange = (data: PaymentOption) => {
    setPaymentMethod(data);
    props.setPaymentMethod(data.id);
  };
  return <VoucherSelectorWithPayment {...props} paymentMethod={paymentMethod||props.paymentOptions[0]} onChangePaymentMethod={(data) => onchange(data)} />;
};

export default SectionVoucherAndPayment;
