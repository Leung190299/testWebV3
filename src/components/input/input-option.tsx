import useOnClickOutside from '@/hooks/useOnClickOutside';
import { clsx } from 'clsx';
import { DetailedHTMLProps, HTMLAttributes, useRef, useState } from 'react';
import Svg from '../icon/svg';

interface IOptionInput {
  label?: string;
  placeholder?: string;
  options: { id: number; name: string }[];
  buttonDown?: boolean;
  defaultValue?: string;
  readOnly?: boolean;
}

const OptionInput = ({
  label,
  placeholder,
  options,
  className,
  buttonDown = false,
  defaultValue = '',
  readOnly = true,
  ...props
}: IOptionInput & DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>) => {
  const [isFocus, setIsFocus] = useState<boolean>(false);
  const [query, setQuery] = useState(defaultValue);
  const ref = useRef<HTMLInputElement>(null);
  useOnClickOutside(ref, () => setIsFocus(false));

  return (
    <div className={clsx('relative flex rounded-lg bg-neutral-100 text-neutral-800', className)} ref={ref} {...props}>
      <div className="w-full flex flex-col px-4 py-2" onClick={() => setIsFocus(true)}>
        {label && <label className=" text-sm"> {label}</label>}
        <input
          readOnly={readOnly}
          placeholder={placeholder}
          className="bg-transparent font-medium outline-none"
          value={query || defaultValue}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      {buttonDown && (
        <div
          className="w-16 flex justify-center items-center hover:cursor-pointer max-md:hidden "
          onClick={() => {
            setQuery('');
            setIsFocus(true);
          }}
        >
          <Svg src="/icons/bold/down.svg" className="inline h-6 w-6" />
        </div>
      )}
      {isFocus && (
        <div className="absolute top-full mt-2 bg-neutral-0 w-full rounded-lg p-2 shadow-itel z-10 max-h-[352px] overflow-scroll">
          {options && options?.length > 0 ? (
            options?.map((item) => (
              <div
                key={item.name}
                className={clsx(
                  'hover:bg-neutral-100 hover:cursor-pointer p-4 rounded-lg truncate font-bold',
                  item.name === query && 'bg-neutral-100'
                )}
                onClick={() => {
                  setQuery(item.name);
                  setIsFocus(false);
                }}
              >
                {item.name}
              </div>
            ))
          ) : (
            <div className="hover:bg-neutral-100 hover:cursor-pointer p-4 rounded-lg truncate">Không tìm thấy !</div>
          )}
        </div>
      )}
    </div>
  );
};

export default OptionInput;
