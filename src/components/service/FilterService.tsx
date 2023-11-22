import { Combobox } from '@headlessui/react';
import useBoolean from '@pit-ui/modules/hooks/useBoolean';
import useIsomorphicLayoutEffect from '@pit-ui/modules/hooks/useIsomorphicLayoutEffect';
import clsx from 'clsx';
import { useRef, useState } from 'react';
import Svg from '../icon/svg';

type IFilterService<D> = {
  options: D[];
  displayValue?(item: D): string;
  value?: D | null;
  onChange?: (item: D) => void;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  placeholder?: string;
  className?: string;
  classNameOptions?: string;
  disableInput?: boolean;
  label?: string;
  classValue?: string;
};

export default function FilterService<D extends { id: number; name?: string }>({
  displayValue = (value) => (typeof value === 'string' ? value : value.name)!,
  options,
  value,
  onChange,
  onClick,
  placeholder,
  className,
  classNameOptions,
  disableInput,
  label,
  classValue
}: IFilterService<D>) {
  const [query, setQuery] = useState('');

  const filteredOption =
    query === ''
      ? options
      : options.filter((option) => {
          return displayValue(option).toLowerCase().includes(query.toLowerCase());
        });

  return (
    <Combobox as="div" className={'relative w-full'} value={value} onChange={onChange}>
      {({ open }) => (
        <>
          <div className="relative w-full">
            {disableInput ? (
              <Combobox.Button
                className={clsx(
                  `input-bordered rounded-xl input-trailing-icon truncate text-left input py-3 px-4 w-full outline-none ${
                    !value && 'text-neutral-500'
                  }`,
                  className
                )}
                onClick={onClick}
                placeholder={placeholder}
              >
                <div className="flex flex-col">
                  <p className="text-sm text-neutral-500 font-medium">{label}</p>
                  <p className={clsx(classValue, 'text-base font-bold ', value?.name ? 'text-neutral-800' : ' text-neutral-500')}>
                    {value?.name ? displayValue(value) : placeholder}
                  </p>
                </div>
              </Combobox.Button>
            ) : (
              <div className={clsx(className, 'input-bordered rounded-xl input-trailing-icon truncate text-left input py-3 px-4 w-full')}>
                <div className="flex flex-col">
                  <p className="text-sm text-neutral-500 font-medium">{label}</p>
                </div>
                <Combobox.Input<D>
                  placeholder={placeholder}
                  onChange={(event) => {
                    setQuery(event.target.value);
                  }}
                  displayValue={displayValue}
                  className="w-full bg-transparent text-base font-bold outline-none"
                />
              </div>
            )}
            <Combobox.Button
              className="absolute inset-y-0 right-0 flex items-center rounded-r-xl px-2 focus:outline-none"
              onClick={onClick}
            >
              <Svg src="/icons/bold/down.svg" width={24} height={24} className={`${open && 'rotate-180'} transition-all`} />
            </Combobox.Button>
          </div>
          {filteredOption.length > 0 && (
            <OptionsList className={classNameOptions} open={open} options={filteredOption} displayValue={displayValue} />
          )}
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
};
function OptionsList<D extends { id: number } | string>({
  options,
  open,
  className,
  displayValue = (item) => item as string
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
        'absolute z-20 my-2 max-h-60 w-full overflow-auto rounded-xl border border-neutral-300 bg-neutral-0 py-1 shadow-itel',
        isAbove ? 'bottom-full' : 'top-full',
        className
      )}
    >
      {options.map((option, id) => (
        <li key={typeof option === 'string' ? option : option.id}>
          <Combobox.Option
            as="button"
            type="button"
            value={option}
            className={({ active }) =>
              clsx('relative w-full  select-none py-2 pl-3 pr-9 text-left', active ? 'text-white bg-neutral-300' : 'text-gray-900')
            }
          >
            <span className="block truncate">{displayValue(option)}</span>
          </Combobox.Option>
        </li>
      ))}
      {/*  */}
    </Combobox.Options>
  ) : null;
}
