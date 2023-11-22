import Routers from '@/routes/routers';
import clsx from 'clsx';
import _ from 'lodash';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import ButtonAppStore from '../button/ButtonAppStore';
import ButtonGooglePlay from '../button/ButtonGooglePlay';
import Svg from '../icon/svg';
import { showVietllot } from '../modal/modal-vietlot';

type Props = {
  className?: string;
  theme?: 'light' | 'dark';
};

const data: { id: string; title: string; navigations: { title: string; key?: string; url?: string }[] }[] = [
  {
    id: 'service',
    title: 'Dịch vụ di động',
    navigations: [
      { title: 'Chọn số - Mua sim', url: Routers.SIM },
      { title: 'Nạp thẻ', url: Routers.RECHARGE },
      { title: 'Gói cước', url: Routers.DATA }
    ]
  },
  {
    id: 'iwow',
    title: 'Ưu đãi iWow',
    navigations: [
      { title: 'Ưu đãi iTel Club', url: Routers.PROMOTION_ICLUB }
      // { title: 'Săn quà iZui', url: Routers.PROMOTION_IZUI },
      // { title: 'Chương trình hot', url: Routers.PROMOTION_HOT }
    ]
  },
  {
    id: 'imall',
    title: 'Mua sắm',
    navigations: [{ title: 'Điện thoại - Thiết bị', url: Routers.IMALL_DEVICE }, { title: 'Xổ Số Vietlot' }]
  },
  {
    id: 'other',
    title: 'Khác',
    navigations: [
      { title: 'Về iTel', url: Routers.ABOUT },
      { title: 'Tin tức', url: Routers.NEWS },
      { title: 'Tuyển dụng', url: Routers.RECRUITMENT }
    ]
  },
  {
    id: 'other_service',
    title: 'Dịch vụ số',
    navigations: [
      { title: 'iTel Travel', url: Routers.ITRAVEL_SERVIVE },
      { title: 'iTel Finance', url: Routers.IFINANCE_SERVIVE },
      { title: 'iTel Health', url: Routers.IHEALTH_SERVIVE }
    ]
  },

  {
    id: 'support',
    title: 'Hỗ trợ',
    navigations: [
      { title: 'Theo dõi đơn hàng', url: Routers.TRACKING_ORDER },
      { title: 'Kích hoạt sim', url: Routers.ACTIVATE_SIM },
      { title: 'Mở khóa sim', url: Routers.UNLOCK_SIMS },
      // { title: 'Đổi/Cấp lại sim/ eSim', url: Routers.CHANGE_SIM },
      { title: 'Tải ứng dụng My iTel', url: Routers.DOWNLOAD_ITEL }
    ]
  },
  {
    id: 'turtorial',
    title: 'Hướng dẫn',
    navigations: [
      { title: 'Hướng dẫn người dùng', url: Routers.SUPPORT_TUTORIAL },
      { title: 'Câu hỏi thường gặp', url: Routers.QUESSTION_TUTORIAL },
      { title: 'Liên hệ', url: Routers.CONTACT_TUTORIAL },
      { title: 'Danh sách đại lý', url: '/' },
      { title: 'Phản hồi - Góp ý', url: Routers.FEEDBACK_TUTORIAL }
    ]
  },
  {
    id: 'qtr',
    title: 'Quy trình',
    navigations: [
      { title: 'Mua bán', url: '/thong-tin/mua-ban' },
      { title: 'Điểm bán hàng lưu động', url: '/thong-tin/diem-ban-hang-luu-dong' },
      { title: 'Điểm uỷ quyền', url: '/thong-tin/diem-uy-quyen' },
      { title: 'Quản lý chất lượng dịch vụ', url: '/thong-tin/bao-cao-chat-luong-dich-vu' },
      { title: 'Giấy phép cung cấp dịch vụ viễn thông', url: '/thong-tin/giay-phep-cung-cap-dich-vu-vien-thong' }
    ]
  }
  // {
  //   id: 'entertainment',
  //   title: 'Giải trí',
  //   navigations: [{ title: 'iTel Film' }, { title: 'iTel Game' }]
  // }
];

const foo = [
  { key: 'terms', title: 'Điều khoản bảo mật', link: 'dieu-khoan-bao-mat' },
  { key: 'terms_of_use', title: 'Điều khoản sử dụng', link: 'dieu-khoan-su-dung' },
  { key: 'privacy_policy', title: 'Quyền riêng tư', link: 'quyen-rieng-tu' }
];

const FooterDefault = ({ className, theme = 'light' }: Props) => {
  return (
    <footer className={className} data-theme={theme}>
      <div className="container pt-10 xl:pt-20 bg-neutral-50 md:bg-neutral-0">
        <div className="flex flex-col gap-y-10 xl:flex-row">
          <div className="order-3 mb-6 flex flex-wrap justify-between text-subtle-content md:mb-0 md:mr-24 xl:order-2 xl:max-w-xs xl:flex-col">
            <div className="mb-4 w-full">
              <Link href="/" className="mb-4 block h-12">
                <h2>
                  <Svg
                    src="/logo/logo-color.svg"
                    className="h-12 w-28 text-red-500 dark:text-neutral-0"
                    preserveAspectRatio="xMinYMid meet"
                  />
                </h2>
              </Link>
              <p>
                Website chính thức của mạng di động iTel.
                <br />
                Cơ quan chủ quản: Công ty Cổ phần Viễn thông Di động Đông Dương Telecom.
              </p>
              <p className="mt-4">
                Mã số doanh nghiệp: 0108115302 do Sở Kế hoạch và Đầu tư Thành phố Hà Nội cấp lần đầu ngày 03/01/2018, sửa đổi lần thứ 4 ngày
                03/09/2020.
                <br />
                Chịu trách nhiệm nội dung: Ông Nguyễn Hoàng Hải
                <br />
                Địa chỉ: B018, Tháp The Manor, Mễ Trì, Q. Nam Từ Liêm, Hà Nội
              </p>
              <a href="tel:0877087087" className="mt-4 flex items-center text-sm font-bold text-base-content">
                <Svg src="/icons/bold/hotline.svg" className="mr-2 inline-block h-5 w-5" />
                0877 087 087
              </a>
            </div>
            <div className="w-full md:w-auto xl:mt-12 xl:w-full lg:mt-12 md:mt-12">
              <div>Tải ứng dụng My iTel</div>
              <ul className="mt-4 flex gap-4">
                <li>
                  <Link href="https://apps.apple.com/us/app/my-itel/id1610306087">
                    <ButtonAppStore className="btn max-md:h-10 border-none bg-transparent p-0 text-neutral-0" theme={theme} />
                  </Link>
                </li>
                <li>
                  <Link href="https://play.google.com/store/apps/details?id=itelecom.vn.myitel">
                    <ButtonGooglePlay className="btn max-md:h-10 border-none bg-transparent p-0 text-neutral-0" theme={theme} />
                  </Link>
                </li>
              </ul>
            </div>
            <div className="lg:mt-4 mt-4 w-full md:w-auto xl:w-full md:mt-12">
              <div>Đi cùng iTel</div>
              <ul className="mt-4 flex gap-6">
                <li>
                  <Link href="https://m.me/itel.fan">
                    <Svg className="h-8 w-8 dark:text-base-content" src="/icons/bold/facebook.svg" />
                  </Link>
                </li>
                <li>
                  <Link href="https://www.instagram.com/itel.vn/">
                    <Svg className="h-8 w-8 dark:text-base-content" src="/icons/bold/instagram.svg" />
                  </Link>
                </li>
                {/* <li>
                  <Link href="/">
                    <Svg className="h-8 w-8 dark:text-base-content" src="/icons/bold/zalo.svg" />
                  </Link>
                </li> */}
              </ul>
            </div>
            <div className="mt-4 w-full">
              <img src="/images/registed.png" alt="Đã đăng ký" className="h-10" />
            </div>
          </div>
          <div className="order-2 hidden flex-1 grid-cols-1 md:grid-cols-4 md:gap-x-6 md:gap-y-12 xl:grid">
            {data.map(({ id, navigations, title }, index) => {
              return (
                <div key={id} className={[5, 6, 7].includes(index) ? 'row-span-2' : undefined}>
                  <button className="flex w-full items-center justify-between dark:text-neutral-0 border-neutral-200 p-4 max-md:border-b md:mb-4 md:p-0">
                    <h2 role="button" className="select-none font-bold">
                      {title}
                    </h2>
                  </button>
                  <ul className="overflow-hidden text-sm font-medium text-subtle-content transition-all duration-500 ease-out md:block">
                    {navigations.map(({ title, url }, index) => {
                      return (
                        <li key={index} className="p-4 md:p-0 md:pb-4">
                          {_.isEmpty(url) ? (
                            <button onClick={() => showVietllot()} className="hover:underline">
                              {title}
                            </button>
                          ) : (
                            <Link href={url || '/'} className="hover:underline">
                              {title}
                            </Link>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
        <hr className="mt-6 border-neutral-200 dark:border-neutral-500 sm:mx-auto xl:mt-14" />
        <div className="sub-footer">
          <ul className="dark:text-gray-400 mt-3 hidden flex-wrap items-center text-sm font-medium sm:mt-0 xl:flex">
            {foo.map(({ key, title, link }, index) => {
              return (
                <li key={key} className="flex items-center">
                  {index ? <span className="mr-4 inline-block h-1 w-1 rounded-full bg-neutral-500 md:mr-3" /> : null}
                  <Link href={`/thong-tin/${link}`} className="mr-4 hover:underline md:mr-3 ">
                    {title}
                  </Link>
                </li>
              );
            })}
          </ul>
          <span className="dark:text-gray-400 text-sm sm:text-center xl:mt-0">
            © Copyright 2022{' '}
            <a href="#" className="hover:underline">
              iTel
            </a>
            . All Rights Reserved.
          </span>
        </div>
      </div>
    </footer>
  );
};

type Status = 'enter' | 'entering' | 'entered' | 'exit' | 'exiting' | 'exited';
const Accordion = ({
  children,
  isActive,
  title,
  onClick,
  className
}: {
  children: React.ReactNode;
  isActive?: boolean;
  title: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
}) => {
  const ref = useRef<HTMLUListElement>(null);

  const [height, setHeight] = useState<number | undefined>();

  const _height = useRef(0);

  const [status, setStatus] = useState<Status>(isActive ? 'entered' : 'exited');
  useEffect(() => {
    const s = isActive ? 'enter' : 'exit';
    !status.includes(s) && updateStatus(isActive ? 'enter' : 'exit');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isActive]);

  useEffect(() => {
    if (!ref.current) return;
    if (status === 'enter') {
      setHeight(0);
      _height.current = getElementHeight();
      updateStatus('entering');
    } else if (status === 'entering') {
      requestAnimationFrame(() => {
        setHeight(_height.current);
      });
    } else if (status === 'exit') {
      updateStatus('exiting');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  const updateStatus = (nextStatus: Status) => {
    if (nextStatus !== null) {
      if (nextStatus === 'enter') {
        setStatus('enter');
      } else if (nextStatus === 'entering') {
        setStatus('entering');
      } else if (nextStatus === 'entered') {
        setHeight(undefined);
        setStatus('entered');
      } else if (nextStatus === 'exit') {
        _height.current = getElementHeight();
        setHeight(_height.current);
        setStatus('exit');
      } else if (nextStatus === 'exiting') {
        requestAnimationFrame(() => {
          setHeight(0);
          setStatus('exiting');
        });
      } else if (nextStatus === 'exited') {
        setHeight(undefined);
        setStatus('exited');
      }
    }
  };

  const getElementHeight = () => {
    const el = ref.current!;
    const computedStyle = getComputedStyle(el);
    const height = el.offsetHeight;
    const marginTop = parseFloat(computedStyle.marginTop);
    const marginBottom = parseFloat(computedStyle.marginBottom);
    return height + marginTop + marginBottom;
  };

  const onTransitionEnd: React.TransitionEventHandler<HTMLUListElement> = () => {
    if (status === 'entering') updateStatus('entered');
    else if (status === 'exiting') updateStatus('exited');
  };

  const _onClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    if (status.includes('ing')) return;
    onClick?.(e);
    if (e.defaultPrevented) return;
    const isEnter = status.includes('enter');
    if (isEnter) hide();
    else show();
  };

  const show = () => {
    updateStatus('enter');
  };
  const hide = () => {
    updateStatus('exit');
  };

  return (
    <div className={className}>
      <button onClick={_onClick} className="flex w-full items-center justify-between border-neutral-200 p-4 max-md:border-b md:mb-4 md:p-0">
        <h2 role="button" className="select-none font-bold">
          {title}
        </h2>
        <Svg src="/icons/bold/down.svg" className="h-8 w-8 md:hidden" />
      </button>
      <ul
        ref={ref}
        className={clsx('overflow-hidden text-sm font-medium text-subtle-content transition-all duration-500 ease-out md:block', {
          hidden: status === 'exited'
        })}
        onTransitionEnd={onTransitionEnd}
        style={{ height }}
      >
        {children}
      </ul>
    </div>
  );
};

export default FooterDefault;
