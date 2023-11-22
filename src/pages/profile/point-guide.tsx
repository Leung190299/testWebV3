import { NextPage } from 'next';
import Head from 'next/head';
import LayoutGuide from '@/components/layout/layout-guide';
import { useRouter } from 'next/router';
import React, { RefObject, useEffect, useRef, useState } from 'react';
import Breadcrumbs from '@/components/breadcrumbs/breadcrumbs';
import Image from 'next/image';
import bannerLeft from '@/components/pages/assets/banner-right.png';
import Svg from '@/components/icon/svg';
import Smile from '@/components/pages/assets/smile.png';
import Sad from '@/components/pages/assets/sad.png';
import Routers from '@/routes';
import Link from 'next/link';

const pages = [
  { name: 'Tài khoản', href: '/profile', current: false },
  { name: 'Hạng thành viên', href: '/profile/rank', current: false },
  { name: 'Tặng bạn Voucher Freeship 30k', href: '#', current: true }
];

const PlayVideo = ({ videoRef }: { videoRef: RefObject<HTMLVideoElement> }) => {
  return (
    <video
      ref={videoRef}
      className="bg-neutral-800 z-50 aspect-video"
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

const ButtonLove = () => {
  return (
    <div className="flex items-center">
      <Image src={Smile} className={'mr-4'} width={32} height={32} alt={''} />
      <p className="text-neutral-800">Hữu ich</p>
    </div>
  );
};

const ButtonSad = () => {
  return (
    <div className="flex items-center">
      <Image src={Sad} className={'mr-4'} width={32} height={32} alt={''} />
      <p className="text-neutral-800">Không hữu ích</p>
    </div>
  );
};

const PointGuide: NextPage = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  // const handlerPlayVideo = useCallback(() => {
  //   videoRef.current?.play();
  // }, []);
  const router = useRouter();
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const onScroll = () => setOffset(window.pageYOffset);
    // clean up code
    window.removeEventListener('scroll', onScroll);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handlerClickView = () => {
    void router.push('https://itel-web.vercel.app/promotion/club');
  };

  return (
    <>
      <Head>
        <title>{`Chi tiết ưu đãi `}</title>
      </Head>
      <div className="bg-neutral-0">
        <section className="container">
          <div className="relative">
            <div className="fixed left-0 w-full md:hidden bg-neutral-0 top-0">
              <div className="flex items-center py-4 px-2">
                <Link href={{ pathname: Routers.PROFILE_RANK, query: {} }} shallow>
                  <button
                    type="button"
                    className={`btn-ghost btn btn-sm  ${offset > 200 ? 'bg-neutral-0' : 'bg-neutral-100'} btn-circle text-neutral-800`}
                  >
                    <Svg src="/icons/line/close.svg" width={24} height={24} className="text-neutral-800" />
                  </button>
                </Link>
                {offset > 200 && <p className="text-[18px] text-neutral-800 font-bold">Hướng dẫn cách tích thêm điểm</p>}
              </div>
            </div>
            <div className="block max-md:hidden">
              <Breadcrumbs breadcrumbs={pages} />
            </div>
            <div className="md:pt-10 pt-6 max-md:pt-16">
              <div className="w-full lg:flex lg:gap-10">
                <div className="flex-1">
                  <div className="flex flex-col mb-4">
                    <p className="text-neutral-500 text-base font-normal max-md:text-sm">Voucher - Ưu đãi</p>
                    <h3 className="text-h3 font-bold mt-2 max-md:mt-1 max-md:text-2xl">Hướng dẫn cách tích thêm điểm</h3>
                    <p className="text-neutral-500 font-normal text-sm mt-2 max-md:mt-1">4 cách đơn giản để tích điểm. Bạn biết chưa </p>
                  </div>
                  <div className="w-full md:px-0">
                    <PlayVideo videoRef={videoRef} />
                    <p className="text-neutral-500 text-sm font-normal text-center mt-4 max-md:hidden">
                      Khám phá chương trình mua sim tại iTel
                    </p>
                  </div>
                  <div className="paragrap mt-6">
                    <p className="text-neutral-800 text-xl font-bold max-md:text-[18px]	">Chơi Game tích điểm</p>
                    <p className="text-base font-normal text-neutral-500 mt-4">
                      iTel có vô vàn Sim só đẹp. Ngoài ra iTel còn có kho Sim không lồ theo số phong thủy, thần số học, việc tra cứu tìm
                      kiếm giúp tìm kiếm Sim phù hợp với bạn trở nên dễ dàng hơn bao giờ hết. Hãy cùng khám phá các cách chọn sim phù hợp
                      cho bạn nhé
                    </p>
                  </div>
                  <div className="paragrap mt-6">
                    <h4 className="text-neutral-800 text-xl font-bold max-md:text-[18px]">Mua sắm tích điểm</h4>
                    <p className="text-base font-normal text-neutral-500 mt-4">
                      iTel có vô vàn Sim só đẹp. Ngoài ra iTel còn có kho Sim không lồ theo số phong thủy, thần số học, việc tra cứu tìm
                      kiếm giúp tìm kiếm Sim phù hợp với bạn trở nên dễ dàng hơn bao giờ hết. Hãy cùng khám phá các cách chọn sim phù hợp
                      cho bạn nhé.
                    </p>
                  </div>
                  <div className="paragrap mt-6">
                    <h4 className="text-neutral-800 text-xl font-bold max-md:text-[18px]">Xem phim tích điểm</h4>
                    <p className="text-base font-normal text-neutral-500 mt-4">
                      iTel có vô vàn Sim só đẹp. Ngoài ra iTel còn có kho Sim không lồ theo số phong thủy, thần số học, việc tra cứu tìm
                      kiếm giúp tìm kiếm Sim phù hợp với bạn trở nên dễ dàng hơn bao giờ hết. Hãy cùng khám phá các cách chọn sim phù hợp
                      cho bạn nhé. iTel có vô vàn Sim só đẹp. Ngoài ra iTel còn có kho Sim không lồ theo số phong thủy, thần số học, việc
                      tra cứu tìm kiếm giúp tìm kiếm Sim phù hợp với bạn trở nên dễ dàng hơn bao giờ hết.
                    </p>
                  </div>
                  <div className="paragrap mt-6">
                    <h4 className="text-neutral-800 text-xl font-bold max-md:text-[18px]">Săn Voucher 0 đồng</h4>
                    <p className="text-base font-normal text-neutral-500 mt-4">
                      iTel có vô vàn Sim só đẹp. Ngoài ra iTel còn có kho Sim không lồ theo số phong thủy, thần số học, việc tra cứu tìm
                      kiếm giúp tìm kiếm Sim phù hợp với bạn trở nên dễ dàng hơn bao giờ hết. Hãy cùng khám phá các cách chọn sim phù hợp
                      cho bạn nhé. iTel có vô vàn Sim só đẹp.
                    </p>
                  </div>
                  <div className="paragrap mt-6">
                    <h4 className="text-neutral-800 text-xl font-bold max-md:text-[18px]">Chơi Game tích điểm</h4>
                    <p className="text-base font-normal text-neutral-500 mt-4">
                      iTel có vô vàn Sim só đẹp. Ngoài ra iTel còn có kho Sim không lồ theo số phong thủy, thần số học, việc tra cứu tìm
                      kiếm giúp tìm kiếm Sim phù hợp với bạn trở nên dễ dàng hơn bao giờ hết. Hãy cùng khám phá các cách chọn sim phù hợp
                      cho bạn nhé.
                    </p>
                  </div>
                  <div className="paragrap mt-6">
                    <div className="flex h-full w-[185px] items-center rounded-lg bg-neutral-100 max-md:bg-neutral-0 p-6 max-md:px-0 max-md:py-4 px-8 mt-6 text-neutral-0 w-full mt-3 max-md:rounded-none max-md:border-b max-md:border-t max-md:border-neutral-100">
                      <p className="text-neutral-700 font-bold grow">Tải file “Hướng dẫn cách chọn sim số đẹp trên iTel”</p>
                      <button
                        className="btn-secondary btn btn-sm rounded-full px-8 py-3 whitespace-nowrap max-md:px-4 max-md:ml-4 "
                        onClick={() => {}}
                      >
                        <Svg src={'/icons/bold/download.svg'} className={'mr-2.5 '} width={19} height={20} />
                        Tải file
                      </button>
                    </div>
                  </div>
                  <div className={'box-border border-b border-b-divider-rank bottom-[0.5px] w-full h-px my-6 max-md:hidden'} />
                  <div className="py-4 text-center max-md:text-left">
                    <p className="text-neutral-800">Bài viết này có hữu ích với bạn hông? Nói cho iTel nhé</p>
                    <div className="mt-6 flex items-center gap-3 justify-center	">
                      <button className=" btn btn-sm bg-neutral-100 w-[188px] h-[53px]">
                        <ButtonSad />
                      </button>
                      <button className=" btn btn-sm bg-neutral-100 w-[188px] h-[53px]">
                        <ButtonLove />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="hidden relative h-fit w-[24.5rem] lg:block">
                  <Image src={bannerLeft} alt="itel" className="w-full absolute rounded-xl" />
                  <div className="absolute w-full inset-0">
                    <div className="content-left pt-12 px-8">
                      <h3 className="text-3xl font-bold text-neutral-0">Hàng ngàn ưu đãi từ iWow!</h3>
                      <p className="text-sm text-neutral-50 font-normal pt-1.5">Cùng Anh iTel đi liền thôiiiiii! Gét gô</p>
                      <button
                        onClick={handlerClickView}
                        className="btn mt-8 px-6 py-4 leading-6 bg-neutral-0 rounded-full font-medium text-primary"
                      >
                        Khám phá ngay
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

PointGuide.getLayout = function (page) {
  return (
    <>
      <LayoutGuide footerClassName="bg-neutral-0">{page}</LayoutGuide>
    </>
  );
};
export default PointGuide;
