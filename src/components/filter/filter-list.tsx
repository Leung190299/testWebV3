import useBoolean from '@pit-ui/modules/hooks/useBoolean';
import { forwardRefWithAs } from '@/utilities/render';
import { UseFormRegisterReturn } from 'react-hook-form';

type Props<T extends { id: number; name: string } | {}> = {
  title: string;
  options: T[];
  getValue?(item: T): string | number;
  getTitle?(item: T): string | number;

  className?: string;
} & Partial<UseFormRegisterReturn>;

const FilterList = forwardRefWithAs(function FilterList<T extends { id: number; name: number } | {}>(
  {
    onChange,
    onBlur,
    name,
    min,
    max,
    maxLength,
    minLength,
    pattern,
    required,
    disabled,

    className,
    options,
    title,
    getTitle = (item) => (item as any).name,
    getValue = (item: any) => item.name
  }: Props<T>,
  ref: any
) {
  const watchMore = useBoolean(options.length < 9);
  return (
    <div className={className}>
      <p className="font-bold">{title}</p>
      <ul className="flex flex-wrap gap-2">
        {(watchMore.value ? options : options.slice(0, 8)).map((item, i) => {
          const value = getValue(item);
          return (
            <li key={value}>
              <label>
                <input
                  type="checkbox"
                  className="peer sr-only"
                  value={value}
                  {...{ onChange, onBlur, name, min, max, maxLength, minLength, pattern, required, disabled }}
                  ref={ref}
                />
                <span className="btn-tertiary btn btn-sm border-none font-medium peer-checked:bg-red-600 peer-checked:text-neutral-0">
                  {getTitle(item)}
                </span>
              </label>
            </li>
          );
        })}
        <li>
          {!watchMore.value && (
            <button onClick={watchMore.setTrue} className="btn-ghost btn btn-sm">
              Xem thêm
            </button>
          )}
        </li>
      </ul>
    </div>
  );
});

export default FilterList;
