import React, { useState } from 'react';
import SectionPaymentMethod, { PaymentOption } from '../pages/checkout/section-payment';
import HeaderMiddleAndFull from './header/header-middle-and-full';
import HeaderModalFull from './header/header-modal-full';
import { modal, useModal } from '@/libs/modal';

type Props = {
  paymentOptions: PaymentOption[];
  totalPrice: number;
  defaultOption?: PaymentOption;
};

const ModalSelectPaymentMethod = (props: Props) => {
  const { done } = useModal();
  const [selected, setSeleted] = useState<PaymentOption>(props.defaultOption!);
  const handleSubmit = () => done(selected);

  return (
    <div className="pb-24">
      <HeaderModalFull className="md:hidden" title="Phương thức thanh toán" />
      <div className="mt-2 mobile-container py-4">
        <SectionPaymentMethod
          includeWallet
          paymentOptions={props.paymentOptions}
          selectedId={selected?.id}
          totalPrice={props.totalPrice}
          onChange={setSeleted}
        />
      </div>
      <div className="fixed bottom-0 left-0 w-full mobile-container py-2">
        <button className="btn btn-primary w-full rounded-full" onClick={handleSubmit}>
          Xác nhận
        </button>
      </div>
    </div>
  );
};
export const selectPaymentMethod = (props: Props, done: (item: PaymentOption) => void) => {
  modal.open({
    render: <ModalSelectPaymentMethod {...props} />,
    transition: false,
    classNameContainer: 'modal-full',
    classNameOverlay: 'bg-neutral-100',
    onDone: done
  });
};
export default ModalSelectPaymentMethod;
