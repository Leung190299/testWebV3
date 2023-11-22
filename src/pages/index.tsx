import CardDigital from '@/components/card/card-digital';
import CardProduct from '@/components/card/card-product';
import Svg from '@/components/icon/svg';
import LayoutDefault from '@/components/layout/layout-default';

import clsx from 'clsx';
import { motion, useScroll, useTransform, Variants } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useRef } from 'react';

import { NextPage } from 'next';

import CardFeature from '@/components/card/card-feature';
import { variantsRotate, variantsTranslateWithoutOpacity } from '@/components/carousel/carousel-variants';
import FullCarousel, { Direction, FullCarouselItem } from '@/components/carousel/full-carousel';
import { showVietllot } from '@/components/modal/modal-vietlot';
import PaginationBullets from '@/components/pagination/pagination-bullets';
import RatingProduct from '@/components/rating/rating-product';
import SectionSupports from '@/components/section/section-supports';
import Seo from '@/components/seo';
import { gift } from '@/constants/sim.constants';
import { useGlobalContext } from '@/context/global';
import useFollowMouse from '@/hooks/useFollowMouse';
import useSlider from '@/hooks/useSlider';
import getServerPropsWithTranslation from '@/i18n/getServerPropsWithTranslation';
import { useTranslation } from '@/libs/i18n';
import Routers from '@/routes/routers';
import homeService from '@/services/homeService';
import { DataPageDetail } from '@/services/types';
import useSimAction from '@/store/cart/hooks/sim';
import { ISlider, Product } from '@/types/home';
import { Data, Model } from '@/types/model';
import { toCurrency } from '@/utilities/currency';
import { Logger } from '@/utilities/logger';

import NewsHome from '@/components/home/NewsHome';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';

const featuredData = [
  {
    id: 1,
    icon: '/icons/bold/sim.svg',
    title: 'Sim số đẹp',
    desc: 'SIM NGON đầu số 087',
    link: Routers.SIM
  },
  {
    id: 2,
    icon: '/icons/bold/pack-of-data.svg',
    title: 'Gói cước khủng',
    desc: 'Buffet data chỉ từ 77k',
    link: '/'
  },
  {
    id: 3,
    icon: '/icons/bold/movie.svg',
    title: 'Giải trí đỉnh cao',
    desc: 'Xem phim & Chơi game MIỄN PHÍ',
    link: '/'
  },
  {
    id: 4,
    icon: '/icons/bold/shopping.svg',
    title: 'Thả ga mua sắm',
    desc: 'Thương hiệu lớn, ưu đãi khủng',
    link: Routers.IMALL_DEVICE
  }
];

const digitals = [
  {
    id: 1,
    short_name: 'iFinance',
    name: 'iFinance - Ngân hàng & tài chính',
    icon: '/icons/bold/insurance-finance.svg',
    desc: 'Mở tài khoản ngân hàng nhanh chóng, đăng ký vay tiền dễ dàng.',
    href: Routers.IFINANCE_SERVIVE,
    img: '/images/home/ifinanceService-min.png'
  },
  {
    id: 2,
    short_name: 'iTravel',

    name: 'iTravel - Du lịch & di chuyển',
    icon: '/icons/bold/travel.svg',
    icon2: '/icons/bold/traveling.svg',
    desc: 'Đặt vé di chuyển, book phòng du lịch trong một nốt nhạc.\nTận hưởng kỳ nghỉ tiện lợi, tối ưu cùng khuyến mại của iTel & đối tác.',
    href: Routers.ITRAVEL_SERVIVE,
    img: '/images/home/ITravelService-min.png'
  },
  {
    id: 3,
    short_name: 'iHealth',
    name: 'iHealth - Bảo hiểm & sức khỏe',
    icon: '/icons/bold/itel-health.svg',
    desc: 'Các gói bảo hiểm & chăm sóc sức khỏe tận tâm từ iTel & đối tác.',
    href: Routers.IHEALTH_SERVIVE,
    img: '/images/home/iHealth.png'
  },
  {
    id: 4,
    short_name: 'Vietlott',
    name: 'Xổ số Vietlott',
    icon: '/icons/bold/lottery.svg',
    desc: 'Ghé iTel, gặp vận may đó',
    href: '',
    img: '/images/home/iVietlott.png'
  }
];

const partners = {
  subTitle: 'Hàng ngàn voucher, ưu đãi, đổi điểm nhận quà',
  src1: 'https://res.cloudinary.com/db8mh2s66/image/upload/v1685793112/itel/Block_Image_koduwl.png',
  src2: 'https://res.cloudinary.com/db8mh2s66/image/upload/v1685793120/itel/Block_Image_1_l7upyz.png'
};
interface PageProps {
  banner: string;
  offers: Array<{ title: string; media: { type: 'video' | 'img'; src: string; href: string } }>;
  digitals: Array<{ id: number; short_name: string; name: string; icon: string; desc: string; img: string }>;
  // products: Data.Product[];
}

const data: Array<{
  left: { title: string; desc: string; action_title: string; href: string };
  right: {
    title: string;
    desc: string;
    subtitle: string;
    extra?: string;
    action_title: string;
    href: string;
    items?: Array<{ icon: string; title: string; desc: string }>;
  };
  images: Array<{ src: string; multiple?: number; type?: 'backdrop' }>;
}> = [
  {
    left: {
      title: 'Kho sim khổng lồ',
      desc: 'ITel có một kho sim siêu to khổng lồ <br/> để bạn tha hồ lựa chọn theo sở thích',
      action_title: 'Chọn số ngay',
      href: Routers.SIM
    },
    right: {
      title: 'SỐ ĐẸP DÀNH RIÊNG CHO BẠN',
      desc: 'Sim số đẹp, data khủng, giá cực ngon,<br/>chọn ngay kẻo lỡ',
      subtitle: '087 777 8888',
      action_title: 'Mua ngay',
      href: 'lucky'
    },
    images: [
      {
        src: '/images/home/iconSliderSim1-min.png',
        multiple: 0.05,
        type: 'backdrop'
      },
      { src: '/images/home/iconSlider-min.png' }
    ]
  },
  {
    left: {
      title: 'Buffet Data\ntừ 77K',
      desc: 'Gói cước siêu ưu đãi,<br/>Thả ga hoà mạng, kết nối dễ dàng',
      action_title: 'Chọn gói cước',
      href: '/'
    },
    right: {
      title: 'GÓI THÁNG - ƯU ĐÃI ĐẶC BIỆT',
      subtitle: 'GIAITRI',
      desc: 'Sim số đẹp, data khủng, giá cực ngon,<br/>chọn ngay kẻo lỡ',
      items: [
        { icon: '/icons/bold/pack-of-data.svg', title: 'Data thả ga', desc: '4GB/ ngày' },
        { icon: '/icons/bold/sim.svg', title: 'Ngon, bổ, rẻ', desc: '77.000/ 30 ngày' }
      ],
      action_title: 'Đăng ký ngay',
      href: '/'
    },
    images: [
      {
        src: '/images/home/iconSliderSim-min.png',
        multiple: 0.05,
        type: 'backdrop'
      },
      {
        src: '/images/home/iconSlider2-min.png',
        multiple: 0.1
      }
    ]
  },
  {
    left: {
      title: 'Thần Sim\nphong thủy',
      desc: 'Tuyệt chiêu hút lộc, giải ế đổi vận</br>Triệu hồi ngay thần Sim phong thủy iTel',
      action_title: 'Giải mệnh ngay',
      href: Routers.SIM_FENG_SHUI
    },
    right: {
      title: 'VẬN MỆNH TẶNG BẠN SIM SỐ',
      subtitle: '087 777 8888',
      desc: 'Tra cứu dễ dàng, nhận ngay sim đẹp.</br>May mắn tới tay, tài lộc chờ đón.',
      action_title: 'Xem cát hung',
      href: Routers.SIM_FENG_SHUI
    },
    images: [
      {
        src: '/images/CenterFengShiu.png',
        multiple: 0.05,
        type: 'backdrop'
      },
      { src: '/images/TopFengShiu.png' }
    ]
  }
];

const inviewVariants: Variants = {
  offscreen: {
    opacity: 0
  },
  onscreen: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      type: 'spring',
      bounce: 0.4,
      duration: 0.8
    }
  }
};
const itemVariants: Variants = {
  offscreen: { y: 40, opacity: 0 },
  onscreen: { y: 0, opacity: 1, transition: { duration: 0.3 } }
};
const viewportOptions = { amount: 0.3, margin: '10000px 0px 0px 0px' };
const dotTransition = {
  type: 'spring',
  bounce: 0.4,
  // damping: 300,
  // mass: 0.7,
  duration: 0.8
};

const pramProduct: DataPageDetail = {
  columnFilters: {
    onHome: 1
  },
  sort: [
    {
      field: 'price',
      type: 'desc'
    }
  ],
  page: 1,
  pageSize: 9,
  lang: 1
};
const Home: NextPage<PageProps> = (props) => {
  const { banner, offers } = props;

  const { t } = useTranslation('common');
  const { menu, search } = useGlobalContext();

  const TOTAL_SLIDE_BANNER = 4;

  const slideBanner = useSlider({ totalSlide: TOTAL_SLIDE_BANNER });
  const slideSim = useSlider({ totalSlide: data.length });
  const [dataSlide, setDataSlidde] = useState<ISlider[]>([]);
  const [products, setProducts] = useState<Data.Product[]>([]);
  const router = useRouter();
  const [dataLuckySim, setDataLuckySim] = useState<Model.SimMaster>();
  const { nextStepSelectType } = useSimAction();

  // const [selected, dispatch] = useReducer(reducer, { digital: 0 });

  const slideItem = useSlider({ totalSlide: 4 });
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 50%', 'end end']
  });
  const x = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const y = useTransform(scrollYProgress, [0, 1], [0, -72]);
  const yReverse = useTransform(scrollYProgress, [0, 1], [0, 72]);

  useEffect(() => {
    const getSimData = async () => {
      const luckySimDefault = await homeService.getRandomSim();
      const luckySim = await homeService.getRandomSim();
      data[0]['right']['subtitle'] = luckySimDefault.result.Phone;
      data[2]['right']['subtitle'] = luckySim.result.Phone;
      const luckyToCommon = {
        gift: gift,
        pack: {
          data: coverNamePackToData(luckySimDefault.result.Pack),
          data_type: 'day',
          id: 1,
          name: luckySimDefault.result.Pack,
          price: luckySimDefault.result.PackPrice,
          discount_price: luckySimDefault.result.PackPrice,
          price_type: 'month',
          ThoiGianCamKet: luckySimDefault.result.ThoiGianCamKet
        } as Model.PackOfData,
        tags: [
          { id: 1, name: 'Số may mắn' },
          { id: 2, name: 'Số HOT' }
        ],
        discount_price: luckySimDefault.result.SimPrice + luckySimDefault.result.Price,
        id: parseInt(luckySimDefault.result.Phone),
        is_vip: false,
        phone: luckySimDefault.result.Phone,
        price: (luckySimDefault.result.SimPrice + luckySimDefault.result.Price) * 1.1,
        sale_expiry: null,
        ThoiGianCamKet: luckySimDefault.result.ThoiGianCamKet
      };
      setDataLuckySim(luckyToCommon);
      setDataSlidde(data);
    };

    const getProductHome = async () => {
      const resProduct = await homeService.getProductHome(pramProduct);
      const listProducts = resProduct.result.map((product: Product) => {
        return {
          id: product.id,
          thumbnail: JSON.parse(product.images || '[]')[0].image_url || JSON.parse(product.images || '[]')[0].src,
          name: product.product_name,
          slug: getSlug(product.meta || ''),
          priceRange: {
            max: product.base_price,
            discount_min: product.price
          }
        };
      });
      setProducts(listProducts as Data.Product[]);
    };

    getSimData();
    getProductHome();
  }, []);

  useEffect(() => {
    let timeout = setTimeout(() => {
      slideSim.onSlide(Direction.NEXT);
    }, 10000);
    return () => {
      clearTimeout(timeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slideSim.index, slideSim.onChange, menu.value, search.value]);

  const cover = data[slideSim.index];
  const formatPhoneNumber = (phoneNumberString: string) => {
    var match = phoneNumberString.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return '' + match[1] + ' ' + match[2] + ' ' + match[3];
    }
    return null;
  };

  const getPercent = (price_old: number, price: number) => Math.floor(((price_old - price) / price_old) * 100);

  const randomNumber = () => Math.floor(Math.random() * 500) + 500;

  const getSlug = (json: string): string => {
    return JSON.parse(json).slug;
  };

  const handelerRightMotion = (link: string) => {
    if (link == 'lucky' && dataLuckySim) {
      return nextStepSelectType(dataLuckySim);
    }
    return router.push(link);
  };

  return (
    <>
      <Seo
        title="Itel - Theo là thích"
        description="Nhà phát triển và kiến tạo hệ sinh thái dịch vụ viễn thông, sim số, gói cước, giải trí, tiện ích trên nền tảng số với nhiều ưu đãi hấp dẫn"
      />
      <section>
        <div className="block-img block-tivi-vertical overflow-hidden md:block-photo xl:block-video xl:-mt-28" data-theme="dark">
          <div className="absolute inset-0 h-full w-full">
            <FullCarousel numItems={TOTAL_SLIDE_BANNER} onSlide={slideBanner.onSlide} index={slideBanner.index}>
              <FullCarouselItem
                variants={variantsTranslateWithoutOpacity}
                index={slideBanner.index}
                direction={-slideBanner.direction}
                className="w-full flex-shrink-0 overflow-hidden bg-red-500"
              >
                <Image alt="Banner" className="absolute inset-0 h-full w-full object-cover xl:top-28" src={banner} width={200} height={200}  />
                <div className="hero absolute inset-0" onClick={() => router.push(Routers.SIM)} role="button" />
              </FullCarouselItem>
            </FullCarousel>
            <div className="absolute bottom-3 z-10 w-full">
              <PaginationBullets active={slideBanner.index} total={TOTAL_SLIDE_BANNER} onClick={slideBanner.onChange} />
            </div>
          </div>
        </div>
      </section>
      <section className="bg-neutral-50">
        <div className="container max-xl:px-10 max-md:px-0">
          <ul className="flex">
            {featuredData.map(({ id, icon, title, desc, link }, index) => {
              return (
                <li key={'card_' + id} className="w-1/4">
                  <Link href={link}>
                    <CardFeature bg="/images/home/bgIconMenu-min.png" icon={icon} title={title} desc={desc} />
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
      <section className="bg-neutral-0">
        <motion.div className="container" variants={inviewVariants} initial="offscreen" whileInView="onscreen" viewport={viewportOptions}>
          <div className="py-6 md:py-16 xl:py-28">
            <div>
              <div className="text-center">
                <h2 className="section-title">
                  <motion.div variants={itemVariants}>
                    <span className="text-red-500">ĐỎ Sim số</span>. ĐÃ Data
                  </motion.div>
                  <motion.div variants={itemVariants}>Dành riêng bạn!</motion.div>
                </h2>
              </div>
              <div className="mt-6 md:mt-10 xl:mt-14">
                <div className="flex flex-col  gap-x-[4.5rem] xl:flex-row">
                  <div className="left order-1 flex flex-1 overflow-hidden xl:order-none">
                    {data.map((item, index) => (
                      <div
                        key={index}
                        className={clsx(
                          slideSim.index === index ? 'z-10' : 'opacity-0',
                          'mt-6 w-full flex-shrink-0 text-center transition-opacity duration-1000 xl:mt-0 xl:py-[4.5rem] xl:text-right'
                        )}
                        style={{
                          transform: `translateX(-${100 * index}%)`
                        }}
                      >
                        <div className="inline-block max-w-xs text-xl font-bold xl:text-s-xl">{item.left.title}</div>
                        <div
                          className="hidden font-medium text-neutral-500 xl:mt-6 xl:block"
                          dangerouslySetInnerHTML={{ __html: item.left.desc }}
                        />
                        <div className="hidden items-center xl:mt-[7.75rem] xl:inline-flex">
                          <Link href={item.left.href} className="group font-bold uppercase text-red-500">
                            {item.left.action_title}
                            <Svg src="/icons/bold/right.svg" className="transition-default inline h-10 w-10 group-hover:translate-x-3" />
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="center mx-auto w-full md:w-[20.5rem] xl:w-[25.5rem]">
                    <div className="block-img block-tivi xl:block-tivi-vertical">
                      <FullCarousel
                        numItems={data.length}
                        onSlide={slideSim.onSlide}
                        index={slideSim.index}
                        className="absolute inset-0 h-full w-full"
                        style={{ transformStyle: 'preserve-3d', perspective: '3200px' }}
                      >
                        <FullCarouselItem
                          variants={variantsRotate}
                          index={slideSim.index}
                          direction={slideSim.direction}
                          className="w-full flex-shrink-0 overflow-hidden rounded-2xl bg-red-500 center-by-grid"
                          style={{ backfaceVisibility: 'hidden' }}
                        >
                          {cover.images.map((item, idx) => {
                            return <ImageFollowTrack key={item.src} {...item} />;
                          })}
                        </FullCarouselItem>
                      </FullCarousel>
                      <div className="hidden xl:block">
                        <motion.div
                          animate={{ top: ['20%', '90%', '30%'][slideSim.index] }}
                          transition={dotTransition}
                          className="top absolute right-0 top-0 translate-x-1/2"
                        >
                          <div className="h-10 w-10 rounded-full bg-pink-orange"></div>
                        </motion.div>
                        <motion.div
                          animate={{ top: ['90%', '25%', '70%'][slideSim.index] }}
                          transition={dotTransition}
                          className="absolute left-0 top-0 -translate-x-1/2"
                        >
                          <div className="h-10 w-10 rounded-full bg-yellow-400"></div>
                        </motion.div>
                      </div>
                    </div>
                  </div>
                  <div className="right order-2 flex flex-1 overflow-hidden xl:order-none">
                    {data.map((item, index) => (
                      <div
                        key={index}
                        className={clsx(
                          slideSim.index === index ? 'z-10' : 'opacity-0',
                          'w-full flex-shrink-0 text-center transition-opacity duration-1000 xl:py-[4.5rem] xl:text-left'
                        )}
                        style={{
                          transform: `translateX(-${100 * index}%)`
                        }}
                      >
                        <div className="text-base font-bold text-red-500 xl:text-xl">{item.right.title}</div>
                        <div className="mt-1 text-s-sm font-bold xl:mt-3 xl:text-s-l">
                          {formatPhoneNumber(item.right.subtitle)}
                          {item.right.extra && <span className="xl:hidden">{item.right.extra}</span>}
                        </div>
                        <div
                          className="text-md hidden font-medium text-neutral-500 xl:mt-6 xl:block"
                          dangerouslySetInnerHTML={{ __html: item.right.desc }}
                        />
                        {item.right.items && (
                          <div className="mt-4 space-y-10 max-xl:hidden xl:mt-6">
                            {item.right.items.map((item) => (
                              <div className="flex gap-4" key={item.title}>
                                <div className="menu-icon flex items-center justify-center text-red-500">
                                  <Svg src={item.icon} className="h-8 w-8" />
                                </div>
                                <div className="flex-1">
                                  <div className="text-neutral-500">{item.title}</div>
                                  <p className="text-xl font-bold">{item.desc}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                        <div
                          onClick={() => handelerRightMotion(item.right.href)}
                          className="btn-primary btn btn-lg mt-6 rounded-full xl:mt-18"
                        >
                          {item.right.action_title}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mt-6">
                  <PaginationBullets active={slideSim.index} total={data.length} onClick={slideSim.onChange} />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>
      <NewsHome />
      <section className="bg-neutral-0 overflow-hidden">
        <div className="container pb-4 pt-6 max-xl:max-w-full max-xl:px-0 md:py-16 xl:py-28 xl:pt-[7.375rem]">
          <div className="flex flex-col xl:flex-row">
            <div className="relative z-10 mr-27 w-full xl:max-w-[32.25rem]">
              <motion.div
                className="section-title hidden px-8 md:px-16 xl:block xl:px-0 xl:!text-left"
                variants={inviewVariants}
                initial="offscreen"
                whileInView="onscreen"
                viewport={viewportOptions}
              >
                <h2>
                  <motion.p variants={itemVariants} className="inline break-words xl:block">
                    Muôn vàn
                  </motion.p>
                  <motion.p variants={itemVariants} className="inline break-words xl:block">
                    dịch vụ số
                  </motion.p>
                </h2>
                <motion.span
                  variants={itemVariants}
                  className="mt-1 inline font-itel font-bold tracking-tight text-red-500 xl:block xl:text-h0"
                >
                  iDigital
                </motion.span>
              </motion.div>
              <motion.div
                className="section-title px-8 md:px-16 xl:hidden xl:px-0 xl:!text-left"
                variants={inviewVariants}
                initial="offscreen"
                whileInView="onscreen"
                viewport={viewportOptions}
              >
                <motion.h2 variants={itemVariants} className="break-words">
                  Muôn vàn
                </motion.h2>
                <motion.span variants={itemVariants} className="mt-1 font-itel font-bold tracking-tight xl:text-h0">
                  dịch vụ số <span className="text-red-500">iDigital</span>
                </motion.span>
              </motion.div>
              <div className="mt-6 bg-neutral-100 md:mt-10 xl:mt-29 xl:bg-transparent">
                <motion.ul
                  variants={inviewVariants}
                  initial="offscreen"
                  whileInView="onscreen"
                  viewport={viewportOptions}
                  className="menu-border menu font-bold max-xl:hidden"
                >
                  {digitals.map(({ id, icon, name }, index) => {
                    let _index = slideItem.index;
                    return (
                      <motion.li
                        key={id}
                        variants={itemVariants}
                        className={clsx('group', { 'menu-active': index === slideItem.index })}
                        onMouseOver={() => slideItem.onChange(index)}
                        onMouseOut={() => {
                          slideItem.onChange(_index);
                        }}
                      >
                        <div className="px-8 py-6">
                          <Svg className="menu-icon bg-transparent" src={icon} />
                          <div className="flex-1 text-left">{name}</div>
                          <Svg className="menu-icon-arrow h-8 w-8" src="/icons/line/arrow-right.svg" />
                        </div>
                      </motion.li>
                    );
                  })}
                  <motion.li variants={itemVariants} className="hidden xl:block">
                    {/* <ButtonViewAll /> */}
                    <button
                      onClick={() => router.push(Routers.ITRAVEL_SERVIVE)}
                      className="transition-default btn-ghost btn btn-lg my-2 justify-normal rounded-none border-b-0 px-8"
                    >
                      Xem tất cả
                      <Svg src="/icons/line/arrow-right.svg" className="inline h-6 w-6 text-red-500" />
                    </button>
                  </motion.li>
                </motion.ul>
                <ul className="flex w-full xl:hidden">
                  {digitals.map(({ id, icon, icon2, short_name, img }, index) => {
                    return (
                      <li key={'card_' + id} className="w-1/4">
                        <button type="button" className="w-full" onClick={() => slideItem.onChange(index)}>
                          <CardFeature icon={icon2 || icon} title={short_name} isActive={index === slideItem.index} />
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
            <div className="mt-6 flex-1 px-8 md:mt-10 md:px-16 xl:mt-0 xl:px-0">
              <div className="block-img block-square">
                <div className="absolute left-[-10%] top-[-10%] h-[120%] w-[120%]">
                  {digitals.map(({ id, img }, index) => {
                    return (
                      <Image
                        width={100}
                        height={200}

                        key={'digital_image_' + id}
                        className={clsx(
                          {
                            'translate-x-1/4 opacity-0': index > slideItem.index,
                            '-translate-x-1/4 opacity-0': index < slideItem.index
                          },
                          'absolute inset-0 h-full w-full object-cover transition-all duration-500'
                        )}
                        src={img}
                        alt="money"
                      />
                    );
                  })}
                </div>
              </div>
              <div className="-mt-[5.875rem]">
                <CardDigital
                  title={digitals[slideItem.index].name}
                  desc={digitals[slideItem.index].desc}
                  onClick={() => {
                    !digitals[slideItem.index].href ? showVietllot() : router.push(digitals[slideItem.index].href);
                  }}
                />
              </div>
            </div>
            <div className="mt-4 flex w-full justify-center md:mt-6 xl:hidden">
              <ButtonViewAll />
            </div>
          </div>
        </div>
      </section>
      <section ref={ref} className="relative overflow-hidden">
        <div className="container py-6 max-xl:max-w-full max-xl:px-0 md:py-16 xl:py-28">
          <div className="absolute right-0 translate-x-56">
            {/* Oppo icon */}
            <motion.svg width="1330" height="322" viewBox="0 0 1330 322" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ x }}>
              <path
                opacity="0.8"
                d="M338.16 166.61V11.2748H385.737V21.5413C385.737 27.1892 385.821 31.8094 385.924 31.8094C386.028 31.8094 389.03 29.948 392.597 27.6734C434.674 0.838703 495.841 -7.24259 550.701 6.78618C600.126 19.4257 635.957 49.4279 648.694 88.8431C656.137 111.876 655.727 137.49 647.557 159.765C637.396 187.474 616.505 209.752 586.373 225.014C560.004 238.37 529.897 245.057 496.143 245.057C468.161 245.057 442.064 240.305 419.091 231.03C409.976 227.35 398.291 221.308 391.203 216.609L385.737 212.986V321.948H338.16V166.61ZM519.156 203.761C545.917 199.896 566.68 191.25 582.247 177.491C594.031 167.076 602.237 152.611 605.346 136.775C606.618 130.298 606.621 115.004 605.354 108.547C601.693 89.91 591.205 73.6309 575.505 62.2157C569.177 57.6151 556.322 51.0577 548.117 48.2475C524.946 40.3114 496.852 37.9612 471.12 41.8066C426.445 48.482 396.25 71.0446 388.149 103.8C384.574 118.252 385.213 133.855 389.937 147.49C400.664 178.464 432.302 199.076 477.01 204.219C485.999 205.255 510.678 204.985 519.157 203.761H519.156ZM676.882 166.61V11.2748H724.457V21.5413C724.457 27.1892 724.561 31.8094 724.686 31.8094C724.812 31.8094 727.43 30.1402 730.503 28.1017C737.616 23.3801 751.654 16.3188 760.656 12.9364C799.514 -1.6674 846.96 -4.02369 888.48 6.59095C956.163 23.8931 996.02 71.2958 992.257 130.014C989.384 174.835 960.094 211.652 911.918 231C896.202 237.31 880.097 241.29 859.941 243.844C849.302 245.19 820.631 245.19 809.526 243.84C778.093 240.022 750.498 230.518 728.981 216.101L724.457 213.07V321.948H676.882V166.61ZM859.03 203.532C896.092 197.897 922.21 182.694 935.934 158.767C943.906 144.869 946.891 126.38 943.935 109.214C937.789 73.5355 906.994 48.8467 859.845 41.7991C828.726 37.1485 793.591 41.7809 769.707 53.6834C745.326 65.8341 730.652 83.9746 725.643 108.161C724.329 114.511 724.332 130.834 725.651 137.057C729.198 153.81 737.217 167.671 749.386 178.087C766.142 192.43 787.951 200.972 816.249 204.274C825.61 205.365 849.721 204.947 859.03 203.532ZM141.648 244.736C116.412 242.466 94.8717 237.404 76.5552 229.438C34.8927 211.319 8.57864 180.737 1.43721 142.137C0.0728362 134.766 -0.447352 118.157 0.436967 110.221C5.59425 63.9439 39.0735 27.2891 92.0048 9.96875C120.172 0.752443 154.843 -2.25913 185.965 1.80876C242.982 9.26353 286.112 36.1845 305.069 76.1536C320.505 108.697 318.546 148.227 299.992 178.618C291.633 192.308 277.874 206.437 263.693 215.886C241.631 230.587 215.282 239.732 183.278 243.795C176.868 244.609 147.595 245.271 141.648 244.736ZM175.398 204.269C200.216 201.588 221.093 194.372 236.801 183.052C249.642 173.797 259.805 160.155 264.365 146.052C267.034 137.798 267.563 133.923 267.563 122.642C267.563 111.395 267.042 107.551 264.393 99.2913C255.688 72.1402 230.229 51.9431 194.655 43.9707C163.465 36.979 127.091 39.4095 100.142 50.2829C80.6989 58.1281 65.3533 70.8282 56.3526 86.5186C46.7842 103.203 44.6113 125.928 50.7168 145.512C57.2949 166.614 74.6231 184.273 98.4685 194.178C111.457 199.573 127.538 203.334 143.459 204.696C149.567 205.218 169.018 204.958 175.398 204.269ZM1156.78 244.755C1155.79 244.64 1152.29 244.285 1149.02 243.971C1122.76 241.436 1095.15 232.991 1074.91 221.302C1047.55 205.5 1028.49 183.039 1019.79 156.342C1013.9 138.275 1012.89 117.971 1016.96 99.2897C1023.12 71.0431 1040 47.058 1066.22 29.3185C1100.81 5.92508 1151.65 -4.46559 1200.74 1.83298C1241.52 7.06463 1275.12 22.2511 1298.49 46.0198C1316.3 64.121 1326.53 85.3321 1329.49 110.254C1330.26 116.731 1330.14 129.829 1329.25 136.701C1322.83 186.189 1284.3 224.014 1225.3 238.75C1207.41 243.217 1196.18 244.57 1175.14 244.791C1166.04 244.886 1157.78 244.87 1156.78 244.755ZM1188.07 204.515C1219.48 201.573 1245.09 191.031 1261.52 174.273C1272.65 162.928 1279.11 150.438 1281.66 135.342C1282.71 129.122 1282.69 116.155 1281.63 109.703C1275.9 74.9687 1245.82 49.7896 1201.25 42.4241C1190.55 40.655 1183.44 40.0784 1172.3 40.0784C1122.33 40.0784 1083.56 59.2631 1068.65 91.3659C1064.2 100.935 1062.15 110.809 1062.15 122.642C1062.15 138.256 1065.72 150.639 1073.79 162.978C1088.6 185.629 1116.69 200.1 1153.86 204.235C1161.53 205.087 1180.32 205.241 1188.07 204.516L1188.07 204.515Z"
                fill="white"
              />
            </motion.svg>
          </div>

          <div className="relative">
            <motion.div
              className="text-center"
              variants={inviewVariants}
              initial="offscreen"
              whileInView="onscreen"
              viewport={viewportOptions}
            >
              <h2 className="section-title">
                <motion.div variants={itemVariants}>Sắm đồ công nghệ</motion.div>
                <motion.div variants={itemVariants}>
                  <span className="text-red-500">Ghé shop itel</span>
                </motion.div>
              </h2>
              <motion.p className="text-sm text-subtle-content md:mt-3 xl:mt-4" variants={itemVariants}>
                Thương hiệu lớn, ưu đãi khủng
              </motion.p>
            </motion.div>
            <motion.div variants={inviewVariants} initial="offscreen" whileInView="onscreen" viewport={viewportOptions}>
              <div className="flex gap-x-6 overflow-x-auto overflow-y-hidden px-6 pb-10 pt-16 scrollbar-hide md:gap-x-8 md:px-16 xl:-mx-8 xl:gap-x-10 xl:px-8">
                {products.slice(0, 4).map((product, idx) => {
                  return (
                    <Link
                      href={{ pathname: Routers.IMALL_DETAIL, query: { slug: product.slug } }}
                      prefetch={false}
                      key={product.id}
                      className="w-56 odd:mt-18 md:w-60 xl:w-1/4"
                    >
                      <motion.div variants={{ onscreen: { opacity: 1 }, offscreen: { opacity: 0 } }} style={{ y: idx % 2 ? yReverse : y }}>
                        <CardProduct className="bg-neutral-0" img={product.thumbnail} title={product.name} data={product}>
                          <CardProduct.Tags data={product.tags} />
                          <div className="space-y-2">
                            <h5 className="card-title font-bold xl:text-xl">{product.name}</h5>
                            <div className="price-info align-bottom">
                              <span className="price block">
                                <span>{toCurrency(product?.priceRange?.discount_min || 100)}</span>
                                <span className="ml-2 text-sm text-subtle-content">
                                  <s>{toCurrency(product?.priceRange?.max || 100)}</s>
                                </span>
                              </span>
                            </div>
                            <RatingProduct rate={5.0} sold={randomNumber()} />
                            <div className="card-actions hidden md:flex">
                              <button className="btn-secondary btn rounded-full">Mua ngay</button>
                            </div>
                          </div>
                          <CardProduct.Badge value={30} />
                        </CardProduct>
                      </motion.div>
                    </Link>
                  );
                })}
              </div>
              <div className="flex w-full justify-center">
                <ButtonViewAll href={Routers.IMALL_DEVICE} />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-6 md:py-16 bg-neutral-0">
        <div className="container">
          <div className="text-center">
            <h2 className="uppercase text-neutral-800 font-itel text-h-sm md:text-h-xl font-bold">
              <motion.div variants={itemVariants}>
                Đối tác
                <span className="text-red-500 uppercase font-itel">
                  {' '}
                  của iT<span className="lowercase">e</span>l
                </span>
              </motion.div>
            </h2>
            <motion.p className="text-neutral-500 text-sm md:text-base md:mt-3 xl:mt-4" variants={itemVariants}>
              {partners.subTitle}
            </motion.p>
          </div>
          <div className="flex gap-6 md:mt-14 mt-6 justify-center">
            <div>
              <Image src={partners.src1} loading="lazy" alt="parner" width={302} height={151} />
            </div>
            <div>
              <Image src={partners.src2} loading="lazy" alt="parner" width={302} height={151} />
            </div>
          </div>
          <div className="mt-6 md:mt-8 xl:mt-18">
            <button className="btn-primary btn btn-sm md:btn-lg block mx-auto rounded-full">Trở thành đối tác</button>
          </div>
        </div>
      </section>
      {/* <section className="bg-neutral-50">
        <div className="pb-4 pt-6 md:py-16 xl:py-28 xl:pt-[7.375rem]">
          <div className="text-center">
            <h2 className="section-title break-words">
              Ngập tràn ưu đãi
              <br />
              cùng <span className="text-red-500">iWOW</span>
            </h2>
          </div>
          <motion.div variants={inviewVariants} initial="offscreen" whileInView="onscreen" viewport={viewportOptions}>
            <Drag
              // as={motion.div}
              className="mt-10 flex select-none gap-x-12 overflow-x-auto overflow-y-hidden px-20 scrollbar-hide xl:mt-18"
            >
              {offers.map(({ media: { type: Element, src, href }, title }, index) => {
                const props = Element === 'video' ? { autoPlay: true, muted: true, loop: true } : {};
                return (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="group banner w-[13.5rem] flex-shrink-0 odd:flex-col-reverse md:w-[18rem] xl:w-[20.5rem]"
                  >
                    <figure className="">
                      <div className="block-img block-photo-vertical overflow-hidden rounded-2xl">
                        <Element
                          className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                          src={src}
                          alt={title}
                          width={328}
                          height={492}
                          {...props}
                          draggable={false}
                          onClick={() => router.push(href)}
                        />
                      </div>
                    </figure>
                    <div className="banner-title whitespace-pre-line group-hover:text-red-500">{title}</div>
                  </motion.div>
                );
              })}
            </Drag>
          </motion.div>
          <div className="mt-4 text-center md:mt-6 xl:mt-18">
            <ButtonViewAll href={Routers.PROMOTION_ICLUB} />
          </div>
        </div>
      </section> */}
      <SectionSupports />
    </>
  );
};

const ButtonViewAll = ({ href = Routers.HOME }: { href?: string }) => {
  return (
    <Link
      href={href}
      className="group transition-default btn-ghost btn gap-2 rounded-full hover:bg-transparent active:text-red-500 active:transition-none"
    >
      Xem tất cả
      <Svg src="/icons/line/arrow-right.svg" className=" inline h-6 w-6 text-red-500 transition-all group-hover:translate-x-3" />
    </Link>
  );
};

const logger = new Logger('Home');
const ImageFollowTrack = (props: { src: string; multiple?: number; type?: 'backdrop' }) => {
  const refImg = useFollowMouse<HTMLImageElement>({ multiple: props.multiple }, []);
  return (
    <div className={clsx('absolute h-full', props.type === 'backdrop' && 'w-[130%]')}>
      <img ref={refImg} src={props.src} draggable={false} className="h-full object-cover" alt="cover" />
    </div>
  );
};

Home.getLayout = function (page) {
  return (
    <>
      <LayoutDefault isHomePage footerClassName="bg-neutral-0">
        {page}
      </LayoutDefault>
    </>
  );
};

const params = {
  columnFilters: {},
  sort: [],
  page: 1,
  pageSize: 5,
  lang: 1
};

const getStaticProps = getServerPropsWithTranslation<PageProps>(() => {
  return {
    props: {
      banner: '/images/home/banner-min.png',
      offers: [
        {
          title: 'Movie với hàng ngàn ưu đãi.\n Xem phim thả ga',
          media: {
            type: 'img',
            src: 'images/bannerIWow1.png',
            href: Routers.PROMOTION_ICLUB
          }
        },
        {
          title: 'Tiktok content\n',
          media: {
            type: 'video',
            src: '/videos/homeTiktok.mp4',
            href: ''
          }
        },
        {
          title: 'Phim hot tháng 10\n Assassination the queen\n',
          media: {
            type: 'img',
            src: 'images/bannerIWow2.png',
            href: ''
          }
        },
        {
          title: 'Xả láng game hot\nĐua top đỉnh cao\n',
          media: {
            type: 'img',
            src: 'images/bannerIWow3.png',
            href: ''
          }
        },
        {
          title: 'Săn deal giờ vàng\nChơi Tết xả láng\n',
          media: {
            type: 'img',
            src: 'images/bannerIWow4.png',
            href: ''
          }
        },
        {
          title: 'Check in liền tay\nVòng quay Zui Zẻ\n',
          media: {
            type: 'img',
            src: 'images/bannerIWow5.png',
            href: ''
          }
        },
        {
          title: 'Tiktok content \n',
          media: {
            type: 'img',
            src: 'images/bannerIWow6.png',
            href: ''
          }
        }
      ],
      digitals
      // products:await getListProduct({ limit: 8 })
    } // will be passed to the page component as props
  };
});

export default Home;
export { getStaticProps };

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
