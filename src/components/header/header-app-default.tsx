import { useModal } from '@/libs/modal';
import useIsSticky from '@/hooks/useIsSticky';
import clsx from 'clsx';
import React, { useRef } from 'react';
import Svg from '../icon/svg';
import { useRouter } from 'next/router';

type Props = {
  type?: 'sticky' | 'fixed' | 'static';
  theme?: 'light' | 'dark';
  mode?: 'close' | 'back';

  withoutBorder?: boolean;
  isFull?: boolean;

  title?: string;
  children?: React.ReactNode;
  onClose?(): void;

  buttonStyle?: 'light' | 'dark';
};

/**
 *
 * @param param0
 * @returns
 */
const HeaderAppDefault = ({
  title,
  type = 'sticky',
  theme = 'light',
  mode = 'back',
  buttonStyle = 'light',
  withoutBorder,
  children,
  isFull,
  onClose
}: Props) => {
  const { close } = useModal();
  const ref = useRef<HTMLHRElement>(null);
  const isSticky = useIsSticky(ref, {});
  const router = useRouter();

  const handleBack = onClose ? onClose : mode == 'back' ? router.back : close;

  const isHeaderSticky = type === 'sticky' || isSticky;
  return (
    <>
      <hr className="border-none absolute w-full h-px pointer-events-none" ref={ref}></hr>
      <nav className={clsx(type, !isFull && 'md:hidden', 'w-full top-0 z-30 bg-transparent')} data-theme={theme}>
        <div className="relative flex items-center">
          <div
            className={clsx(
              isHeaderSticky ? 'border-neutral-200' : 'bg-transparent border-transparent pointer-events-none',
              withoutBorder ? 'border-b' : '',
              'transition-default w-full'
            )}
            data-theme={theme}
          >
            <div className="container h-16 flex items-center w-full">
              <div
                className={clsx(
                  type == 'fixed' ? (isSticky ? 'text-base-content' : 'text-transparent') : 'text-base-content',
                  'flex-1 flex justify-center text-[1.125rem] font-bold truncate px-16 overflow-hidden'
                )}
              >
                <h1 className="truncate max-w-xs">{title}</h1>
              </div>
            </div>
            {children}
          </div>
          <div
            className={clsx('absolute left-2 top-3 bg-transparent', isHeaderSticky ? '' : buttonStyle === 'light' ? 'text-neutral-0' : '')}
          >
            {mode === 'back' ? (
              <button type="button" className="center-by-grid btn-sm btn-circle" onClick={handleBack}>
                <Svg src="/icons/line/arrow-left.svg" width={24} height={24} />
              </button>
            ) : (
              <button
                type="button"
                className={clsx(
                  'center-by-grid btn-sm btn-circle text-base-content transition-default',
                  !isHeaderSticky && (theme === 'light' ? 'bg-neutral-100' : 'bg-neutral-600')
                )}
                onClick={handleBack}
              >
                <Svg src="/icons/line/close.svg" width={24} height={24} />
              </button>
            )}
          </div>

          <div className="absolute right-4 top-3">{/* Action on right */}</div>
        </div>
      </nav>
    </>
  );
};

export default HeaderAppDefault;
