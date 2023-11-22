import { modal, useModal } from '@/libs/modal';
import React, { useState } from 'react';
import HeaderMiddleAndFull from './header/header-middle-and-full';
import { useGlobalContext } from '@/context/global';
import { addDeliveryAddress } from './modal-add-delivery-addres';
import type { Model } from '@/types/model';
import Svg from '../icon/svg';

type Props = {
  selectedId?: number;
};

const ModalChangeAddress = ({ selectedId }: Props) => {
  const { done } = useModal();
  const { user } = useGlobalContext();
  const [selected, setSelected] = useState<Model.DeliveryAddress>(
    selectedId ? () => user.address.find((address) => selectedId === address.id) : (undefined as any)
  );

  const handleSubmit = () => {
    done(selected);
  };
  return (
    <div>
      <HeaderMiddleAndFull title="Địa chỉ của tôi" mobileTitle="Địa chỉ nhận hàng" />
      <div className="bg-neutral-0 mobile-container mt-2 pb-4 md:pb-0 md:mt-8">
        <ul className="divide-y divide-neutral-200 md:divide-none md:space-y-6">
          {user.address.map((address) => (
            <li key={address.id}>
              <label className="flex items-center gap-4 md:gap-3 flex-1 md:border border-neutral-200 rounded-lg py-6 md:p-4">
                <input
                  type="radio"
                  name="address"
                  checked={selected ? selected.id === address.id : false}
                  onChange={() => setSelected(address)}
                />
                <div className="flex-1">
                  <p className="flex gap-2 text-sm md:text-base">
                    <b>{address.name}</b>|<b>{address.phone}</b>
                  </p>
                  <p className="mt-1 text-xs md:text-sm text-neutral-500">{address.address}</p>
                </div>
                <div>
                  <button
                    type="button"
                    className="font-bold text-sm"
                    onClick={() => addDeliveryAddress({ defaultValues: { deliveryInfomation: address } })}
                  >
                    <span className="max-md:hidden">Chỉnh sửa</span>
                    <span className="md:hidden">Sửa</span>
                  </button>
                </div>
              </label>
            </li>
          ))}
          <li>
            <button
              type="button"
              className="max-md:hidden btn btn-sm btn-tertiary rounded-full gap-x-2"
              onClick={() => addDeliveryAddress()}
            >
              <Svg src="/icons/line/plus.svg" width={20} height={20} />
              Thêm địa chỉ nhận hàng
            </button>
            <button
              type="button"
              onClick={() => addDeliveryAddress()}
              className="md:hidden py-4 bg-neutral-100 border-dashed border-neutral-300 flex items-center w-full border rounded-lg justify-center"
            >
              <div className="btn btn-ghost">Thêm địa chỉ nhận hàng</div>
            </button>
          </li>
        </ul>
      </div>
      <div className="fixed md:static md:mt-8 bottom-0 bg-neutral-0 mobile-container py-2 md:py-0 w-full">
        <div className="w-full md:w-1/2 mx-auto">
          <button type="button" className="btn btn-primary rounded-full w-full" onClick={handleSubmit}>
            Xác nhận
          </button>
        </div>
      </div>
    </div>
  );
};

export function changeAddress(selectedId?: number, onDone?: (data: Model.DeliveryAddress) => void) {
  modal.open({
    render: <ModalChangeAddress selectedId={selectedId} />,
    transition: false,
    className: 'modal-box shadow-itel md:max-w-[45rem]',
    classNameContainer: 'modal-full md:modal-middle',
    classNameOverlay: 'bg-neutral-100 md:bg-neutral-900 md:bg-opacity-50',
    onDone
  });
}
export default ModalChangeAddress;
