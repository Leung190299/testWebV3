import clsx from 'clsx';
import { Fragment, KeyboardEvent, KeyboardEventHandler, memo, useEffect, useRef, useState } from 'react';

import { Dialog, Transition } from '@headlessui/react';

import Svg from '../icon/svg';
import useDebounced from '@/hooks/useDebounce';

type IProps = {
  open: boolean;
  setOpen: (e: boolean) => void;
  handleClose: () => void;
  onChange: (value: string) => void;
  valueDefault?: string;
};

const PopupSearchVoucher = ({ open, setOpen, handleClose, onChange, valueDefault }: IProps) => {
  const cancelButtonRef = useRef(null);
  const [value, setValue] = useState<string>('');

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onChange(value);
      handleClose();
    }
  };

  useEffect(() => {
    setValue(valueDefault || '');
  }, [valueDefault]);

  return (
    <Dialog as="div" open={open} className="relative z-50" initialFocus={cancelButtonRef} onClose={setOpen}>
      <div className="fixed inset-0 bg-overlay-popup bg-opacity-75 transition-opacity" />

      <div className="fixed inset-0 z-10 overflow-y-auto h-full">
        <div className="flex min-h-full items-end justify-center sm:items-center sm:p-0">
          <div className="bg-neutral-0 h-full w-full min-h-screen">
            <div className="relative flex justify-center py-[18px]">
              <Svg
                src="/icons/line/close.svg"
                className="absolute left-4 top-[18px] h-6 w-6 cursor-pointer rounded-full"
                onClick={handleClose}
              />
              <b className="text-[18px]"> Tìm kiếm</b>
            </div>
            <div className="py-2">
              <div className="px-4">
                <div className="relative flex w-full md:rounded-full rounded-lg bg-neutral-100 mb-2">
                  <div className="flex h-full items-center md:p-4 p-2">
                    <Svg src="/icons/bold/vector.svg" className="block md:h-6 md:w-6 w-5 h-5" />
                  </div>
                  <input
                    value={value}
                    onChange={(e) => {
                      setValue(e.target.value);
                    }}
                    onKeyDown={handleKeyDown}
                    placeholder="Nhập mã ưu đãi"
                    className="peer w-full bg-transparent md:p-4 p-2 outline-none"
                  />
                </div>
              </div>
              <div className="bg-neutral-100 h-2 w-full" />
              <div className="px-4">
                <p className="text-neutral-800 text-base pt-4">
                  <b>Tìm kiếm ưu đãi</b>
                </p>
                <p className="text-neutral-800 text-sm pt-3">Tìm kiếm ưu đãi bằng cách nhập mã, tên ưu đãi. </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default memo(PopupSearchVoucher);
