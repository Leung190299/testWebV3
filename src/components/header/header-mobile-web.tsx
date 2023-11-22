import { locales } from '@/configs/locales';
import { useGlobalContext } from '@/context/global';
import useCartProduct from '@/hooks/useCartProduct';
import Routers from '@/routes/routers';
import type { CustomProps } from '@/types/element-type';
import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import Svg from '../icon/svg';

type Props = {
  title: string;
  goBack?: () => void;
};

/**
 *
 * @deprecated use HeaderWebDefault instead
 */
const HeaderMobileWeb = ({ title, className, goBack }: CustomProps<Props, 'nav'>) => {
  const router = useRouter();
  const { menu } = useGlobalContext();
  const { length } = useCartProduct();
  const currentLocale = useMemo(() => {
    return router.locale ? locales.find((l) => l.locale === router.locale) : locales[0];
  }, [router.locale]);
  const onGoBack = () => {
    if (goBack) goBack();
    else router.back();
  };

  return (
    <nav className={clsx(className, 'sticky md:hidden top-0 bg-neutral-0 py-3 z-50')}>
      <div className="container flex items-center gap-2">
        {menu.value ? (
          <div className="flex-1 flex items-center">
            <Link href={Routers.HOME}>
              <Svg src="/logo/logo-color.svg" width={78} height={32} className="text-red-500 dark:text-neutral-0" />
            </Link>
          </div>
        ) : (
          <div className="flex-1 flex items-center">
            <button type="button" onClick={onGoBack}>
              <Svg src="/icons/line/chevron-left.svg" width={24} height={24} />
            </button>
            <h2 className="flex-1 text-[1.125rem] capitalize line-clamp-1">
              <b>{title}</b>
            </h2>
          </div>
        )}
        <div className="flex gap-3">
          {menu.value ? (
            <>
              <Link href={router.asPath} locale={router.locale === 'vi' ? 'en' : 'vi'} className="btn-sm btn-tertiary btn rounded-full">
                {currentLocale?.short}
              </Link>
              <Link href={Routers.CART} className="btn-tertiary btn-sm btn btn-circle relative">
                {length != 0 && (
                  <span className="badge badge-sm badge-center absolute -right-0.5 -top-0.5 w-4 rounded-full bg-red-500 ring-1 ring-neutral-0">
                    <span>{length}</span>
                  </span>
                )}
                <Svg src="/icons/bold/cart.svg" width={20} height={20} />
              </Link>
            </>
          ) : (
            <button className="btn-tertiary btn btn-sm btn-circle">
              <Svg src="/icons/bold/vector.svg" width={20} height={20} />
            </button>
          )}
          <button className="btn-tertiary btn btn-sm btn-circle" onClick={menu.toggle}>
            <Svg src={menu.value ? '/icons/line/close.svg' : '/icons/line/menu.svg'} width={24} height={24} />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default HeaderMobileWeb;
