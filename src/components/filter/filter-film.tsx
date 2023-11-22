import useOnClickOutside from '@/hooks/useOnClickOutside';
import useWindowDimensions from '@/hooks/useWindowDimention';
import { modal, useModal } from '@/libs/modal';
import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';
import Svg from '../icon/svg';
import WidgetScroll from '../scroll/widget-scroll';

type FilterFilmProps = {
  categoryList: string[];
  handleChooseOption: (option: string) => void;
};

const FilterFilm = ({ categoryList, handleChooseOption }: FilterFilmProps) => {
  const { width } = useWindowDimensions();
  const [showOptionList, setShowOptionList] = useState<boolean>(false);
  const [position, setPosition] = useState<string>('');
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [filmCategory, setFilmCategory] = useState<string>('Tất cả thể loại');
  const ref = useRef<HTMLDivElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);
  useOnClickOutside(ref, () => setShowOptionList(false));

  useEffect(() => {
    if (width) {
      if (width < 760) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    }
  }, [width]);

  useEffect(() => {
    if (showOptionList) {
      const offset = popupRef.current?.getBoundingClientRect();
      if (offset && offset.x < 0) {
        setPosition('-right-14 transition-default');
      }
    }
  }, [showOptionList]);

  const handleClick = (option: string) => {
    setFilmCategory(option);
  };

  const handleShowOptionList = () => {
    setShowOptionList(true);
  };

  const handleModalFilmFilter = () => {
    modal.open({
      render: <FilterFilmModal categoryList={categoryList} handleChange={handleClick} handleChooseOption={handleChooseOption} />,
      transition: false,
      closeButton: false,
      className: 'modal-box shadow-itel',
      classNameContainer: 'modal-full',
      classNameOverlay: 'bg-neutral-900 bg-opacity-50'
    });
  };

  return (
    <div className="relative z-10 cursor-pointer" ref={ref}>
      <button
        className="md:btn md:btn-secondary md:btn-md md:rounded-full md:bg-neutral-700 bg-transparent w-full md:gap-6 gap-2 md:justify-between whitespace-nowrap flex justify-center items-center h-7"
        data-theme="dark"
        onClick={isMobile ? handleModalFilmFilter : handleShowOptionList}
      >
        <p className="md:text-base text-sm font-bold">{filmCategory}</p>
        <Svg
          src="/icons/bold/right.svg"
          className={clsx(
            'inline h-6 w-6 transition-all ease-linear duration-300',
            showOptionList ? 'md:-rotate-90 rotate-90' : 'rotate-90'
          )}
        />
      </button>
      {showOptionList && (
        <div
          ref={popupRef}
          className={clsx(
            'bg-neutral-700 rounded-xl p-2 w-64 absolute mt-4 shadow-itel h-[20rem] hidden md:block',
            position ? position : 'right-0'
          )}
        >
          <WidgetScroll>
            {categoryList.map((category, index) => (
              <button
                key={`${index}-category`}
                className={clsx(
                  'w-full text-start p-4 hover:bg-neutral-900 rounded-lg',
                  category === filmCategory ? 'bg-neutral-900' : 'bg-transparent'
                )}
                onClick={() => {
                  setFilmCategory(category);
                  handleChooseOption(category);
                  setShowOptionList(false);
                }}
              >
                <p className="text-base text-neutral-0 font-bold ">{category}</p>
              </button>
            ))}
          </WidgetScroll>
        </div>
      )}
    </div>
  );
};

type FilterFilmModalProps = {
  categoryList: string[];
  handleChange: (option: string) => void;
  handleChooseOption: (option: string) => void;
};

const FilterFilmModal = ({ categoryList, handleChange, handleChooseOption }: FilterFilmModalProps) => {
  const { close } = useModal();
  const [filmCategory, setFilmCategory] = useState<string>('');

  return (
    <div className="w-full h-full bg-neutral-700 flex flex-col justify-between md:hidden relative">
      <div className="flex justify-between items-center px-4 py-3 w-full border-b border-b-neutral-600 relative">
        <button className="btn btn-ghost btn-circle btn-xs px-0 hover:bg-neutral-600" onClick={close}>
          <Svg src="/icons/line/close.svg" className="inline h-6 w-6 text-neutral-0" />
        </button>
        <p className="text-[1.125rem] leading-[1.75rem] font-bold text-neutral-0">Thể loại</p>
        <div className="w-8 h-8" />
      </div>
      <div className="w-full flex-1 p-4 ">
        <div className='h-[80%]'>
        <WidgetScroll>
          {categoryList.map((category, index) => (
            <button
              key={`${index}-category`}
              className={clsx(
                'w-full text-start p-4 hover:bg-neutral-900 rounded-lg flex justify-between items-center group',
                category === filmCategory ? 'bg-neutral-900' : 'bg-transparent'
              )}
              onClick={() => {
                handleChange(category);
                setFilmCategory(category);
              }}
            >
              <p className="text-base text-neutral-0 font-bold ">{category}</p>
              <div
                className={clsx(
                  'w-6 h-6 rounded-full bg-red-500 group-hover:flex items-center justify-center',
                  category === filmCategory ? 'flex' : 'hidden'
                )}
              >
                <Svg src="/icons/bold/check.svg" className="inline w-4 h-4 text-neutral-0" />
              </div>
            </button>
          ))}
        </WidgetScroll>
        </div>
      </div>
      <div className="px-4 pt-2 pb-8 border-t border-t-neutral-600 absolute bottom-0 right-0 left-0">
        <button
          className="btn btn-primary btn-md w-full rounded-full"
          onClick={() => {
            handleChooseOption(filmCategory);
            close();
          }}
        >
          Áp dụng
        </button>
      </div>
    </div>
  );
};

export default FilterFilm;
