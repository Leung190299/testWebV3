import { Fragment } from 'react';
import Svg from '../icon/svg';
import { Menu, Transition } from '@headlessui/react';

export interface ISelect {
  value: string | number;
  label: string;
}

type DropdownDataProps = {
  options: ISelect[];
  displayValue(item: ISelect): string;
  onChange?(item: ISelect): void;
  value?: ISelect;
  placeholder?: string;
  containerClassName?: string;
  buttonClassName?: string;
  dropdownItemClassName?: string;
  dropdownContainerClassName?: string;
};
export default function SelectSingle({
  displayValue,
  options,
  value,
  onChange,
  placeholder,
  containerClassName,
  buttonClassName,
  dropdownContainerClassName,
  dropdownItemClassName
}: DropdownDataProps) {
  return (
    <Menu
      as="div"
      className={`rounded-[48px] relative inline-block border border-neutral-300 border-solid text-left ${containerClassName}`}
    >
      {({ open }) => (
        <>
          <div className={`w-full`}>
            <Menu.Button
              className={`px-4 flex flex-row bg-neutral-0 relative items-center  ${
                open ? 'text-primary' : ''
              } justify-between rounded-[48px] ${buttonClassName}`}
            >
              <div
                className={`text-base font-bold text-neutral-800  ${open ? 'text-primary' : ''}  ${
                  !value ? 'opacity-50' : 'opacity-100'
                } text-left block truncate`}
              >
                {(value && displayValue(value)) || placeholder}
              </div>
              <div
                className={`flex items-center focus:outline-none transition-all duration-300 ease-out mr-0 ${open ? '-rotate-180' : ''}`}
              >
                <Svg src="/icons/bold/down.svg" width={24} height={24} />
              </div>
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-100"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-100"
          >
            <Menu.Items
              className={`absolute right-0 mt-2 origin-top-right divide-y divide-gray-100 rounded-md bg-neutral-0 drop-shadow-2xl shadow-lg shadow-itel ${dropdownContainerClassName}`}
            >
              <div className="p-2">
                {options.map((option) => (
                  <Menu.Item key={option.value}>
                    <button
                      onClick={() => {
                        onChange && onChange(option);
                      }}
                      className={`text-left text-base min-w-[240px] text-neutral-800 p-4 hover:bg-neutral-100 w-full font-bold block truncate ${
                        value?.value === option?.value ? 'bg-neutral-100' : ''
                      } ${dropdownItemClassName}`}
                    >
                      {displayValue(option)}
                    </button>
                  </Menu.Item>
                ))}
              </div>
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  );
}
