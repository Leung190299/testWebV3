import useBoolean from '@pit-ui/modules/hooks/useBoolean';
import useIsomorphicLayoutEffect from '@pit-ui/modules/hooks/useIsomorphicLayoutEffect';
import { Listbox } from '@headlessui/react';
import { useRef } from 'react';
import Svg from '../icon/svg';
import clsx from 'clsx';

type SelectListProps<D> = {
  options: D[];
  displayValue?(item: D): string;
  value?: D | null;
  onChange?: (item: D) => void;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  placeholder?: string;
  classNameOptions?: string;
  disableInput?: boolean;
  disabled?: boolean;
  className?: string;

  renderItem?(props: D): React.ReactNode;
};
export default function SelectListOption<D extends { name?: string }>({
  displayValue = (value) => (value ? (typeof value === 'string' ? value : value.name) : null)!,
  options,
  value,
  onChange,
  onClick,
  placeholder,
  disabled,
  renderItem,
  className
}: SelectListProps<D>) {
  return (
    <Listbox as="div" className={'relative'} value={value} onChange={onChange} disabled={disabled}>
      {({ open }) => (
        <>
          <Listbox.Button className={clsx('input-trailing-icon relative disabled:opacity-30', className)} onClick={onClick}>
            <div className="input-bordered input truncate text-left  w-full outline-none" placeholder={placeholder}>
              {value ? (renderItem ? renderItem(value) : displayValue(value)) : placeholder}
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none pointer-events-none">
              <Svg src="/icons/bold/down.svg" width={24} height={24} className={`${open && 'rotate-180'} transition-all`} />
            </div>
          </Listbox.Button>
          <OptionsList value={value} open={open} options={options} renderItem={renderItem} displayValue={displayValue} />
        </>
      )}
    </Listbox>
  );
}
type OptionsProps<D> = {
  options: D[];
  open: boolean;
  value?: D | null;
  displayValue?(item: D): string;
  renderItem?(props: D): React.ReactNode;
};
function OptionsList<D extends {} | string>({
  options,
  open,
  value,
  renderItem,
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
  const isString = typeof value === 'string';
  return open ? (
    <Listbox.Options className="absolute left-0 top-full z-10 mt-2 origin-top-left outline-none w-full">
      <div className="bg-neutral-0 rounded-lg shadow-itel px-4 py-6 space-y-4">
        {options.map((option) => (
          <Listbox.Option key={isString ? option : (option as any).id} value={option}>
            <div className="relative flex items-center p-4 gap-4">
              <input
                type="radio"
                name="example"
                className="peer"
                checked={isString ? option == value : (option as any).id === (value as any)?.id}
                onChange={() => void 0}
              />
              <span className="absolute inset-0 rounded-lg border-neutral-300 border peer-checked:border-red-500 pointer-events-none" />
              {renderItem ? renderItem(option) : displayValue(option)}
            </div>
          </Listbox.Option>
        ))}
      </div>
    </Listbox.Options>
  ) : null;
}
