import clsx from 'clsx';
import { Fragment, memo, useRef } from 'react';

import { Dialog, Transition } from '@headlessui/react';

import Svg from '../icon/svg';

type IOption = { id: number; name: string };
type IProps = {
  open: boolean;
  setOpen: (e: boolean) => void;
  handleClose: () => void;
  options: IOption[];
  selected?: IOption;
  onSelect: (value?: IOption) => void;
};

const PopupFilterSearch = ({ open, setOpen, handleClose, options, selected, onSelect }: IProps) => {
  const cancelButtonRef = useRef(null);
  const handleSave = () => {
    handleClose();
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-50" initialFocus={cancelButtonRef} onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-overlay-popup bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center sm:items-center sm:p-0">
            <div className="relative rounded-t-3xl bg-neutral-0 p-10 mt-12 w-full">
              <Svg
                src="/icons/line/close.svg"
                className="absolute right-4 top-4 h-14 w-14 cursor-pointer rounded-full  p-4"
                onClick={() => {
                  handleClose();
                  onSelect(selected);
                }}
              />
              <b className="text-[18px]">Mức điểm</b>
              <div className="flex flex-col gap-3 mt-4">
                {options.map((option) => (
                  <div
                    key={option.id}
                    onClick={() => onSelect(option)}
                    className={clsx(option.id === selected?.id && 'bg-neutral-100', 'text-base py-3 px-4 rounded-lg flex justify-between')}
                  >
                    <p>{option.name}</p>
                    {option.id === selected?.id && <Svg src="/icons/bold/check.svg" className="bg-red-500 w-5 h-5 p-1 rounded-full" />}
                  </div>
                ))}
              </div>
              <div className="flex justify-between gap-3 mt-8">
                <button className="btn btn-secondary rounded-full w-full" onClick={() => onSelect(options[0])}>
                  Xóa bộ lọc
                </button>
                <button className="btn btn-secondary rounded-full w-full" onClick={handleSave}>
                  Áp dụng
                </button>
              </div>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default memo(PopupFilterSearch);
