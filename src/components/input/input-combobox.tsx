import { Combobox } from '@headlessui/react';
import React, { useState } from 'react';
import Svg from '../icon/svg';

type Props<T> = {
  title: string;
  placeholder?: string;
  options?: Exclude<T, null>[];
  value?: T | null;
  uniqueKey?: keyof T;
  renderValue?(v: T): React.ReactNode;
  onChange?(value: T): void;
  onClickButton?(e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void;
};

const InputComboboxLabelIn = <T extends {}>({
  uniqueKey,
  title,
  value,
  onChange,
  options,
  renderValue = (v: any) => v.name,
  onClickButton,
  required,
  ...rest
}: Props<T> & Omit<JSX.IntrinsicElements['input'], keyof Props<T> | 'ref'>) => {
  const [query, setQuery] = useState('');

  return (
    <Combobox as="div" className="relative px-4 pt-3 pb-2 bg-neutral-0 rounded-xl" onChange={onChange} value={value}>
      <div className="flex">
        <label className="form-control flex-1">
          <p className="label-text font-medium text-subtle-content" aria-required={required}>
            {title}
          </p>
          <Combobox.Input
            type="text"
            className="bg-transparent outline-none mt-1 font-bold"
            onChange={(e: any) => setQuery(e.target.value)}
            displayValue={(value: any) => value?.name}
            {...rest}
          />
        </label>
        <Combobox.Button className="" onClick={onClickButton}>
          <Svg src="/icons/bold/down.svg" className="w-6 h-6" />
        </Combobox.Button>
      </div>
      <Combobox.Options as="div" className="absolute mt-4 outline-none left-0 z-[1] font-medium w-full">
        <ul className="menu p-2 bg-neutral-0 rounded-xl shadow-itel max-h-60 overflow-auto block">
          {options
            ? (query ? options.filter((v: any) => v.name.toUpperCase().includes(query.toUpperCase())) : options).map((option) => (
                <Combobox.Option key={option[(uniqueKey || 'id') as keyof T] as string | number} value={option} className="w-full">
                  <p className="text-left">{renderValue(option)}</p>
                </Combobox.Option>
              ))
            : null}
        </ul>
      </Combobox.Options>
    </Combobox>
  );
};

export default InputComboboxLabelIn;
