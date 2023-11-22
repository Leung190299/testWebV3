// import { useTranslation } from '@/libs/i18n';
import { useTranslation } from '@/libs/i18n';
import Link from 'next/link';
import { Fragment, PropsWithChildren, useEffect, useMemo, useRef, useState } from 'react';

import clsx from 'clsx';
import { useRouter } from 'next/router';

import { locales } from '@/configs/locales';
import useOnClickOutside from '@/hooks/useOnClickOutside';
import Routers from '@/routes';
import useBoolean from '@pit-ui/modules/hooks/useBoolean';

import { useGlobalContext } from '@/context/global';
import useMediaQuery, { MediaScreen } from '@/hooks/useMediaQuery';
import useSimAction from '@/store/cart/hooks/sim';
import { Data, Model } from '@/types/model';
import { stringToASCII } from '@/utilities/string';
import { INavgationList } from '.';
import { NavigationItem } from './navigation-item';

import ButtonAuthHeader from '@/components/button/button-auth-header';
import CardProduct from '@/components/card/card-product';
import Svg from '@/components/icon/svg';
import SimRowAppItem from '@/components/sim/sim-row-app';
import SimTable from '@/components/sim/table';
import Tooltip from '@/components/tooltip/tooltip';

import { paramsSimSearch, simTypes } from '@/constants/sim.constants';
import { INavigationItem } from '.';
import ButtonCart from '../button/button-cart';
import ButtonMenu from '../button/button-menu';
import ButtonSearch from '../button/button-search';
import CardCoupon from '../card/card-coupon';
import CardProductApp from '../card/card-product-app';
import InputSearchProvider, { InputSearch, useInputSearch } from '../input/input-search-header';
import ModalShared from '../modal/modal-shared';
import { useDataModal } from '../pages/pack-data/hooks';
import ScrollList from '../scroll/scroll-list';

import { useLoading } from '@/hooks/useLoading';
import film from '@/mock/film.json';
import homeService from '@/services/homeService';
import imallService from '@/services/imallService';
import { Blog } from '@/services/newService';
import simService from '@/services/simService';
import { searchResult } from '@/types/home';

type Props = {
  /**
   * @deprecated remove as soon as possible
   */
  toggleMenu?(): void;
  /**
   * @deprecated remove as soon as possible
   */
  isMenuShow?: boolean;
  isHomePage?: boolean;
};

const tabs = [
  { id: 0, title: 'personal' },
  { id: 1, title: 'collaborate' },
  { id: 2, title: 'enterprise' }
];

const highlightSearch = ['Chọn số mua Sim', 'Sim phong thủy', 'Sim thần số học', 'Kích hoạt Sim', 'Sim thần số học là gì?'];

export const navigations: INavgationList = [
  {
    id: 'service',
    title: 'Dịch vụ di động',
    href: '/',
    header: true,
    childs: [
      {
        title: 'Chọn số - Mua Sim',
        description: 'Kho sim số đẹp, phong thủy',
        href: Routers.SIM,
        icon: '/icons/bold/sim.svg',
        childs: [
          { title: 'Kho Sim iTel', href: Routers.SIM },
          { title: 'Sim phong thủy', href: Routers.SIM_FENG_SHUI }
          // { title: 'Sim thần số học', href: Routers.SIM_NUMEROLOGY },
          // { title: 'Sim ưu đãi', href: Routers.SIM_COUPLE }
        ]
      },
      {
        title: 'Gói cước',
        description: 'Data thả ga, miễn phí gọi nội mạng',
        href: Routers.DATA,
        icon: '/icons/bold/pack-of-data.svg'
      },
      {
        title: 'Nạp thẻ',
        description: 'Nhanh chóng, thuận tiện, nhiều ưu đãi',
        href: Routers.RECHARGE,
        icon: '/icons/bold/recharge-card.svg'
      }
    ]
  },
  {
    id: 'iwow',
    title: 'Ưu đãi iWow',
    href: '/',
    header: true,
    childs: [
      {
        title: 'Ưu đãi iTel Club',
        description: 'Đổi điểm tích tắc, nhận ngàn voucher',
        href: Routers.PROMOTION_ICLUB,
        icon: '/icons/bold/iclub.svg'
      }
      // {
      //   title: 'Săn quà iZui',
      //   description: 'Chơi game zui, tích điểm lớn, nhận quà hay',
      //   href: Routers.PROMOTION_IZUI,
      //   icon: '/icons/bold/izui.svg'
      // },
      // {
      //   title: 'Chương trình hot',
      //   description: 'Mới ưu đãi, nóng khuyến mại',
      //   href: Routers.PROMOTION_HOT,
      //   icon: '/icons/bold/tag-hot.svg'
      // }
    ]
  },
  {
    id: 'imall',
    title: 'Mua sắm',
    href: Routers.IMALL_DEVICE,
    header: true
    // childs: [
    //   {
    //     title: 'Điện thoại - Thiết bị',
    //     description: 'Sắm đồ công nghệ, ghé shop iTel',
    //     href: Routers.IMALL_DEVICE,
    //     icon: '/icons/bold/mobile.svg'
    //   },
    //   {
    //     title: 'Thời trang',
    //     description: 'Thỏa thích shopping, đồ xinh quá trời',
    //     href: Routers.IMALL_FASHION,
    //     icon: '/icons/bold/fashion.svg'
    //   },
    //   {
    //     title: 'Mẹ và bé',
    //     description: 'Mẹ có deal ngon, bé có đồ mới',
    //     href: Routers.IMALL_MOTHER_TO_BABY,
    //     icon: '/icons/bold/mom-and-baby.svg'
    //   },
    //   {
    //     title: 'Ẩm thực',
    //     description: 'Voucher nóng hổi, vừa thổi vừa xơi',
    //     href: Routers.IMALL_FOOD,
    //     icon: '/icons/bold/food.svg'
    //   }
    // ]
  },
  // {
  //   id: 'entertainment',
  //   title: 'Giải trí',
  //   href: '/',
  //   header: true,
  //   childs: [
  //     {
  //       title: 'iTel Film',
  //       description: 'Phim hay, xem ngay miễn phí',
  //       href: '/ifilm',
  //       icon: '/icons/bold/itel-movie.svg'
  //     },
  //     {
  //       title: 'iTel Game',
  //       description: 'Làm chủ cuộc chơi, đua top nhận quà',
  //       href: Routers.IGAME,
  //       icon: '/icons/bold/itel-game.svg'
  //     }
  //   ]
  // },
  {
    id: 'digital',
    title: 'Dịch vụ số',
    href: '/',
    header: true,
    childs: [
      {
        title: 'Du lịch & di chuyển',
        description: 'Săn vé rẻ, đặt phòng nhanh ',
        href: Routers.ITRAVEL_SERVIVE,
        icon: '/icons/bold/travel.svg'
      },
      {
        title: 'Tài chính & bảo hiểm',
        description: 'Tiết kiệm, vay & mua bảo hiểm dễ dàng',
        href: Routers.IFINANCE_SERVIVE,
        icon: '/icons/bold/insurance-finance.svg'
      },
      {
        title: 'Mua Sắm',
        description: 'Dịch vụ mua sắm dễ dàng',
        href: Routers.SHOPING_SERVIVE,
        icon: '/icons/bold/itel-health.svg'
      },
      // {
      //   title: 'Xổ số Vietlott',
      //   description: 'Ghé iTel, gặp vận đỏ',
      //   href: Routers.IFINANCE_VIETLOTT_SERVIVE,
      //   icon: '/icons/bold/lottery.svg',
      //   onClick(e) {
      //     e.preventDefault();
      //     showVietllot();
      //   }
      // }
    ]
  },
  {
    id: 'support',
    title: 'Hỗ trợ',
    href: Routers.TRACKING_ORDER,
    header: true,
    childs: [
      {
        title: 'Theo dõi đơn hàng',
        description: 'Cập nhật tình trạng đơn hàng của bạn',
        href: Routers.TRACKING_ORDER,
        icon: '/icons/bold/tracking-order-bold.svg'
      },
      {
        title: 'Kích hoạt sim',
        description: 'Dành cho khách hàng đăng ký Sim mới',
        href: Routers.ACTIVATE_SIM,
        icon: '/icons/bold/sim-activation.svg'
      },
      {
        title: 'Cập nhật thông tin thuê bao',
        description: 'Dễ dàng thay đổi thông tin chính chủ',
        href: Routers.SUBSCRIBER_INFORMATION,
        icon: '/icons/bold/sim-update.svg'
      },
      // {
      //   title: 'Đổi/Cấp lại Sim/ eSim',
      //   description: 'Dành cho khách hàng cần cấp lại Sim/ eSim',
      //   href: Routers.CHANGE_SIM,
      //   icon: '/icons/bold/sim-exchange.svg'
      // },
      // {
      //   title: 'Mở khóa sim',
      //   description: 'Dành cho khách hàng bị khóa Sim',
      //   href: Routers.UNLOCK_SIMS,
      //   icon: '/icons/bold/sim-unlock.svg'
      // },
      {
        title: 'Tải ứng dụng My iTel',
        description: 'Mở My iTel - Một chạm vạn tiện ích',
        href: Routers.DOWNLOAD_ITEL,
        icon: '/icons/bold/my-itel.svg'
      }
    ]
  },
  {
    id: 'turtorial',
    title: 'Hướng dẫn',
    href: '/',
    header: true,
    childs: [
      {
        title: 'Hướng dẫn người dùng',
        description: 'Đơn giản, dễ hiểu, xem là biết',
        href: Routers.SUPPORT_TUTORIAL,
        icon: '/icons/bold/guide.svg'
      },
      {
        title: 'Câu hỏi thường gặp',
        description: 'Bạn hỏi, iTel trả lời',
        href: Routers.QUESSTION_TUTORIAL,
        icon: '/icons/bold/question.svg'
      },
      // {
      //   title: 'Điểm dịch vụ khách hàng',
      //   description: 'Điểm phân phối Sim & dịch vụ khách hàng',
      //   href: Routers.SHOWROOM_TUTORIAL,
      //   icon: '/icons/bold/shop.svg'
      // },
      {
        title: 'Liên hệ',
        description: 'Giải đáp rõ ràng, hỗ trợ nhanh chóng',
        href: Routers.CONTACT_TUTORIAL,
        icon: '/icons/bold/contact.svg'
      },
      {
        title: 'Phản hồi - Góp ý',
        description: 'iTel sẵn sàng nhận góp ý của bạn',
        href: Routers.FEEDBACK_TUTORIAL,
        icon: '/icons/bold/feedback.svg'
      }
    ]
  }
];
const categories = [
  { href: Routers.SIM, icon: '/icons/bold/sim.svg', bg: 'bg-red-500', title: 'Chọn số - Mua Sim' },
  { href: Routers.DATA, icon: '/icons/bold/pack-of-data.svg', bg: 'bg-dark-blue', title: 'Gói cước' },
  { href: Routers.RECHARGE, icon: '/icons/bold/recharge-card.svg', bg: 'bg-pink', title: 'Nạp thẻ' },
  { href: Routers.ACTIVATE_SIM, icon: '/icons/bold/sim.svg', bg: 'bg-red-500', title: 'Kích hoạt Sim' },
  { href: Routers.IMALL_DEVICE, icon: '/icons/bold/mobile.svg', bg: 'bg-dark-blue', title: 'Điện thoại\n& thiết bị' },
  {
    href: Routers.IFINANCE_VIETLOTT_SERVIVE,
    icon: '/icons/bold/lottery.svg',
    bg: 'bg-red-500',
    title: 'Xổ số\nViettlot',
    onClick: navigations[4].childs![3].onClick
  },
  { href: Routers.IFILM, icon: '/icons/bold/itel-movie.svg', bg: 'bg-dark-blue', title: 'iTel Phim' },
  { href: Routers.IGAME, icon: '/icons/bold/itel-game.svg', bg: 'bg-red-500', title: 'iTel Game' }
];

type ResponseI = {
  id: string;
  title: string;
  desc?: string;
  href: string;
  parent: INavigationItem | null;
  q: string;
  icon?: string;
  onClick?(e: any): void;
};
function flatChild(navs: INavigationItem[], root?: ResponseI): ResponseI[] {
  return navs.flatMap((nav, index) => {
    const id = root ? root.id + '_' + String(index) : String(index);
    const parent: ResponseI = {
      id,
      title: nav.title,
      desc: nav.description,
      href: nav.href,
      parent: null as INavigationItem | null,
      q: stringToASCII(nav.title).toLowerCase(),
      icon: nav.icon || root?.icon,
      onClick: nav.onClick
    };
    const chils = nav.childs ? flatChild(nav.childs as INavigationItem[], parent) : [];
    return [parent].concat(chils);
  });
}

enum TabEnum {
  All,
  Telecommunication,
  ProductService,
  Entertainment,
  Promotions,
  News,
  Guide
}
const HeaderDefault = ({ isHomePage }: Props) => {
  const [avaiableTab, setAvaiableTab] = useState<Record<string, boolean>>({});
  const { menu, search } = useGlobalContext();
  const language = useBoolean(false);
  const focus = useBoolean(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { handleViewDetail, handleModalPhoneCheck } = useDataModal();
  const input = useInputSearch({ saveQuery: 'home' });

  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  const [selectedTab, setSelectedTab] = useState(tabs[0]);
  const [simContent, setSimContent] = useState<Model.SimMaster[]>([]);
  const [productContent, setProductContent] = useState<imallModel.Product[]>([]);
  const [searchResult, setSearchResult] = useState<searchResult>({});
  const { openLoading, closeLoading } = useLoading();

  const [products, setProducts] = useState<Data.Product[]>([]);
  const ref = useRef<HTMLButtonElement>(null);
  const { nextStepSelectType } = useSimAction();

  const media = useMediaQuery(MediaScreen.Desktop);

  useOnClickOutside(ref, language.setFalse);

  useEffect(() => {
    if (search.value && inputRef.current) {
      inputRef.current.focus();
    }
  }, [search.value]);

  const router = useRouter();
  const currentLocale = useMemo(() => {
    return router.locale ? locales.find((l) => l.locale === router.locale) : locales[0];
  }, [router.locale]);

  const { t } = useTranslation('common');

  const onSelect = (nav: { href: string }) => {
    focus.setFalse();
    inputRef.current?.blur();
  };

  const flatNavs = useMemo(() => {
    return flatChild(navigations);
  }, []);

  const filteredData = useMemo(() => {
    if (input.queryDebounced) {
      let text = input.queryDebounced.toLowerCase().split(' ').map(stringToASCII);
      return flatNavs.filter((nav) => text.every((t) => nav.q.includes(t)));
    }
    return flatNavs;
  }, [input.queryDebounced, flatNavs]);

  const searchTabs = useMemo(() => {
    return [
      { id: TabEnum.All, title: 'Tất cả', icon: '', button: '', href: '#', data: [1] },
      {
        id: TabEnum.Telecommunication,
        title: 'Viễn thông',
        icon: '/icons/bold/sim.svg',
        button: 'Khám phá kho sim',
        href: Routers.SIM,
        data: []
      },
      {
        id: TabEnum.ProductService,
        title: 'Sản phẩm -  Dịch vụ',
        icon: '/icons/bold/shopping.svg',
        button: 'Khám phá kho sim',
        href: Routers.SIM,
        data: []
      },
      {
        id: TabEnum.Entertainment,
        title: 'Giải trí',
        icon: '/icons/bold/movie.svg',
        button: 'Khám phá kho sim',
        href: Routers.SIM,
        data: []
      },
      { id: TabEnum.Promotions, title: 'Ưu đãi', icon: '/icons/bold/iclub.svg', button: 'Khám phá kho sim', href: Routers.SIM, data: [] },
      { id: TabEnum.News, title: 'Tin tức', icon: '/icons/bold/guide.svg', button: 'Khám phá kho sim', href: Routers.SIM, data: [] },
      {
        id: TabEnum.Guide,
        title: 'Hướng dẫn',
        icon: '/icons/bold/phone-message.svg',
        button: 'Khám phá kho sim',
        href: Routers.SIM,
        data: []
      }
    ];
  }, []);

  const data = useMemo(
    () => ({
      sims: Array.from({ length: 4 }, (v, i) => ({
        pack: {
          data: 5_000_000,
          data_type: 'month',
          id: i + 1,
          name: 'Itel6969',
          price: 99_000,
          price_type: 'day',
          discount_price: 50_000
        },
        sim: { id: i + 1, phone: '09876544321', price: 80_000, discount_price: 32_000, sale_expiry: '2023-06-30T07:55:32.629Z' }
      })) as { sim: Model.Sim; pack: Model.PackOfData }[],
      products,
      packs: [
        { id: 1, name: 'iTel 321', price: 99_999, discount_price: 88_000 },
        { id: 2, name: 'iTel 321', price: 99_999, discount_price: 88_000 }
        // { id: 3, name: 'iTel 321', price: 99_999, discount_price: 88_000 }
      ],
      films: film.slice(0, 2)
    }),
    [products]
  );

  const isMatchedNone = input.querySubmited === 'Simssss' || (input.querySubmited && !Object.keys(avaiableTab).length);
  const currentTab = searchTabs[selectedTabIndex];

  const coverNamePackToData = (name: string) => {
    switch (name) {
      case 'ITEL100':
        return 1_000_000;
      case 'ITEL149':
        return 4_000_000;
      case 'ITEL199':
        return 5_000_000;
      case 'MAY':
        return 4_000_000;
      default:
        return 4_000_000;
    }
  };
  const getSimContent = async () => {
    try {
      const res = await simService.getSimSearchMaster(paramsSimSearch);
      const dataSim = res.result.map((item) => {
        const tags =
          item.SimType != 10 && item.ThoiGianCamKet > 0
            ? item.CategoryID.map(({ CategoryID, Name }) => ({ id: CategoryID, name: Name })).concat([{ id: 0, name: 'Sim cam kết' }])
            : item.CategoryID.map(({ CategoryID, Name }) => ({ id: CategoryID, name: Name }));
        return {
          // ...item,

          pack: {
            data: coverNamePackToData(item.Pack),
            data_type: 'day',
            id: 1,
            name: item.Pack,
            price: item.PackPrice,
            discount_price: item.PackPrice,
            price_type: 'month'
          } as Model.PackOfData,
          tags: tags,
          discount_price: item.SimPrice + item.Price,
          id: parseInt(item.Phone),
          is_vip: false,
          phone: item.Phone,
          price: (item.SimPrice + item.Price) * 1.1,
          sale_expiry: null,
          ThoiGianCamKet: item.ThoiGianCamKet
        };
      });
      setSimContent(dataSim);
    } catch (error) {}
  };

  const getProductContent = async () => {
    try {
      const param = {
        columnFilters: {
          Slug: ''
        },
        sort: [
          {
            field: 'price',
            type: 'desc'
          }
        ],
        page: 1,
        pageSize: 20,
        lang: 1
      };
      const res = await imallService.getProducts(param);
      if (res.code == 200) {
        setProductContent(res.result);
      }
    } catch (error) {}
  };

  const getResultSearch = async () => {
    openLoading();
    try {
      const res = await homeService.searchPage(input.querySubmited);
      if (res.code == 200) {
        closeLoading();
        setSearchResult(res.result);
      }
    } catch (error) {}
  };
  const getImage = (json: string): string => {
    return JSON.parse(json)[0].image_url || JSON.parse(json)[0].src;
  };
  const getSlug = (json: string): string => {
    return JSON.parse(json).slug;
  };

  useEffect(() => {
    getSimContent();
    getProductContent();
  }, []);
  useEffect(() => {
    if (input.querySubmited) {
      getResultSearch();
    }
  }, [input.querySubmited]);

  return (
    <>
      <nav
        className={clsx(isHomePage ? 'sticky' : search.value ? 'fixed' : 'max-md:hidden', 'md:block md:sticky top-0 z-40 w-full')}
        data-theme="light"
      >
        <div id="subheader" className="hidden md:block" data-theme="dark">
          <div className="container flex items-center justify-between text-sm">
            <ul className="flex font-bold">
              {tabs.map((tab) => {
                return (
                  <li key={tab.id}>
                    <button
                      className={clsx(
                        'transition-default h-10 border-b-2 border-transparent px-6 capitalize',
                        tab.id === selectedTab.id ? 'border-red-300 bg-red-500' : 'hover:bg-neutral-600'
                      )}
                      onClick={() => setSelectedTab(tab)}
                    >
                      {t(tab.title)}
                    </button>
                  </li>
                );
              })}
            </ul>
            <div className="hidden align-middle xl:block">
              <span>Tận hưởng trọn vẹn.</span>
              <Link href="/download-itel" className="ml-2 font-bold text-yellow-400 hover:underline">
                Tải ngay My iTel
              </Link>
            </div>
            <div className="relative flex items-center">
              <div className="tabs text-sm">
                <Link href={Routers.ABOUT} className="tab">
                  Về iTel
                </Link>
                <Link className="tab" href={Routers.NEWS}>
                  Tin tức
                </Link>
                <Link className="tab" href={Routers.RECRUITMENT}>
                  Tuyển dụng
                </Link>
              </div>
              <button ref={ref} onClick={language.setTrue} className="btn btn-sm h-7 rounded px-3 font-normal uppercase" data-theme="light">
                {currentLocale?.short}
              </button>
              <div
                className={clsx(
                  language.value ? 'pointer-events-auto' : 'pointer-events-none opacity-0',
                  'transition-default absolute right-0 top-full z-10 rounded-md'
                )}
                data-theme="light"
              >
                <ul className="menu w-52 p-2 font-bold">
                  {locales.map((locale) => (
                    <li key={locale.locale}>
                      <Link href={router.asPath} locale={locale.locale} className="flex justify-between rounded-md p-4">
                        <span> {locale.title}</span>
                        {router.locale === locale.locale ? (
                          <span>
                            <Svg src="/icons/line/check.svg" className="h-4 w-4 text-red-500" />
                          </span>
                        ) : null}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className={clsx(!input.querySubmited ? 'border-b' : 'md:border-b', 'relative border-neutral-200 bg-neutral-0')}>
          <div className="container flex items-center py-3 xl:py-3">
            <div className={search.value ? 'max-md:hidden' : ''}>
              <Link href="/">
                <Svg src="/logo/logo-color.svg" width={78} height={32} className="text-red-500 dark:text-neutral-0" />
              </Link>
            </div>
            <div className={search.value ? '-ml-2 md:hidden' : 'hidden'}>
              <button type="button" className="btn btn-sm btn-circle btn-ghost transition-default" onClick={search.setFalse}>
                <Svg src="/icons/line/arrow-left.svg" width={24} height={24} />
              </button>
            </div>
            <div className={clsx('hidden', { 'xl:block': !search.value })}>
              <ul className="ml-10 flex-grow items-baseline space-x-10 text-sm font-bold xl:flex">
                {navigations.map(({ title, href, childs, header }, index) => {
                  if (!header) return null;
                  return (
                    <li key={index} className="group relative py-3.5">
                      <Link href={href} className="text-xs hover:text-red-500 2xl:text-sm">
                        {title}
                      </Link>
                      {childs?.length ? (
                        <div className="transition-default pointer-events-none absolute w-max max-w-md rounded-xl opacity-0 shadow-itel group-hover:pointer-events-auto group-hover:opacity-100 z-20">
                          <ul className="menu w-full rounded-[1.25rem] bg-base-100 p-4">
                            {childs.map((item) => {
                              return (
                                <Fragment key={item.title}>
                                  <li>
                                    <NavigationItem
                                      onClick={item.onClick}
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
                        </div>
                      ) : null}
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="ml-1 md:ml-6 xl:ml-10 flex-1">
              {search.value ? (
                <InputSearchProvider {...input}>
                  <InputSearch
                    onChange={input.onChangeText}
                    onSubmit={input.onSubmit}
                    onClear={input.handleSearchClear}
                    value={input.query}
                    onBlur={input.onBlur}
                    onFocus={input.onFocus}
                    open={search.value}
                    ref={input.inputRef}
                  >
                    {media !== MediaScreen.Mobile && input.queryDebounced && input.focus.value && (
                      <div className="absolute w-full left-0 top-full">
                        <ul className="mt-2 bg-neutral-100 xl:bg-neutral-50 rounded-xl p-2 shadow-itel menu max-h-[25rem] overflow-auto flex-row">
                          {filteredData.map((nav) => {
                            return (
                              <li
                                key={nav.id}
                                onMouseDown={(e) => e.preventDefault()}
                                onClick={() => input.handleSearchSelect(nav.title)}
                                className="w-full"
                              >
                                <Link href={nav.href} onClick={nav.onClick} className="group">
                                  {nav.icon ? (
                                    <Svg
                                      src={nav.icon}
                                      width={32}
                                      height={32}
                                      className="group-hover:text-red-500 transition-default duration-200"
                                    />
                                  ) : null}
                                  {nav.parent ? (
                                    <p>
                                      <span>
                                        <b>[{nav.parent.title}]</b>
                                      </span>
                                      <span>{nav.title}</span>
                                    </p>
                                  ) : (
                                    <p>
                                      <b>{nav.title}</b>
                                    </p>
                                  )}
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    )}
                  </InputSearch>
                  <ModalShared open onClose={() => void 0}>
                    <div className="fixed flex flex-col inset-0 z-10 bg-neutral-100 xl:bg-neutral-50 overflow-auto">
                      <div className="h-16 md:h-28 w-full flex-shrink-0" />
                      {!input.querySubmited ? (
                        <div className="mt-2 md:mt-6 space-y-2 md:space-y-10">
                          {isMatchedNone ? (
                            <div>
                              <div className="mobile-container container pt-4 md:pt-0">
                                <p className="md:text-lg md:text-center font-bold">
                                  Không tìm thấy kết quả cho từ khóa “{input.querySubmited}”
                                </p>
                              </div>
                              <SectionSearchHeader title="Từ khoá nổi bật" uppercase className="pt-4 py-2 md:py-0 md:mt-6 xl:mt-8">
                                <div className="mt-2 md:mt-4">
                                  <ul>
                                    {highlightSearch.map((text) => {
                                      return (
                                        <li
                                          key={text}
                                          className="py-3 md:py-2 flex items-center gap-x-2"
                                          onClick={() => input.handleSearchSelect(text)}
                                        >
                                          <p className="font-medium">{text}</p>
                                        </li>
                                      );
                                    })}
                                  </ul>
                                </div>
                              </SectionSearchHeader>
                            </div>
                          ) : (
                            <>
                              {media === MediaScreen.Mobile && input.queryDebounced && (
                                <SectionSearchHeader title="Kết quả phù hợp">
                                  <div className="mt-2 md:mt-4">
                                    <ul>
                                      {filteredData.map((nav) => {
                                        return (
                                          <li
                                            key={nav.id}
                                            onMouseDown={(e) => e.preventDefault()}
                                            onClick={() => onSelect(nav)}
                                            className="cursor-pointer w-full py-3"
                                          >
                                            <div className="flex items-center">
                                              {nav.icon ? (
                                                <Svg
                                                  src={nav.icon}
                                                  width={24}
                                                  height={24}
                                                  className="group-hover:text-red-500 transition-default duration-200 mr-3"
                                                />
                                              ) : null}
                                              {nav.parent ? (
                                                <p>
                                                  <span>
                                                    <b>[{nav.parent.title}] </b>
                                                  </span>
                                                  <span>{nav.title}</span>
                                                </p>
                                              ) : (
                                                <p>
                                                  <b>{nav.title}</b>
                                                </p>
                                              )}
                                            </div>
                                          </li>
                                        );
                                      })}
                                    </ul>
                                  </div>
                                </SectionSearchHeader>
                              )}
                              <SectionSearchHeader title="Tìm kiếm gần đây" uppercase>
                                <div className="mt-2 md:mt-4">
                                  <ul>
                                    {input.historySearch.map((search) => {
                                      return (
                                        <li key={search.id}>
                                          <button
                                            className="py-2 flex items-center gap-x-2"
                                            onClick={() => input.handleSearchSelect(search.text)}
                                          >
                                            <Svg src="/icons/bold/history.svg" className="text-subtle-content" width={24} height={24} />
                                            <p className="font-medium">{search.text}</p>
                                          </button>
                                        </li>
                                      );
                                    })}
                                  </ul>
                                </div>
                              </SectionSearchHeader>
                            </>
                          )}
                          <SectionSearchHeader title="Danh mục gợi ý" uppercase>
                            <div className="mt-6">
                              <div className="flex gap-x-3 overflow-auto scrollbar-hide">
                                {categories.map((cat, index) => (
                                  <div
                                    key={index}
                                    className="flex-shrink-0 w-18 xl:flex-shrink md:w-28 md:h-27 xl:w-auto xl:h-32 xl:flex-1 bg-neutral-0 rounded-2xl"
                                  >
                                    <Link href={cat.href} className="flex flex-col h-full items-center pt-3 xl:pt-6" onClick={cat.onClick}>
                                      <div className={clsx('rounded-md text-neutral-0', cat.bg)}>
                                        <div className="w-10 h-10 center-by-grid">
                                          <Svg src={cat.icon} width={24} height={24} />
                                        </div>
                                      </div>
                                      <p className="text-[13px] leading-4 mt-3 text-center break-words">{cat.title}</p>
                                    </Link>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </SectionSearchHeader>
                          <SectionSearchHeader title="Sim số dành cho bạn" uppercase className="pt-4" href={Routers.SIM}>
                            <div className="md:flex gap-x-4 md:mt-6">
                              {simContent.slice(0, 4).map(({ pack, ...sim }, index) => {
                                return (
                                  <Fragment key={index}>
                                    <div
                                      onClick={() => nextStepSelectType(sim)}
                                      className={clsx(index > 2 ? 'hidden' : 'md:hidden', 'w-full')}
                                    >
                                      <SimRowAppItem item={sim} pack={pack as any} tags={sim.tags} />
                                    </div>
                                    <div className={clsx(index > 2 ? 'max-xl:hidden' : 'flex-1', 'max-md:hidden')}>
                                      <SimTable
                                        disablePattern
                                        pack={pack as any}
                                        simItem={sim}
                                        tags={sim.tags}
                                        onAddToCart={() => nextStepSelectType({ ...sim, pack })}
                                        onBuy={() => nextStepSelectType({ ...sim, pack })}
                                      />
                                    </div>
                                  </Fragment>
                                );
                              })}
                            </div>
                          </SectionSearchHeader>
                          <SectionSearchHeader title="Sản phẩm nổi bật" uppercase href={Routers.IMALL}>
                            <div className="md:mt-6 md:flex gap-x-4 divide-y divide-neutral-200">
                              {productContent.slice(0, 4).map((product, index) => (
                                <Link
                                  href={{ pathname: Routers.IMALL_DETAIL, query: { slug: getSlug(product.meta!) } }}
                                  key={product.id}
                                  className={clsx(index > 2 ? 'max-xl:hidden' : '', 'w-full md:w-1/3 xl:w-1/4')}
                                >
                                  <CardProduct
                                    img={getImage(product.images!)}
                                    installment={product.origin_type == 'oppo' && product.price! > 3000000}
                                    title={product.product_name!}
                                    type="secondary"
                                    data={product}
                                    className="max-md:hidden"
                                  >
                                    <CardProduct.Body
                                      tags={[]}
                                      price={product.base_price!}
                                      discountPrice={product.price!}
                                      name={product.product_name!}
                                      discountPercentage
                                      rate={4.5}
                                      sold={Math.floor(Math.random() * 500)}
                                    />
                                  </CardProduct>
                                  <div className="md:hidden">
                                    <CardProductApp image={getImage(product.images!)} name={product.product_name!} price={product.price!} />
                                  </div>
                                </Link>
                              ))}
                            </div>
                          </SectionSearchHeader>
                        </div>
                      ) : (
                        <div className="flex flex-col space-y-2 md:space-y-10 flex-1">
                          <section className="mobile-container md:mt-6">
                            <div className="container max-md:px-0">
                              <h2 className="max-md:hidden text-center md:text-lg font-bold">
                                Kết quả tìm kiếm cho từ khóa “{input.querySubmited}”
                              </h2>
                              <div className="md:mt-4">
                                <ScrollList
                                  as="ul"
                                  className="tabs flex-nowrap gap-x-4 whitespace-nowrap text-base scrollbar-hide xl:justify-center overflow-x-auto"
                                >
                                  {searchTabs.map((tab, index) => {
                                    const isActive = index === selectedTabIndex;
                                    return (
                                      <li
                                        key={tab.id}
                                        onClick={(e) => setSelectedTabIndex(index)}
                                        className={clsx(
                                          'tab-bordered flex-nowrap gap-x-2 pt-1 md:p-4 tab tab-primary outline-none',
                                          isActive && 'tab-active'
                                        )}
                                      >
                                        {tab.icon && (
                                          <Svg
                                            src={tab.icon}
                                            className={clsx('max-md:hidden', isActive ? 'text-red-500' : 'text-base-content')}
                                            width={32}
                                            height={32}
                                          />
                                        )}
                                        {tab.title}
                                      </li>
                                    );
                                  })}
                                </ScrollList>
                              </div>
                              <hr className="border-neutral-200 -mt-px" />
                            </div>
                          </section>
                          <TabItem
                            id={TabEnum.Telecommunication}
                            currentTab={currentTab}
                            submitedText={input.querySubmited}
                            avaiable={false}
                          >
                            <SectionSearchHeader title="Viễn thông" className="pt-4" href={Routers.SIM}>
                              <div className="md:flex gap-x-4 md:mt-6">
                                {data.sims.map(({ sim, pack }, index) => {
                                  return (
                                    <Fragment key={index}>
                                      <div
                                        onClick={() => nextStepSelectType(sim)}
                                        className={clsx(index > 2 ? 'hidden' : 'md:hidden', 'w-full')}
                                      >
                                        <SimRowAppItem item={sim} pack={pack as any} tags={simTypes.slice(1, 4)} />
                                      </div>
                                      <div className={clsx(index > 2 ? 'max-xl:hidden' : 'flex-1', 'max-md:hidden')}>
                                        <SimTable
                                          disablePattern
                                          pack={pack as any}
                                          simItem={sim}
                                          tags={[
                                            { id: 1, name: 'Tam hoa' },
                                            { id: 3, name: 'Tài lộc' },
                                            { id: 2, name: 'Lộc phát' }
                                          ]}
                                          onAddToCart={() => nextStepSelectType(sim)}
                                          onBuy={() => nextStepSelectType(sim)}
                                        />
                                      </div>
                                    </Fragment>
                                  );
                                })}
                              </div>
                            </SectionSearchHeader>˝
                          </TabItem>
                          <TabItem id={TabEnum.ProductService} currentTab={currentTab} submitedText={input.querySubmited} avaiable={false}>
                            <SectionSearchHeader title="Gói cước" className="pt-4" href={Routers.IMALL_DEVICE}>
                              <div className="xl:flex gap-x-4">
                                {/* {data.packs.map((item, index) => (
                                  <div className="xl:w-1/2 md:mt-6" key={item.id}>
                                    <CardDataPack
                                      image="https://res.cloudinary.com/dgkrchato/image/upload/v1684833027/itel-web/d94a25d1f3c25c68a87bc114e36151cc_cscfuq.png"
                                      onDetail={() => handleViewDetail(item)}
                                      onRegister={() => handleModalPhoneCheck(item)}
                                    />
                                  </div>
                                ))} */}
                              </div>
                            </SectionSearchHeader>
                          </TabItem>
                          <TabItem
                            id={TabEnum.ProductService}
                            currentTab={currentTab}
                            submitedText={input.querySubmited}
                            avaiable={searchResult.Products && searchResult.Products?.length > 0}
                            hideIcon
                          >
                            <SectionSearchHeader title="Sản phẩm" href={Routers.IMALL_DEVICE}>
                              <div className="md:mt-6 md:flex gap-x-4 divide-y divide-neutral-200">
                                {searchResult.Products &&
                                  searchResult.Products.map((product: imallModel.Product, index) => (
                                    <Fragment key={product.id}>
                                      <Link href={{ pathname: Routers.IMALL_DETAIL, query: { id: product.id } }} className="md:hidden">
                                        <CardProductApp
                                          image={getImage(product.images!)}
                                          name={product.product_name!}
                                          price={product.base_price!}
                                        />
                                      </Link>
                                      <Link
                                        href={{ pathname: Routers.IMALL_DETAIL, query: { id: product.id } }}
                                        className={
                                          index > 2 ? 'max-xl:hidden w-1/3 xl:w-1/4 max-md:hidden' : 'w-1/3 xl:w-1/4 max-md:hidden'
                                        }
                                      >
                                        <CardProduct
                                          img={getImage(product.images!)}
                                          installment={product.origin_type == 'oppo' && product.price! > 3000000}
                                          title={product.product_name!}
                                          type="secondary"
                                          data={product}
                                        >
                                          <CardProduct.Body
                                            tags={[]}
                                            price={product.base_price!}
                                            discountPrice={product.price!}
                                            name={product.product_name!}
                                            discountPercentage
                                            rate={4.5}
                                            sold={Math.floor(Math.random() * 500)}
                                          />
                                        </CardProduct>
                                      </Link>
                                    </Fragment>
                                  ))}
                              </div>
                            </SectionSearchHeader>
                          </TabItem>
                          <TabItem id={TabEnum.Entertainment} currentTab={currentTab} submitedText={input.querySubmited} avaiable={false}>
                            <SectionSearchHeader title="Giải trí" href={Routers.IFILM}>
                              <div className="mt-3 md:mt-6 flex gap-x-6">
                                {data.products.map((product, index) => (
                                  <div key={product.id} className={index > 1 ? 'max-xl:hidden w-1/2 xl:w-1/4' : 'w-1/2 xl:w-1/4'}>
                                    <Link href={{ pathname: Routers.IFILM }} className="card">
                                      <figure className="group block-img block-video xl:block-photo rounded-lg bg-base-300">
                                        <img
                                          src={product.thumbnail}
                                          alt={product.name}
                                          className="group-hover:scale-110 transition-default h-full w-full object-cover center-by-grid"
                                        />
                                      </figure>
                                      <div className="card-body px-0 py-2 md:py-4">
                                        <h5 className="md:text-lg">
                                          <b>{product.name}</b>
                                        </h5>
                                        <div className="mt-1 md:mt-2 text-xs md:text-sm text-subtle-content">
                                          24 tập • Trung Quốc • Lãng mạn • 2022
                                        </div>
                                      </div>
                                    </Link>
                                  </div>
                                ))}
                              </div>
                            </SectionSearchHeader>
                          </TabItem>
                          <TabItem
                            id={TabEnum.Promotions}
                            currentTab={currentTab}
                            submitedText={input.querySubmited}
                            avaiable={searchResult.Vouchers && searchResult.Vouchers?.length > 0}
                          >
                            <SectionSearchHeader title="Ưu đãi" className="pt-4" href={Routers.PROMOTION_ICLUB}>
                              <div className="mt-3 md:mt-6 flex flex-wrap">
                                {searchResult.Vouchers &&
                                  searchResult.Vouchers.map((product: itelClubModel.Voucher, index) => (
                                    <div key={product.id} className={index >= 0 ? 'w-1/2 xl:w-1/4 px-1 py-2' : 'w-1/2 xl:w-1/3'}>
                                      <CardCoupon
                                        id={product.voucher_id!}
                                        key={product.id}
                                        img={product.images_rectangle?.[320] || ''}
                                        logo={product.brandLogoLoyalty!}
                                        title={product.title!}
                                        redemptionDeadline={product.expire_duration!}
                                        point={product.point!}
                                        className="bg-neutral-50 border border-neutral-200 md:border-none"
                                        data={product}
                                      />
                                    </div>
                                  ))}
                              </div>
                            </SectionSearchHeader>
                          </TabItem>
                          <TabItem
                            id={TabEnum.News}
                            currentTab={currentTab}
                            submitedText={input.querySubmited}
                            avaiable={searchResult.News && searchResult.News?.length > 0}
                          >
                            <SectionSearchHeader title="Tin tức" href={Routers.NEWS}>
                              <div className="mt-3 md:mt-6 flex -mx-2 md:-mx-3 xl:flex-wrap">
                                {searchResult.News &&
                                  searchResult.News.map((product: Blog, index) => (
                                    <div
                                      key={product.Id}
                                      className={clsx(index > 1 && 'max-xl:hidden', 'w-1/2 xl:w-1/4 px-2 md:px-1 md:mt-3')}
                                    >
                                      <Link href={{ pathname: Routers.NEWS_DETAIL, query: { slug: product.Slug } }} className="card">
                                        <figure className="group block-img block-video rounded-lg bg-base-300">
                                          <img
                                            src={product.Thumbnail}
                                            alt={product.Title}
                                            className="group-hover:scale-110 transition-default h-full w-full object-cover center-by-grid"
                                          />
                                        </figure>
                                        <div className="card-body px-0 py-2 md:py-4">
                                          <h5 className="max-md:truncate md:text-lg">
                                            <b>{product.Title}</b>
                                          </h5>
                                          <p className="max-xl:hidden mt-1 md:mt-2 line-clamp-2 text-xs md:text-sm text-subtle-content">
                                            {product.Brief}
                                          </p>
                                          <p className="mt-1 md:mt-2 text-xs md:text-sm text-subtle-content">Tin iTel</p>
                                        </div>
                                      </Link>
                                    </div>
                                  ))}
                              </div>
                            </SectionSearchHeader>
                          </TabItem>
                          <TabItem id={TabEnum.Guide} currentTab={currentTab} submitedText={input.querySubmited} avaiable={false}>
                            <SectionSearchHeader title="Hướng dẫn" href={Routers.SUPPORT_TUTORIAL}>
                              <div className="mt-3 md:mt-6 flex -mx-2 md:-mx-3">
                                {data.products.map((product, index) => (
                                  <div key={product.id} className={clsx(index > 1 && 'max-xl:hidden', 'w-1/2 xl:w-1/4 px-2 md:px-3')}>
                                    <Link href={{ pathname: Routers.SUPPORT_TUTORIAL }} className="card">
                                      <figure className="group block-img block-video rounded-lg bg-base-300">
                                        <img
                                          src={product.thumbnail}
                                          alt={product.name}
                                          className="group-hover:scale-110 transition-default h-full w-full object-cover center-by-grid"
                                        />
                                      </figure>
                                      <div className="card-body px-0 py-2 md:py-4">
                                        <h5 className="max-md:truncate  md:text-lg">
                                          <b>Thần may mắn theo vào iTel mua ngay vé số Vietlott</b>
                                        </h5>
                                        <p className="max-md:hidden mt-1 md:mt-2 line-clamp-2 text-xs md:text-sm text-subtle-content">
                                          Lấy việc giúp đỡ người khác làm mục tiêu sống, đồng cảm với nỗi đau khổ, mất mát của người khác...
                                        </p>
                                        <p className="mt-1 md:mt-2 text-xs md:text-sm text-subtle-content">Tin iTel • 09/03/2023</p>
                                      </div>
                                    </Link>
                                  </div>
                                ))}
                              </div>
                            </SectionSearchHeader>
                          </TabItem>
                        </div>
                      )}
                    </div>
                  </ModalShared>
                </InputSearchProvider>
              ) : null}
            </div>
            <div className={clsx(search.value && 'max-xl:hidden', 'ml-4 flex justify-end gap-x-4 whitespace-nowrap tooltip-light')}>
              <button
                className={clsx(menu.value ? 'md:hidden' : 'hidden', 'btn-sm md:btn-md transition-default btn-tertiary btn rounded-full')}
              >
                {currentLocale?.short}
              </button>
              {!search.value && <ButtonSearch className={menu.value ? 'max-md:hidden' : ''} />}
              <Tooltip
                as="button"
                type="button"
                className="btn-sm md:btn-md transition-default btn-tertiary btn btn-circle tooltip hidden"
                content="Theo dõi đơn hàng"
              >
                <Svg src="/icons/bold/package.svg" className="w-5 h-5 md:h-6 md:w-6" />
              </Tooltip>
              <ButtonCart />
              <ButtonAuthHeader />
              <ButtonMenu />
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

function TabItem({
  children,
  id,
  avaiable,
  currentTab,
  submitedText,
  hideIcon
}: PropsWithChildren<{ id: string | number; avaiable?: boolean; submitedText: string; currentTab: any; hideIcon?: boolean }>) {
  return currentTab.id === TabEnum.All ? (
    avaiable ? (
      (children as any)
    ) : null
  ) : currentTab.id === id ? (
    avaiable ? (
      (children as any)
    ) : hideIcon ? null : (
      <section className="flex items-center justify-center flex-1 mt-2 bg-neutral-0 md:bg-transparent container">
        <div className="">
          <div className="max-w-[14rem] md:max-w-[25rem] mx-auto text-center">
            <div className="flex justify-center">
              <Svg className="w-14 h-14 md:w-16 md:h-16" src={currentTab.icon} />
            </div>
            <p className="text-center font-medium md:text-lg mt-3">
              Không có kết quả phù hợp cho từ khóa <b>“{submitedText}”</b>
            </p>
            <Link href={currentTab.href} className="btn btn-primary rounded-full mt-2 md:mt-6">
              {currentTab.button}
            </Link>
          </div>
        </div>
      </section>
    )
  ) : null;
}
export const SectionSearchHeader = ({
  children,
  title,
  className = 'py-4',
  href = '',
  uppercase,
  mobileTitle
}: React.PropsWithChildren<{ title: string; className?: string; href?: string; mobileTitle?: string; uppercase?: boolean }>) => {
  return (
    <section className="mobile-container">
      <div className={clsx('max-md:px-0 container md:py-0', className)}>
        <div className="flex items-center justify-between">
          <h3>
            <span className="font-bold max-md:hidden text-s-sm">{title}</span>
            <span className={clsx('font-medium md:hidden text-sm', uppercase && 'uppercase text-neutral-500')}>{mobileTitle || title}</span>
          </h3>
          {href ? (
            <Link href={href} className="hover:text-primary">
              <b className="max-md:hidden">Xem tất cả</b>
              <span className="flex text-sm font-medium gap-1 md:hidden">
                Tất cả
                <Svg src="/icons/line/chevron-right.svg" width={16} height={16} />
              </span>
            </Link>
          ) : null}
        </div>
        {children}
      </div>
    </section>
  );
};

export default HeaderDefault;
