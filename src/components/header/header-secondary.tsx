import { useGlobalContext } from '@/context/global';
import clsx from 'clsx';
import Link from 'next/link';
import { INavgationList } from '.';
import Svg from '../icon/svg';

import { useRouter } from 'next/router';
import ButtonAuthHeader from '../button/button-auth-header';
import ButtonCart from '../button/button-cart';
import ButtonMenu from '../button/button-menu';
import ButtonSearch from '../button/button-search';

type Props = {
  logo: string;
  href: string;

  isHomePage?: boolean;
  children?: React.ReactNode;
  navigations: INavgationList;
  withCart?: boolean;
  withAuth?: boolean;
  withMenu?: boolean;
  onGoback?(): void;
};
const HeaderSecondary = ({
  logo,
  href,
  isHomePage,
  children,
  navigations,
  onGoback,
  withAuth,
  withCart,
  withMenu,
  ...rest
}: Props & JSX.IntrinsicElements['nav']) => {
  const { search } = useGlobalContext();
  return (
    <nav className={clsx(isHomePage ? 'sticky' : search.value ? 'fixed' : 'max-md:hidden', 'md:sticky top-0 z-40 w-full')} {...rest}>
      <div className="relative border-b border-neutral-200 bg-neutral-0 dark:bg-neutral-800 dark:border-transparent">
        <div className="container">
          <div className="flex items-center py-3 xl:py-0 max-xl:relative">
            {/* <div className={clsx('xl:left-10 items-center md:absolute xl:flex xl:h-full', search.value ? 'hidden' : 'flex')}>
              <Link href={Routers.HOME} className="my-auto">
                <Svg src="/logo/logo-color.svg" className="h-6 w-[3.75rem] md:w-[4.875rem] md:h-8 text-red-500 dark:text-neutral-0" />
              </Link>
            </div> */}
            <div className={clsx(search.value ? 'max-md:hidden' : '', 'flex items-center mx-auto md:h-12')}>
              <Link href={href}>
                <Svg src={logo} className="h-6 w-[4.75rem] md:w-[200px] md:h-12 text-red-500 dark:text-neutral-0" />
              </Link>
            </div>
            <div className={search.value ? '-ml-2 mr-2 md:hidden' : 'hidden'}>
              <button type="button" className="btn btn-sm btn-circle btn-ghost transition-default" onClick={onGoback}>
                <Svg src="/icons/line/arrow-left.svg" width={24} height={24} />
              </button>
            </div>

            <div className="ml-10 hidden xl:block">
              <NavigationList navigations={navigations} />
            </div>

            <div className={clsx(search.value ? 'flex-1' : '', 'ml-1 md:ml-6 xl:ml-10 xl:flex-1')}>{children}</div>
            <div
              className={clsx(search.value ? 'max-xl:hidden' : '', 'xl:ml-10 md:absolute xl:relative flex items-center gap-x-3 right-0')}
            >
              <ButtonSearch className="xl:hidden" data-theme={rest['data-theme']} />
              {withCart && <ButtonCart data-theme={rest['data-theme']} />}
              {withAuth && <ButtonAuthHeader />}
              {withMenu && <ButtonMenu />}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export const NavigationList = ({ navigations }: { navigations: INavgationList }) => {
  const router = useRouter();
  return (
    <ul className="items-baseline space-x-10 whitespace-nowrap text-sm font-bold flex">
      {navigations.map(({ title, href: url, onClick }, index) => {
        const isActive = router.asPath.includes(url);
        return (
          <li key={index} className="group relative py-[1.625rem]">
            {isActive && <span className="absolute -bottom-px h-[3px] w-full bg-red-500"></span>}
            <Link href={url} className="hover:text-red-500" onClick={onClick}>
              {title}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};
export default HeaderSecondary;
