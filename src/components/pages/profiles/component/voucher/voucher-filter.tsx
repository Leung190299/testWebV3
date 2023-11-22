import * as React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useState } from 'react';
import { Listbox } from '@headlessui/react';
import Svg from '@/components/icon/svg';
import clsx from 'clsx';
import { IFormSearch } from '@/pages/imall/device';
import { VOUCHER_CATEGORY } from '@/components/pages/profiles/constant/profile.constant';

type Props = {
  defaultValues?: any;
};
export const VoucherFilter = (props: Props) => {
  const methods = useForm<IFormSearch>({
    defaultValues: {
      ...props.defaultValues
    },
    mode: 'onChange'
  });

  const [selectedType, setSelectedType] = useState(VOUCHER_CATEGORY[0]);
  return (
    <ul className="space-y-8 md:space-y-0  w-64">
      <Controller
        control={methods.control}
        // defaultValue={'all'}
        name="range"
        render={({ field: { value, onChange } }) => {
          return (
            <Listbox as="div" className="relative  text-end rounded-full" value={selectedType} onChange={setSelectedType}>
              <Listbox.Button className={'relative text-left rounded-full'}>
                <div className="border-none	outline outline-1 outline-neutral-300 text-neutral-800 font-bold input w-full rounded-full p-3 pl-6 pr-14 ">
                  {selectedType.id === 'all' ? 'Tất cả Voucher' : selectedType.name}
                </div>
                <div className="absolute inset-y-0 right-6 flex items-center rounded-r-md focus:outline-none hover:outline-none">
                  <Svg src="/icons/bold/down.svg" width={24} height={24} />
                </div>
              </Listbox.Button>
              <Listbox.Options className="absolute z-20 my-2 max-h-60 w-full overflow-auto  w-64 rounded-xl p-2 bg-neutral-0 shadow-itel top-full">
                {VOUCHER_CATEGORY.map((option) => (
                  <li key={typeof option === 'string' ? option : option.id}>
                    <Listbox.Option
                      as="button"
                      type="button"
                      value={option}
                      className={({ active }) =>
                        clsx(
                          'relative w-full  select-none p-4 text-left rounded-lg',
                          active ? 'text-white bg-neutral-100' : 'text-gray-900'
                        )
                      }
                    >
                      <span className="block truncate text-neutral-800 font-bold">{option.id === 'all' ? 'Tất cả' : option.name}</span>
                    </Listbox.Option>
                  </li>
                ))}
              </Listbox.Options>
            </Listbox>
          );
        }}
      />
    </ul>
  );
};
