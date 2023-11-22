import { Combobox } from '@headlessui/react';
import useBoolean from '@pit-ui/modules/hooks/useBoolean';
import useIsomorphicLayoutEffect from '@pit-ui/modules/hooks/useIsomorphicLayoutEffect';
import clsx from 'clsx';
import _ from 'lodash';
import { useRef, useState } from 'react';
import Svg from '../icon/svg';

type ComboboxesSimpleProps<D> = {
  options: D[];
  displayValue?(item: D): string;
  value?: D | null;
  onChange?: (item: D) => void;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  placeholder?: string;
  className?: string;
  classNameOptions?: string;
  disableInput?: boolean;
  disabled?: boolean;
  btnOnMobile?: boolean;
  btnClassName?: string;
};
export default function ComboboxesSimple<D extends { text?: string; name?: string }>({
  displayValue = (value) => (value ? (typeof value === 'string' ? value : value.text) : null)!,
  options,
  value,
  onChange,
  onClick,
  placeholder,
  className,
  classNameOptions,
  disableInput,
  disabled,
  onFocus,
  btnOnMobile,
  btnClassName
}: ComboboxesSimpleProps<D>) {
  const [query, setQuery] = useState('');
  const ref = useRef<HTMLButtonElement>(null);
  const filteredOption =
    query === ''
      ? options
      : options.filter((option) => {
          return displayValue(option).toLowerCase().includes(query.toLowerCase());
        });

  return (
    <Combobox as="div" className={'relative'} value={value} onChange={onChange} disabled={disabled}  onClick={() => ref.current?.click()}>
      {({ open }) => (
        <>
          <div className={btnClassName ? btnClassName + ' relative' : 'relative'}>
            {disableInput ? (
              <Combobox.Button
                className={clsx(
                  `input-bordered input-trailing-icon truncate text-left input w-full outline-none ${!value && 'text-neutral-500'}`,
                  className
                )}
                onClick={onClick}
                placeholder={placeholder}
              >
                {!_.isEmpty(value) ? displayValue(value) : placeholder}
              </Combobox.Button>
            ) : (
              <>
                  <Combobox.Input<D>

                  className={clsx({ 'max-md:hidden': btnOnMobile }, 'input-bordered input pr-8 w-full outline-none', className)}
                  placeholder={placeholder}
                    // onBlur={() => setQuery('')}
                  onFocus={onFocus}
                  onChange={(event) => {
                    setQuery(event.target.value);
                  }}
                    displayValue={displayValue}

                />
                {btnOnMobile && (
                  <Combobox.Button
                    className={clsx(
                      `md:hidden input-bordered input-trailing-icon  truncate text-left input w-full outline-none ${
                        !value && 'text-neutral-500'
                      }`,
                      className
                    )}
                    onClick={onClick}
                    placeholder={placeholder}
                  >
                    {!_.isEmpty(value) ? displayValue(value) : placeholder}
                  </Combobox.Button>
                )}
              </>
            )}

            <Combobox.Button
              ref={ref}
              className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none"
              onClick={onClick}
            >
              <Svg src="/icons/bold/down.svg" width={24} height={24} className={`${open && 'rotate-180'} transition-all`} />
            </Combobox.Button>
          </div>
          <OptionsList className={classNameOptions} open={open} onChange={onChange} options={filteredOption} displayValue={displayValue} />
        </>
      )}
    </Combobox>
  );
}
type OptionsProps<D> = {
  options: D[];
  open: boolean;
  displayValue?(item: D): string;
  className?: string;
  onChange?:(item: D) => void
};
function OptionsList<D extends {} | string>({
  options,
  open,
  className = 'w-full',
  displayValue = (item) => item as string,
  onChange
}: OptionsProps<D>) {
  const ref = useRef<HTMLUListElement>(null);
  const { value: isAbove, setValue } = useBoolean(false);
  useIsomorphicLayoutEffect(() => {
    if (!ref.current) return;
    const parent = ref.current.parentElement;
    if (!parent) return;
    if (open) {
      const bcr = parent.getBoundingClientRect();
      const { height, top } = ref.current.getBoundingClientRect();
      setValue(bcr.top + bcr.height + height > innerHeight ? true : false);
    }
  }, [open, options.length]);
  return open ? (
    <Combobox.Options
      ref={ref}
      static
      className={clsx(
        'absolute z-20 my-2 rounded-md overflow-auto border border-neutral-300 bg-neutral-0 px-1.5 py-1 shadow-itel',
        isAbove ? 'bottom-full' : 'top-full',
        className
      )}
    >
      <div className="h-full max-h-60">
        <ul className="menu p-1">
          {options.length > 0 ? (
            options.map((option, id) => (
              <li key={typeof option === 'string' ? option : (option as any).id || (option as any)._id}>
                <Combobox.Option
                  as="button"
                  type='button'
                  value={option}
                  className={({ selected }) =>
                    clsx(
                      'overflow-hidden select-none py-3 text-left hover:bg-neutral-100 line-clamp-1',
                      selected ? 'text-white bg-neutral-300' : 'text-gray-900'
                    )
                  }
                >
                  <span className="block truncate">{displayValue(option)}</span>
                </Combobox.Option>
              </li>
            ))
          ) : (
            <p className="text-center w-full">Không tìm thấy kết quả</p>
          )}
        </ul>
      </div>
      {/*  */}
    </Combobox.Options>
  ) : null;
}
