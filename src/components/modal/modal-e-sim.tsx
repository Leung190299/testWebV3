import Modal, { modal, useModal } from '@/libs/modal';
import { useMemo, useState } from 'react';
import Svg from '../icon/svg';
import Tab from '../tabs/tabs';

import devices from '@/mock/devices.json';
import { groupBy } from '@/utilities/array';

type ModalESimProps = {};

const ModalESim = (props: ModalESimProps) => {
  const { close, done } = useModal();
  const [tabIndex, setTabIndex] = useState<number>(0);
  const data = useState<string[]>(() => {
    return devices.reduce<string[]>((list, item) => list.concat(item.devices.map<string>((subItem) => subItem.name)), []);
  })[0];
  const [text, setText] = useState<string>('');

  let dataFilter: string[] = useMemo(() => {
    return data.filter((item) => item.toUpperCase().includes(text.toUpperCase()));
  }, [text]);
  return (
    <div>
      <header className="md:hidden sticky w-full top-0 bg-neutral-0 py-2 z-10">
        <div className="flex px-2">
          <button type="button" className="btn btn-circle btn-ghost bg-neutral-100" onClick={close}>
            <Svg src="/icons/line/close.svg" width={24} height={24} />
          </button>
        </div>
      </header>
      <div className="max-md:hidden absolute top-8 right-8">
        <button
          className="btn-tertiary btn btn-circle fixed md:static right-8 z-50 md:bg-neutral-100 xl:bg-neutral-0 xl:hover:bg-neutral-50"
          type="button"
          onClick={close}
        >
          <Svg src="/icons/line/close.svg" width={24} height={24} />
        </button>
      </div>
      <div className="space-y-8 container md:px-0 pt-6 pb-20 md:py-0">
        <Modal.Heading
          title="Xác nhận chọn eSim"
          desc="Bằng việc bấm xác nhận, bạn xác nhận đã hiểu đặc điểm và nắm được các dòng máy hỗ trợ sản phẩm eSim."
        />
        <div>
          <div className="w-full my-3 relative">
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full border border-neutral-400  px-4 py-2 rounded peer"
              placeholder="Nhập tên máy (ví dụ iphone 15, Samsung Galaxy Fold…)"
            />

            <div className="absolute w-full max-h-[300px] translate-y-12 overflow-auto peer-focus:block hidden bg-neutral-0 shadow-xl rounded top-0 left-0 p-4">
              {dataFilter.map((item, index) => (
                <p key={index} className="my-2">
                  {item}
                </p>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <p className="text-base font-medium text-neutral-500">Các dòng máy hỗ trợ esim</p>

            <div className="flex items-center justify-between overflow-auto border-b border-b-neutral-300 scrollbar-hide">
              {devices.map((device, index) => (
                <Tab
                  key={`tab-${index}`}
                  label={device.name}
                  size="small"
                  onClick={() => setTabIndex(index)}
                  isActive={index == tabIndex}
                />
              ))}
            </div>
          </div>
          <div className="md:max-h-80 gap-4 md:overflow-auto pt-2">
            {Object.entries(groupBy(devices[tabIndex].devices, 'type')).map(([type, values]) => {
              return (
                <div key={type}>
                  {type && (
                    <p className="py-2 text-sm">
                      <b>{type}</b>
                    </p>
                  )}
                  <ul className="mt-1 pl-5 list-disc text-subtle-content">
                    {values.map((item) => {
                      return <li key={item.id}>{item.name}</li>;
                    })}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
        <Modal.ModalActions className="flex gap-4 fixed md:relative left-0 right-0 px-4 border-t border-neutral-200 md:border-none md:p-0 py-3 bottom-0 bg-neutral-0">
          <button type="button" className="btn-secondary btn btn-md w-1/2 rounded-full" onClick={close}>
            Không chọn
          </button>
          <button type="button" className="btn-primary btn btn-md w-1/2 rounded-full" onClick={done}>
            Xác nhận
          </button>
        </Modal.ModalActions>
      </div>
    </div>
  );
};

export const toggleEsim = (onClick?: () => void) => {
  modal.open({
    render: ModalESim,
    className: 'modal-box md:max-w-[35rem]',
    classNameContainer: 'modal-full md:modal-middle',
    classNameOverlay: 'bg-neutral-0 md:bg-neutral-900 md:bg-opacity-50',
    onClose: onClick,
    transition: false,
    closeButton: false,
    hideOnClickOutside: true
  });
};
export default ModalESim;
