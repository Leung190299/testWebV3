import * as React from 'react';
import { VOUCHER_CATEGORY } from '@/components/pages/profiles/constant/profile.constant';
import { Listbox } from '@headlessui/react';
import clsx from 'clsx';
import { useState } from 'react';
import Svg from '@/components/icon/svg';

export const ModalVoucherMobile = ({ onSelect = function () {} }: { onSelect?: (text: string) => void }) => {
  const [options, setOptions] = useState(VOUCHER_CATEGORY[0]);

  return (
    <Listbox as="div" className="relative text-end rounded-full" value={options}>
      {VOUCHER_CATEGORY.map((option) => {
        const active = options.id === option.id;

        return (
          <Listbox.Option
            as="button"
            key={option.id}
            type="button"
            value={options}
            onClick={() => {
              onSelect(option.name);
              setOptions(option);
            }}
            className={() =>
              clsx('relative w-full  select-none p-4 text-left rounded-lg', active ? 'text-white bg-neutral-100' : 'text-gray-900')
            }
          >
            <div className={'flex items-center'}>
              <span className="block truncate text-neutral-800 font-bold grow">{option.id === 'all' ? 'Tất cả' : option.name}</span>
              {active && (
                <span className="relative pr-0.5">
                  <Svg src="/icons/bold/tick-circle.svg" className="text-red-500 ml-2" width={20} height={20} />
                </span>
              )}
            </div>
          </Listbox.Option>
        );
      })}
    </Listbox>
  );
};
