import { Listbox } from '@headlessui/react';
import clsx from 'clsx';
import React from 'react';
import Svg from '../icon/svg';

type Props<T = unknown> = {
  value: T;
  title?: string;
  options?: T[];
  className?: string;

  onChange?(value: T): void;
  displayValue(value: T): React.ReactNode;
  children?: React.ReactNode | ((bag: { open: boolean; disabled: boolean; value: T }) => React.ReactElement);

  prev?: React.ReactNode;
};

function DropdownSearch<T>({ className, value, onChange, displayValue, options = [], title, children, prev }: Props<T>) {
  return (
    <Listbox value={value} onChange={onChange}>
      {(props) => (
        <div className={className}>
          {(typeof children === 'function' ? children(props) : null) || (
            <Listbox.Button type="button" className={clsx('w-full px-2 py-1 text-left  flex items-center gap-2 rounded-lg', props.open && 'bg-neutral-100')}>
              <div className="text-sm">{title}</div>
              <div className="mt-1 flex">
                <b className="block truncate flex-1 mr-4">{displayValue(value)}</b>
                <span className="pointer-events-none">
                  <Svg src="/icons/bold/down.svg" className={props.open ? '-rotate-180' : undefined} width={24} height={24} />
                </span>
              </div>
            </Listbox.Button>
          )}
          <Listbox.Options className="absolute left-0 top-full z-10 mt-2 origin-top-left outline-none w-max max-w-[16rem]">
            <ul className="menu rounded-2xl shadow-itel p-2" data-theme="light">
              {prev}
              {options.map((tab) => {
                return (
                  <Listbox.Option
                    as="li"
                    className={({ selected }) => (selected ? 'menu-active' : '')}
                    key={(tab as any)?.id ?? displayValue(tab)}
                    value={tab}
                  >
                    <button className="font-bold" type="button">
                      {displayValue(tab)}
                    </button>
                  </Listbox.Option>
                );
              })}
            </ul>
          </Listbox.Options>
        </div>
      )}
    </Listbox>
  );
}

export default DropdownSearch;
