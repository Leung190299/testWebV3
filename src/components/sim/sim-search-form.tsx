import { withMobile } from '@/utilities/function';
import clsx from 'clsx';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import ComboboxesSimple from '../comboboxes/comboboxes-simple';
import DatePicker, { InputDate } from '../common/date-picker';
import Svg from '../icon/svg';
import { toggleModalDatePicker } from '../modal/selection/modal-date-picker';
import { toggleModalSelectionList } from '../modal/selection/modal-selection-list';
import { bornTime } from './SearchForm';
import { phoneNumberRegex } from '@/utilities/validator';

export type SimSearchFormProps = {
  includeGender?: boolean;
  includePhone?: boolean;
  includeName?: boolean;
  includeTimeOfBirth?: boolean;
};

export type IChangeLookup = {
  timeOfBirth: {
    id: number;
    name: string;
  };
  gender: string;
  dateOfBirth: string;
  phone: string;
  name: string;
};
const gender = [
  { name: 'Nam', id: 'male' },
  { name: 'Nữ', id: 'female' }
];
const SimSearchForm = ({
  includeTimeOfBirth,
  includeGender,
  includePhone,
  includeName,
  ...props
}: SimSearchFormProps & React.HTMLAttributes<HTMLDivElement>) => {
  const methods = useFormContext<IChangeLookup>();

  const handleSelectTime = withMobile(async () => {
    const defaultValue = methods.getValues('timeOfBirth')
      ? bornTime.find((obj) => methods.getValues('timeOfBirth').id === obj.id)
      : undefined;
    toggleModalSelectionList({
      title: 'Chọn giờ sinh',
      defaultValue,
      options: bornTime,
      displayValue(option) {
        return option.name;
      }
    }).then((v) => v && methods.setValue('timeOfBirth', v));
  });

  const handleDateOfBirth = withMobile(() => {
    toggleModalDatePicker({ defaultValue: methods.getValues('dateOfBirth'), title: 'Chọn ngày sinh' }).then(
      (date) => date && methods.setValue('dateOfBirth', date.toString())
    );
  });

  return (
    <div {...props}>
      {includeGender && (
        <div className="mb-6 md:mb-8">
          <div className="label-text text-base" aria-required>
            Giới tính
          </div>
          <div className="flex">
            {gender.map(({ id, name }) => (
              <div key={id} className="mr-18">
                <label className="flex items-center gap-x-2 select-none py-2 md:py-4">
                  <input type="radio" value={id} {...methods.register('gender')} />
                  <span>{name}</span>
                </label>
              </div>
            ))}
          </div>
        </div>
      )}
      <div>
        {includePhone && (
          <div className="mt-6">
            <div className="label-text text-base" aria-required>
              Số điện thoại
            </div>
            <div className="mt-2">
              <input
                className="input input-bordered w-full"
                placeholder="Nhập số điện thoại"
                {...methods.register('phone', {
                  pattern: {
                    value: phoneNumberRegex,
                    message: 'phone is not valid'
                  },
                  required: 'Phone is required',
                  shouldUnregister: true
                })}
              />
            </div>
          </div>
        )}
        {includeName && (
          <div className="mt-6">
            <div className="label-text text-base" aria-required>
              Họ và tên
            </div>
            <div className="mt-2">
              <input className="input input-bordered w-full" placeholder="Nhập họ và tên" {...methods.register('name')} />
            </div>
          </div>
        )}
        <div className={clsx('flex flex-wrap -mx-3 mt-6 gap-y-6', includePhone && 'md:flex-nowrap')}>
          <div className="w-full px-3">
            <div className="label-text text-base" aria-required>
              Ngày sinh dương lịch
            </div>
            <div className="mt-2">
              <Controller
                control={methods.control}
                name="dateOfBirth"
                render={({ field }) => {
                  return (
                    <div className={'relative'}>
                      <InputDate.Wrapper>
                        <button
                          className="relative flex w-full text-left"
                          onClick={handleDateOfBirth}
                          tabIndex={-1}
                          type="button"
                          onMouseDown={withMobile((e) => {
                            e.preventDefault();
                            e.stopPropagation();
                          })}
                        >
                          <InputDate
                            className="input input-bordered w-full input-trailing-icon"
                            placeholder="dd/mm/yyyy"
                            value={field.value}
                            onChange={(d) => field.onChange(d?.toString())}
                          />
                          <div className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none pointer-events-none">
                            <Svg src="/icons/line/calendar.svg" width={24} height={24} />
                          </div>
                        </button>
                        <InputDate.Content className="absolute mt-2 z-10">
                          {({ hide }) => (
                            <div className="bg-neutral-0 rounded-2xl shadow-itel px-6 py-8">
                              <DatePicker
                                onChange={(date) => {
                                  field.onChange(date.toString());
                                  hide();
                                }}
                                value={field.value}
                              />
                            </div>
                          )}
                        </InputDate.Content>
                      </InputDate.Wrapper>
                    </div>
                  );
                }}
              />
            </div>
          </div>
          {includeTimeOfBirth && (
            <div className="w-full px-3">
              <div className="label-text text-base" aria-required>
                Chọn giờ sinh
              </div>
              <div className="mt-2">
                <Controller
                  control={methods.control}
                  name="timeOfBirth"
                  render={({ field }) => (
                    <ComboboxesSimple
                      onChange={field.onChange}
                      value={field.value}
                      options={bornTime}
                      displayValue={(data) => data.name}
                      disableInput
                      placeholder="Chọn giờ sinh"
                      onClick={handleSelectTime}
                    />
                  )}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SimSearchForm;
