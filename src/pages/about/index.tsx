import Breadcrumbs from '@/components/breadcrumbs/breadcrumbs';
import Svg from '@/components/icon/svg';
import LayoutDefault from '@/components/layout/layout-default';
import SectionSupports from '@/components/section/section-supports';
import getServerPropsWithTranslation from '@/i18n/getServerPropsWithTranslation';
import Routers from '@/routes/routers';
import { Variants, motion } from 'framer-motion';
import Head from 'next/head';
import Image from 'next/image';
import { NextRouter, useRouter } from 'next/router';
import { RefObject, useEffect, useRef, useState } from 'react';
import ModalVideo from 'react-modal-video';

const itemVariants: Variants = {
  offscreen: { y: 40, opacity: 0 },
  onscreen: { y: 0, opacity: 1, transition: { duration: 0.3 } }
};
const misson = {
  title: 'Sứ Mệnh',
  subTitle: 'Với sứ mệnh cống hiến, chúng tôi luôn cỗ gắng nỗ lực',
  bannerStartMb: 'https://res.cloudinary.com/db8mh2s66/image/upload/v1686111935/itel/Block_Image_iwig6c.png',
  bannerStartPc: 'https://res.cloudinary.com/db8mh2s66/image/upload/v1685420075/itel/bn_ubbknz.png',
  bannerStartTablet: 'https://res.cloudinary.com/db8mh2s66/image/upload/v1685375362/itel/Block_Image_vnttzd.png'
};
const viewportOptions = { amount: 0.3, margin: '10000px 0px 0px 0px' };
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
const banner = 'https://res.cloudinary.com/dt1oay7cv/image/upload/v1683174103/itel/banner/96311db03bc494afc9c36597f4dd6d0a_r3miyp.png';
const bannerMissonPc =
  'https://res.cloudinary.com/db8mh2s66/image/upload/v1685782064/itel/Gia%CC%81_tri%CC%A3_co%CC%82%CC%81t_lo%CC%83i_rhdmcj.png';
const bannerMissionMb = 'https://res.cloudinary.com/db8mh2s66/image/upload/v1686214254/itel/Image_owyrj8.png';
const bannerMissionTablet =
  'https://res.cloudinary.com/db8mh2s66/image/upload/v1685783357/itel/Gia%CC%81_tri%CC%A3_co%CC%82%CC%81t_lo%CC%83i_ks1k2c.png';
const introduce = {
  subTitle: 'Tìm hiểu về iTel một chút nhé!',
  network: 'Mạng di động iTel',
  networkDescription:
    '(đầu số 087) - Thương hiệu của Indochina Telecom là nhà mạng tiên phong triển khai mô hình mạng di động ảo - MVNO (Mobile Virtual Network Operator) tại Việt Nam thông qua thỏa thuận hợp tác sử dụng sóng mạng di động VinaPhone để cung cấp các dịch vụ viễn thông tối ưu về chi phí và trải nghiệm khách hàng vượt trội.',
  srcMb: 'https://res.cloudinary.com/db8mh2s66/image/upload/v1686115848/itel/Block_Image_hvfboo.png',
  srcTablet: 'https://res.cloudinary.com/db8mh2s66/image/upload/v1685548425/itel/shopping_vtg4pd.png',
  srcPc: 'https://res.cloudinary.com/db8mh2s66/image/upload/v1685544076/itel/shopping_il8kop.png',
  benefits: [
    {
      src: '/icons/bold/about-data.svg',
      text: 'Dung lượng cực khủng'
    },
    {
      src: '/icons/bold/about-price.svg',
      text: 'Giá cực rẻ'
    },
    {
      src: '/icons/bold/about-wide.svg',
      text: '4G phủ sóng toàn quốc'
    },
    {
      src: '/icons/bold/about-spam.svg',
      text: 'Không tin nhắn rác, spam'
    }
  ]
};
const archivement = {
  title: 'THÀNH TỰU',
  subTitle: 'iTel có tốc độ tăng trưởng ấn tượng khi đã vượt 3 triệu thuê bao vào tháng 12 năm 2021'
};
const vision = {
  title: 'TẦM NHÌN',
  subTitle: 'Định hướng phát triển của iTel',
  description: 'Nhà phát triển và kiến tạo hệ sinh thái dịch vụ viễn thông, giải trí, tiện ích trên nền tảng số',
  src: 'https://res.cloudinary.com/db8mh2s66/image/upload/v1685694590/itel/Block_Image_y64n2k.png',
  srcPc: 'https://res.cloudinary.com/db8mh2s66/image/upload/v1685780207/itel/Block_Image_hyjpit.png',
  targets: [
    {
      text: 'Trở thành nhà cung cấp dịch vụ viễn thông chất lượng cao',
      des: 'iTel đã và đang nỗ lực phát triển trở thành một trong những nhà cung cấp dịch vụ viễn thông chất lượng cao cho thị trường công cộng, bao gồm khách hàng cá nhận, doanh nghiệp, các cơ quan chính phủ...) và viễn thông công ích.'
    },
    {
      text: 'Triển khai hợp tác với nhiều đối tác',
      des: 'iTel triển khai hợp tác với nhiều đối tác các chính sách bán hàng tiếp thị liên kết (affiliate) đối với sản phẩm Sim số thông qua Website iTel.vn'
    }
  ]
};
const coreValue = {
  subTitle: 'iTel có tốc độ tăng trưởng ấn tượng khi đã vượt 3 triệu thuê bao vào tháng 12 năm 2021',
  cores: [
    {
      prop: 'Nhanh',
      des: 'Vượt mọi deadline',
      src: 'https://res.cloudinary.com/db8mh2s66/image/upload/v1685784310/itel/Block_Image_wjzmep.png'
    },
    {
      prop: 'Sáng tạo',
      des: 'Luôn tìm cách làm tốt hơn cho mọi công việc',
      src: 'https://res.cloudinary.com/db8mh2s66/image/upload/v1685784333/itel/Block_Image_1_qygy7l.png'
    },
    {
      prop: 'Vui vẻ',
      des: 'Vui vẻ mỗi ngày, làm việc thêm hăng say',
      src: 'https://res.cloudinary.com/db8mh2s66/image/upload/v1685784351/itel/Block_Image_2_aqe4sc.png'
    }
  ]
};
const partners = {
  subTitle: 'Hàng ngàn voucher, ưu đãi, đổi điểm nhận quà',
  src1: 'https://res.cloudinary.com/db8mh2s66/image/upload/v1685793112/itel/Block_Image_koduwl.png',
  src2: 'https://res.cloudinary.com/db8mh2s66/image/upload/v1685793120/itel/Block_Image_1_l7upyz.png'
};
interface PageProps {
  offers: Array<{ title: string; description: string; media: { type: 'video' | 'img'; src: string } }>;
}
const pages = [{ name: 'Về Itel', href: '#', current: true }];
const AboutPage = (props: PageProps) => {
  const { offers } = props;
  const refArchivement = useRef<HTMLDivElement>(null);
  const refCoresValue = useRef<HTMLDivElement>(null);
  const [isShowVideo, setIsShowVideo] = useState<boolean>(false);
  const router: NextRouter = useRouter();

  useEffect(() => {
    const scrollCenterHorizontal = (refs: RefObject<HTMLDivElement>[]) => {
      refs.forEach((ref) => {
        const refCurrent = ref.current;
        if (refCurrent) {
          refCurrent.scrollLeft = (refCurrent.scrollWidth - refCurrent.clientWidth) / 2;
        }
      });
    };

    if (refArchivement.current && refCoresValue.current) scrollCenterHorizontal([refArchivement, refCoresValue]);
  }, [refArchivement.current, refCoresValue.current]);

  return (
    <>
      <Head>
        <title>Itel - Về iTel</title>
      </Head>

        <Breadcrumbs breadcrumbs={pages} />

      <section>
        <div className="relative">
          <img className="md:hidden" src={misson.bannerStartMb} alt="greeting-banner" />
          <img className="hidden md:block xl:hidden" src={misson.bannerStartTablet} alt="greeting-banner" />
          <img className="hidden xl:block" src={misson.bannerStartPc} alt="greeting-banner" />
          <h2
            style={{ textShadow: '0 5px 5px rgba(0,0,0,0.4)' }}
            className="font-itel min-w-[65%] text-center font-bold uppercase text-h-xl absolute bottom-[5%] -translate-x-1/2 left-1/2 text-neutral-0 hidden md:block xl:hidden drop-shadow-about-itel"
          >
            Xin chào! <br /> Tui là anh số đỏ đến từ iT<span className="lowercase">e</span>l!
          </h2>
        </div>
      </section>
      {/* section intro */}
      <section className=" bg-neutral-0">
        <div className="container">
          <div className="py-6 md:py-16 xl:pb-20">
            <div className="text-center">
              <h1 className="text-neutral-800 font-itel text-h-sm md:text-h-xl font-bold">
                <motion.div variants={itemVariants}>
                  GIỚI THIỆU
                  <span className="text-red-500 uppercase font-itel">
                    {' '}
                    iT<span className="lowercase">e</span>l
                  </span>
                </motion.div>
              </h1>
              <motion.p className="text-neutral-500 text-sm md:text-base md:mt-3 xl:mt-4" variants={itemVariants}>
                {introduce.subTitle}
              </motion.p>
            </div>
            <div className="mt-6 md:mt-12 flex relative px-6 py-8 md:p-8 bg-red-500 rounded-3xl xl:px-10 xl:py-16">
              <div className="md:w-[58%]">
                <h2 className="text-neutral-0 font-bold font-itel text-h-xs md:text-h-sm">{introduce.network}</h2>
                <p className="text-sm md:text-base font-normal text-neutral-0 mt-4">
                  {' '}
                  <span className="text-neutral-0 text-sm md:text-base font-bold">Mạng di động iTel </span>
                  {introduce.networkDescription}
                </p>
              </div>
              <div className="absolute -right-[12px] md:right-0 bottom-[176px] md:bottom-8 md:scale-110 xl:scale-100 xl:bottom-0 xl:right-12">
                <Image className="md:hidden" loading="lazy" src={introduce.srcMb} alt="about-img" width={115} height={110} />
                <Image
                  className="hidden md:block xl:hidden"
                  loading="lazy"
                  src={introduce.srcTablet}
                  alt="about-img"
                  width={302}
                  height={283}
                />
                <Image className="hidden xl:block" loading="lazy" src={introduce.srcPc} alt="about-img" width={440} height={326} />
              </div>
            </div>
            <div className="mt-6 xl:mt-2 bg-neutral-50 border border-neutral-300 rounded-2.5xl p-6 md:px-12 md:py-8 gap-8 md:gap-16 grid grid-cols-2 xl:flex xl:justify-between">
              {introduce.benefits.map((item) => (
                <div key={item.text} className="group flex flex-col md:justify-center items-center">
                  <Svg src={item.src} className=" xl:group-hover:text-red-500 text-red-500 h-8 w-8 md:h-10 md:w-10 xl:text-neutral-800" />
                  <p className="text-sm text-center md:text-xl font-normal md:mt-6 mt-5 text-neutral-800">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* about video */}
      <section>
        <div className="relative h-full w-full">
          <img alt="Banner" className="h-full w-full object-cover" src={banner} />
          <Svg
            onClick={() => setIsShowVideo(true)}
            src="/icons/bold/about-play.svg"
            className="absolute hover:text-red-300 cursor-pointer xl:bottom-1/2 text-red-500 h-10 w-10 md:h-18 md:w-18 bottom-[45%] -translate-x-1/2 left-1/2"
          />
        </div>
      </section>
      <div>
        <ModalVideo channel="youtube" isOpen={isShowVideo} videoId="0P-88u_epkk" onClose={() => setIsShowVideo(false)} />
      </div>
      {/* archivement */}
      <section className="py-6 md:py-16 xl:py-20 bg-neutral-50">
        <div className="text-center">
          <h2 className=" text-h-sm text-neutral-800 font-itel md:text-h-lg font-bold">
            <motion.div variants={itemVariants}>{archivement.title}</motion.div>
          </h2>
          <motion.p className="text-neutral-500 px-8 text-base font-normal" variants={itemVariants}>
            {archivement.subTitle}
          </motion.p>
        </div>
        <motion.div variants={inviewVariants} initial="offscreen" whileInView="onscreen" viewport={viewportOptions}>
          <div
            ref={refArchivement}
            className="md:mt-10 mt-6 flex select-none gap-x-9 md:gap-x-12 overflow-x-auto overflow-y-hidden xl:justify-center items-center px-8 md:px-20 scrollbar-hide xl:mt-18"
          >
            {offers.map(({ media: { type: Element, src }, title, description }, index) => {
              const props = Element === 'video' ? { autoPlay: true, muted: true, loop: true } : {};
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="group flex flex-col gap-6 w-[13.5rem] even:w-[16rem] flex-shrink-0 md:w-[19rem] even:md:w-[21rem] xl:w-[20.5rem] even:xl:w-[24rem]"
                >
                  <figure className="">
                    <div className="block-img block-photo-vertical overflow-hidden rounded-2xl">
                      <Element
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                        src={src}
                        alt={title}
                        {...props}
                        draggable={false}
                      />
                    </div>
                  </figure>
                  <div className="mx-auto text-center">
                    <div className="text-xl md:text-2xl font-bold whitespace-pre-line">{title}</div>
                    <p className="mt-1 md:mt-4 font-normal text-sm md:text-base text-neutral-500">{description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </section>
      {/* vision  */}
      <section className="bg-neutral-0 py-6 md:py-16">
        <div className="container">
          <div className="text-center">
            <h2 className=" text-neutral-800 font-itel text-h-sm md:text-h-lg font-bold">
              <motion.div variants={itemVariants}>{vision.title}</motion.div>
            </h2>
            <motion.p className="text-neutral-500 mt-1 text-sm md:text-base font-normal" variants={itemVariants}>
              {vision.subTitle}
            </motion.p>
          </div>
          <div className="xl:flex items-end">
            <div className="flex-1">
              <div className="mt-6 md:mt-10 xl:mt-24 flex relative">
                <div className="md:px-8 md:py-6 p-6 xl:py-6 xl:px-10 bg-red-600 rounded-2.5xl md:w-3/5 xl:w-full">
                  <h2 className="-tracking-tighter xl:tracking-normal font-itel text-xl md:text-h-sm font-bold text-neutral-0">
                    {vision.description}
                  </h2>
                </div>
                <div className="hidden md:block flex-1 absolute bottom-0 -right-8 xl:hidden">
                  <Image src={vision.src} alt="logo" width={320} height={320} loading="lazy" />
                </div>
              </div>
              <div className="mt-3 md:mt-8 flex flex-col gap-3 md:gap-4">
                {vision.targets.map((item) => (
                  <div key={item.text} className="bg-neutral-100 rounded-2xl md:px-10 md:py-8 px-6 py-4">
                    <p className="font-bold text-base md:text-2xl text-neutral-800">{item.text}</p>
                    <p className="text-sm md:text-base font-normal text-neutral-800 mt-4">{item.des}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="hidden xl:block flex-1">
              <Image src={vision.srcPc} alt="logo" width={648} height={648} loading="lazy" />
            </div>
          </div>
        </div>
      </section>
      {/* mission */}
      <section className="bg-red-100 pt-6">
        <div className="h-full w-full">
          <div className="text-center md:opacity-0">
            <h2 className="text-neutral-800 font-itel text-h-sm md:text-h-xl font-bold">
              <motion.div variants={itemVariants}>{misson.title}</motion.div>
            </h2>
            <motion.p className="text-neutral-500 text-sm md:text-base md:mt-3 xl:mt-4" variants={itemVariants}>
              {misson.subTitle}
            </motion.p>
          </div>
          <img alt="Banner" className="h-full w-full object-cover md:hidden" src={bannerMissionMb} />
          <img alt="Banner" className="h-full w-full object-cover hidden md:block xl:hidden " src={bannerMissionTablet} />
          <img alt="Banner" className="h-full w-full object-cover hidden xl:block" src={bannerMissonPc} />
        </div>
      </section>
      {/* core value */}
      <section className="py-6 md:py-16 bg-neutral-0">
        <div className="xl:container">
          <div className="text-center">
            <h2 className="uppercase text-neutral-800 font-itel text-h-sm md:text-h-xl font-bold">
              <motion.div variants={itemVariants}>
                Giá trị
                <span className="text-red-500 uppercase font-itel"> cốt lõi</span>
              </motion.div>
            </h2>
            <motion.p className="text-neutral-500 text-sm md:text-base md:mt-3 xl:mt-4" variants={itemVariants}>
              {coreValue.subTitle}
            </motion.p>
          </div>
          <div>
            <Svg src="/logo/logo-color.svg" className=" hidden xl:block xl:static h-20 w-full my-14 text-red-500 dark:text-neutral-0" />
            <motion.div
              ref={refCoresValue}
              variants={inviewVariants}
              initial="offscreen"
              whileInView="onscreen"
              viewport={viewportOptions}
              className="flex gap-6 xl:gap-12 items-baseline xl:justify-center xl:items-center mt-6 md:mt-10 transition-all scrollbar-hide overflow-x-scroll px-6 xl:px-0"
            >
              {coreValue.cores.map((item) => (
                <motion.div variants={itemVariants} key={item.prop} className="group flex flex-col xl:odd:flex-col-reverse">
                  <figure className="w-[160px] md:w-[322px] transition-transform duration-300 group-hover:scale-105">
                    <div className="overflow-hidden rounded-2xl">
                      <img alt="img-cores" src={item.src} />
                    </div>
                  </figure>
                  <div className="mx-auto text-center mt-1 md:mt-4 xl:mb-5">
                    <div className="text-lg md:text-2xl font-bold whitespace-pre-line">{item.prop}</div>
                    <p className="md:mt-2 font-normal text-sm text-neutral-500">{item.des}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
          <div className="mt-6 md:mt-10 xl:mt-18">
            <button
              onClick={() => router.push(Routers.RECRUITMENT)}
              className="btn-primary btn md:btn-lg btn-sm block mx-auto rounded-full"
            >
              Gia nhập iTel ngay!
            </button>
          </div>
        </div>
      </section>
      {/* partners */}
      <section className="py-6 md:py-16">
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
      <SectionSupports />
    </>
  );
};

AboutPage.getLayout = function layout(page: any) {
  return (
    <>
      <LayoutDefault isHomePage>{page}</LayoutDefault>
      {/* <ChatBoxLazy /> */}
    </>
  );
};
const getStaticProps = getServerPropsWithTranslation(async () => {
  return {
    props: {
      offers: [
        {
          title: '+3.600.000 thuê bao',
          description:
            'iTel có tốc độ tăng trưởng ấn tượng khi đã vượt 3 triệu thuê bao vào tháng 12 năm 2021, với chưa đầy 3 năm hoạt động',
          media: {
            type: 'img',
            src: 'https://res.cloudinary.com/db8mh2s66/image/upload/v1685638082/itel/IMG_1_xtd3d3.png'
          }
        },
        {
          title: 'Nhà mạng MVNO dẫn đầu',
          description:
            'iTel là nhà mạng tiên phong triển khai mô hình mạng di động ảo - MVNO (Mobile Virtual Network Operator ) tại Việt Nam.',
          media: {
            type: 'img',
            src: 'https://res.cloudinary.com/db8mh2s66/image/upload/v1685638124/itel/IMG_nilk4w.png'
          }
        },
        {
          title: 'Tạo giá trị cộng đồng',
          description:
            'iTel có tốc độ tăng trưởng ấn tượng khi đã vượt 3 triệu thuê bao vào tháng 12 năm 2021, với chưa đầy 3 năm hoạt động',
          media: {
            type: 'img',
            src: 'https://res.cloudinary.com/db8mh2s66/image/upload/v1685638129/itel/IMG_3_ei4fsh.png'
          }
        }
      ]
    } // will be passed to the page component as props
  };
});
export { getStaticProps };

export default AboutPage;
