import { NextPage } from 'next';
import Head from 'next/head';

import BannerAdvertising from '@/components/banner/banner-advertising';
import Breadcrumbs from '@/components/breadcrumbs/breadcrumbs';
import CardEvent from '@/components/card/card-event';
import CardService from '@/components/card/card-service';
import Svg from '@/components/icon/svg';
import { LayoutWithChatBox } from '@/components/layout/layout-default';
import SectionSupports from '@/components/section/section-supports';
import ContentService from '@/components/service/ContentService';
import getServerPropsWithTranslation from '@/i18n/getServerPropsWithTranslation';
import Routers from '@/routes/routers';
import Digitalservice from '@/services/Digitalservice';
import vouchersServices from '@/services/vouchers/vouchers';
import { Data } from '@/types/model';
import { cloneToArray } from '@/utilities/array';
import { modal } from '@pit-ui/modules/modal';
import clsx from 'clsx';
import Link from 'next/link';
import { Fragment, useEffect, useState } from 'react';
import { TabRouterIService } from '../i-travel';

type PageProps = {
  vouchers: Data.Vouchers;
  vouchersForYou: Data.Vouchers;
};

const pages = [

  { name: `iTel mua sắm`, href: '#', current: true }
];
const IShopingServicePagge: NextPage = () => {
  const listFinace: digitalservice.itemService[] = [
    {
      id: 1,
      label:'iTel Mua Sắm',
      img: '/images/service/shoping/Shopee.png',
      title: 'Sàn thương mại điện tử Shopee',
      description: `1. Bạn sẽ được chuyển hướng sang màn hình của Shopee <br>2. Shopee là sàn thương mại điện tử hàng đầu về bán lẻ, cung cấp những sản phẩm chính hiệu và hướng tới trải nghiệm mua sắm tuyệt vời và nhanh chóng đến tất cả khách hàng.`,
      onClick: () => {
        setService(listFinace[0]);
        setIsShowPopup(true);
      },
      linkApi: 'https://itel.vn/api/web/dagoras/getlink?url=https:%2F%2Fpartner.dagoras.io%2Fitel%2Fshopee&code=shopee',
      subDescription: `1. Công ty TNHH Shopee là đơn vị có tư cách pháp nhân độc lập, không phải công ty con, chi nhánh hay đơn vị trực thuộc của Công ty CP Viễn thông di động Đông Dương Telecom (ITEL).<br>
      2. Sàn thương mại điện tử Shopee do Công ty TNHH Shopee độc lập phát triển và cung cấp dịch vụ cho khách hàng, không do iTel sở hữu.<br>
      3. Đối với các vấn đề phát sinh vướng mắc và phát sinh khiếu nại (nếu có) của khách hàng, Shopee có trách nhiệm giải quyết.<br>
      4. Quý khách nếu cần hỗ trợ vui lòng liên hệ Hotline Shopee: 1900 1221 (1000đ/phút)`
    },
    {
      id: 2,
      label:'iTel Mua Sắm',
      img: '/images/service/shoping/Ticketgo.png',
      title: 'TicketGo',
      description: `1. Bạn sẽ được chuyển hướng sang màn hình của TicketGo <br>
      2. Ticket Go là website thương mại điện tử trực thuộc công ty cổ phần công nghệ ALADDIN với hoài bão tạo nên một bước đột phá lớn trong lĩnh vực bán vé sự kiện trực tuyến hàng đầu mang đến sự lựa chọn mua vé sự kiện dễ dàng, nhanh chóng và tiện lợi cho khách hàng mà không cần phải xếp hàng hay phải chờ đợi dưới trời mưa hay nắng nóng.`,
      onClick: () => {
        setService(listFinace[1]);
        setIsShowPopup(true);
      },
      linkApi: 'https://itel.vn/api/web/dagoras/getlink?url=https:%2F%2Fticketgo.vn%2Fitel&code=ticketGO',
      subDescription: `1. Công ty cổ phần công nghệ ALADDIN là đơn vị có tư cách pháp nhân độc lập, không phải công ty con, chi nhánh hay đơn vị trực thuộc của Công ty CP Viễn thông di động Đông Dương Telecom (ITEL).<br>
      2. TicketGo do Công ty cổ phần công nghệ ALADDIN độc lập phát triển và cung cấp dịch vụ cho khách hàng, không do iTel sở hữu.<br>
      3. Đối với các vấn đề phát sinh vướng mắc và phát sinh khiếu nại (nếu có) của khách hàng, TicketGo có trách nhiệm giải quyết.<br>
      4. Mọi khiếu nại về SP, DV vui lòng liên hệ hotline Ticket go: 08.999.80.818. Hoặc SĐT: 0243.788.00.99 (trong giờ hành chính: 08h30 - 17h00).`
    },
    {
      id: 3,
      label:'iTel Mua Sắm',
      img: '/images/service/shoping/Tiki.png',
      title: 'Sàn thương mại điện tử Tiki',
      description: `1. Bạn sẽ được chuyển hướng sang màn hình của Tiki<br>
      2. Tiki là sàn thương mại điện tử hàng đầu về bán lẻ, cung cấp những sản phẩm chính hiệu và tới trải nghiệm mua sắm tuyệt vời và nhanh chóng đến tất cả khách hàng.`,
      onClick: () => {
        setService(listFinace[2]);
        setIsShowPopup(true);
      },
      linkApi: 'https://itel.vn/api/web/dagoras/getlink?url=https:%2F%2Fpartner.dagoras.io%2Fitel%2Ftiki&code=tiki',
      subDescription: `1. Công ty Cổ phần TIKI là đơn vị có tư cách pháp nhân độc lập, không phải công ty con, chi nhánh hay đơn vị trực thuộc của Công ty CP Viễn thông di động Đông Dương Telecom (ITEL).<br>
      2. Sàn thương mại điện tử Tiki do Công ty Cổ phần TIKI độc lập phát triển và cung cấp cho khách hàng, không do iTel sở hữu.<br>
      3. Đối với các vấn đề phát sinh vướng mắc và phát sinh khiếu nại (nếu có) của khách hàng, Tiki có trách nhiệm giải quyết.<br>
      4. Quý khách nếu cần hỗ trợ vui lòng liên hệ Hotline Tiki: 1900 6035 (1000đ/phút)

      `
    },
    {
      id: 4,
      label:'iTel Mua Sắm',
      img: '/images/service/shoping/Concung.png',
      title: 'Đồ mẹ và bé Concung',
      description: `1. Bạn sẽ được chuyển hướng sang màn hình của Con cưng<br>
      2. Công ty Cổ phần Con Cưng là công ty tiên phong tại Việt Nam chuyên về ngành hàng dành riêng cho trẻ em. Con Cưng tập trung phát triển các hệ thống chuỗi bán lẻ cho mẹ bầu & em bé, đồng thời nghiên cứu và cho ra đời các sản phẩm an toàn, chất lượng, giá thành hợp lý dành riêng cho trẻ em.`,
      onClick: () => {
        setService(listFinace[3]);
        setIsShowPopup(true);
      },
      subDescription: `1. Công ty Cổ phần Con Cưng là đơn vị có tư cách pháp nhân độc lập, không phải công ty con, chi nhánh hay đơn vị trực thuộc của Công ty CP Viễn thông di động Đông Dương Telecom (ITEL).<br>
      2. Các sản phẩm dịch vụ do Công ty Cổ phần Con Cưng độc lập phát triển và cung cấp cho khách hàng, không do iTel sở hữu.<br>
      3. Đối với các vấn đề phát sinh vướng mắc và phát sinh khiếu nại (nếu có) của khách hàng, Con Cưng có trách nhiệm giải quyết.<br>
      4. Quý khách nếu cần hỗ trợ vui lòng liên hệ Hotline Con Cưng: 1800 6609 (Miễn phí)`,
      linkApi: 'https://itel.vn/api/web/dagoras/getlink?url=https:%2F%2Fpartner.dagoras.io%2Fitel%2Fconcung&code=concung'
    },

    {
      id: 5,
      label:'iTel Mua Sắm',
      img: '/images/service/shoping/Routine.png',
      title: 'Thời trang Routine',
      description: `1. Bạn sẽ được chuyển hướng sang màn hình của Thời trang Routine<br>
      2. Routine là thương hiệu quần áo, phụ kiện thời trang hướng tới việc trở thành thói quen, lực chọn hàng ngày trong mọi tình huống.`,
      onClick: () => {
        setService(listFinace[4]);
        setIsShowPopup(true);
      },
      linkApi: 'https://itel.vn/api/web/dagoras/getlink?url=https:%2F%2Fpartner.dagoras.io%2Fitel%2Froutine&code=routine',
      subDescription: `1. Công ty TNHH Routine Việt Nam là đơn vị có tư cách pháp nhân độc lập, không phải công ty con, chi nhánh hay đơn vị trực thuộc của Công ty CP Viễn thông di động Đông Dương Telecom (ITEL).<br>
      2. Các sản phẩm quần áo, phụ kiện thời trang Routine do Công ty TNHH Routine Việt Nam độc lập phát triển và cung cấp cho khách hàng, không do iTel sở hữu.<br>
      3. Đối với các vấn đề phát sinh vướng mắc và phát sinh khiếu nại (nếu có) của khách hàng, Routine có trách nhiệm giải quyết.<br>
      4. Quý khách nếu cần hỗ trợ vui lòng liên hệ Hotline Routine: 1900 636591 (1000đ/phút)`
    }
  ];
  const [isShowPopup, setIsShowPopup] = useState<boolean>(false);
  const [service, setService] = useState<digitalservice.itemService>(listFinace[0]);
  const [listPost, setListPost] = useState<digitalservice.post[]>([]);

  useEffect(() => {
    const getPost = async () => {
      let res = await Digitalservice.getlistPost({
        columnFilters: {
          BlogCategoryId: 14
        },
        sort: [],
        page: 1,
        pageSize: 1000,
        lang: 1
      });
      if (res.code == 200) {
        setListPost(res.result.BlockBlog);
      }
    };
    getPost();
  }, []);

  useEffect(() => {
    if (isShowPopup) {
      modal.open({
        render(props) {
          return (
            <div className="container p-0 md:pt-12 md:px-20 lg:p-0 relative bg-neutral-0" style={{ minHeight: '17.125rem' }}>
              <div className="flex items-center relative">
                <ContentService itemService={service} />
                <button onClick={props.close}>
                  <Svg
                    src="/icons/line/close.svg"
                    className="md:h-14 md:w-14 cursor-pointer rounded-full bg-neutral-100 md:p-4 z-10 left-2 top-3 w-10 h-10 p-2 fixed lg:absolute md:top-14 md:right-4 md:left-auto lg:top-4 lg:right-4"
                  />
                </button>
              </div>
            </div>
          );
        },
        transition: false,
        closeButton: false,
        className: 'modal-box shadow-itel !bg-neutral-50 w-full lg:w-fit lg:relative lg:!overflow-hidden lg:!rounded-2xl',
        classNameContainer: 'modal-full md:modal-bottom-sheet lg:flex lg:items-center lg:h-[-webkit-fill-available] lg:bg-transparent',
        classNameOverlay: 'bg-neutral-0 md:bg-neutral-900 md:bg-opacity-50',
        onClose: () => setIsShowPopup(false)
      });
      return;
    }
  }, [isShowPopup]);
  return (
    <>
      <Head>
        <title>Itel - Club</title>
      </Head>
      <div className="bg-neutral-100">
        <Breadcrumbs breadcrumbs={pages} />
      </div>
      <TabRouterIService isTop />
      <BannerAdvertising
        type="tertiary"
        withOverLay
        data={cloneToArray(
          {
            id: 1,
            media: {
              desktop: '/images/iwow/clubBanner.png',
              tablet: '/images/iwow/clubBanner.png',
              mobile: '/images/iwow/clubBanner.png'
            },
            title: 'BANNER QUẢNG CÁO',
            // mobileTitle: 'BANNER QUẢNG CÁO',
            desc: 'Thỏa sức chọn sim phong thủy, thần số học.\nTuyệt chiêu hút lộc, giải ế đổi vận. Triệu hồi ngay thần Sim phong thủy iTel!',
            actionTitle: 'Trải nghiệm ngay'
          },
          4
        )}
      />
      <TabRouterIService />

      <div className="lg:pt-16 pt-4 bg-neutral-100">
        <div>
          <div className="lg:px-10 px-4 md:text-center">
            <h1 className="md:text-5xl lg:text-[56px] text-2xl text-neutral-800 md:mt-16 lg:mt-0 font-itel">
              <b>ITel mua sắm</b>
            </h1>
          </div>
          <div className="container md:px-10 lg:overflow-auto overflow-x-hidden md:mt-10 lg:mt-14">
            <div className="mt-3 grid md:grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 lg:gap-14">
              {listFinace.map((voucher, i) => (
                <Fragment key={voucher.id}>
                  <CardService
                    classNameTitle="text-sm md:text-lg whitespace-pre-wrap"
                    classNameDesc="hidden md:block lg:!line-clamp-2"
                    classButton="md:text-base text-sm lg:mt-6"
                    className="md:grid lg:grid-cols-2 md:grid-cols-5 md:rounded-2xl rounded-none"
                    classRight="w-fit !pl-4 lg:col-span-1 md:col-span-3 md:!px-4 md:!py-6 !p-0 lg:!p-6 lg:!py-6 md:justify-normal justify-center !py-[10px]"
                    classLeft="lg:col-span-1 md:col-span-2 aspect-square md:aspect-[2/2] rounded-sm md:max-w-full max-w-[112px]"
                    isLineClamp
                    img={voucher.img || ''}
                    title={voucher.title || ''}
                    desc={'Chương trình ưu đãi dành cho các khách hàng sử dụng sim iTel.'}
                    onClick={voucher.onClick}
                  />
                  <div className={clsx(i >= 0 && i < 5 && 'h-[1px] w-full bg-neutral-100', 'md:hidden')} />
                </Fragment>
              ))}
            </div>
          </div>
        </div>
        <div className="md:hidden flex w-full h-2 bg-neutral-100 mt-4" />
        <div className="md:py-20 py-4">
          <div className="lg:px-10 px-4 md:text-center">
            <h1 className="md:text-[40px] text-2xl font-itel text-neutral-800">
              <b>Chương trình hấp dẫn</b>
            </h1>
          </div>
          <div className="container md:px-10 lg:overflow-auto overflow-x-hidden md:mt-10">
            <div className="mt-3 lg:hidden grid md:grid-cols-2 md:gap-6 gap-3 lg:grid-cols-4 grid-cols-2">
              {listPost.slice(0, 4).map((post) => (
                <Link key={post.Id}  href={`${Routers.NEWS}/${post.Slug}`}>
                  <CardEvent
                    className="lg:!rounded-2xl !rounded-none"
                    img={post.Thumbnail || ''}
                    title={post.Title || ''}
                    desc={post.Brief || ''}
                  />
                </Link>
              ))}
            </div>
            <div className="mt-3 hidden lg:grid md:grid-cols-2 md:gap-6 gap-3 lg:grid-cols-3">
              {listPost.slice(0, 3).map((post) => (
                <Link key={post.Id}  href={`${Routers.NEWS}/${post.Slug}`}>
                  <CardEvent key={post.Id} img={post.Thumbnail || ''} title={post.Title || ''} desc={post.Brief || ''} />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      <SectionSupports />
    </>
  );
};

IShopingServicePagge.displayName = 'IShopingServicePagge';

IShopingServicePagge.getLayout = LayoutWithChatBox;

const getStaticProps = getServerPropsWithTranslation<PageProps>(async () => {
  const vouchers = await vouchersServices.getListVoucher({ limit: 10 });
  const vouchersForYou = await vouchersServices.getListVoucher({ limit: 4 });
  return {
    props: {
      vouchers,
      vouchersForYou
    }
    // revalidate: 8600
  };
});

export default IShopingServicePagge;

export { getStaticProps };
