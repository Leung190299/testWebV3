import { Fragment, memo, useRef, useState } from 'react';
import { Data, Model } from '@/types/model';
import { Dialog, Transition } from '@headlessui/react';

import clsx from 'clsx';
import NewsCardShort from '../card/card-news-short';
import Svg from '../icon/svg';
import useWindowSize from '@/hooks/useWindowSize';

type IProps = {
  data: { short: Model.Short; shorts: Data.Shorts };
  open: boolean;
  setOpen: (e: boolean) => void;
  handleClose: () => void;
};
const PopupViewNewsShort = ({ open, setOpen, data: { short, shorts }, handleClose }: IProps) => {
  const cancelButtonRef = useRef(null);
  const [shortCurrent, setShortCurrent] = useState(short);
  const handleChoseShort = (newShort: Model.Short) => {
    setShortCurrent(newShort);
  };

  const handleNext = () => {
    const currentIndex = shorts.data.findIndex((item) => item.id === shortCurrent.id);
    if (currentIndex < 0) return;
    const newIndex = currentIndex + 1;
    const newShort = shorts.data?.[newIndex];
    if (newShort) setShortCurrent(newShort);
  };

  const handlePrev = () => {
    const currentIndex = shorts.data.findIndex((item) => item.id === shortCurrent.id);
    if (currentIndex < 0) return;
    const newIndex = currentIndex - 1;
    const newShort = shorts.data?.[newIndex];
    if (newShort) setShortCurrent(newShort);
  };

  const size = useWindowSize();
  const horizontalMobile = size.height < 500;

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

        <div className="fixed inset-0">
          <div className={clsx('flex h-full items-end justify-center', horizontalMobile ? '' : 'md:pt-12')}>
            <div className="relative w-full bg-neutral-900 h-full md:rounded-t-3xl">
              <Svg
                src="/icons/line/arrow-left.svg"
                className="absolute left-4 top-8 h-10 w-10 cursor-pointer rounded-full bg-neutral-100 p-2 z-10 max-md:block hidden"
                onClick={handleClose}
              />
              <Svg
                src="/icons/line/close.svg"
                className="absolute right-4 top-4 h-10 w-10 xl:h-14 xl:w-14 cursor-pointer rounded-full bg-neutral-100 p-2 xl:p-4 hidden md:block z-10"
                onClick={handleClose}
              />
              {horizontalMobile ? (
                <div className="md:container flex items-center justify-center xl:justify-end xl:gap-16 h-full p-4">
                  <div className="flex items-center gap-6 md:justify-center relative h-full p-4 w-2/3">
                    <Svg
                      src="/icons/line/chevron-left.svg"
                      className="h-10 w-10 cursor-pointer rounded-full bg-neutral-0 xl:h-14 xl:w-14 xl:p-3 block"
                      onClick={handlePrev}
                    />
                    <figure className="aspect-photo-vertical overflow-hidden md:rounded-2xl h-full">
                      <video src={shortCurrent.source} className="h-full w-full object-cover" controls />
                    </figure>
                    <Svg
                      src="/icons/line/chevron-right.svg"
                      className="h-10 w-10 cursor-pointer rounded-full bg-neutral-0 xl:h-14 xl:w-14 xl:p-3 block"
                      onClick={handleNext}
                    />
                  </div>
                  <div className="max-xl:self-start w-1/3">
                    <div className="mt-8 flex gap-3 overflow-auto flex-col h-[80vh] w-full scrollbar-hide text-sm ">
                      {shorts.data.map((shortItem, i) => (
                        <div key={shortItem.id}>
                          <div
                            className={clsx(
                              'cursor-pointer xl:p-4',
                              shortItem.id === shortCurrent.id &&
                                'transition-default rounded-2xl border border-red-600 bg-neutral-700 xl:rounded-lg xl:border-0 overflow-hidden'
                            )}
                            onClick={() => handleChoseShort(shortItem)}
                          >
                            <div>
                              <NewsCardShort showPopup={false} isHasInfo short={shortItem} />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="md:container flex items-center justify-center xl:justify-end xl:gap-16 h-full max-xl:flex-col p-4">
                  <div className="flex items-center gap-6 md:justify-center relative h-2/3 xl:h-full xl:p-16 w-screen md:w-auto xl:w-2/3">
                    <Svg
                      src="/icons/line/chevron-left.svg"
                      className="h-10 w-10 cursor-pointer rounded-full bg-neutral-0 xl:h-14 xl:w-14 xl:p-3 max-md:hidden block"
                      onClick={handlePrev}
                    />
                    <figure className="aspect-photo-vertical overflow-hidden md:rounded-2xl w-full h-full">
                      <video src={shortCurrent.source} className="h-full w-full object-cover" controls />
                    </figure>
                    <Svg
                      src="/icons/line/chevron-right.svg"
                      className="h-10 w-10 cursor-pointer rounded-full bg-neutral-0 xl:h-14 xl:w-14 xl:p-3 max-md:hidden block"
                      onClick={handleNext}
                    />
                  </div>
                  <div className="max-xl:self-start max-xl:w-full w-1/3">
                    <h1 className="hidden text-xl text-neutral-0 xl:block">Danh sách Short</h1>
                    <div className="mt-8 flex gap-3 overflow-auto xl:flex-col xl:h-[80vh] w-full scrollbar-hide ">
                      {shorts.data.map((shortItem, i) => (
                        <div key={shortItem.id}>
                          <div
                            className={clsx(
                              'cursor-pointer xl:p-4',
                              shortItem.id === shortCurrent.id &&
                                'transition-default rounded-2xl border border-red-600 bg-neutral-700 xl:rounded-lg xl:border-0 overflow-hidden'
                            )}
                            onClick={() => handleChoseShort(shortItem)}
                          >
                            <div className="hidden xl:block">
                              <NewsCardShort showPopup={false} isHasInfo short={shortItem} />
                            </div>
                            <div className="block xl:hidden">
                              <NewsCardShort className="w-16 md:w-20 xl:w-auto" showPopup={false} short={shortItem} />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default memo(PopupViewNewsShort);
