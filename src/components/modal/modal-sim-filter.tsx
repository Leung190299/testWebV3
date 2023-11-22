import useIsClient from '@/hooks/useIsClient';
import { useModal } from '@/libs/modal';
import { chunkArray } from '@/utilities/array';
import { clamp } from '@/utilities/number';
import clsx from 'clsx';
import React, { useEffect, useMemo, useState } from 'react';
import { Controller, DefaultValues, useForm, useWatch } from 'react-hook-form';
import Accordions from '../accordion/accordions';
import Svg from '../icon/svg';
import InputSliderRange from '../input/input-slider';
import ModalFilter from './modal-filter';

import { IMALL_PRICE_LIST } from '@/constants/imall.constants';
import { MAX_PRICE, packs, simTypes, sorts } from '@/constants/sim.constants';
import { SimModel } from '@/types/pick-sim';
import { NumericFormat } from 'react-number-format';

export type ISimFilter = {
  query: string;
  excluded: string[];
  type: string[];
  packs: string[];
  packsDesktop: string;
  priceRange: [number, number];
  sortBy: string;
  simByYear: string;
  tag?: any;
  // Highest search in month
  tags: string[];

  year: string;
  lakjsdlkajsld: string;
  // options: Record<string, string[]>;
};

const SimFilterModal = (props: {
  defaultValues?: DefaultValues<ISimFilter>;
  simTypes: Array<{ id: string | number; name: string }>;
  packs: SimModel.TypeOptionPack[];
}) => {
  const [, forceRender] = useIsClient();
  const [isActive, setIsActive] = useState<true | undefined>(() =>
    typeof window !== 'undefined' ? (window.innerWidth < 768 ? true : undefined) : undefined
  );

  const { done } = useModal();
  const methods = useForm<ISimFilter>({
    defaultValues: {
      sortBy: 'default',
      // priceRange: IMALL_PRICE_LIST[0].value,
      excluded: [],
      ...props.defaultValues
    },
    mode: 'onChange'
  });
  useEffect(() => {
    const detect = () => (window.innerWidth < 768 ? setIsActive(true) : setIsActive(undefined));
    window.addEventListener('resize', detect);
    return () => {
      window.removeEventListener('resize', detect);
    };
  }, []);

  const resetForm = () => {
    methods.reset({ query: '', excluded: [], packs: [], priceRange: [0, 5_000_000], sortBy: 'all', type: [], tags: [] });
    forceRender();
  };

  const [arrayLeft, arrayRight] = useMemo(() => chunkArray(packs, 2), []);
  const [typeId, packId] = useWatch({ name: ['type', 'packsDesktop'], control: methods.control });
  const type = useMemo(() => {
    if (!typeId) return undefined;
    return simTypes.find((s) => s.id === Number(typeId));
  }, [typeId]);
  const pack = useMemo(() => {
    if (!packId) return undefined;
    return packs.find((s) => s.name === packId);
  }, [packId]);
  const simByYear = useWatch({ control: methods.control, name: 'simByYear' });



  return (
    <form onSubmit={methods.handleSubmit(done)} className="md:pt-12">
      <ModalFilter.Header title="Lọc sim" />
      <main className="pt-2 pb-20">
        <div className="bg-neutral-0">
          <div className="container">
            <ul className="space-y-8 md:space-y-0 py-6">
              <li className="md:flex items-center md:pb-4">
                <b className="mr-4">Loại trừ số</b>
                <ul className="-mx-2 flex flex-wrap text-center font-medium">
                  {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((number) => {
                    return (
                      <li key={number} className="mt-3 md:mt-0 w-1/5 md:w-auto px-2">
                        <label>
                          <input type="checkbox" className="peer sr-only" value={number} {...methods.register('excluded')} />
                          <span className="block w-full rounded-full md:h-10 md:w-10 peer-checked:bg-red-500 peer-checked:text-neutral-0 bg-neutral-100 py-2">
                            {number}
                          </span>
                        </label>
                      </li>
                    );
                  })}
                </ul>
              </li>
              <Accordions as={'li'} isActive={isActive}>
                <Button>
                  <span>Loại sim</span>
                  {type && <span className="text-sm ml-2 text-red-500">{type.name}</span>}
                </Button>
                <Accordions.Panel>
                  <ul className="-mx-1 md:-mx-4 flex flex-wrap text-left font-medium pt-2 md:pb-4">
                    {props.simTypes!.map(({ id, name: label }) => {
                      return (
                        <li key={id} className="w-1/2 md:w-auto px-1 md:px-4">
                          <label className="w-full block py-3">
                            <input type="checkbox" value={id} {...methods.register('type')} />
                            <span className="ml-2">
                              {id !== 1 && <span className="max-md:hidden">Sim </span>}
                              {label}
                            </span>
                          </label>
                        </li>
                      );
                    })}
                    <li className="w-1/2 md:w-auto px-1 md:px-4">
                      <label className="w-full block py-3">
                        <input type="checkbox" {...methods.register('simByYear')} />
                        <span className="ml-2 first-letter:uppercase inline-block">
                          {' '}
                          <span className="max-md:hidden">Sim theo </span>năm sinh
                        </span>
                      </label>
                    </li>
                    {simByYear && (
                      <li className="w-full md:w-auto px-1 md:px-4">
                        <input
                          type="tel"
                          className="input input-bordered w-full py-3"
                          placeholder="Nhập năm sinh..."
                          {...methods.register('year', { shouldUnregister: true })}
                        />
                      </li>
                    )}
                  </ul>
                </Accordions.Panel>
              </Accordions>
              <Accordions as={'li'} isActive={isActive} className="md:hidden">
                <Button>Gói cước</Button>
                <Accordions.Panel>
                  <ul className="-mx-1.5 flex flex-wrap text-left text-xs font-medium mt-3 md:mt-0">
                    {arrayLeft.map(({ id, name }) => {
                      return (
                        <li key={id} className="px-1.5 mb-3">
                          <label className="w-ful block">
                            <input type="radio" className="peer sr-only" value={id} {...methods.register('packsDesktop')} />
                            <span className="block w-full rounded peer-checked:bg-red-500 peer-checked:text-neutral-0 bg-neutral-100 py-1.5 px-2">
                              {name}
                            </span>
                          </label>
                        </li>
                      );
                    })}
                  </ul>
                  <ul className="-mx-1.5 flex flex-wrap text-left text-xs font-medium">
                    {arrayRight.map(({ id, name }) => {
                      return (
                        <li key={id} className="px-1.5 mb-3">
                          <label className="w-ful block">
                            <input type="radio" className="peer sr-only" value={id} {...methods.register('packsDesktop')} />
                            <span className="block w-full rounded peer-checked:bg-red-500 peer-checked:text-neutral-0 bg-neutral-100 py-1.5 px-2">
                              {name}
                            </span>
                          </label>
                        </li>
                      );
                    })}
                  </ul>
                </Accordions.Panel>
              </Accordions>
              <Accordions as={'li'} isActive={isActive} className="max-md:hidden">
                <Button>
                  <span>Gói cước</span>
                  {pack && <span className="text-sm ml-2 text-red-500">{pack.name}</span>}
                </Button>
                <Accordions.Panel>
                  <ul className="pt-4 md:pt-0 md:pb-4">
                    {props.packs.map((pack) => (
                      <li key={pack.id} className="mt-2 md:mt-0">
                        <label className="w-ful flex items-center relative">
                          <input type="radio" className="peer" hidden value={pack.id} {...methods.register('packsDesktop')} />
                          <span className="absolute inset-0 rounded peer-checked:bg-neutral-100" />
                          <span className="relative block w-full rounded peer-checked:bg-neutral-100 py-3 px-4 md:py-4">
                            {pack.id !== 'all' && 'Gói cước '}
                            {pack.name}
                          </span>
                          <span className="relative hidden peer-checked:block md:!hidden pr-4">
                            <Svg src="/icons/bold/tick-circle.svg" className="text-red-500 ml-2" width={20} height={20} />
                          </span>
                        </label>
                      </li>
                    ))}
                  </ul>
                </Accordions.Panel>
              </Accordions>
              <Accordions as={'li'} isActive={isActive}>
                <Button>Mức giá</Button>
                <Accordions.Panel className={'px-2 -mx-2'}>
                  <Controller
                    name="priceRange"
                    control={methods.control}
                    render={({ field: { name, onBlur, onChange, value } }) => {
                      return (
                        <div className="pb-6 mt-4">
                          <div className="form-control">
                            <div className="input-bordered input-group input rounded-lg p-0">
                              <NumericFormat
                                className="input w-1/2 border-none outline-none"
                                placeholder="50.000đ"
                                thousandSeparator=","
                                size={1}
                                value={value[0]}
                                onChange={(e) => {
                                  const v = Number(e.target.value);
                                  if (isNaN(v)) return;
                                  onChange([clamp(v, 0, value[1]), value[1]]);
                                }}
                              />
                              <hr className="my-auto border-r border-neutral-400 py-4" />
                              <NumericFormat
                                className="input w-1/2 border-none outline-none"
                                placeholder="1.000.000đ"
                                thousandSeparator=","
                                size={1}
                                value={value[1]}
                                onChange={(e) => {
                                  const v = Number(e.target.value);
                                  if (isNaN(v)) return;
                                  onChange([value[0], clamp(v, value[0], 5_000_000)]);
                                }}
                              />
                            </div>
                          </div>
                          <div className="form-control mt-4 px-3">
                            <InputSliderRange
                              min={0}
                              max={MAX_PRICE}
                              step={50_000}
                              value={value}
                              defaultValue={value}
                              onChange={(e, value) => onChange(value)}
                            />
                          </div>
                        </div>
                      );
                    }}
                  />
                  <ul className="mt-2 md:pb-4">
                    {IMALL_PRICE_LIST.map(({ id, name, value }) => {
                      let range = methods.watch('priceRange');
                      return (
                        <li key={id}>
                          <label className="w-ful flex items-center relative">
                            <input
                              type="radio"
                              className="peer"
                              hidden
                              name="priceRange"
                              checked={range[0] == value[0] && range[1] == value[1]}
                              onChange={() => methods.setValue('priceRange', value)}
                            />
                            <span className="absolute inset-0 rounded peer-checked:bg-neutral-100" />
                            <span className="relative block w-full rounded peer-checked:bg-neutral-100 py-3 px-4 md:py-4">{name}</span>
                            <span className="relative hidden peer-checked:block md:!hidden pr-4">
                              <Svg src="/icons/bold/tick-circle.svg" className="text-red-500 ml-2" width={20} height={20} />
                            </span>
                          </label>
                        </li>
                      );
                    })}
                  </ul>
                </Accordions.Panel>
              </Accordions>
              <Accordions as={'li'} isActive={isActive}>
                <Button>Sắp xếp</Button>
                <Accordions.Panel>
                  <ul className="pt-4 md:pt-0 md:pb-4">
                    {sorts.map((sort) => (
                      <li key={sort.id} className="mt-2 md:mt-0">
                        <label className="w-ful flex items-center relative">
                          <input type="radio" className="peer" hidden value={sort.value} {...methods.register('sortBy')} />
                          <span className="absolute inset-0 rounded peer-checked:bg-neutral-100" />
                          <span className="relative block w-full rounded peer-checked:bg-neutral-100 py-3 px-4 md:py-4">{sort.name}</span>
                          <span className="relative hidden peer-checked:block md:!hidden pr-4">
                            <Svg src="/icons/bold/tick-circle.svg" className="text-red-500 ml-2" width={20} height={20} />
                          </span>
                        </label>
                      </li>
                    ))}
                  </ul>
                </Accordions.Panel>
              </Accordions>
            </ul>
          </div>
        </div>
      </main>
      <ModalFilter.Actions onReset={resetForm} />
    </form>
  );
};
export const FilterListBox = () => {};
export const Button = ({ children, classNameButton }: { children?: React.ReactNode; classNameButton?: string }) => {
  return (
    <>
      <b className="md:hidden">{children}</b>
      <Accordions.Button
        type="button"
        className={`max-md:hidden flex items-center w-full text-left py-4 border-t border-neutral-200 ${classNameButton}`}
      >
        {({ open }) => (
          <>
            <b className="flex-1">{children}</b>
            <Svg
              src="/icons/line/chevron-down.svg"
              className={clsx('transition-default duration-300 md:h-8 md:w-8', open ? '-rotate-180' : '')}
            />
          </>
        )}
      </Accordions.Button>
    </>
  );
};

export default SimFilterModal;
