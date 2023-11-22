import clsx from 'clsx';
import Link from 'next/link';
import { Fragment, useMemo, useState } from 'react';

import { useGlobalContext } from '@/context/global';
import Routers from '@/routes/routers';
import { INavigationItem } from '.';
import Accordions from '../accordion/accordions';
import Avatar from '../avatar/avatar';
import Svg from '../icon/svg';
import ModalShared from '../modal/modal-shared';
import { NavigationItem } from './navigation-item';

type Props = {
  /**
   * @deprecated
   */
  isShow?: boolean;
  navigations: Array<Omit<INavigationItem, 'childs'> & { childs?: INavigationItem[] }>;
  className?: string;

  /**
   * @deprecated
   */
  onClose?(): void;
};
const OPTIONS: { title: string; href: string }[] = [
  {
    title: 'Về iTel',
    href: '/about'
  },
  {
    title: 'Tin tức',
    href: Routers.NEWS
  },
  {
    title: 'Tuyển dụng',
    href: Routers.RECRUITMENT
  },
  {
    title: 'Hợp tác',
    href: '/'
  },
  {
    title: 'Doanh nghiệp',
    href: '/'
  }
];

const HeaderNavigation = ({ navigations, className }: Props) => {
  const [navActiveId, setNavActiveId] = useState<string | number | undefined>(-1);
  const { menu, toggleModalAuth, user, status ,logout,info } = useGlobalContext();
  const KEY = 'profile';
  const isLoggedIn = status === 'authenticated';

  const profileNav = useMemo(
    () => [
      {
        title: 'Thông tin tài khoản',
        href: '/profile',
        icon: '/icons/bold/account.svg'
      },
      // {
      //   title: 'Thông báo',
      //   href: Routers.PROFILE_NOTIFICATION,
      //   icon: '/icons/bold/notification.svg',
      //   badge: 6
      // },
      {
        title: 'Đơn hàng của tôi',
        href: Routers.PROFILE_MY_ORDER,
        icon: '/icons/bold/cart.svg'
      },
      {
        title: 'Hạng thành viên',
        href: '/profile/rank',
        icon: '/icons/bold/membership.svg'
      },
      {
        title: 'Voucher của tôi',
        href: '/profile/discount',
        icon: '/icons/bold/iclub.svg'
      },
      // {
      //   title: 'Yêu thích',
      //   href: '/profile/favourite',
      //   icon: '/icons/bold/heart.svg'
      // },
      // {
      //   title: 'Lịch sử hoạt động',
      //   href: '/profile/history',
      //   icon: '/icons/bold/history.svg'
      // }
    ],
    []
  );

  return (
    <>
      <ModalShared open={menu.value}>
        <div className="fixed inset-0 z-20 bg-base-100"></div>
        <div className={clsx('fixed inset-0 z-20 overflow-auto', className)} data-theme="light">
          <div className="min-h-full px-4 md:px-8 md:text-2xl">
            <div className="w-full">
              {user && (
                <Accordions as="div" key="profile" isActive={KEY === navActiveId}>
                  <div className="flex w-full items-center justify-between border-b border-neutral-200">
                    <Link href={Routers.PROFILE_INFORMATION} className="block py-3.5 md:py-5">
                      <h2 role="button" className="select-none font-bold">
                        <div className="flex items-center">
                          <Avatar
                            alt={user.name!}
                            img={user.image || '/images/avatar.png'}
                            className="w-14 h-14 rounded-full bg-neutral-200"
                          />
                          <div className="name flex-1 pl-4">
                            <p className="text-xl	font-bold text-neutral-800">{info.fullName}</p>
                            <div className="flex flex-row items-center">
                              {/* <Svg src="/icons/others/rank-account.svg" className="w-6 h-6" /> */}
                              <p className="text-neutral-500 text-sm font-medium pl-2">{info.rankName}</p>
                            </div>
                          </div>
                        </div>
                      </h2>
                    </Link>
                    <Accordions.Button
                      className="flex-1 flex justify-end"
                      onClick={() => setNavActiveId((prev) => (prev === KEY ? -1 : KEY))}
                    >
                      {({ open }) => (
                        <Svg
                          src="/icons/line/chevron-down.svg"
                          className={clsx('transition-default h-5 w-5 duration-300 md:h-8 md:w-8', open ? '-rotate-180' : '')}
                        />
                      )}
                    </Accordions.Button>
                  </div>
                  <Accordions.Panel>
                    <ul className="menu w-full rounded-[1.25rem] bg-base-100">
                      {profileNav.map((item) => {
                        return (
                          <li key={item.title}>
                            <Link href={item.href} className="transition-default gap-3 rounded-md">
                              <div className="menu-icon flex items-center justify-center">
                                <Svg src={item.icon} className="h-8 w-8" />
                              </div>
                              <div className="flex-1 flex items-center gap-x-2">
                                <div className="font-bold">{item.title}</div>
                                {/* {item.badge && (
                                  <span className="badge badge-center bg-primary w-4 rounded-full">
                                    <span>{item.badge}</span>
                                  </span>
                                )} */}
                              </div>
                              <div className="menu-icon-arrow">
                                <Svg src="/icons/line/arrow-right.svg" className="inline h-6 w-6 text-red-500" />
                              </div>
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </Accordions.Panel>
                </Accordions>
              )}
              {navigations.map(({ href, title, id, childs }) =>
                childs?.length ? (
                  <Accordions as="div" key={id} isActive={id === navActiveId}>
                    <div className="flex w-full items-center justify-between border-b border-neutral-200">
                      <div onClick={() => setNavActiveId((prev) => (prev === id ? -1 : id))} className="block py-3.5 md:py-5">
                        <h2 role="button" className="select-none font-bold">
                          {title}
                        </h2>
                      </div>
                      <Accordions.Button
                        className="flex-1 flex justify-end"
                        onClick={() => setNavActiveId((prev) => (prev === id ? -1 : id))}
                      >
                        {({ open }) => (
                          <Svg
                            src="/icons/line/chevron-down.svg"
                            className={clsx('transition-default h-5 w-5 duration-300 md:h-8 md:w-8', open ? '-rotate-180' : '')}
                          />
                        )}
                      </Accordions.Button>
                    </div>
                    <Accordions.Panel>
                      <ul className="menu w-full rounded-[1.25rem] bg-base-100">
                        {childs.map((item) => {
                          return (
                            <Fragment key={item.title}>
                              <li>
                                <NavigationItem
                                  onClick={
                                    item.onClick
                                      ? (e) => {
                                          item.onClick!(e);
                                          menu.setFalse();
                                        }
                                      : undefined
                                  }
                                  href={item.href}
                                  title={item.title}
                                  description={item.description}
                                  icon={item.icon}
                                />
                              </li>
                              {item.childs ? (
                                <li className="menu-title">
                                  <ul className="menu-sub">
                                    {item.childs.map((item) => (
                                      <li key={item.title}>
                                        <NavigationItem
                                          href={item.href}
                                          title={item.title}
                                          description={item.description}
                                          icon={item.icon}
                                          className="menu-sub-item"
                                        />
                                      </li>
                                    ))}
                                  </ul>
                                </li>
                              ) : null}
                            </Fragment>
                          );
                        })}
                      </ul>
                    </Accordions.Panel>
                  </Accordions>
                ) : (
                  <div key={id} className="flex w-full items-center justify-between border-b border-neutral-200">
                    <Link href={href} onClick={menu.toggle} className="block py-3.5 md:py-5">
                      <h2 role="button" className="select-none font-bold">
                        {title}
                      </h2>
                    </Link>
                  </div>
                )
              )}

              <ul className="flex flex-row flex-wrap whitespace-nowrap py-2 md:hidden">
                {OPTIONS.map((v) => (
                  <li key={v.title} className="w-1/3">
                    <Link href={v.href} shallow className="block py-3">
                      {v.title}
                    </Link>
                  </li>
                ))}
              </ul>
              {!isLoggedIn && (
                <div onClick={() => toggleModalAuth()} className="btn-primary btn w-full rounded-full md:hidden">
                  Đăng nhập
                </div>
              )}
            </div>
            <div className="mx-auto py-4">
              <div className="flex flex-wrap items-center justify-center text-sm text-subtle-content">
                <div className="flex w-full items-center justify-center md:w-auto">
                  <Link href="/" className="mr-4 whitespace-nowrap py-2 hover:underline md:mr-3">
                    Điều khoản bảo mật
                  </Link>
                  <span className="mr-4 inline-block h-1 w-1 rounded-full bg-neutral-500 md:mr-3" />
                  <Link href="/" className="mr-4 whitespace-nowrap py-2 hover:underline md:mr-3">
                    Điều khoản sử dụng
                  </Link>
                </div>
                <span className="mr-4 hidden h-1 w-1 rounded-full bg-neutral-500 md:mr-3 md:inline-block" />
                <Link href="/" className="mr-4 py-2 hover:underline md:mr-3 ">
                  Quyền riêng tư
                </Link>
              </div>
            </div>
          </div>
        </div>
      </ModalShared>
    </>
  );
};

export default HeaderNavigation;
