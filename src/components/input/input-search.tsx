import React, { ReactElement } from 'react';
import Svg from '../icon/svg';
import type { CustomProps } from '@/types/element-type';
import clsx from 'clsx';
import { forwardRefWithAs } from '@/utilities/render';

type Props = { onClear?(): void; forceShow?: boolean; theme?: 'light' | 'dark'; children?: ReactElement };

const InputSearchWithoutAction = forwardRefWithAs(function InputSearchWithoutAction(
  { className, onClear, forceShow: isFocus, theme = 'light', children, ...rest }: CustomProps<Props, 'input'>,
  ref: React.ForwardedRef<HTMLInputElement>
) {
  return (
    <label className={clsx('text-sm md:text-base relative flex rounded-full bg-neutral-100 xl:flex-1', className)}>
      <input
        id="search_bar"
        type="search"
        className={clsx(
          'peer xl:w-full bg-transparent md:pl-12 font-medium outline-none dark:placeholder:text-neutral-0/[.5] md:pr-0 truncate',
          isFocus ? 'w-full pr-12 pl-11' : 'w-0 pl-10'
        )}
        {...rest}
        ref={ref}
        data-theme={theme}
      />

      <div className="absolute inset-y-0 flex items-center pl-2.5 md:pl-3 xl:pl-4">
        <Svg src="/icons/bold/vector.svg" className="block w-5 md:h-6 h-5 md:w-6" />
      </div>
      <button
        type="button"
        onClick={onClear}
        className={clsx(
          'absolute inset-0 left-auto flex items-center pr-3',
          isFocus ? '!pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        )}
      >
        <Svg src="/icons/line/close.svg" className="block w-5 md:h-6 h-5 md:w-6" />
      </button>
      {children}
    </label>
  );
});

export default InputSearchWithoutAction;
