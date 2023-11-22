import getServerPropsWithTranslation from '@/i18n/getServerPropsWithTranslation';
import Routers from '@/routes/routers';
import { NextPage } from 'next';
import Link from 'next/link';

import { variantsTranslateWithoutOpacity } from '@/components/carousel/carousel-variants';
import FullCarousel, { FullCarouselItem } from '@/components/carousel/full-carousel';
import PaginationBullets from '@/components/pagination/pagination-bullets';
import SectionGenuineBrand from '@/components/section/setionc-genuine-brand';
import { Layout } from '../device';

import useSlider from '@/hooks/useSlider';

import { ImageService } from '@/services/image/image';
import HeaderMobileWeb from '@/components/header/header-mobile-web';
import HeaderWebDefault from '@/components/header/header-web-default';
import Head from 'next/head';
import LayoutImall from '@/components/layout/layout-imall';
import ChatBoxLazy from '@/components/chat/chat-box-lazy';

type FashionPageProps = {
  events: Array<{
    id: number;
    name: string;
    desc: string;
    thumbnail: string;
  }>;
};

const FashionPage: NextPage<FashionPageProps> = ({ events, router }) => {
  const TOTAL_SLIDE_BANNER = 3;
  const slider = useSlider({ totalSlide: TOTAL_SLIDE_BANNER, loop: 10000 });

  return (
    <>
      <Head>
        <title>Imall - Thời trang</title>
      </Head>
      <HeaderWebDefault title="Thời trang" withCart withMenu withSearch />
      <section className="max-md:hidden md:bg-neutral-0">
        <div className="container">
          <div className="breadcrumbs text-sm text-neutral-500">
            <ul aria-label="Breadcrumb">
              <li>
                <Link href={Routers.HOME}> Trang chủ </Link>
              </li>
              <li>
                <Link href={Routers.IMALL}>iMall</Link>
              </li>
              <li className="text-neutral-800">
                <Link href={router.asPath}>Thời trang</Link>
              </li>
            </ul>
          </div>
        </div>
      </section>
      <section className="bg-neutral-0 py-2 px-4 md:p-0">
        <div className="block-img block-cinema md:block-tivi overflow-hidden xl:block-banner rounded-2xl md:rounded-none" data-theme="dark">
          <FullCarousel index={slider.index} numItems={TOTAL_SLIDE_BANNER} onSlide={slider.onSlide}>
            <FullCarouselItem
              direction={-slider.direction}
              index={slider.index}
              variants={variantsTranslateWithoutOpacity}
              className="cursor-pointer"
            >
              <img
                src="https://res.cloudinary.com/dt1oay7cv/image/upload/v1683174103/itel/banner/96311db03bc494afc9c36597f4dd6d0a_r3miyp.png"
                loading="lazy"
                draggable={false}
                className="h-full w-full select-none object-cover"
                alt="banner"
              />
            </FullCarouselItem>
          </FullCarousel>
          <div className="absolute bottom-3 z-10 w-full">
            <PaginationBullets active={slider.index} total={TOTAL_SLIDE_BANNER} onClick={slider.onChange} />
          </div>
        </div>
      </section>
      <section className="bg-neutral-0">
        <div className="container">
          <div className="py-6 md:pb-28 md:pt-20">
            <h2 className="font-itel text-lg md:text-h4 font-bold  xl:text-center xl:text-h2">Chương trình hấp dẫn</h2>
            <div className="-mx-5 flex flex-wrap">
              {events.map((event) => {
                return (
                  <div key={event.id} className="mt-3 md:mt-8 px-5 xl:mt-14 xl:w-1/2">
                    <div className="card card-side bg-base-100">
                      <figure className="w-29 md:w-80 shrink-0 overflow-hidden">
                        <div className="h-full overflow-hidden relative">
                          <img src={event.thumbnail} alt={event.name} className="absolute inset-0 object-cover h-full w-full" />
                        </div>
                      </figure>
                      <div className="card-body justify-center md:justify-between">
                        <div>
                          <h5 className="card-title text-sm md:text-lg xl:text-xl font-bold">{event.name}</h5>
                          <p className="card-desc mt-2 line-clamp-2 text-xs md:text-sm">{event.desc}</p>
                        </div>
                        <div className="max-md:hidden mt-6">
                          <Link href={router.asPath + '#'} className="btn-secondary btn btn-sm rounded-full">
                            Mua ngay
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
      <SectionGenuineBrand className="mt-2 md:mt-0 py-6 md:py-10 xl:py-16" href="/" />
    </>
  );
};
FashionPage.getLayout = function Layout(page: any) {
  return (
    <>
      <LayoutImall footerClassName="bg-neutral-50">{page}</LayoutImall>
      <ChatBoxLazy />
    </>
  );
};

const getStaticProps = getServerPropsWithTranslation<FashionPageProps>(async () => {
  return {
    props: {
      events: Array.from({ length: 6 }, (_, id) => ({
        id,
        name: 'Lướt thẻ nhận Deal vàng – Rộn ràng khai xuân',
        desc: 'Tưng bừng đón năm mới, cùng OCB tận hưởng Deal hoàn tiền cực HOT lên đến 1.000.000 VNĐ.',
        thumbnail: ImageService.random()
      }))
    },
    // revalidate: 8600
  };
});
export default FashionPage;
export { getStaticProps };
