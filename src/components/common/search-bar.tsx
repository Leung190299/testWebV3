import useOnClickOutside from '@/hooks/useOnClickOutside';
import useBoolean from '@pit-ui/modules/hooks/useBoolean';
import useControlled from '@pit-ui/modules/hooks/useControlled';
import clsx from 'clsx';
import { useRef } from 'react';

import Svg from '../icon/svg';
import OTPInput from '../otpInput';

type Props = {
  children?: React.ReactNode | ((props: { focus?: boolean }) => React.ReactNode);
  value?: string;
  onChange?(v: string): void;
  onSearch?(v: string): void;
  placeholder?: string;
  classIcon?: string;
  classInput?: string;
  isOTP?: boolean;
};

const SearchBar = ({ children, value: valueProp, onChange, placeholder, onSearch, classIcon, classInput, isOTP = false }: Props) => {
  const [query, setQuery] = useControlled(valueProp, '', onChange);
  const focusInput = useBoolean(false);
  const ref = useRef<HTMLDivElement>(null);
  useOnClickOutside(ref, focusInput.setFalse);

  const handleSearch = () => {
    let newQuery = query.trim();
    let length = 7 - query.trim().length;
    if (newQuery.length <= 7) {
      for (let index = 0; index < length; index++) {
        newQuery += '*';

      }



    }

    onSearch?.(newQuery);
    focusInput.setFalse();
  };
  return (
    <div className="flex-1 flex flex-col">
      <div className="relative flex rounded-full bg-neutral-100 flex-1" ref={ref}>
        <div className={clsx(classIcon, 'p-4')}>
          <Svg src="/icons/bold/vector.svg" width={24} height={24} />
        </div>
        {typeof children === 'function' ? children({ focus: focusInput.value }) : children}
        {isOTP ? (
          <OTPInput
            value={query}
            onChange={setQuery}
            onSubmit={()=>handleSearch()}
            valueLength={7}
            containerStyle={'flex-1 truncate bg-transparent outline-none p-4 h-14  [&>*:nth-child(5)]:ml-4'}
            onFocus={focusInput.setTrue}
            inputStyle=" bg-transparent flex justify-center items-center text-md  w-8 h-6 outline-none font-bold   placeholder:leading-none placeholder-neutral-900 placeholder-opacity-100  placeholder:text-3xl   "
          />
        ) : (
          <input
            placeholder={placeholder}
            className={clsx(classInput, 'flex-1 truncate bg-transparent outline-none p-4 h-14  outline')}
            onFocus={focusInput.setTrue}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        )}
        {focusInput.value && (
          <div className="hidden xl:flex items-center gap-4">
            {query && (
              <button onClick={() => setQuery('')}>
                <Svg src="/icons/line/close.svg" className="inline h-5 w-5 cursor-pointer" />
              </button>
            )}
            <button className="btn-secondary btn btn-lg w-[8.5rem] rounded-full" onClick={handleSearch}>
              Tìm kiếm
            </button>
          </div>
        )}
      </div>

      {isOTP??<p className="text-center mt-2 font-bold">Điền vào dấu * chữ số mong muốn</p>}
    </div>
  );
};

export default SearchBar;
