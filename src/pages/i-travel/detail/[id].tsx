import CardNewsProduct from '@/components/card/card-news-product';
import CardVoucherHot from '@/components/card/card-voucher-hot';
import HeaderAppDefault from '@/components/header/header-app-default';
import HeaderWebDefault from '@/components/header/header-web-default';
import Svg from '@/components/icon/svg';
import { LayoutWithChatBox } from '@/components/layout/layout-default';
import SectionSupports from '@/components/section/section-supports';

import { useWindowScrollPositions } from '@/hooks/useWindowScrollPosition';
import getServerPropsWithTranslation from '@/i18n/getServerPropsWithTranslation';

import Routers from '@/routes';
import newsService, { INews } from '@/services/news/news';

import clsx from 'clsx';
import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';

type PageProps = {
  similarNews?: INews[];
};

const tags = ['Hướng dẫn', 'Mua Sim', 'Sim mới', 'Tin hot', 'Chương trình hot'];

const ITravelDetail: NextPage<PageProps> = ({ similarNews, router }) => {
  const { scrollY } = useWindowScrollPositions();

  return (
    <>
      <Head>
        <title>{`Bài viết - Ưu đãi các tuyến đường HOT lên đến 50%`}</title>
      </Head>

      {scrollY > 2 ? (
        <HeaderWebDefault title="Dịch vụ số" withSearch withMenu />
      ) : (
        <HeaderAppDefault title="Ưu đãi các tuyến đường HOT lên đến 50%" mode="close" onClose={router.back} />
      )}
      <section className="bg-neutral-0">
        <div className="container">
          <div className="breadcrumbs text-xs md:text-sm text-neutral-500">
            <ul aria-label="Breadcrumb">
              <li>
                <Link href={Routers.HOME}>Trang chủ</Link>
              </li>
              <li>
                <Link href={Routers.SIM} className="max-md:hidden">
                  Dịch vụ khác
                </Link>
                <span className="md:hidden">...</span>
              </li>
              <li>
                <Link href={Routers.SIM_FENG_SHUI}>iTel Du lịch</Link>
              </li>
              <li className="overflow-hidden text-neutral-800">
                <Link href={router.asPath} className="truncate">
                  Ưu đãi các tuyến đường HOT lên đến 50%
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </section>
      <div className="bg-neutral-0">
        <section className="container flex pb-4 pt-0 md:py-10 gap-10">
          <div className="description w-full xl:w-2/3 text-neutral-500">
            <p className="text-base">Vexere • 09/03/2023</p>
            <h2 className="font-bold text-2xl md:text-h4 xl:text-h3 my-2">Ưu đãi các tuyến đường HOT lên đến 50%</h2>
            <p className="text-base mb-4">
              Lấy việc giúp đỡ người khác làm mục tiêu sống, đồng cảm với nỗi đau khổ, mất mát của người khác...
            </p>

            <iframe
              src="https://www.youtube.com/embed/oc8Xs--IncM"
              title="Itel Vision2 Series with Jak Roberto | Itel Mobile Philippines"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="w-full aspect-video rounded-2xl mb-4"
            ></iframe>
            <p className="text-sm mb-6 text-center">Khám phá chương trình mua sim tại iTel</p>

            <h3 className="text-xl font-bold mb-4">Sim đẹp trên iTel</h3>
            <p className="text-base mb-6">
              iTel có vô vàn Sim só đẹp. Ngoài ra iTel còn có kho Sim không lồ theo số phong thủy, thần số học, việc tra cứu tìm kiếm giúp
              tìm kiếm Sim phù hợp với bạn trở nên dễ dàng hơn bao giờ hết. Hãy cùng khám phá các cách chọn sim phù hợp cho bạn nhé
            </p>

            <h3 className="text-xl font-bold mb-4">Bước 1. Tìm kiếm Sim bằng search và bộ lọc</h3>
            <p className="text-base mb-4">
              iTel có vô vàn Sim só đẹp. Ngoài ra iTel còn có kho Sim không lồ theo số phong thủy, thần số học, việc tra cứu tìm kiếm giúp
              tìm kiếm Sim phù hợp với bạn trở nên dễ dàng hơn bao giờ hết. Hãy cùng khám phá các cách chọn sim phù hợp cho bạn nhé.{' '}
            </p>
            <p className="text-base mb-6">
              iTel có vô vàn Sim só đẹp. Ngoài ra iTel còn có kho Sim không lồ theo số phong thủy, thần số học, việc tra cứu tìm kiếm giúp
              tìm kiếm Sim phù hợp với bạn trở nên dễ dàng hơn bao giờ hết. Hãy cùng khám phá các cách chọn sim phù hợp cho bạn nhé. iTel có
              vô vàn Sim só đẹp. Ngoài ra iTel còn có kho Sim không lồ theo số phong thủy, thần số học, việc tra cứu tìm kiếm giúp tìm kiếm
              Sim phù hợp với bạn trở nên dễ dàng hơn bao giờ hết.
            </p>
            <iframe
              src="https://www.youtube.com/embed/oc8Xs--IncM"
              title="Itel Vision2 Series with Jak Roberto | Itel Mobile Philippines"
              frameBorder="0"
              allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="w-full aspect-video rounded-2xl mb-4"
            />
            <p className="text-sm mb-6 text-center">Khám phá chương trình mua sim tại iTel</p>
            <h3 className="text-xl font-bold mb-4">Thông báo gia hạn chương trình mua sim mới tài lộc phơi phới</h3>
            <p className="text-base mb-6">
              iTel có vô vàn Sim só đẹp. Ngoài ra iTel còn có kho Sim không lồ theo số phong thủy, thần số học, việc tra cứu tìm kiếm giúp
              tìm kiếm Sim phù hợp với bạn trở nên dễ dàng hơn bao giờ hết. Hãy cùng khám phá các cách chọn sim phù hợp cho bạn nhé. iTel có
              vô vàn Sim só đẹp. Ngoài ra iTel còn có kho Sim không lồ theo số phong thủy, thần số học, việc tra cứu tìm kiếm giúp tìm kiếm
              Sim phù hợp với bạn trở nên dễ dàng hơn bao giờ hết.{' '}
            </p>
            <div className="flex gap-2 flex-wrap">
              {tags.map((tag) => (
                <div key={tag} className="rounded-3xl border border-neutral-300 px-3 md:px-4 py-2 md:py-3 cursor-pointer text-neutral-800">
                  {tag}
                </div>
              ))}
            </div>
          </div>
          <div className="ads hidden xl:flex md:w-1/3 rounded-2xl overflow-hidden relative h-fit">
            <img src="/images/banner-news-sim.png" alt="banner" className="w-full h-full" />
            <div className="absolute top-0 left-0 p-8 h-full">
              <h3 className="font-bold text-[32px] leading-10 mb-2">Bạn đã sẵn sàng chọn số, mua Sim?</h3>
              <p className="text-sm xl:text-base text-neutral-500 mb-8">Cùng Anh iTel đi liền thôiiiiii! Gét gô</p>

              <Link href={Routers.SIM} className="btn btn-lg rounded-full btn-primary py-4 px-14">
                Gét gô!
              </Link>
            </div>
          </div>
        </section>
        <div className="md:bg-neutral-50 py-4 md:py-20">
          <section className="container">
            <div className="flex items-center">
              <h2 className="md:font-itel flex-1 text-xl md:text-h4 font-bold xl:text-h3 text-center font-itel">Chương trình hấp dẫn</h2>
            </div>
            <div className="mt-3 md:mt-10 md:grid grid-cols-2 md:gap-6 gap-3 lg:grid-cols-3 hidden">
              {similarNews?.map((item, index) => (
                <CardNewsProduct
                  href={Routers.ITRAVEL_SERVIVE_DETAIL}
                  isShowButton
                  key={item.id}
                  {...item}
                  className={`bg-neutral-50 rounded-xl ${index > 2 && 'lg:hidden'}`}
                  classNameFrame="rounded-xl aspect-video"
                  classNameDes=""
                />
              ))}
            </div>
            {/* mobile */}
            <div className="mt-3 md:mt-10 md:hidden overflow-auto scrollbar-hide">
              <div className="flex w-max gap-3">
                {similarNews?.map((item, i) => (
                  <CardVoucherHot
                    href={Routers.ITRAVEL_SERVIVE_DETAIL}
                    title={item.name}
                    time={''}
                    img={item.image}
                    brand={''}
                    genre={''}
                    classWrap="!pt-2"
                    classNameTitle="line-clamp-2 text-sm font-bold"
                    key={item.id}
                    className={clsx('col-span-2 row-span-2 !rounded-none max-w-[144px]')}
                    iShowButton={false}
                    classNameFrame={clsx('aspect-photo !rounded-lg')}
                    classImg="!rounded-lg"
                    classBrand="hidden"
                    id={Number(item.id)}
                  />
                ))}
              </div>
            </div>
            {/*  */}
          </section>
        </div>
        <div className="md:hidden">
          <SectionSupports />
        </div>
      </div>
    </>
  );
};

const HeaderStiky = ({ title }: { title: string }) => {
  const router = useRouter();
  return (
    <div className="md:hidden bg-neutral-0 container h-16 flex items-center sticky top-0 gap-4 font-bold">
      <button
        type="button"
        className={clsx('')}
        onClick={() => {
          router.back();
        }}
      >
        <Svg src={'/icons/line/close.svg'} width={24} height={24} />
      </button>
      <p className="text-lg line-clamp-1">{title}</p>
    </div>
  );
};

const getStaticProps = getServerPropsWithTranslation<PageProps>(async () => {
  const category = {
    path: 'string',
    name: 'string',
    routeName: 'string'
  };
  const news = newsService.getNewsDetailById('1');
  const similarNews = await newsService.getNews({ limit: 4 });

  return {
    props: {
      similarNews: similarNews
    }
  };
});

export async function getStaticPaths() {
  return {
    paths: [{ params: { id: '2' } }, { params: { id: '3' } }],
    fallback: false // can also be true or 'blocking'
  };
}

ITravelDetail.getLayout = LayoutWithChatBox;
export default ITravelDetail;

export { getStaticProps };
