import getServerPropsWithTranslation from '@/i18n/getServerPropsWithTranslation';
import clsx from 'clsx';
import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';

import BannerAdvertising from '@/components/banner/banner-advertising';
import Breadcrumbs from '@/components/breadcrumbs/breadcrumbs';
import CardEvent from '@/components/card/card-event';
import CardService from '@/components/card/card-service';
import Svg from '@/components/icon/svg';
import { LayoutWithChatBox } from '@/components/layout/layout-default';
import SectionSupports from '@/components/section/section-supports';
import ContentRules from '@/components/service/ContentRules';
import ContentVnTrip from '@/components/service/ContentVnTrip';
import { modal } from '@/libs/modal';
import Routers from '@/routes/routers';
import Digitalservice from '@/services/Digitalservice';
import vouchersServices from '@/services/vouchers/vouchers';
import { Data } from '@/types/model';
import { cloneToArray } from '@/utilities/array';
import { Fragment, MouseEventHandler, useEffect, useState } from 'react';
import { TabRouterIService } from '../i-travel';

type PageProps = {
  vouchers: Data.Vouchers;
  vouchersForYou: Data.Vouchers;
};

const pages = [

  { name: `iTel Tài chính & Bảo hiểm`, href: '#', current: true }
];
const ITravelServicePagge: NextPage<PageProps> = ({ vouchers, vouchersForYou }) => {
  type IListFinace = {
    id?: number;
    logo?: string;
    name?: string;
    img?: string;
    title?: string;
    subTitle?: string;
    rules?: string;
    subRules?: string;
    url?: string;
    code?: string;
    imgContent?: string;
    onClick?: MouseEventHandler<HTMLDivElement>;
    onClickSub?: MouseEventHandler<HTMLButtonElement>;
  };
  const router = useRouter();
  const showModalBank = (listFinace: IListFinace) =>
    modal.open({
      render(props) {
        return (
          <div className="container p-0 md:pt-12 md:px-20 lg:p-0 relative bg-neutral-0 pb-40" style={{ minHeight: '17.125rem' }}>
            <div className="flex items-center relative">
              <ContentVnTrip
                brand="iTel Tài chính"
                img={listFinace.imgContent}
                title={listFinace.name}
                subTitle={listFinace.subTitle}
                rules={listFinace.onClickSub}
                url={listFinace.url}
                code={listFinace.code}
              />
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
      classNameOverlay: 'bg-neutral-0 md:bg-neutral-900 md:bg-opacity-50'
    });

  const showModalSubBank = (listFinace: IListFinace) =>
    modal.open({
      render(props) {
        return (
          <div className="container p-0 md:pt-12 md:px-20 lg:p-0 relative bg-neutral-0 pb-40" style={{ minHeight: '17.125rem' }}>
            <div className="flex items-center relative">
              <ContentRules img={listFinace.imgContent} title={listFinace.rules} subTitle={listFinace.subRules} />
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
      classNameOverlay: 'bg-neutral-0 md:bg-neutral-900 md:bg-opacity-50'
    });

  const listFinace: IListFinace[] = [
    {
      id: 1,
      logo: '/service/vexere.png',
      name: 'Mở tài khoản OCB',
      title: 'Chương trình ưu đãi dành cho các khách hàng sử dụng sim iTel',
      subTitle:
        'Đây là chương trình liên kết Mở tài khoản ngân hàng giữa OCB và iTel.<br/> Bạn sẽ được chuyển hướng sang màn hình tải ứng dụng Ngân hàng số OCB OMNI để mở tài khoản của OCB. <br/> OCB (Ngân hàng TMCP Phương Đông) cung cấp các sản phẩm/dịch vụ tài chính - ngân hàng giúp khách hàng và đối tác một cách minh bạch, thuận tiện, hiệu quả.',
      img: '/images/service/finance/1.png',
      rules: 'Điều Khoản',
      subRules:
        'Ngân hàng TMCP Phương Đông (OCB) là đơn vị có tư cách pháp nhân độc lập, không phải công ty con, chi nhánh hay đơn vị trực thuộc của iTel.<br/> Ứng dụng Ngân hàng số OCB OMNI do OCB độc lập phát triển và cung cấp cho khách hàng, không phải là một phần hay bộ phận của ứng dụng My iTel.<br/>Đối với các vấn đề phát sinh khiếu nại của khách hàng, OCB có trách nhiệm giải quyết.<br/>Quý khách nếu cần hỗ trợ, vui lòng liên hệ hotline OCB: 1800 6678 (Miễn phí 24/7)',
      onClick: () => showModalBank(listFinace[0]),
      onClickSub: () => showModalSubBank(listFinace[0]),
      url: 'https://ocbomni.onelink.me/RE8p/iTel',
      code: 'ocb',
      imgContent: '/images/service/finance/ocb.png'
    },
    {
      id: 2,
      name: 'Mua bảo hiểm nhân thọ MB Agreas life',
      logo: '/service/vntrip.png',
      img: '/images/service/finance/2.png',
      rules: 'Điều Khoản MBAL Agreas life',
      title: 'Chương trình ưu đãi dành cho các khách hàng sử dụng sim iTel',
      subTitle:
        'Bạn sẽ được chuyển hướng sang màn hình của MBAL Ageas Life<br/>Bảo hiểm nhân thọ MB Ageas Life được thành lập giữa Ngân hàng TMCP Quân đội (Việt Nam) với Tập đoàn Bảo hiểm quốc tế Ageas (Bỉ) và Công ty BHNT Muang Thai Life (Thái Lan), mang đến những dịch vụ tốt nhất thị trường, đồng hành cùng bạn qua những thăng trầm cuộc sống.',
      subRules:
        'Công ty TNHH Bảo hiểm Nhân thọ MB Ageas là đơn vị có tư cách pháp nhân độc lập, không phải công ty con, chi nhánh hay đơn vị trực thuộc của Công ty CP Viễn thông di động Đông Dương Telecom (ITEL).<br/> Các sản phẩm bảo hiểm nhân thọ MB Ageas Life do Công ty Bảo hiểm Nhân thọ MB Ageas độc lập phát triển và cung cấp cho khách hàng, không do iTel sở hữu.<br/>Đối với các vấn đề phát sinh vướng mắc và phát sinh khiếu nại (nếu có) của khách hàng, MB Ageas Life có trách nhiệm giải quyết.<br/>Quý khách nếu cần hỗ trợ vui lòng liên hệ Hotline MB Ageas Life: 024 2229 8888 (Cước phí cố định)',
      onClick: () => showModalBank(listFinace[1]),
      onClickSub: () => showModalSubBank(listFinace[1]),
      url: 'https://partner.dagoras.io/itel/mbal',
      code: 'mbal',
      imgContent: '/images/service/finance/MB-AGEASLIFE.png'
    },
    {
      id: 3,
      name: 'Vay tiền mặt online ngay tại Vclick',
      logo: '/service/vntrip.png',
      img: '/images/service/finance/3.png',
      rules: 'Thông tin chi tiết',
      title: 'Chương trình ưu đãi dành cho các khách hàng sử dụng sim iTel',
      subTitle: 'Bạn sẽ được chuyển hướng sang màn hình của Vclick',
      subRules:
        'Nền tảng Vclick – thuộc công ty Cổ Phần Đầu Tư Vega Fintech là đơn vị có tư cách pháp nhân độc lập, không phải công ty con, chi nhánh hay đơn vị trực thuộc của Công ty CP Viễn thông di động Đông Dương Telecom (ITEL).<br/>Chương trình về vay tiền online trên nền tảng Vclick là sản phẩm của Vega, do Vega Fintech độc lập phát triển và cung cấp cho khách hàng, không do iTel sở hữu.<br/>Đối với các vấn đề phát sinh vướng mắc và phát sinh khiếu nại (nếu có) của khách hàng, Vega Fintech có trách nhiệm giải quyết.<br/>Quý khách nếu cần hỗ trợ vui lòng liên hệ Hotline Vclick: 1900 633337 (1,000đồng/phút)',
      onClick: () => showModalBank(listFinace[2]),
      onClickSub: () => showModalSubBank(listFinace[2]),
      url: 'https://vclick.vn/?utm_source=itel&utm_medium=web',
      code: 'vclick',
      imgContent: '/images/service/finance/Vclick.png'
    },
    {
      id: 4,
      name: 'Mua bảo hiểm BSH',
      logo: '/service/vntrip.png',
      img: '/images/service/finance/4.png',
      title: 'Chương trình ưu đãi dành cho các khách hàng sử dụng sim iTel',
      subTitle:
        'Bạn sẽ được chuyển hướng sang màn hình của Bảo hiểm BSH<br/>BSH (TỔNG CÔNG TY CỔ PHẦN BẢO HIỂM SÀI GÒN - HÀ NỘI) đem đến các sản phẩm bảo hiểm toàn diện, thiết yếu đáp ứng tối đa nhu cầu của khách hàng.',
      rules: 'Điều Khoản BSH',
      subRules:
        'Tổng Công ty Cổ phần Bảo hiểm Sài Gòn - Hà Nội là đơn vị có tư cách pháp nhân độc lập, không phải là công ty con, chi nhánh hay đơn vị trực thuộc của Công ty CP Viễn thông di động Đông Dương Telecom (ITEL).<br/>Các sản phẩm Bảo hiểm là sản phẩm dịch vụ của Tổng Công ty Cổ phần Bảo hiểm Sài Gòn - Hà Nội độc lập phát triển và cung cấp cho khách hàng, không do iTel sở hữu.<br/>Đối với các vấn đề phát sinh vướng mắc và phát sinh khiếu nại (nếu có) của khách hàng, BSH có trách nhiệm giải quyết.<br/>Quý khách nếu cần hỗ trợ vui lòng liên hệ Hotline BSH: 024 3793 1111 (Cước phí cố định)',
      onClick: () => showModalBank(listFinace[3]),
      onClickSub: () => showModalSubBank(listFinace[3]),
      url: 'https://partner.dagoras.io/itel/bsh',
      code: 'bsh',
      imgContent: '/images/service/finance/BSH.png'
    },
    {
      id: 5,
      name: 'Mở thẻ tín dụng VIB',
      logo: '/service/vntrip.png',
      img: '/images/service/finance/5.png',
      title: 'Chương trình ưu đãi dành cho các khách hàng sử dụng sim iTel',
      subTitle:
        'Bạn sẽ được chuyển hướng sang màn hình của VIB<br/>VIB (Ngân hàng Thương mại Cổ phần Quốc tế) cung cấp sản phẩm/dịch vụ tài chính - ngân hàng giúp khách hàng và đối tác một cách minh bạch, thuận tiện, hiệu quả.',
      rules: 'Điều Khoản VIB',
      subRules:
        'Ngân hàng Thương mại Cổ phần Quốc tế (VIB) là đơn vị có tư cách pháp nhân độc lập, không phải công ty con, chi nhánh hay đơn vị trực thuộc của Công ty CP Viễn thông di động Đông Dương Telecom (ITEL).<br/>Chương trình về mở Thẻ tín dụng là sản phẩm dịch vụ của VIB, do VIB độc lập phát triển và cung cấp cho khách hàng, không do iTel sở hữu.<br/>Đối với các vấn đề phát sinh vướng mắc và phát sinh khiếu nại (nếu có) của khách hàng, VIB có trách nhiệm giải quyết.<br/>Quý khách nếu cần hỗ trợ vui lòng liên hệ Hotline VIB: 1800 8180 (Miễn phí)',
      onClick: () => showModalBank(listFinace[4]),
      onClickSub: () => showModalSubBank(listFinace[4]),
      url: 'https://partner.dagoras.io/itel/vib',
      code: 'vib',
      imgContent: '/images/service/finance/VIB.png'
    },
    {
      id: 6,
      name: 'Mở thẻ tín dụng VPbank',
      logo: '/service/vntrip.png',
      img: '/images/service/finance/6.png',
      title: 'Chương trình ưu đãi dành cho các khách hàng sử dụng sim iTel',
      subTitle:
        'Hoàn ngay 500k khi chi tiêu đến 2 triệu đồng<br/>Mở thẻ 100% online,không hồ sơ,không đến phòng giao dịch<br/>Hạn mức mở thẻ lên đến 100 triệu<br/>Chỉ với 5 phút đăng ký,phê duyệt tự động,nhận thẻ sau 3 ngày<br/>Chỉ cần duy nhất CMND/CCCD',
      onClick: () => showModalBank(listFinace[5]),
      url: 'https://cards.vpbank.com.vn/?utm_campaign=JarvisCustCC.Partner&utm_source=iTel&utm_medium=iTelWeb',
      imgContent: '/images/service/finance/VPBANK.png'
    }
  ];
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
            desc: 'Thỏa sức chọn sim phong thủy, thần số học.\nTuyệt chiêu hút lộc, giải ế đổi vận. Triệu hồi ngay thần Sim phong thủy ITel!',
            actionTitle: 'Trải nghiệm ngay'
          },
          4
        )}
      />

      <TabRouterIService  />

      <div className="lg:pt-16 pt-4 md:bg-neutral-100 bg-neutral-0">
        <div>
          <div className="lg:px-10 px-4 md:text-center">
            <h1 className="md:text-5xl lg:text-[56px] text-2xl uppercase text-neutral-800 md:mt-16 lg:mt-0 font-itel">
              <b>iTel Tài chính & Bảo hiểm</b>
            </h1>
          </div>

          <div className="container md:px-10 lg:overflow-auto overflow-x-hidden md:mt-10 lg:mt-14">
            <div className="mt-3 grid md:grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 lg:gap-14">
              {listFinace.slice(0, 6).map((voucher, i) => (
                <Fragment key={voucher.id}>
                  <CardService
                    classNameTitle="text-sm md:text-lg whitespace-pre-wrap"
                    classNameDesc="hidden md:block lg:!line-clamp-2"
                    classButton="md:text-base text-sm lg:mt-6"
                    className="md:grid lg:grid-cols-2 md:grid-cols-5 md:rounded-2xl rounded-none"
                    classRight="w-fit !pl-4 lg:col-span-1 md:col-span-3 md:!px-4 md:!py-6 !p-0 lg:!p-6 lg:!py-6 md:justify-normal justify-center !py-[10px]"
                    classLeft="lg:col-span-1 md:col-span-2 aspect-square md:aspect-photo rounded-sm md:max-w-full max-w-[112px]"
                    isLineClamp
                    img={voucher.img || ''}
                    title={voucher.name || ''}
                    desc={voucher.title || ''}
                    onClick={voucher.onClick}
                  />
                  <div className={clsx(i >= 0 && i < 5 && 'h-[1px] w-full bg-neutral-100', 'md:hidden')} />
                </Fragment>
              ))}
            </div>
          </div>
        </div>
        <div className="md:hidden flex w-full h-2 bg-neutral-100 mt-4" />
        <div className="md:my-20  py-4">
          <div className="lg:px-10 px-4 md:text-center">
            <h1 className="md:text-[40px] text-2xl font-itel text-neutral-800">
              <b>Chương trình hấp dẫn</b>
            </h1>
          </div>
          <div className="container md:px-10 lg:overflow-auto overflow-x-hidden md:mt-10">
            <div className="mt-3 grid md:grid-cols-2 md:gap-6 gap-3 lg:grid-cols-3 grid-cols-2">
              {listPost.slice(0, 3).map((post) => (
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
          </div>
        </div>
      </div>

      <SectionSupports />
    </>
  );
};

ITravelServicePagge.displayName = 'ITravelServicePagge';

ITravelServicePagge.getLayout = LayoutWithChatBox;

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

export default ITravelServicePagge;
export { getStaticProps };
