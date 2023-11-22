import Link from 'next/link';
import React, { useState } from 'react';

import type { CustomProps } from '@/types/element-type';
import clsx from 'clsx';
import Svg from '../icon/svg';
import SelectSingle, { ISelect } from '../select/select-single';
import { modal } from '@/libs/modal';

type SectionNewsProps = {
  title: React.ReactNode;
  isOdd?: boolean;
  href?: string | null;
  classTitle?: string;
  linkTitle?: React.ReactNode;
  haveFilter?: boolean;
  actionAll?: () => void;
};

const filters: ISelect[] = [
  { value: 1, label: 'Tin mới nhất' },
  { value: 2, label: 'Nhiều người đọc nhất' },
  { value: 3, label: 'Tin đáng chú ý' }
];

const ModalOptions = ({
  filterSelected,
  setFilterSelected,
  close
}: {
  filterSelected: ISelect;
  setFilterSelected: React.Dispatch<React.SetStateAction<ISelect>>;
  close: () => void;
}) => {
  const [filterValue, setFilterValue] = useState<ISelect>(filterSelected);
  return (
    <div className="container py-6 px-4 flex flex-col justify-between items-center" style={{ minHeight: '40vh' }}>
      <h5 className="text-[18px] font-bold mb-4 self-start">Loại tin</h5>
      {filters.map((item) => (
        <div
          key={item.value}
          onClick={() => {
            setFilterValue(item);
          }}
          className={clsx('p-4 flex rounded-lg justify-between font-medium w-full', filterValue.value === item.value && ' bg-neutral-100')}
        >
          <p>{item.label}</p>
          {filterValue.value === item.value && (
            <Svg className=" text-neutral-0 bg-primary rounded-full p-1" src="/icons/bold/check.svg" width={20} height={20} />
          )}
        </div>
      ))}
      <button
        className="w-full bg-primary py-3 rounded-full text-neutral-0 font-bold mt-10"
        onClick={() => {
          setFilterSelected(filterValue);
          close();
        }}
      >
        Xác nhận
      </button>
    </div>
  );
};

const SectionNews = ({
  title,
  children,
  isOdd,
  href,
  classTitle,
  linkTitle = 'Xem tất cả',
  haveFilter = false,
  actionAll = undefined,
  ...rest
}: CustomProps<SectionNewsProps>) => {
  const [filterSelected, setFilterSelected] = useState<ISelect>(filters[0]);
  
  const handleShowBottomSheet = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    modal.open({
      render({ close }) {
        return <ModalOptions filterSelected={filterSelected} setFilterSelected={setFilterSelected} close={close} />;
      },
      className: 'modal-box shadow-itel',
      classNameContainer: 'modal-bottom-sheet',
      classNameOverwrite: true,
      closeButton: true
    });
  };

  return (
    <section className={clsx(isOdd ? 'md:bg-neutral-50' : 'md:bg-neutral-0', 'bg-neutral-0')}>
      <div {...rest}>
        <div className="flex items-center">
          <h2 className={clsx('font-itel flex-1 text-xl md:text-h3 font-bold xl:text-h3', classTitle)}>{title}</h2>
          {href && !actionAll ? (
            <Link href={href} className="text-sm md:text-base transition-default font-medium hover:text-red-500">
              <span className="max-md:hidden">Xem tất cả</span>
              <span className="md:hidden flex items-center">
                Xem tất cả <Svg src="/icons/line/chevron-right.svg" width={16} height={16} />
              </span>
            </Link>
          ) : actionAll ? (
            <div
              onClick={() => actionAll && actionAll()}
              className="text-sm md:text-base transition-default font-medium hover:text-red-500 hover:cursor-pointer"
            >
              <span className="max-md:hidden">Xem tất cả</span>
              <span className="md:hidden flex items-center">
                Xem tất cả <Svg src="/icons/line/chevron-right.svg" width={16} height={16} />
              </span>
            </div>
          ) : (
            <></>
          )}
          {haveFilter && (
            <>
              <SelectSingle
                buttonClassName="border-neutral-300 min-w-[188px] h-[48px] m-0"
                containerClassName="z-20 w-auto max-md:hidden"
                options={filters}
                displayValue={(data) => data.label}
                value={filterSelected}
                onChange={(option) => {
                  setFilterSelected(option);
                }}
              />
              <div className="items-center hidden max-md:flex" onClick={handleShowBottomSheet}>
                <div className={` text-sm font-semibold text-neutral-800 text-left block truncate`}>{filterSelected.label}</div>
                <div className={`flex items-center focus:outline-none transition-all duration-300 ease-out mr-0`}>
                  <Svg src="/icons/bold/down.svg" width={24} height={24} />
                </div>
              </div>
            </>
          )}
        </div>
        {children}
      </div>
    </section>
  );
};

export default SectionNews;
