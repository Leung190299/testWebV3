import { modal, useModal } from '@/libs/modal';
import React, { useState } from 'react';
import Svg from '../icon/svg';
import HeaderModalSheet from './header/header-modal-sheet';
import { CheckoutType, INSTALLMENT_METHODS } from '@/constants/checkout.constants';

type Props = {};

const ModalInstallmentMethod = ({ defaultMethod = 'card' }: { defaultMethod?: string }) => {
  const { done } = useModal();

  const [selectedMethod, setSelected] = useState(defaultMethod);

  return (
    <div className="container pb-20 pt-6">
      <HeaderModalSheet title="Chọn hình thức trả góp" />

      <div className="mt-4">
        <ul className="menu">
          {INSTALLMENT_METHODS.map((method) => {
            return (
              <li key={method.method} className={method.method === selectedMethod ? 'menu-active' : undefined}>
                <label className="flex items-center rounded-lg" onClick={() => setSelected(method.method)}>
                  <div className="flex-1">
                    <p className="text-sm font-bold">{method.name}</p>
                    <p className="text-xs">{method.desc}</p>
                  </div>
                  {method.method === selectedMethod && (
                    <Svg src="/icons/bold/tick-circle.svg" className="text-red-500 mr-2" width={20} height={20} />
                  )}
                </label>
              </li>
            );
          }, [])}
        </ul>
      </div>
      <div className="fixed bottom-0 bg-neutral-0 left-0 w-full">
        <div className="container py-2">
          <button className="btn btn-primary btn-lg rounded-full w-full" onClick={() => done(selectedMethod)}>
            Xác nhận
          </button>
        </div>
      </div>
    </div>
  );
};

export const selectInstallmentMethodSheet = (done?: (data: CheckoutType) => any) => {
  return modal.open({
    render: <ModalInstallmentMethod />,
    className: 'modal-box shadow-itel bg-neutral-0',
    classNameContainer: 'modal-bottom-sheet',
    classNameOverwrite: true,
    transition: false,
    onDone: done
  });
};

export default ModalInstallmentMethod;
