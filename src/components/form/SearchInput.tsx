import { ChangeEvent, useRef, useState } from 'react';
import Svg from '../icon/svg';
import Link from 'next/link';
import useOnClickOutside from '@/hooks/useOnClickOutside';

type SearchInputProps = {
  isBackgroundWhite?: boolean;
  size?: 'small' | 'medium';
};

const SearchInput = ({ isBackgroundWhite, size = 'medium' }: SearchInputProps) => {
  const [isFocus, setIsFocus] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>('');
  const ref = useRef<HTMLInputElement>(null);
  useOnClickOutside(ref, () => setIsFocus(false));

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.currentTarget.value);
  };

  return (
    <div className="relative flex flex-1" ref={ref} onClick={() => setIsFocus(true)}>
      <div className="absolute inset-y-0 left-0">
        <Svg src="/icons/bold/vector.svg" className="absolute bottom-[30%] left-4 inline h-6 w-6" />
        <div className="absolute left-14 flex h-full w-16 items-center justify-center bg-neutral-50 px-2">
          <span
            className={`${
              size === 'small' ? 'text-[1.125rem] leading-[1.625rem]' : 'md:text-[1.125rem] md:leading-[1.625rem] xl:text-xl'
            } font-bold text-neutral-800`}
          >
            087
          </span>
        </div>
      </div>
      <input
        placeholder="Tìm Sim theo nhu cầu của bạn (*222, 789*, 56,...)"
        className={`w-full rounded-full ${
          isBackgroundWhite ? 'bg-neutral-0' : 'bg-neutral-100'
        } py-4  pl-32 text-base font-medium text-neutral-800 placeholder:font-medium focus:outline-none ${
          isFocus ? 'placeholder:line-clamp-1 placeholder:w-[17rem]' : ''
        }`}
        onChange={handleChangeInput}
        value={searchValue}
        onFocus={() => setIsFocus(true)}
      />
      {isFocus && (
        <div className="absolute right-0 flex items-center gap-4">
          {searchValue.length > 0 && (
            <button onClick={() => setSearchValue('')}>
              <Svg src="/icons/line/close.svg" className="inline h-5 w-5 cursor-pointer" />
            </button>
          )}
          <button className={`btn-secondary btn btn-lg w-[8.5rem] rounded-full`}>Tìm kiếm</button>
        </div>
      )}
      {isFocus && (
        <div className="shadow-itel absolute bottom-auto left-0 z-10 mt-16 w-full rounded-2xl bg-neutral-0 p-6 text-neutral-800">
          <div className="mb-4 text-xl font-bold">Hướng dẫn tìm số</div>
          <div className="text-base font-medium">
            Tìm theo <span className="font-bold">ngày sinh</span>, chữ số <span className="font-bold">yêu thích</span>:{' '}
          </div>
          {/* <ul className="mb-5 list-inside list-disc text-sm">
            <li>
              Để tìm Sim kết thúc bằng 686, nhập <span className="rounded bg-neutral-100 px-1 py-0.5 text-base font-bold">*686</span>
            </li>
            <li>
              Để tìm Sim có chữ số 22 ở vị trí bất kỳ, nhập{' '}
              <span className="rounded bg-neutral-100 px-1 py-0.5 text-base font-bold">22</span>
            </li>
          </ul> */}
          <div className="mb-4 text-base font-medium"> Điền vào dấu * bạn mong muốn</div>
          <div className="mb-4 text-base font-medium">Bạn có thể kết hợp cùng các bộ lọc để tìm kiếm chính xác hơn</div>
          <div className="text-base font-medium">
            Bạn có thể tìm số theo <span className="font-bold text-dark-blue">thần số học, phong thủy</span>{' '}
            <Link href="#">
              <span className="font-bold text-red-500">tại đây</span>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchInput;
