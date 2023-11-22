import Breadcrumbs from '@/components/breadcrumbs/breadcrumbs';
import Svg from '@/components/icon/svg';
import { LayoutWithChatBox } from '@/components/layout/layout-default';
import banner from '@/components/pages/assets/banner-detail.png';
import bannerLeft from '@/components/pages/assets/banner-left.png';
import productBanner1 from '@/components/pages/assets/product-banner-1.png';
import productBanner2 from '@/components/pages/assets/product-banner-2.png';
import productBanner3 from '@/components/pages/assets/product-banner-3.png';
import clsx from 'clsx';

import { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { RefObject, useRef } from 'react';

const pages = [
  { name: 'Thông báo', href: '#', current: false },
  { name: 'Ưu đãi khuyến mại', href: '#', current: false },
  { name: 'Tặng bạn Voucher Freeship 30k', href: '#', current: true }
];
const dataProductRelate = [
  {
    image: productBanner1,
    title: 'Lướt thẻ nhận Deal Vàng - Rộn ràng cùng khai xuân',
    description: 'Tưng bừng đón năm mới, cùng OCB tận hưởng Deal hoàn tiền cực HOT lên đến 1.000.000 VNĐ.'
  },
  {
    image: productBanner2,
    title: 'Lướt thẻ nhận Deal Vàng - Rộn ràng cùng khai xuân',
    description: 'Tưng bừng đón năm mới, cùng OCB tận hưởng Deal hoàn tiền cực HOT lên đến 1.000.000 VNĐ.'
  },
  {
    image: productBanner3,
    title: 'Tima cung cấp gói vay tiền nhanh mua ô tô trả góp',
    description: 'Tưng bừng đón năm mới, cùng OCB tận hưởng Deal hoàn tiền cực HOT lên đến 1.000.000 VNĐ.'
  }
];
const PlayVideo = ({ videoRef }: { videoRef: RefObject<HTMLVideoElement> }) => {
  return (
    <video
      ref={videoRef}
      className="bg-neutral-800 z-50"
      poster="https://images-ng.pixai.art/images/orig/2966bf95-90eb-431a-989a-868ae41bf97c"
      controls
      loop
    >
      <source
        src="https://res.cloudinary.com/dgkrchato/video/upload/v1685692569/video_film/Avatar__The_Way_of_Water___Official_Trailer_aoepcn.mp4"
        type="video/mp4"
      />
    </video>
  );
};
const HeaderStiky = ({ title }: { title: string }) => {
  const router = useRouter();
  return (
    <div className="md:hidden bg-neutral-0 container z-10 h-16 flex items-center sticky top-0 gap-4 font-bold">
      <button
        type="button"
        className={clsx('')}
        onClick={() => {
          router.back();
        }}
      >
        <Svg src={'/icons/line/close.svg'} width={24} height={24} />
      </button>
      <p className="text-lg text-neutral-800 line-clamp-1">{title}</p>
    </div>
  );
};
const PromoteDetail: NextPage = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <>
      <Head>
        <title>{`Chi tiết ưu đãi `}</title>
      </Head>
      <HeaderStiky title="Tặng bạn Voucher Freeship 30k" />
      <div className="bg-neutral-0">
        <section className="container">
          <div className="py-3">
            <Breadcrumbs breadcrumbs={pages} className="overflow-hidden line-clamp-1" />
            <div className="md:pb-20 md:pt-10 py-6">
              <div className="w-full lg:flex lg:gap-10">
                <div className="flex-1">
                  <div className="flex flex-col mb-4">
                    <p className="text-neutral-500 text-sm md:text-base font-normal">Vexere • 09/03/2023</p>
                    <h3 className=" text-[24px] md:text-h3 font-bold mt-2">Tặng bạn Voucher Freeship 30k</h3>
                    <p className="text-neutral-500 font-normal text-sm mt-2">
                      Lấy việc giúp đỡ người khác làm mục tiêu sống, đồng cảm với nỗi đau khổ, mất mát của người khác...{' '}
                    </p>
                  </div>
                  <div className="w-full md:px-0">
                    <PlayVideo videoRef={videoRef} />
                    <p className="text-neutral-500 text-sm font-normal text-center mt-4">Khám phá chương trình mua sim tại iTel</p>
                  </div>
                  <div className="paragrap mt-6">
                    <h4 className="text-neutral-800 text-xl font-bold"> Thông tin chương trình</h4>
                    <p className="text-base font-normal text-neutral-500 mt-4">
                      iTel có vô vàn Sim só đẹp. Ngoài ra iTel còn có kho Sim không lồ theo số phong thủy, thần số học, việc tra cứu tìm
                      kiếm giúp tìm kiếm Sim phù hợp với bạn trở nên dễ dàng hơn bao giờ hết. Hãy cùng khám phá các cách chọn sim phù hợp
                      cho bạn nhé
                    </p>
                  </div>
                  <div className="paragrap mt-6">
                    <h4 className="text-neutral-800 text-xl font-bold">Cách thức tham gia</h4>
                    <p className="text-base font-normal text-neutral-500 mt-4">
                      iTel có vô vàn Sim só đẹp. Ngoài ra iTel còn có kho Sim không lồ theo số phong thủy, thần số học, việc tra cứu tìm
                      kiếm giúp tìm kiếm Sim phù hợp với bạn trở nên dễ dàng hơn bao giờ hết. Hãy cùng khám phá các cách chọn sim phù hợp
                      cho bạn nhé.
                    </p>
                    <p className="text-base font-normal text-neutral-500 mt-4">
                      iTel có vô vàn Sim só đẹp. Ngoài ra iTel còn có kho Sim không lồ theo số phong thủy, thần số học, việc tra cứu tìm
                      kiếm giúp tìm kiếm Sim phù hợp với bạn trở nên dễ dàng hơn bao giờ hết. Hãy cùng khám phá các cách chọn sim phù hợp
                      cho bạn nhé. iTel có vô vàn Sim só đẹp. Ngoài ra iTel còn có kho Sim không lồ theo số phong thủy, thần số học, việc
                      tra cứu tìm kiếm giúp tìm kiếm Sim phù hợp với bạn trở nên dễ dàng hơn bao giờ hết.
                    </p>
                  </div>
                  <div className="w-full md:px-0  mt-6">
                    <Image src={banner} alt="123" />
                    <p className="text-neutral-500 text-sm font-normal text-center mt-4">Khám phá chương trình mua sim tại iTel</p>
                  </div>
                  <div className="paragrap mt-6">
                    <h4 className="text-neutral-800 text-xl font-bold">Hướng dẫn cách dùng</h4>
                    <p className="text-base font-normal text-neutral-500 mt-4">
                      iTel có vô vàn Sim só đẹp. Ngoài ra iTel còn có kho Sim không lồ theo số phong thủy, thần số học, việc tra cứu tìm
                      kiếm giúp tìm kiếm Sim phù hợp với bạn trở nên dễ dàng hơn bao giờ hết. Hãy cùng khám phá các cách chọn sim phù hợp
                      cho bạn nhé. iTel có vô vàn Sim só đẹp. Ngoài ra iTel còn có kho Sim không lồ theo số phong thủy, thần số học, việc
                      tra cứu tìm kiếm giúp tìm kiếm Sim phù hợp với bạn trở nên dễ dàng hơn bao giờ hết.
                    </p>
                  </div>
                  <div className="list-tag mt-4 flex  flex-row flex-wrap gap-2 md:gap-4">
                    <div className="tag-item cursor-pointer border-[1px] border-solid border-[#CCCCCC] w-fit px-4 py-3 rounded-full">
                      <p>Hướng dẫn</p>
                    </div>
                    <div className="tag-item cursor-pointer border-[1px] border-solid border-[#CCCCCC] w-fit px-4 py-3 rounded-full">
                      <p>Mua Sim</p>
                    </div>
                    <div className="tag-item cursor-pointer border-[1px] border-solid border-[#CCCCCC] w-fit px-4 py-3 rounded-full">
                      <p>Sim mới</p>
                    </div>
                    <div className="tag-item cursor-pointer border-[1px] border-solid border-[#CCCCCC] w-fit px-4 py-3 rounded-full">
                      <p>Tin hot</p>
                    </div>
                    <div className="tag-item cursor-pointer border-[1px] border-solid border-[#CCCCCC] w-fit px-4 py-3 rounded-full">
                      <p>Chương trình hot</p>
                    </div>
                  </div>
                </div>
                <div className="hidden relative h-fit w-[24.5rem] lg:block">
                  <Image src={bannerLeft} alt="itel" className="w-full absolute rounded-xl" />
                  <div className="absolute w-full inset-0">
                    <div className="content-left pt-12 px-8">
                      <h3 className="text-3xl font-bold text-neutral-0">Mua Vé xe rẻ tại iTel Ưu đãi cực khủng</h3>
                      <p className="text-sm text-neutral-50 font-normal pt-1.5">Cùng Anh iTel đi liền thôiiiiii! Gét gô</p>
                      <button className="btn mt-8 px-8 py-6 bg-neutral-0 rounded-full font-medium text-primary">Gét gô!</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="bg-neutral-100">
          <div className="md:container">
            <div className="max-md:pb-0 max-lg:pb-20 lg:pb-10 py-4 xl:pt-20">
              <h3 className="text-center max-lg:mt-20 max-md:mb-4 max-lg:mb-20 max-md:mt-4 font-itel text-xl md:text-h3 mb-2 md:mb-10">
                Chương trình hấp dẫn
              </h3>
              <div className="mt-3 flex overflow-x-auto overflow-y-hidden max-md:px-4 mb-8 xl:pb-10  scrollbar-hide  md:grid md:grid-cols-1 xl:grid-cols-3 xl:gap-6 gap-3 ">
                {dataProductRelate.map((item) => (
                  <div
                    key={item.title}
                    className="group max-md:flex-col max-lg:flex-row max-lg:flex max-md:min-w-[9rem] md:w-full transition-default card bg-neutral-0 tooltip-light"
                  >
                    <figure className="aspect-video w-full">
                      <Link href="#">
                        <Image
                          src={item.image}
                          alt="promotion image"
                          className="transition-default h-full w-full object-cover group-hover:scale-110"
                        />
                      </Link>
                    </figure>
                    <div className="card-body md:gap-6 md:px-4 md:py-3 gap-2 p-2 w-full">
                      <Link href="#">
                        <h5 className="card-title max-md:text-sm  justify-between gap-3 font-bold items-start md:items-center">
                          <p className="text-left">{item.title}</p>
                        </h5>
                        <p className="text-neutral-500 text-sm font-normal">{item.description}</p>
                      </Link>
                      <div className="card-actions justify-between">
                        <button className="transition-default btn-secondary btn md:btn-sm btn-xs rounded-full">Khám phá ngay</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};
PromoteDetail.getLayout = LayoutWithChatBox;
export default PromoteDetail;
