import BannerItems from '@/components/banner/banner-items';
import CardProduct from '@/components/card/card-product';
import getServerPropsWithTranslation from '@/i18n/getServerPropsWithTranslation';

import clsx from 'clsx';
import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';

import BannerAdvertising from '@/components/banner/banner-advertising';
import ChatBoxLazy from '@/components/chat/chat-box-lazy';
import LayoutImall from '@/components/layout/layout-imall';
import ListProduct from '@/components/list/list-product';
import SectionProduct from '@/components/section/section-products';
import SectionSupports from '@/components/section/section-supports';
import Routers from '@/routes/routers';

import { getListProduct } from '@/services/product/product';

import CardFeature from '@/components/card/card-feature';
import SectionGenuineBrand from '@/components/section/setionc-genuine-brand';
import { Data } from '@/types/model';

type PageProps = {
  features: Array<{
    id: number;
    icon: string;
    title: string;
    desc: string;
  }>;
  products: Array<Data.Product>;
  products_fashion: Array<Data.Product>;
};
const ImallPage: NextPage<PageProps> = ({ features, products, products_fashion }) => {
  return (
    <>
      <Head>
        <title>Itel - Theo là thích</title>
      </Head>
      <BannerAdvertising
        autoplay
        withOverLay
        data={[
          {
            id: 1,
            media: {
              desktop:
                'https://res.cloudinary.com/dt1oay7cv/image/upload/v1683555845/itel/images/188963949e24b7803932dcb72d28549f_w0q1kp.png',
              tablet: 'https://res.cloudinary.com/dt1oay7cv/image/upload/v1687263720/itel/banner/Block_Image_o2y2js.png',
              mobile: 'https://res.cloudinary.com/dt1oay7cv/image/upload/v1687263762/itel/banner/Block_Image_uct6fo.png'
            },
            title: 'oppo reno8 T\nTrình làng itel',
            actionTitle: 'Mua ngay',
            extra: [
              'https://res.cloudinary.com/dt1oay7cv/image/upload/v1683559129/itel/images/19a6ae5eda1da58cae0c225166175765_hc2imb.png',
              'https://res.cloudinary.com/dt1oay7cv/image/upload/v1683559135/itel/images/2833cb73cfe723c5de1cf6283bdfca79_boa9b9.png'
            ]
          },
          {
            id: 2,
            media: {
              desktop:
                'https://res.cloudinary.com/dt1oay7cv/image/upload/v1683555845/itel/images/188963949e24b7803932dcb72d28549f_w0q1kp.png',
              tablet: 'https://res.cloudinary.com/dt1oay7cv/image/upload/v1687263720/itel/banner/Block_Image_o2y2js.png',
              mobile: 'https://res.cloudinary.com/dt1oay7cv/image/upload/v1687263762/itel/banner/Block_Image_uct6fo.png'
            },
            title: 'oppo reno8 T\nTrình làng itel',
            actionTitle: 'Mua ngay',
            extra: [
              'https://res.cloudinary.com/dt1oay7cv/image/upload/v1683559129/itel/images/19a6ae5eda1da58cae0c225166175765_hc2imb.png',
              'https://res.cloudinary.com/dt1oay7cv/image/upload/v1683559135/itel/images/2833cb73cfe723c5de1cf6283bdfca79_boa9b9.png'
            ]
          },
          {
            id: 3,
            media: {
              desktop:
                'https://res.cloudinary.com/dt1oay7cv/image/upload/v1683555845/itel/images/188963949e24b7803932dcb72d28549f_w0q1kp.png',
              tablet: 'https://res.cloudinary.com/dt1oay7cv/image/upload/v1687263720/itel/banner/Block_Image_o2y2js.png',
              mobile: 'https://res.cloudinary.com/dt1oay7cv/image/upload/v1687263762/itel/banner/Block_Image_uct6fo.png'
            },
            title: 'oppo reno8 T\nTrình làng itel',
            actionTitle: 'Mua ngay',
            extra: [
              'https://res.cloudinary.com/dt1oay7cv/image/upload/v1683559129/itel/images/19a6ae5eda1da58cae0c225166175765_hc2imb.png',
              'https://res.cloudinary.com/dt1oay7cv/image/upload/v1683559135/itel/images/2833cb73cfe723c5de1cf6283bdfca79_boa9b9.png'
            ]
          },
          {
            id: 4,
            media: {
              desktop:
                'https://res.cloudinary.com/dt1oay7cv/image/upload/v1683555845/itel/images/188963949e24b7803932dcb72d28549f_w0q1kp.png',
              tablet: 'https://res.cloudinary.com/dt1oay7cv/image/upload/v1687263720/itel/banner/Block_Image_o2y2js.png',
              mobile: 'https://res.cloudinary.com/dt1oay7cv/image/upload/v1687263762/itel/banner/Block_Image_uct6fo.png'
            },
            title: 'oppo reno8 T\nTrình làng itel',
            actionTitle: 'Mua ngay',
            extra: [
              'https://res.cloudinary.com/dt1oay7cv/image/upload/v1683559129/itel/images/19a6ae5eda1da58cae0c225166175765_hc2imb.png',
              'https://res.cloudinary.com/dt1oay7cv/image/upload/v1683559135/itel/images/2833cb73cfe723c5de1cf6283bdfca79_boa9b9.png'
            ]
          }
        ]}
      />
      <section className="bg-neutral-50">
        <div className="container max-xl:px-10 max-md:px-0 ">
          <ul className="flex">
            {features.map(({ id, icon, title, desc }, index) => {
              return (
                <li key={'card_' + id} className="w-1/4">
                  <Link href="#" className="block h-full">
                    <CardFeature
                      className="h-full"
                      bg="https://res.cloudinary.com/dt1oay7cv/image/upload/v1683477016/itel/images/b8e37016e7c26dc3cb45185ceb182a5f_fls6zy.png"
                      icon={icon}
                      title={title}
                      desc={desc}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
      <section className="bg-neutral-0">
        <div className="container py-6 md:py-10 xl:py-20">
          <div className="flex items-center">
            <h2 className="flex-1 md:font-itel text-xl md:text-h4 font-bold xl:text-h3">
              Săn sale <span className="text-red-500">giá sốc</span>
            </h2>
          </div>
          <div className="max-md:hidden mt-8">
            <BannerItems data={products} />
          </div>
          <div className="-mx-3 hidden mt-8 flex-wrap xl:flex">
            {products.slice(0, 5).map((product) => (
              <Link
                href={{ pathname: Routers.IMALL_DETAIL, query: { id: product.id } }}
                key={product.id}
                className="w-1/2 px-3 md:w-1/3 xl:w-1/5"
              >
                <CardProduct
                  className="bg-neutral-0"
                  img={product.thumbnail}
                  title={product.name}
                  installment
                  type="secondary"
                  data={product}
                  discountPercentage={product.variant.discount_percentage}
                >
                  <CardProduct.Body
                    name={product.name}
                    price={product.priceRange.max}
                    discountPrice={product.priceRange.discount_min}
                    // discountPercentage={product.variant.discount_percentage}
                    rate={4.5}
                    sold={888}
                  />
                </CardProduct>
              </Link>
            ))}
          </div>
          <div className="-mx-4 mt-3 px-2.5 md:hidden flex overflow-auto scrollbar-hide">
            {products.slice(0, 5).map((product) => (
              <Link
                href={{ pathname: Routers.IMALL_DETAIL, query: { id: product.id } }}
                key={product.id}
                className="w-36 px-1.5 flex-shrink-0 box-content"
              >
                <CardProduct
                  className="bg-neutral-0 rounded-lg md:rounded-2xl"
                  img={product.thumbnail}
                  title={product.name}
                  type="secondary"
                  data={product}
                  bodyClassName="pt-2 pb-0"
                  saleExpiry={product.sale_expiry}
                >
                  <CardProduct.Body
                    name={product.name}
                    price={product.priceRange.max}
                    discountPrice={product.priceRange.discount_min}
                    discountPercentage={product.variant.discount_percentage}
                    rate={4.5}
                    sold={888}
                  />
                </CardProduct>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <SectionProduct
        title="Điện thoại - thiết bị"
        isOdd
        className="container bg-neutral-0 md:bg-transparent mt-2 py-6 md:mt-0 md:py-10 xl:py-20"
        href={Routers.IMALL_DEVICE}
      >
        {/* <ListProduct products={products} maxItem={{ default: 6, tablet: 6 }} /> */}
      </SectionProduct>
      <SectionProduct
        title="Thời trang"
        className="container bg-neutral-0 md:bg-transparent mt-2 py-6 md:mt-0 md:py-10 xl:py-20"
        href={Routers.IMALL_FASHION}
      >
        {/* <ListProduct products={products_fashion} maxItem={{ default: 4, tablet: 3 }} /> */}
      </SectionProduct>
      <SectionProduct
        title="Mẹ và bé"
        isOdd
        className="container bg-neutral-0 md:bg-transparent mt-2 py-6 md:mt-0 md:py-10 xl:py-20"
        href={Routers.IMALL_MOTHER_TO_BABY}
      >
        {/* <ListProduct products={products.slice(4)} maxItem={{ default: 4, tablet: 3 }} /> */}
      </SectionProduct>
      <SectionGenuineBrand className="mt-2 md:mt-0 py-6 md:pb-6 md:pt-16" />
      <SectionSupports />
    </>
  );
};

ImallPage.getLayout = function (page, props) {
  return (
    <>
      <LayoutImall isHomePage footerClassName="bg-neutral-0">
        {page}
      </LayoutImall>
      <ChatBoxLazy />
    </>
  );
};

const getStaticProps = getServerPropsWithTranslation<PageProps>(async () => {
  return {
    props: {
      features: [
        {
          id: 1,
          icon: '/icons/bold/mobile.svg',
          title: 'Điện thoại - thiết bị',
          desc: 'Sắm đồ công nghệ, ghé shop iTel'
        },
        {
          id: 2,
          icon: '/icons/bold/mom-and-baby.svg',
          title: 'Mẹ và bé',
          desc: 'Mẹ có deal ngon, bé có đồ đẹp'
        },
        {
          id: 3,
          icon: '/icons/bold/fashion.svg',
          title: 'Thời trang',
          desc: 'Thoải mái shopping, đồ xinh quá đã'
        },
        {
          id: 4,
          icon: '/icons/bold/food.svg',
          title: 'Ăn uống',
          desc: 'Voucher nóng hổi, vừa thổi vừa xơi'
        }
      ],
      products: await getListProduct({ limit: 8 }),
      products_fashion: await getListProduct({ limit: 4 })
    },
    // revalidate: 8600
  };
});

export default ImallPage;
export { getStaticProps };
