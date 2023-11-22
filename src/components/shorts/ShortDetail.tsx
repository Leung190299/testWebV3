import { Data, Model } from '@/types/model';
import Svg from '../icon/svg';
import CardShort from '../card/card-short';
import clsx from 'clsx';
import { useState } from 'react';
type IProps = {
  short: Model.Short;
  shorts: Data.Shorts;
};
const ShortDetail = ({ short, shorts }: IProps) => {
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

  return (
    <>
      <div className="items-start justify-end gap-16 py-10 lg:flex lg:p-0 md:block hidden">
        <div className="relative">
          <div className="flex items-center gap-6 md:justify-center">
            <Svg
              src="/icons/line/chevron-left.svg"
              className="h-14 w-14 cursor-pointer rounded-full bg-neutral-0 lg:h-18 lg:w-18 lg:p-3"
              onClick={handlePrev}
            />
            <figure className="aspect-photo-vertical overflow-hidden rounded-2xl md:h-[744px] lg:h-[90vh]">
              <video src={shortCurrent.source} className="h-full w-full object-cover" controls />
            </figure>
            <Svg
              src="/icons/line/chevron-right.svg"
              className="h-14 w-14 cursor-pointer rounded-full bg-neutral-0 lg:h-18 lg:w-18 lg:p-3"
              onClick={handleNext}
            />
          </div>
        </div>
        <div>
          <h1 className="hidden text-xl text-neutral-0 lg:block">Danh sách Short</h1>
          <div className="mt-8 flex w-full gap-3 overflow-auto pb-20 lg:h-[85vh] lg:flex-col">
            <div className="block w-10 lg:hidden" />
            {shorts.data.map((shortItem, i) => (
              <div key={shortItem.id}>
                <div
                  className={clsx(
                    'w-18 cursor-pointer lg:w-[408px] lg:p-4',
                    shortItem.id === shortCurrent.id &&
                      'transition-default rounded-2xl border border-red-600 bg-neutral-700 lg:rounded-lg lg:border-0'
                  )}
                  onClick={() => handleChoseShort(shortItem)}
                >
                  <div className="hidden lg:block">
                    <CardShort isHasInfo short={shortItem} />
                  </div>
                  <div className="block lg:hidden">
                    <CardShort short={shortItem} />
                  </div>
                </div>
                <div
                  className={clsx(
                    shorts.data[i + 1]?.id === shortCurrent.id || shortItem.id === shortCurrent.id ? '' : 'h-[1px] bg-neutral-700'
                  )}
                />
              </div>
            ))}
            <div className="block w-10 lg:hidden" />
          </div>
        </div>
      </div>
      {/* for mobile */}
      <div className="fixed block md:hidden top-0 left-0">
        <video src={shortCurrent.source} className="" controls />
      </div>
    </>
  );
};

export default ShortDetail;
