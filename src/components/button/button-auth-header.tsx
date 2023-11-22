import { useGlobalContext } from '@/context/global';
import Routers from '@/routes';
import Link from 'next/link';
import { Fragment, useMemo } from 'react';
import Avatar from '../avatar/avatar';

type Props = {};

const ButtonAuthHeader = (props: Props) => {
  const { status, toggleModalAuth, user, logout } = useGlobalContext();
  const isLoggedIn = status === 'authenticated' && !!user;
  const numberNotification = 6;
  const navigationsLeft: any[] = useMemo(
    () => [
      {
        id: '1',
        title: 'Thông tin tài khoản',
        icon: '/icons/bold/account.svg',
        href: Routers.PROFILE_INFORMATION
      },
      // {
      //   id: '2',
      //   title: 'Thông báo',
      //   icon: '/icons/bold/notification.svg',
      //   href: Routers.PROFILE_NOTIFICATION,
      //   desc: numberNotification
      // },
      // {
      //   id: '3',
      //   title: 'Đơn hàng của tôi',
      //   icon: '/icons/bold/cart-bold.svg',
      //   href: Routers.PROFILE_MY_ORDER
      // },
      // {
      //   id: '4',
      //   title: 'Hạng thành viên',
      //   icon: '/icons/bold/membership.svg',
      //   href: Routers.PROFILE_RANK
      // },
      {
        id: '5',
        title: 'Đăng xuất',
        icon: '/icons/bold/membership.svg',
        onClick: logout
      }
    ],
    [logout]
  );

  return isLoggedIn ? (
    <div className="group relative max-md:hidden">
      <button type="button" className="flex">
        <Avatar
          alt="Avatar"
          img={user.image || '/images/avatar.png'}
          className="h-10 w-10 md:h-12 md:w-12 rounded-full bg-neutral-200  "
          noti={undefined}
        />
      </button>
      {navigationsLeft?.length ? (
        <div className=" right-0 transition-default pointer-events-none absolute w-max max-w-md rounded-xl opacity-0 shadow-itel group-hover:pointer-events-auto group-hover:opacity-100">
          <ul className="menu w-full rounded-[1.25rem] bg-base-100 p-4">
            {navigationsLeft.map(({ title, desc, ...item }) => {
              const Element = item.onClick ? 'button' : Link;
              return (
                <Fragment key={item.id}>
                  <li>
                    <Element {...item} className="font-bold justify-between">
                      {title}

                      {desc && (
                        <span className="badge badge-center w-4 rounded-full bg-red-500">
                          <span>{desc}</span>
                        </span>
                      )}
                    </Element>
                  </li>
                </Fragment>
              );
            })}
          </ul>
        </div>
      ) : null}
    </div>
  ) : (
    <button
      type="button"
      className="btn-sm md:btn-md transition-default btn-primary btn rounded-full max-md:hidden"
      onClick={() => toggleModalAuth()}
      data-theme="light"
    >
      Đăng nhập
    </button>
  );
};

export default ButtonAuthHeader;
