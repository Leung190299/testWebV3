import React, { useState } from 'react';
import HeaderAppDefault from '../header/header-app-default';
import { modal, useModal } from '@/libs/modal';
import clsx from 'clsx';
import { INSTALLMENT_ATTRIBUTES } from '@/constants/checkout.constants';
import { toCurrency } from '@/utilities/currency';
import type { Model } from '@/types/model';

type Props = {
  options: Array<Model.Installment>;
};

const ModalSelectInstallment = ({ options }: Props) => {
  const { done } = useModal();
  const [selected, setSelected] = useState(options[0]);
  return (
    <div className="pb-24">
      <HeaderAppDefault title="Chọn gói trả góp" mode="close" isFull>
        <div className="mobile-container container">
          <ul className="tabs overflow-auto scrollbar-hide">
            {options.map((option) => (
              <li
                key={option.name}
                className={clsx('tab tab-primary tab-bordered w-1/4 max-md:px-0 pt-1', selected === option ? 'tab-active' : undefined)}
                onClick={() => setSelected(option)}
              >
                {option.name}
              </li>
            ))}
          </ul>
        </div>
      </HeaderAppDefault>
      <div className="mobile-container mt-2 divide-y divide-neutral-200">
        {INSTALLMENT_ATTRIBUTES.map(({ attribute, title }) => {
          return (
            <div key={attribute} className="flex justify-between items-center py-5">
              <div>{title}</div>
              <div>{toCurrency(selected[attribute])}</div>
            </div>
          );
        })}
      </div>
      <div className="fixed bottom-0 left-0 w-full mobile-container py-2">
        <button className="btn btn-primary w-full rounded-full" onClick={() => done(selected)}>
          Chọn mua trả góp {selected.name}
        </button>
      </div>
    </div>
  );
};
export const selectInstallmentOption = (data: Props, onDone?: (selected: Model.Installment) => void) => {
  modal.open({
    render: <ModalSelectInstallment {...data} />,
    transition: false,
    className: 'modal-box shadow-itel',
    classNameContainer: 'modal-full',
    classNameOverlay: 'bg-neutral-100',
    onDone
  });
};
export default ModalSelectInstallment;
