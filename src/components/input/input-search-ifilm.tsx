import React, { ReactElement } from 'react';
import Svg from '../icon/svg';
import type { CustomProps } from '@/types/element-type';
import clsx from 'clsx';
import { forwardRefWithAs } from '@/utilities/render';

type Props = { onClear?(): void; forceShow?: boolean; theme?: 'light' | 'dark'; children?: ReactElement };

const InputSearchIfilm = forwardRefWithAs(function InputSearchWithoutAction(
  { className, onClear, forceShow: isFocus, theme = 'light', children, ...rest }: CustomProps<Props, 'input'>,
  ref: React.ForwardedRef<HTMLInputElement>
) {
  return (
    <label
      className={clsx(
        'text-sm md:text-base relative flex rounded-full bg-neutral-600 xl:flex-1',
        className,
        !isFocus && 'max-md:w-10 max-md:h-10'
      )}
    >
      <input
        id="search_bar"
        type="search"
        className={clsx(
          'peer xl:w-full bg-transparent md:pl-12 font-medium outline-none placeholder:text-neutral-400 md:pr-0 truncate text-neutral-0',
          isFocus ? 'w-full pr-12 pl-12' : 'w-0 md:pl-12 pl-10'
        )}
        {...rest}
        ref={ref}
      />

      <div
        className={`absolute btn btn-circle max-md:w-10 max-md:h-10 bg-neutral-600 text-neutral-0 ${
          isFocus ? 'max-md:inset-y-1' : 'inset-y-0'
        }  flex items-center`}
      >
        <Svg src="/icons/bold/vector.svg" className="block w-5 md:h-6 h-5 md:w-6 xl:text-neutral-300 text-neutral-0" />
      </div>
      <button
        type="button"
        onClick={onClear}
        className={clsx(
          'absolute inset-0 left-auto flex items-center pr-3',
          isFocus ? '!pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        )}
      >
        <Svg src="/icons/line/close.svg" className="block w-5 md:h-6 h-5 md:w-6 text-neutral-0" />
      </button>
      {children}
    </label>
  );
});

export default InputSearchIfilm;
