import { locales } from '@/configs/locales';
import { useGlobalContext } from '@/context/global';
import useIsSticky from '@/hooks/useIsSticky';
import Routers from '@/routes/routers';
import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useMemo, useRef } from 'react';
import ButtonCart from '../button/button-cart';
import ButtonMenu from '../button/button-menu';
import Svg from '../icon/svg';

type Props = {
  className?: string;
  title?: string;

  type?: 'sticky' | 'fixed' | 'static';
  theme?: 'light' | 'dark';
  mode?: 'close' | 'back';

  withCart?: boolean;
  withMenu?: boolean;
  withSearch?: boolean;

  onClose?(): void;
  classNameTitle?: string;
  children?: React.ReactNode;
};

const HeaderWebDefault = (props: Props) => {
  const {
    title,
    type = 'sticky',
    theme = 'light',
    mode = 'back',
    withCart,
    withMenu,
    withSearch,
    classNameTitle = '',
    onClose = () => void 0,
    children
  } = props;
  const router = useRouter();
  const { menu, search } = useGlobalContext();
  const ref = useRef<HTMLHRElement>(null);
  const stickyStatus = useIsSticky(ref, {});

  const onGoBack = menu.value ? menu.setFalse : mode === 'back' ? router.back : onClose;

  const isSticky = type === 'sticky' || stickyStatus;

  const currentLocale = useMemo(() => {
    return router.locale ? locales.find((l) => l.locale === router.locale) : locales[0];
  }, [router.locale]);

  return (
    <>
      {type === 'fixed' ? <hr className="border-none absolute w-full h-px pointer-events-none" ref={ref}></hr> : null}
      <nav className={clsx(type, 'md:hidden w-full top-0 z-30')}>
        {!menu.value ? (
          <div className="relative">
            {/* Background */}
            <div
              className={clsx(
                isSticky ? 'bg-base-100 text-base-content' : 'bg-transparent text-base-content transition-default',
                'absolute inset-0'
              )}
            />
            <div className="relative container pl-2 flex items-center py-3">
              <button
                type="button"
                className={clsx(
                  'btn btn-sm btn-circle btn-tertiary transition-default',
                  isSticky ? 'text-base-content bg-transparent border-transparent' : 'text-base-content'
                )}
                onClick={onGoBack}
              >
                <Svg src={mode === 'back' ? '/icons/line/arrow-left.svg' : '/icons/line/close.svg'} width={24} height={24} />
              </button>
              <h2
                className={clsx(
                  isSticky ? 'text-base-content' : 'text-transparent pointer-events-none',
                  'transition-colors flex-1 text-[1.125rem] select-none truncate line-clamp-1',
                  classNameTitle
                )}
              >
                <b>{title}</b>
              </h2>
              <div className="ml-2 flex gap-3">
                {withSearch && <ButtonSearch onClick={search.setTrue} />}
                {withCart && <ButtonCart />}
                {withMenu && <ButtonMenu />}
              </div>
            </div>
            {children}
          </div>
        ) : (
          <div className="container relative bg-neutral-0 py-3">
            <div className="flex">
              <div className="flex-1 flex items-center">
                <Link href={Routers.HOME}>
                  <Svg src="/logo/logo-color.svg" width={78} height={32} className="text-red-500 dark:text-neutral-0" />
                </Link>
              </div>
              <div className="flex items-center gap-x-3">
                <Link href={router.asPath} locale={router.locale === 'vi' ? 'en' : 'vi'} className="btn-sm btn-tertiary btn rounded-full">
                  {currentLocale?.short}
                </Link>
                <ButtonCart />
                <ButtonMenu />
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

type ButtonProps = { onClick?(): void };

const ButtonSearch = (props: ButtonProps) => {
  return (
    <button className={clsx('btn-tertiary btn btn-sm btn-circle')} {...props}>
      <Svg src="/icons/bold/vector.svg" width={20} height={20} />
    </button>
  );
};
export default HeaderWebDefault;
