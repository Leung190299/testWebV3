import { useEffect, useRef, useState } from 'react';
import PaginationButton from '../button/PaginationButton';
import Svg from '../icon/svg';
import useOnClickOutside from '@/hooks/useOnClickOutside';
import clsx from 'clsx';

type PaginationListProps = {
  pageList: string[];
  subPageList: string[];
  theme?: 'light' | 'dark';
};

/**
 * 
 * @deprecated use `PaginationSimple` instead
 * @returns 
 */
const PaginationList = ({ pageList, subPageList, theme = 'light' }: PaginationListProps) => {
  const [pageButton, setPageButton] = useState<string>('1');
  const [isShowPickPageModal, setIsShowPickPageModal] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);
  useOnClickOutside(ref, () => setIsShowPickPageModal(false));

  useEffect(() => {
    if (pageButton === '...') {
      setIsShowPickPageModal(true);
    }
  }, [pageButton]);

  const handleClickPageButton = (label: string) => {
    setPageButton(label);
  };

  return (
    <div className="relative">
      <div className="md:mt-10 mt-5 flex items-center justify-center gap-3 flex-wrap">
        <button className="flex md:h-10 md:-w-10 h-5 w-5 rotate-180 items-center justify-center">
          <Svg
            src="/icons/bold/right-arrow.svg"
            className={clsx('inline h-5 w-5', theme === 'dark' ? 'text-neutral-0' : 'text-neutral-800')}
          />
        </button>
        {pageList.map((item) => (
          <PaginationButton
            key={item}
            label={item}
            onClick={() => handleClickPageButton(item)}
            isActive={item === pageButton}
            theme={theme}
          />
        ))}
        <button className="flex md:h-10 md:-w-10 h-5 w-5 items-center justify-center">
          <Svg
            src="/icons/bold/right-arrow.svg"
            className={clsx('inline h-5 w-5', theme === 'dark' ? 'text-neutral-0' : 'text-neutral-800')}
          />
        </button>
      </div>
      {isShowPickPageModal && (
        <div
          ref={ref}
          className={clsx(
            'absolute right-[22%] mt-2 xl:w-[30%] md:w-1/2 w-3/5 rounded-2xl p-4 shadow-xl',
            theme === 'dark' ? 'bg-neutral-800' : 'bg-neutral-0'
          )}
        >
          <p className={clsx('mb-3 text-base font-bold', theme === 'dark' ? 'text-neutral-0' : 'text-neutral-800')}>Chọn số trang</p>
          <div className="flex flex-wrap items-center justify-start gap-2">
            {subPageList.map((page) => (
              <PaginationButton
                key={page}
                label={page}
                onClick={() => handleClickPageButton(page)}
                isActive={page === pageButton}
                theme={theme}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PaginationList;
