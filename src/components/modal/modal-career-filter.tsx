import useIsClient from '@/hooks/useIsClient';
import { useModal } from '@/libs/modal';
import React, { useState } from 'react';
import { DefaultValues, useForm } from 'react-hook-form';

import Accordions from '../accordion/accordions';
import ModalFilter from './modal-filter';

import Svg from '@/components/icon/svg';
import SelectSingle, { ISelect } from '@/components/select/select-single';
import { FILTER_JOB_LOCATION, FILTER_JOB_TIME, FILTER_JOB_TYPE, FILTER_JOB_WORKING_TYPE } from '@/constants/career.constants';
import { IFormJob } from '@/pages/recruitment/search';
import clsx from 'clsx';

const ModalCareerFilter = (props: { defaultValues?: DefaultValues<IFormJob> }) => {
  const [, forceRender] = useIsClient();
  const [filterSelected, setFilterSelected] = useState<ISelect>(
    FILTER_JOB_TIME.find((sort) => sort.value === props?.defaultValues?.sort) ?? FILTER_JOB_TIME[2]
  );
  const [locationFilterSelected, setLocationFilterSelected] = useState<ISelect>(
    FILTER_JOB_TIME.find((sort) => sort.value === props?.defaultValues?.sort) ?? FILTER_JOB_LOCATION[0]
  );
  const [profession, setProfession] = useState<(number | undefined)[]>(props.defaultValues?.profession || []);
  const [workingForm, setWorkingForm] = useState<(number | undefined)[]>(props.defaultValues?.workingForm || []);

  const { done } = useModal();
  const methods = useForm<IFormJob>({
    defaultValues: {
      ...props.defaultValues
    },
    mode: 'onBlur'
  });

  const resetForm = () => {
    methods.reset();
    setFilterSelected(FILTER_JOB_TIME[2]);
    setLocationFilterSelected(FILTER_JOB_LOCATION[0]);
    setWorkingForm([]);
    setProfession([]);
    forceRender();
  };

  return (
    <div className="md:pt-12">
      <ModalFilter.Header title="Lọc vị trí tuyển dụng" />
      <main className="mt-2 md:mt-0 md:pt-2 pb-16 md:pb-20">
        <div className="bg-neutral-0">
          <div className="container">
            <ul className="py-6 max-md:pb-0 divide-y divide-neutral-100">
              <Accordions className="max-md:-mt-[26px] md:-mt-4 md:mb-4">
                <ButtonAccordion classNameButton="border-none pt-6">Sắp xếp</ButtonAccordion>
                <Accordions.Panel>
                  <ul className="pb-4 md:pb-0">
                    {FILTER_JOB_TIME.map(({ value, label }) => {
                      const isChecked = filterSelected.value === value;
                      return (
                        <li key={value} className="mt-2 md:mt-0" onClick={() => setFilterSelected({ value, label })}>
                          <label className={`w-ful flex items-center rounded relative ${isChecked ? 'bg-neutral-200' : 'bg-neutral-0'}`}>
                            <input
                              type="radio"
                              className="peer"
                              hidden
                              value={filterSelected.value}
                              {...methods.register('sort', {
                                onChange() {
                                  methods.setValue('sort', value as number);
                                }
                              })}
                            />
                            <span className="relative block w-full py-3 px-4 md:py-4">{label}</span>
                            {isChecked && (
                              <span className="relative pr-4">
                                <Svg src="/icons/bold/tick-circle.svg" className="text-red-500 ml-2" width={20} height={20} />
                              </span>
                            )}
                          </label>
                        </li>
                      );
                    })}
                  </ul>
                </Accordions.Panel>
              </Accordions>
              <div className="filter-location pt-4 mb-4 md:pt-8 md:mb-8">
                <h4 className="font-bold mb-4">Khu vực</h4>
                <SelectSingle
                  buttonClassName="border-neutral-300 h-[48px] m-0 w-full rounded-lg"
                  containerClassName="z-[3] w-full block rounded-lg"
                  dropdownContainerClassName="w-full"
                  options={FILTER_JOB_LOCATION}
                  displayValue={(data) => data.label}
                  value={locationFilterSelected}
                  onChange={(option) => {
                    setLocationFilterSelected(option);
                  }}
                />
              </div>
              <div className="border-t border-neutral-200"></div>
              <Accordions>
                <ButtonAccordion classNameButton="border-none pt-4 md:pt-6">Ngành nghề</ButtonAccordion>
                <Accordions.Panel>
                  <ul className="pb-4 md:pb-0">
                    {FILTER_JOB_TYPE.map(({ value, label }) => (
                      <li key={value}>
                        <label role="button" className="flex h-12 items-center">
                          <input
                            type="checkbox"
                            checked={profession.includes(value)}
                            className="mr-2"
                            onClick={() => {
                              if (profession.includes(value)) {
                                setProfession(profession.filter((v) => v !== value));
                              } else {
                                setProfession([...profession, value]);
                              }
                            }}
                          />
                          <span>{label}</span>
                        </label>
                      </li>
                    ))}
                  </ul>
                </Accordions.Panel>
              </Accordions>
              <Accordions>
                <ButtonAccordion classNameButton="border-none pt-4 md:pt-6">Hình thức làm việc</ButtonAccordion>
                <Accordions.Panel>
                  <ul className="pb-4 md:pb-0">
                    {FILTER_JOB_WORKING_TYPE.map(({ value, label }) => (
                      <li key={value}>
                        <label role="button" className="flex h-12 items-center">
                          <input
                            type="checkbox"
                            className="mr-2"
                            checked={workingForm.includes(value)}
                            onClick={() => {
                              if (workingForm.includes(value)) {
                                setWorkingForm(workingForm.filter((v) => v !== value));
                              } else {
                                setWorkingForm([...workingForm, value]);
                              }
                            }}
                          />
                          <span>{label}</span>
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
      <footer className="fixed bottom-0 w-full bg-neutral-0 py-2 md:pt-6 md:pb-8">
        <div className="container">
          <div className="-mx-1.5 flex justify-center">
            <div className="w-1/2 md:w-auto px-1.5">
              <button type="button" className="md:w-[9.52rem] btn-secondary btn w-full rounded-full" onClick={resetForm}>
                Xóa bộ lọc
              </button>
            </div>
            <div className="w-1/2 md:w-auto px-1.5">
              <button
                className="md:w-[9.52rem] btn-primary btn w-full rounded-full"
                onClick={() =>
                  done({
                    sort: filterSelected.value,
                    location: locationFilterSelected.value,
                    profession: profession,
                    workingForm: workingForm
                  })
                }
              >
                Áp dụng
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export const ButtonAccordion = ({ children, classNameButton }: { children?: React.ReactNode; classNameButton?: string }) => {
  return (
    <>
      <Accordions.Button type="button" className={`flex items-center w-full text-left py-4 border-t border-neutral-200 ${classNameButton}`}>
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

export default ModalCareerFilter;
