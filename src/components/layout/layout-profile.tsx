import { INavgationList } from '@/components/header';
import HeaderWebDefault from '@/components/header/header-web-default';
import Svg from '@/components/icon/svg';
import Routers from '@/routes';
import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { PropsWithChildren } from 'react';
import LayoutDefault from './layout-default';

type DefaultProps = {
  footerClassName?: string;
  titleMobile?: string;
};
type Props = PropsWithChildren<DefaultProps & Omit<JSX.IntrinsicElements['main'], keyof DefaultProps>>;

const navigationsLeft: INavgationList = [
  {
    id: '43434422',
    title: 'Thông tin tài khoản',
    icon: '/icons/bold/account.svg',
    href: Routers.PROFILE_INFORMATION
  },
  // {
  //   id: '12323342',
  //   title: 'Thông báo',
  //   icon: '/icons/bold/notification.svg',
  //   href: Routers.PROFILE_NOTIFICATION
  // },
  {
    id: '12323321',
    title: 'Đơn hàng của tôi',
    icon: '/icons/bold/cart-bold.svg',
    href: Routers.PROFILE_MY_ORDER
  },
  {
    id: '123232182',
    title: 'Hạng thành viên',
    icon: '/icons/bold/membership.svg',
    href: Routers.PROFILE_RANK
  },
  {
    id: '1232321923',
    title: 'Ưu đãi của tôi',
    icon: '/icons/bold/iclub.svg',
    href: Routers.PROFILE_DISCOUNT
  },
  // {
  //   id: '1232321259',
  //   title: 'Yêu thích',
  //   icon: '/icons/bold/favorite-1.svg',
  //   href: Routers.PROFILE_FAVOURITE
  // },
  {
    id: '1232321250',
    title: 'Lịch sử hoạt động',
    icon: '/icons/bold/history.svg',
    href: Routers.PROFILE_HISTORY
  }
];

const LayoutProfile = ({ children, footerClassName, titleMobile, ...rest }: Props) => {
  const router = useRouter();
  const currentRoute = router.pathname;
  return (
    <LayoutDefault footerClassName={footerClassName} {...rest}>
      <HeaderWebDefault title={titleMobile} withMenu withSearch />
      <section className="bg-neutral-100">
        <div className="md:container flex w-full gap-x-6 md:pb-10 md:pt-10 pt-2">
          <div className="hidden w-[18.75rem] flex-shrink-0 xl:block">
            <ul className="menu menu-left">
              {navigationsLeft.map(({ id, icon, title, href }) => (
                <li key={id}>
                  <Link
                    href={href}
                    className={clsx(currentRoute === href ? `bg-base-100 active-router` : ``, 'transition-default gap-3 rounded-md')}
                  >
                    {icon ? (
                      <div className={clsx(currentRoute === href ? '!bg-neutral-0' : '', 'menu-icon flex items-center justify-center')}>
                        <Svg src={icon} className="h-8 w-8" />
                      </div>
                    ) : null}
                    <div className="flex-1 flex flex-row justify-between">
                      <div className="font-bold">{title}</div>
                      {href === Routers.PROFILE_NOTIFICATION && (
                        <div className="rounded-full flex justify-center items-center bg-primary w-[20px] h-[20px] text-neutral-0 text-xs">
                          6
                        </div>
                      )}
                    </div>
                    <div className="menu-icon-arrow">
                      {/*<Svg src="/icons/line/arrow-right.svg" className="inline h-6 w-6 text-red-500" />*/}
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="min-w-0 flex-1">{children}</div>
        </div>
      </section>
    </LayoutDefault>
  );
};

export default LayoutProfile;
