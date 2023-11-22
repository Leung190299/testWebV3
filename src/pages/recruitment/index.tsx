import HeaderWebMobileNews from '@/components/header/header-web-mobile-news';
import Svg from '@/components/icon/svg';
import OptionInput from '@/components/input/input-option';
import { LayoutWithChatBox } from '@/components/layout/layout-default';
import SectionSupports from '@/components/section/section-supports';
import getServerPropsWithTranslation from '@/i18n/getServerPropsWithTranslation';
import Routers from '@/routes';
import NewService, { Blog, ListBlog } from '@/services/newService';
import { IJob } from '@/services/recruitment/recruiment';
import recruitmentService from '@/services/recruitmentService';
import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useSwipeable } from 'react-swipeable';

type PageProps = {};

const Recruitment: NextPage<PageProps> = () => {
  const [listJob, setListJob] = useState<recruitmentModal.ListJob>({});
  const [blog, setBlog] = useState<ListBlog>({});
  const ColumnFilterBlogs = {
    BlogCategoryId: 9
  };

  const paramsBlog = {
    columnFilters: ColumnFilterBlogs,
    sort: [],
    page: 1,
    pageSize: 1000,
    lang: 1
  };

  const params: recruitmentModal.ListJobParams = {
    columnFilters: {},
    sort: [],
    page: 1,
    pageSize: 1000,
    lang: 1
  };

  const getListJob = async () => {
    const res = await recruitmentService.getListJob(params);
    setListJob(res.result);
  };
  const getBlog = async () => {
    const res = await NewService.getListBlog(paramsBlog);
    setBlog(res.result);
  };

  useEffect(() => {
    getListJob();
    getBlog();
  }, []);

  return (
    <div>
      <Head>
        <title>Tuyển dụng</title>
      </Head>
      <HeaderWebMobileNews withMenu withSearch />
      <section>
        <Banner />
      </section>
      <section>
        <HotRecruitment jobs={listJob} />
      </section>
      <section className=" bg-neutral-0">
        <BecomePartner />
      </section>
      <section className=" max-md:bg-neutral-50">
        <ListenITelHumanCarousel />
      </section>
      <section className=" bg-neutral-50 md:bg-neutral-0 pb-8 md:py-16 xl:py-20">
        <CoreValue />
      </section>
      <section>
        <DiscoverITel blog={blog.ListFeatureBlog || []} />
      </section>
      <section>
        <SendEmail />
      </section>
      <section>
        <SectionSupports />
      </section>
    </div>
  );
};

const Banner = () => {
  const positions = [
    {
      id: 1,
      name: 'Designer'
    },
    {
      id: 2,
      name: 'Chăm sóc Khách hàng'
    },
    { id: 3, name: 'Saler' },
    { id: 4, name: 'Marketing' },
    {
      id: 5,
      name: 'Data Analyst'
    },
    {
      id: 6,
      name: 'Backend Dev'
    }
  ];
  const locations = [
    {
      id: 1,
      name: 'Toàn quốc'
    },
    {
      id: 2,
      name: 'Hà Nội'
    },
    { id: 3, name: 'Hồ Chí Minh' },
    { id: 4, name: 'Hải Phòng' },
    {
      id: 5,
      name: 'Nha Trang'
    },
    {
      id: 6,
      name: 'Khánh Hòa'
    }
  ];
  return (
    <div className="relative bg-modern-red">
      <img className="absolute -left-20 xl:left-14 md:left-0 max-xl:w-56 bottom-0" src="/images/banner-career-left.png" alt="banner" />
      <img
        className="absolute right-0 max-md:h-60 max-xl:h-80 bottom-0"
        src="https://res.cloudinary.com/dm1ttdfnb/image/upload/v1687278615/Recruitment/Group_41444_qq2qgf.png"
        alt="banner"
      />
      <div className="container flex justify-center items-center flex-col py-16 lg:py-28 relative text-neutral-0">
        <h2 className="font-itel text-h4 font-bold md:text-h2 text-center">
          cùng itel kiến tạo <br /> những giá trị tiếp nối
        </h2>
        <p className="text-center mt-2 max-md:text-sm">
          iTel là nhà mạng tiên phong triển khai mô hình mạng di động ảo - MVNO (Mobile Virtual Network Operator ) tại Việt Nam.
          <br />
          Hãy đồng hành cùng chúng tôi trên hành trình tối ưu dịch vụ viễn thông và nâng cao trải nghiệm khách hàng vượt trội.
        </p>
        <div className="w-full flex justify-center gap-4 mt-16">
          <OptionInput label="Vị trí" placeholder="Tất cả vị trí" className=" w-1/2 lg:w-1/3" options={positions} />
          <OptionInput
            defaultValue={locations[0].name}
            buttonDown
            label="Địa điểm"
            placeholder="Tất cả vị trí"
            className="w-1/2 lg:w-1/3"
            options={locations}
          />
        </div>
        <Link href={Routers.RECRUITMENT_SEARCH}>
          <button className="rounded-full bg-neutral-0 text-primary py-4 px-20 font-bold mt-12 hover:bg-opacity-80 max-md:text-sm">
            Tìm Kiếm
          </button>
        </Link>
      </div>
    </div>
  );
};

const CarouselHotRecruitment = ({ jobs, showItems = 3 }: { jobs: recruitmentModal.ListJob; showItems?: number }) => {
  const router = useRouter();

  const onClickJob = (slug: string | number) => {
    router.push(`/recruitment/detail?slug=${slug}`);
  };

  const [curr, setCurr] = useState(0);
  const [currMobile, setCurrMobile] = useState(0);

  const prev = () => setCurr((curr) => (curr === 0 ? showItems - 1 : curr - 1));
  const next = () => setCurr((curr) => (curr === showItems - 1 ? 0 : curr + 1));

  return (
    <div className="relative">
      <div className="lg:w-[1260px] lg:overflow-hidden">
        <div
          className="flex transition-transform ease-out duration-500 w-screen lg:w-auto overflow-x-scroll lg:overflow-visible scroll-smooth lg:scrollbar-hide scrollbar-hide"
          style={{ transform: `translateX(-${curr * 100}%)` }}
          onScroll={(e) => {
            const widthScreenMd = 760;
            let widthItem = e.currentTarget.clientWidth < widthScreenMd ? 360 : 420;
            if (e.currentTarget.scrollLeft > widthItem * showItems * (currMobile + 1)) {
              setCurrMobile(currMobile + 1);
            }
            if (e.currentTarget.scrollLeft < widthItem * showItems * currMobile) {
              setCurrMobile(currMobile - 1);
            }
          }}
        >
          {jobs.Recruitment?.map((item) => (
            <div key={item.Id}>
              <div className=" w-[360px] md:w-[420px] p-3 h-full">
                <section className="bg-neutral-0 p-4 md:p-6 rounded-lg flex flex-col justify-between gap-4 h-full">
                  <div className="flex gap-2">
                    <span className="bg-red-100 text-primary rounded-full px-3 py-1 max-md:text-sm">Hà Nội</span>
                    <span className="bg-red-100 text-primary rounded-full px-3 py-1 max-md:text-sm">Full-time</span>
                  </div>
                  <h4 className="text-h4 font-bold max-md:text-lg"> {item.Title}</h4>
                  <div>
                    <p className=" text-neutral-500 line-clamp-3 max-md:text-sm">{item.Brief}</p>
                    <div
                      onClick={() => onClickJob(item.Slug!)}
                      className="mt-4 flex items-center gap-4 text-sm hover:cursor-pointer hover:bg-red-400 hover:text-neutral-0 w-fit p-2 rounded-lg transition-all"
                    >
                      Chi tiết <Svg src="/icons/bold/arrow-right.svg" className="h-3 w-3 md:h-6 md:w-6" />
                    </div>
                  </div>
                </section>
              </div>
            </div>
          ))}
        </div>
      </div>
      <button
        onClick={prev}
        className="btn-tertiary hover:bg-neutral-0 btn btn-circle absolute -left-24 rotate-180 top-1/2 h-18 w-18 -translate-y-1/2 transform border border-neutral-300 bg-neutral-0 hidden lg:flex"
      >
        <Svg src="/icons/bold/right-arrow.svg" className="inline h-4 w-2" />
      </button>
      <button
        onClick={next}
        className="btn-tertiary hover:bg-neutral-0 btn btn-circle absolute -right-24 top-1/2 h-18 w-18 -translate-y-1/2 transform border border-neutral-300 bg-neutral-0 hidden lg:flex"
      >
        <Svg src="/icons/bold/right-arrow.svg" className="inline h-4 w-2" />
      </button>
      <div className="absolute -bottom-8 right-0 left-0">
        <div className="xl:flex items-center justify-center gap-2 hidden">
          {Array(showItems)
            .fill(0)
            .map((_: any, i: number) => (
              <div
                key={i}
                className={`
                transition-all w-2 h-2 rounded-full
                ${curr === i ? 'bg-neutral-900' : 'bg-neutral-900 bg-opacity-50'}
              `}
              />
            ))}
        </div>
        <div className="flex items-center justify-center gap-2 xl:hidden">
          {Array(showItems)
            .fill(0)
            .map((_: any, i: number) => (
              <div
                key={i}
                className={`
                transition-all w-2 h-2 rounded-full
                ${currMobile === i ? 'bg-neutral-900' : 'bg-neutral-900 bg-opacity-50'}
              `}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

const HotRecruitment = ({ jobs }: { jobs: recruitmentModal.ListJob }) => {
  return (
    <div className="container flex flex-col justify-center items-center py-8 md:py-16 xl:py-20">
      <h1 className=" font-itel text-h4 font-bold max-md:text-center md:text-h1">
        Vị trí <span className="text-primary max-md:block">tuyển dụng hot</span>
      </h1>
      <p className="mt-2 text-neutral-500 pb-6 md:pb-14 max-md:text-sm">Cơ hội cho bạn, nắm bắt ngay!</p>
      <CarouselHotRecruitment jobs={jobs} />
      <Link href={Routers.RECRUITMENT_SEARCH}>
        <button className="rounded-full btn-primary py-4 px-4 md:px-20 font-bold mt-16 md:mt-20 max-md:text-sm">Xem tất cả</button>
      </Link>
    </div>
  );
};

const BecomePartner = () => {
  return (
    <div className="container flex flex-col justify-center items-center py-6 md:py-16 xl:py-20">
      <h1 className=" font-itel text-h4 font-bold max-md:text-center md:text-h1">
        gia nhập <span className="text-primary">itel</span>
      </h1>
      <p className="mt-2 text-neutral-500 max-md:text-sm">Tạo hồ sơ và ứng tuyển trực tuyến ngay hôm nay.</p>
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-3 md:gap-8 mt-6 md:mt-10">
        <section className="col-span-2 lg:col-span-3">
          <div className="overflow-hidden rounded-2xl">
            <Link href={Routers.RECRUITMENT_SEARCH}>
              <img
                className="w-full hover:scale-110 transition-all"
                src="https://res.cloudinary.com/dm1ttdfnb/image/upload/v1686247684/Recruitment/Block_Image_e0xox9.png"
                alt=""
              />
            </Link>
          </div>
          <h5 className="text-h5 mt-4 font-bold max-md:text-base">Business & Support</h5>
        </section>
        <section className="lg:col-span-3 max-md:h-full flex flex-col">
          <div className="flex-1 overflow-hidden rounded-2xl">
            <Link href={Routers.RECRUITMENT_SEARCH}>
              <img
                className="flex-1 hover:scale-110 transition-all h-full object-cover"
                src="https://res.cloudinary.com/dm1ttdfnb/image/upload/v1686247724/Recruitment/Block_Image_cgvhpf.png"
                alt=""
              />
            </Link>
          </div>
          <h5 className="text-h5 mt-4 font-bold max-md:text-base">Marketing & Comunication</h5>
        </section>
        <section className="lg:col-span-2">
          <div className="overflow-hidden rounded-2xl">
            <Link href={Routers.RECRUITMENT_SEARCH}>
              <img
                className=" hover:scale-110 transition-all"
                src="https://res.cloudinary.com/dm1ttdfnb/image/upload/v1686247741/Recruitment/Block_Image_fgkggo.png"
                alt=""
              />
            </Link>
          </div>
          <h5 className="text-h5 mt-4 font-bold max-md:text-base">Engineering & Technology</h5>
        </section>
        <section className="lg:col-span-2">
          <div className="overflow-hidden rounded-2xl">
            <Link href={Routers.RECRUITMENT_SEARCH}>
              <img
                className="hover:scale-110 transition-all"
                src="https://res.cloudinary.com/dm1ttdfnb/image/upload/v1686247751/Recruitment/Block_Image_gq1bji.png"
                alt=""
              />
            </Link>
          </div>
          <h5 className="text-h5 mt-4 font-bold max-md:text-base">Product & Design</h5>
        </section>
        <section className="lg:col-span-2">
          <div className="overflow-hidden rounded-2xl">
            <Link href={Routers.RECRUITMENT_SEARCH}>
              <img
                className="hover:scale-110 transition-all"
                src="https://res.cloudinary.com/dm1ttdfnb/image/upload/v1686247767/Recruitment/Block_Image_r4bpml.png"
                alt=""
              />
            </Link>
          </div>
          <h5 className="text-h5 mt-4 font-bold max-md:text-base">Peopel-Finance- & Legal</h5>
        </section>
      </div>
    </div>
  );
};

const CarouselListenITel = () => {
  const reviews = [
    {
      author: 'Hải Yến 1',
      des: 'Mình luôn thấy may mắn khi được làm việc tại #iTel. Tại đây, mình đã có những người em, người bạn, người đồng hành tuyệt vời!',
      position: 'Product Growth',
      img: 'https://res.cloudinary.com/dm1ttdfnb/image/upload/v1686337458/Recruitment/Block_Image_3_qv0tcu.png'
    },
    {
      author: 'Hải Yến 2',
      des: 'Mình luôn thấy may mắn khi được làm việc tại #iTel. Tại đây, mình đã có những người em, người bạn, người đồng hành tuyệt vời!',
      position: 'Product Growth',
      img: 'https://res.cloudinary.com/dm1ttdfnb/image/upload/v1686337458/Recruitment/Block_Image_3_qv0tcu.png'
    },
    {
      author: 'Hải Yến 3',
      des: 'Mình luôn thấy may mắn khi được làm việc tại #iTel. Tại đây, mình đã có những người em, người bạn, người đồng hành tuyệt vời!',
      position: 'Product Growth',
      img: 'https://res.cloudinary.com/dm1ttdfnb/image/upload/v1686337458/Recruitment/Block_Image_3_qv0tcu.png'
    }
  ];
  const [curr, setCurr] = useState(0);

  const prev = () => setCurr((curr) => (curr === 0 ? reviews.length - 1 : curr - 1));
  const next = () => setCurr((curr) => (curr === reviews.length - 1 ? 0 : curr + 1));

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      next();
    },
    onSwipedRight: () => {
      prev();
    },
    swipeDuration: 500,
    preventScrollOnSwipe: true,
    trackMouse: true,
    trackTouch: true
  });

  return (
    <div className="relative z-10">
      <img
        className="absolute max-xl:top-10 max-md:top-0 max-md:w-6 max-md:left-4 "
        src={'https://res.cloudinary.com/dm1ttdfnb/image/upload/v1686797046/Recruitment/ur8pnum6uv0uiqw6yk2r.png'}
        alt=""
      />
      <div className="w-screen lg:w-[1200px] overflow-hidden">
        <div className="flex transition-transform ease-out duration-500" style={{ transform: `translateX(-${curr * 100}%)` }} {...handlers}>
          {reviews.map((item, i) => (
            <div key={i}>
              <div className="w-screen lg:w-[1200px] flex flex-col lg:flex-row gap-10 p-4 md:p-10 lg:p-0">
                <div className="lg:w-1/2 flex flex-col gap-6 md:mt-10">
                  <h4 className=" text-xl md:text-h4 font-bold ">{item.des}</h4>
                  <div>
                    <p className="text-lg font-bold">{item.author}</p>
                    <p className="text-lg max-md:text-base text-neutral-400">{item.position}</p>
                  </div>
                </div>
                <img className="lg:w-1/2" src={item.img} alt="" />
              </div>
            </div>
          ))}
        </div>
      </div>
      <button
        onClick={prev}
        className="btn btn-circle text-neutral-wf-900 absolute -left-24 rotate-180 top-1/2 h-18 w-18 -translate-y-1/2 transform border border-neutral-300 bg-neutral-0 hidden lg:flex"
      >
        <Svg src="/icons/bold/right-arrow.svg" className="inline h-4 w-2" />
      </button>
      <button
        onClick={next}
        className="btn btn-circle text-neutral-wf-900 absolute -right-24 top-1/2 h-18 w-18 -translate-y-1/2 transform border border-neutral-300 bg-neutral-0 hidden lg:flex"
      >
        <Svg src="/icons/bold/right-arrow.svg" className="inline h-4 w-2" />
      </button>
      <div className="absolute lg:top-1/2 left-1/2 -translate-x-1/2 lg:translate-x-0 lg:left-0">
        <div className="flex items-center justify-center gap-2">
          {reviews.map((_: any, i: number) => (
            <div
              key={i}
              className={`
                transition-all w-2 h-2 rounded-full
                ${curr === i ? 'bg-neutral-900' : 'bg-neutral-900 bg-opacity-50'}
              `}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const ListenITelHumanCarousel = () => {
  return (
    <div className="container flex flex-col justify-center items-center pt-6 md:pt-20 pb-10 md:pb-20 xl:pb-0 relative">
      <h1 className=" font-itel text-h4 font-bold md:text-h1 ">
        Lắng nghe <span className="text-primary max-md:block text-center">người itel</span>
      </h1>
      <p className="mt-2 mb-4 text-neutral-500 xl:pb-20 max-md:text-center">
        Chúng tôi mang đến môi trường làm việc thân thiện, sáng tạo và không ngừng phát triển!
      </p>
      <CarouselListenITel />
      <img
        src="https://res.cloudinary.com/dm1ttdfnb/image/upload/v1686337391/Recruitment/Element_doyjsr.png"
        alt=""
        className="absolute -left-[15%] bottom-0 hidden xl:block"
      />
    </div>
  );
};

const CoreValue = () => {
  return (
    <div className="lg:container flex flex-col justify-center items-center">
      <h1 className=" font-itel text-h4 font-bold md:text-h1">
        Giá trị <span className="text-primary">cốt lõi</span>
      </h1>
      <p className="mt-2 text-neutral-500 max-md:text-center">
        iTel có tốc độ tăng trưởng ấn tượng khi đã vượt 3 triệu thuê bao vào tháng 12 năm 2021
      </p>
      <Svg src="/logo/logo-color.svg" className="text-red-500 dark:text-neutral-0 w-52 h-20 my-10 hidden xl:block" />
      <div className="hidden xl:grid grid-cols-3 gap-12">
        <section className="text-center">
          <div className="py-1 md:py-4 max-md:w-full">
            <h5 className="text-lg md:text-h5 md:mb-2 font-bold">Nhanh</h5>
            <p className="max-md:text-sm text-neutral-500">Vượt mọi deadline</p>
          </div>
          <div className="overflow-hidden rounded-2xl">
            <img
              className="w-full hover:scale-110 transition-all"
              src="https://res.cloudinary.com/dm1ttdfnb/image/upload/v1686249385/Recruitment/Block_Image_qx6zbk.png"
              alt=""
            />
          </div>
        </section>
        <section className="text-center">
          <div className="overflow-hidden rounded-2xl">
            <img
              className="w-full hover:scale-110 transition-all"
              src="https://res.cloudinary.com/dm1ttdfnb/image/upload/v1686249385/Recruitment/Block_Image_1_m046sa.png"
              alt=""
            />
          </div>
          <div className="py-1 md:py-4 max-md:w-full">
            <h5 className="text-lg md:text-h5 md:mb-2 font-bold">Sáng tạo</h5>
            <p className="max-md:text-sm text-neutral-500">Luôn tìm cách làm tốt hơn cho mọi công việc</p>
          </div>
        </section>
        <section className="text-center">
          <div className="py-1 md:py-4 max-md:w-full">
            <h5 className="text-lg md:text-h5 md:mb-2 font-bold">Vui vẻ</h5>
            <p className="max-md:text-sm text-neutral-500">Vui vẻ mỗi ngày, làm việc thêm hăng say</p>
          </div>
          <div className="overflow-hidden rounded-2xl">
            <img
              className="w-full hover:scale-110 transition-all"
              src="https://res.cloudinary.com/dm1ttdfnb/image/upload/v1686249385/Recruitment/Block_Image_2_rlaxjg.png"
              alt=""
            />
          </div>
        </section>
      </div>
      <div className="scrollbar-hide flex touch-pan-x snap-x snap-mandatory flex-nowrap items-start justify-start gap-3 md:gap-4 xl:gap-6 overflow-x-scroll scroll-smooth py-6 w-full xl:hidden px-4">
        <div>
          <section className="text-center flex flex-col-reverse lg:flex-col justify-end w-80 md:w-96">
            <div className="py-1 md:py-4 max-md:w-full">
              <h5 className="text-lg md:text-h5 md:mb-2 font-bold">Nhanh</h5>
              <p className="max-md:text-sm text-neutral-500">Vượt mọi deadline</p>
            </div>
            <img
              className="w-full"
              src="https://res.cloudinary.com/dm1ttdfnb/image/upload/v1686249385/Recruitment/Block_Image_qx6zbk.png"
              alt=""
            />
          </section>
        </div>
        <div>
          <section className="text-center w-80 md:w-96">
            <img src="https://res.cloudinary.com/dm1ttdfnb/image/upload/v1686249385/Recruitment/Block_Image_1_m046sa.png" alt="" />
            <div className="py-1 md:py-4 max-md:w-full">
              <h5 className="text-lg md:text-h5 md:mb-2 font-bold">Sáng tạo</h5>
              <p className="max-md:text-sm text-neutral-500">Luôn tìm cách làm tốt hơn cho mọi công việc</p>
            </div>
          </section>
        </div>
        <div>
          <section className="text-center flex flex-col-reverse lg:flex-col justify-end items-end w-80 md:w-96">
            <div className="py-1 md:py-4 max-md:w-full">
              <h5 className="text-lg md:text-h5 md:mb-2 font-bold">Vui vẻ</h5>
              <p className="max-md:text-sm text-neutral-500">Vui vẻ mỗi ngày, làm việc thêm hăng say</p>
            </div>
            <img src="https://res.cloudinary.com/dm1ttdfnb/image/upload/v1686249385/Recruitment/Block_Image_2_rlaxjg.png" alt="" />
          </section>
        </div>
      </div>
      <Link href={Routers.RECRUITMENT_SEARCH}>
        <button className="rounded-full btn-primary p-4 font-bold md:mt-12 max-md:text-sm">Gia nhập iTel ngay!</button>
      </Link>
    </div>
  );
};

const DiscoverITel = ({ blog }: { blog: Blog[] }) => {
  const router = useRouter();
  const onClickDetail = (slug: string) => {
    router.push({ pathname: Routers.NEWS_DETAIL, query: { slug } });
  };
  
  return (
    <div className="container flex flex-col justify-center items-center py-6 md:py-16 xl:py-20">
      <h1 className=" font-itel text-h4 font-bold md:text-h1">
        Khám phá <span className="text-primary">itel</span>
      </h1>
      <p className="mt-2 text-neutral-500 max-md:text-center">
        iTel có tốc độ tăng trưởng ấn tượng khi đã vượt 3 triệu thuê bao vào tháng 12 năm 2021
      </p>
      <div className="pt-3 md:pt-10 xl:pb-20 flex gap-6 flex-col xl:flex-row">
        <section className="w-full xl:w-2/3 hover:cursor-pointer relative" onClick={() => onClickDetail((blog[0]?.Slug) || '')}>
          <div className="w-full overflow-hidden rounded-xl">
            <img className=" w-full hover:scale-110 transition-default aspect-photo" src={ blog[0]?.Thumbnail ||'' } alt="" />
          </div>
          <div className="lg:absolute mt-4">
            <h3 className="font-bold md:text-h-xs max-md:line-clamp-1">{ blog[0]?.Title ||''}</h3>
            <p className="text-[#666666] max-md:text-sm">{blog[0]?.Tagging||''}</p>
          </div>
        </section>
        <section className="xl:flex-col w-full xl:w-1/3 flex justify-between gap-6 lg:gap-0">
          <div className="w-1/2 xl:w-full hover:cursor-pointer" onClick={() => onClickDetail((blog[1]?.Slug) || '')}>
            <div className="w-full overflow-hidden rounded-xl">
              <img
                className="aspect-cinema w-full hover:scale-110 transition-default"
                src={blog[1]?.Thumbnail||''}
                alt=""
              />
            </div>
            <div className=" mt-2">
              <h3 className=" font-bold md:text-lg max-md:line-clamp-2">{blog[1]?.Title||''}</h3>
            </div>
          </div>
          <div className="w-1/2 xl:w-full hover:cursor-pointer" onClick={() => onClickDetail((blog[2]?.Slug) || '')}>
            <div className="w-full overflow-hidden rounded-xl mt-7">
              <img
                className="aspect-cinema w-full hover:scale-110 transition-default"
                src={blog[2]?.Thumbnail||''}
                alt=""
              />
            </div>
            <div className=" mt-2">
              <h3 className=" font-bold md:text-lg max-md:line-clamp-2">{blog[2]?.Title||''}</h3>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export const SendEmail = () => {
  const [email, setEmail] = useState('');
  return (
    <section className="relative bg-base-100 py-16">
      <img
        src="https://res.cloudinary.com/dm1ttdfnb/image/upload/v1686250174/Recruitment/Banner_x9we47.png"
        alt="banner_background"
        className="absolute inset-0 h-full w-full object-cover hidden xl:block"
      />
      <img
        src="https://res.cloudinary.com/dm1ttdfnb/image/upload/v1686709758/Recruitment/Tablet_jlb7lb.png"
        alt="banner_background"
        className="absolute inset-0 h-full w-full object-cover block md:hidden"
      />
      <img
        src="https://res.cloudinary.com/dm1ttdfnb/image/upload/v1686820033/Recruitment/Tablet_lpfd8p.png"
        alt="banner_background"
        className="absolute inset-0 h-full w-full object-cover hidden md:block xl:hidden"
      />
      <div className="relative container">
        <div className="font-itel text-neutral-0 w-4/5 md:w-full">
          <h2 className=" text-h5 md:text-h3">
            <span className="max-xl:hidden">
              Liên hệ với chúng tôi
              <br /> để nhận thông tin tuyển dụng
            </span>
            <span className="xl:hidden">
              Liên hệ với chúng tôi
              <br /> để nhận thông tin <br /> tuyển dụng
            </span>
          </h2>
        </div>
        <div className="mt-10 w-3/4 xl:w-1/2">
          <div className="relative flex rounded-full bg-neutral-100">
            <div className="flex w-16 flex-shrink-0 items-center justify-center ">
              <Svg src="/icons/bold/email.svg" className="inline h-6 w-6" />
            </div>
            <input
              placeholder="Nhập email của bạn"
              className="peer w-full bg-transparent p-4 font-medium outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  setEmail('');
                }
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

const getStaticProps = getServerPropsWithTranslation<PageProps>(async () => {
  return {
    props: {}
    // revalidate: 8600
  };
});

Recruitment.getLayout = LayoutWithChatBox;
// export { getStaticProps };
export default Recruitment;
