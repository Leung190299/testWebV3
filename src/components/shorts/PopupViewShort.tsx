import { Fragment, memo, useRef } from 'react';

import { Dialog, Transition } from '@headlessui/react';
import { Data, Model } from '@/types/model';

import Svg from '../icon/svg';
import ShortDetail from './ShortDetail';
import useOnClickOutside from '@/hooks/useOnClickOutside';

type IProps = {
  data: { short: Model.Short; shorts: Data.Shorts };
  open: boolean;
  setOpen: (e: boolean) => void;
  handleClose: () => void;
};
const PopupViewShort = ({ open, setOpen, data, handleClose }: IProps) => {
  const cancelButtonRef = useRef(null);
  const ref = useRef<HTMLInputElement>(null);
  useOnClickOutside(ref, () => handleClose());

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

        <div className="fixed inset-0 z-10">
          <div className="relative flex min-h-full items-end justify-center md:p-4 sm:items-center p-0">
            <div className="relative md:mt-12 w-full md:rounded-3xl rounded-none bg-neutral-900 lg:p-10 pb-24 mt-0">
              <Svg
                src="/icons/line/close.svg"
                className="absolute right-4 top-4 h-14 w-14 cursor-pointer rounded-full bg-neutral-100 p-4 hidden md:block"
                onClick={handleClose}
              />
              <div className="container md:px-0 p-0" ref={ref}>
                <ShortDetail {...data} />
              </div>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default memo(PopupViewShort);
