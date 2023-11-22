import useIsClient from '@/hooks/useIsClient';
import { useModal } from '@/libs/modal';
import { IFormSearch } from '@/pages/imall/device';

import type { Model } from '@/types/model';

import clsx from 'clsx';
import React, { useState } from 'react';
import { Controller, DefaultValues, useForm } from 'react-hook-form';

import Accordions from '../accordion/accordions';
import Svg from '../icon/svg';
import ModalFilter from './modal-filter';

import { IMALL_PRICE_LIST } from '@/constants/imall.constants';
import { Listbox } from '@headlessui/react';
import FilterList from '../filter/filter-list';
import FilterPrice from '../filter/filter-price';

const ModalImallFilter = (props: {
  defaultValues?: DefaultValues<IFormSearch>;
  brands: Model.Brand[];
  filters?: { title: string; type: string; options: { name: string; value: any }[] }[];
  categories: Model.Category[];
}) => {
  const [, forceRender] = useIsClient();

  const { done } = useModal();
  const methods = useForm<IFormSearch>({
    defaultValues: {
      ...props.defaultValues
    },
    mode: 'onChange'
  });

  const resetForm = () => {
    methods.reset();
    forceRender();
  };
  const [selectedPrice, setSelectedPrice] = useState(IMALL_PRICE_LIST[0]);

  return (
    <form onSubmit={methods.handleSubmit(done)} className="md:pt-12">
      <ModalFilter.Header title="Lọc Sản phẩm" />
      <main className="mt-2 md:mt-0 md:pt-2 pb-20">
        <div className="bg-neutral-0">
          <div className="container">
            <ul className="md:py-6 divide-y divide-neutral-100">
              <Controller
                control={methods.control}
                defaultValue={[0, 20_000_000]}
                name="range"
                render={({ field: { value, onChange } }) => {
                  return (
                    <FilterPrice
                      min={0}
                      max={20_000_000}
                      step={100_000}
                      value={value}
                      className="space-y-4 py-4 xl:py-0"
                      onChange={onChange}
                    >
                      <Listbox
                        as="div"
                        className="relative"
                        value={selectedPrice}
                        onChange={(v) => {
                          setSelectedPrice(v);
                          onChange(v.value);
                        }}
                      >
                        <Listbox.Button className={'relative w-full text-left'}>
                          <div className="input-bordered input w-full outline-none">{selectedPrice.name}</div>
                          <div className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none pointer-events-none">
                            <Svg src="/icons/bold/down.svg" width={24} height={24} />
                          </div>
                        </Listbox.Button>
                        <Listbox.Options className="absolute z-20 my-2 max-h-60 w-full overflow-auto rounded-md border border-neutral-300 bg-neutral-0 outline-none shadow-itel top-full">
                          <ul className="menu p-1">
                            {IMALL_PRICE_LIST.map((option) => (
                              <li key={typeof option === 'string' ? option : option.id}>
                                <Listbox.Option
                                  as="button"
                                  type="button"
                                  value={option}
                                  className={({ active }) =>
                                    clsx(
                                      'relative w-full  select-none py-2 pl-3 pr-9 text-left',
                                      active ? 'text-white bg-neutral-300' : 'text-gray-900'
                                    )
                                  }
                                >
                                  <span className="block truncate">{option.name}</span>
                                </Listbox.Option>
                              </li>
                            ))}
                          </ul>
                        </Listbox.Options>
                      </Listbox>
                    </FilterPrice>
                  );
                }}
              />
              <li>
                <div className="text-left font-medium pt-2 md:pb-4">
                  <p className="font-bold py-4">Thương hiệu</p>
                  <ul className="flex gap-2 pb-4 md:pb-0 overflow-x-auto scrollbar-hide">
                    {props.brands.map((item, i) => {
                      return (
                        <li key={item.id}>
                          <label>
                            <input type="checkbox" className="peer sr-only" value={item.name} {...methods.register('supplier')} />
                            <span className="btn-tertiary btn btn-sm border-none font-medium peer-checked:bg-red-600 peer-checked:text-neutral-0">
                              {item.name}
                            </span>
                          </label>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </li>
              {props.filters?.length
                ? props.filters.map((filter) => (
                    <div key={filter.type} className="">
                      <Accordions>
                        <Button>{filter.title}</Button>
                        <Accordions.Panel>
                          <ul className="pb-4 md:pb-0">
                            {filter.options.map(({ name, value }) => (
                              <li key={filter.type + '_' + value}>
                                <label role="button" className="flex h-12 items-center">
                                  <input type="checkbox" value={value} className="mr-2" {...methods.register(`options.${filter.type}`)} />
                                  <span>{name}</span>
                                </label>
                              </li>
                            ))}
                          </ul>
                        </Accordions.Panel>
                      </Accordions>
                    </div>
                  ))
                : null}
            </ul>
            <FilterList
              title="Loại sản phẩm"
              options={props.categories}
              {...methods.register('options.category_name')}
              className="space-y-4 py-4 xl:py-0"
            />
          </div>
        </div>
      </main>
      <ModalFilter.Actions onReset={resetForm} reset="Xoá bộ lọc" apply="Lọc ngay" />
    </form>
  );
};
const Button = ({ children }: { children?: React.ReactNode }) => {
  return (
    <>
      <Accordions.Button type="button" className="flex items-center w-full text-left py-4 border-t border-neutral-200">
        {({ open }) => (
          <>
            <b className="flex-1">{children}</b>
            <Svg
              src="/icons/line/chevron-down.svg"
              className={clsx('transition-default duration-300 h-5 w-5 md:h-8 md:w-8', open ? '-rotate-180' : '')}
            />
          </>
        )}
      </Accordions.Button>
    </>
  );
};

export default ModalImallFilter;
