import { NextPage } from 'next';
import { Logger } from '@/utilities/logger';
import getServerPropsWithTranslation from '@/i18n/getServerPropsWithTranslation';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import LayoutDefault from '@/components/layout/layout-default';
import Link from 'next/link';
import Routers from '@/routes';
import Head from 'next/head';
import SectionSupports from '@/components/section/section-supports';
import recruitmentService, { IJob } from '@/services/recruitment/recruiment';
import { Menu } from '@headlessui/react';
import Svg from '@/components/icon/svg';
import DropdownShare from '@/components/dropdown/dropdown-share';
import { copyTextToClipboard } from '@/utilities/copy';
import { toast } from 'react-hot-toast';
import { modal } from '@/libs/modal';
import ModalSharePost from '@/components/modal/modal-share-post';
import HeaderWebDefault from '@/components/header/header-web-default';
import { SendEmail } from '@/pages/recruitment/index';

type PageProps = {
  job: IJob;
  similarJobs?: IJob[];
};

const logger = new Logger('ICareer Detail Page');
const JobDetail: NextPage<PageProps> = ({ router, job, similarJobs }) => {
  const href = typeof window !== 'undefined' ? window.location.href : '/';
  const imageCareer = '/images/my-itel.png';

  const [scrollPosition, setScrollPosition] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  function handleCopy() {
    copyTextToClipboard(href).then(() => toast.success('Đã sao chép'));
  }

  const handleModalShare = useCallback(() => {
    modal.open({
      render(props) {
        return (
          <div className="" style={{ minHeight: '30vh' }}>
            <ModalSharePost
              withLink
              itemImage={imageCareer}
              itemName={'Tuyển dụng'}
              itemDesc={`Vị trí ${job.jobTitle}`}
              href={href}
              onCopy={handleCopy}
            />
          </div>
        );
      },
      closeButton: true,
      className: 'modal-box max-w-[35rem]'
    });
  }, [handleCopy, href, job.jobTitle]);

  const handleShowBottomSheet = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    modal.open({
      render(props) {
        return (
          <div className="container py-1" style={{ minHeight: '30vh' }}>
            <ModalSharePost
              withLink
              itemImage={imageCareer}
              itemName={'Tuyển dụng'}
              itemDesc={`Vị trí ${job.jobTitle}`}
              href={href}
              onCopy={handleCopy}
            />{' '}
          </div>
        );
      },
      className: 'modal-box shadow-itel',
      classNameContainer: 'modal-bottom-sheet',
      classNameOverwrite: true,
      closeButton: false,
      transition: false
    });
  };

  const handleScroll = () => {
    const position = window.pageYOffset;
    const screenWidth = window.innerWidth;
    setScrollPosition(position);
    setIsMobile(screenWidth < 760);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const isScrollEndDes = useMemo(() => {
    if (isMobile) {
      return scrollPosition > 1390;
    } else {
      return scrollPosition > 690;
    }
  }, [isMobile, scrollPosition]);

  return (
    <div className="news-detail bg-neutral-0">
      <section className="container max-md:bg-neutral-100">
        <div className="breadcrumbs text-sm text-neutral-500">
          <ul aria-label="Breadcrumb line-clamp-1 ">
            <li className="">
              <Link href={Routers.IMALL}> Trang chủ </Link>
            </li>
            <li className="">
              <Link href={Routers.RECRUITMENT}>Tuyển dụng</Link>
            </li>
            <li className="text-neutral-800 line-clamp-1 ">
              <Link href={router.asPath}>
                <p className="line-clamp-1 ">{job.jobTitle}</p>
              </Link>
            </li>
          </ul>
        </div>
      </section>
      <section className="container relative flex max-xl:flex-col py-6 md:py-10 xl:gap-10">
        <div className="description w-full xl:w-2/3 text-neutral-700">
          <p className="text-base md:text-sm mb-2">Tuyển dụng • 09/03/2023</p>
          <h2 className="font-bold text-xl xl:text-2xl md:text-[32px] xl:leading-[48px] xl:text-[40px] text-neutral-800 mb-4 md:mb-6">
            Vị trí {job.jobTitle}
          </h2>
          <div className="xl:hidden grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            <div className="">
              <p className="text-sm mb-2 text-neutral-500">Hạn nộp hồ sơ</p>
              <span className="font-bold text-base">10.04.2023</span>
            </div>
            <div className="">
              <p className="text-sm mb-2 text-neutral-500">Địa điểm</p>
              <span className="font-bold text-base">Hồ Chí Minh</span>
            </div>
            <div className="">
              <p className="text-sm mb-2 text-neutral-500">Vị trí</p>
              <span className="font-bold text-base">Full-time</span>
            </div>
            <div className="">
              <p className="text-sm mb-2 text-neutral-500">Mức lương</p>
              <span className="font-bold text-base">Thỏa thuận</span>
            </div>
          </div>
          <h3 className="text-neutral-800 text-xl font-bold mb-2 md:mb-4">Về iTel</h3>
          <p className="text-base mb-4 md:mb-6">
            CÔNG TY CỔ PHẨN VIỄN THÔNG DI ĐỘNG ĐÔNG DƯƠNG TẬP ĐOÀN BITEXCO
            <br /> Link website: https://itel.vn/
            <br /> Hà Nội: Tòa nhà The Manor, Mễ Trì, Mỹ đình 1, Nam Từ Liêm
            <br /> Hồ Chí Minh: Số 1, Mạc Đĩnh Chi, Phường Bến Nghé, Quận 1, Hồ Chí Minh
          </p>
          <h3 className="text-neutral-800 text-xl font-bold mb-2 md:mb-4">Thông tin tuyển dụng</h3>
          <ul className="text-base list-disc mb-4 md:mb-6 pl-4">
            <li className="mb-4">Số lượng tuyển: 5 người</li>
            <li className="mb-4">Hạn nộp hồ sơ: 06/04/2023</li>
            <li className="mb-4">Địa điểm làm việc: CT2 Ngô Thì Nhậm, Hà Đông, Hà Nội</li>
          </ul>

          <h3 className="text-neutral-800 text-xl font-bold mb-2 md:mb-4">Mô tả công việc</h3>
          <ul className="text-base list-disc mb-4 md:mb-6 pl-4">
            <li className="mb-4">
              Work with a cross-functional scrum team dedicated to solving sophisticated workflow management problems.
            </li>
            <li className="mb-4">Partner with a Product Manager and Engineers on developing designs from ideas to execution.</li>
            <li className="mb-4">
              Partner with UX Researchers, Content Designers, and other Product Designers to ensure your work goes through our design
              process, is informed by customer insights and results in material improvements to the user experience.
            </li>
            <li className="mb-4">
              Design interaction models, flows, wireframes, and high-fidelity mockups that promote ease of use and optimize how customers
              interact with our products.{' '}
            </li>
            <li className="mb-4">
              Present design solutions to partners and senior executives, defend design decisions, and incorporate feedback into the design
              cycle.
            </li>
          </ul>

          <h3 className="text-neutral-800 text-xl font-bold mb-2 md:mb-4">Yêu cầu công việc</h3>
          <ul className="text-base list-disc mb-4 md:mb-6 pl-4">
            <li className="mb-4">Education: Bachelor's Degree at Art University or relevant field.</li>
            <li className="mb-4">2+ years as a professional graphic designer with proven records in UIUX design.</li>
            <li className="mb-4">
              Good aesthetic background, understanding design principles, and visual communication, strong creative vision with an
              understanding of business objectives
            </li>
            <li className="mb-4">
              Creative thinking, well-updating trends and being able to withstand high pressures and committing to providing the highest
              quality design products.
            </li>
          </ul>
          <h3 className="text-neutral-800 text-xl font-bold mb-2 md:mb-4">Quyền lợi ứng viên</h3>
          <ul className="text-base list-disc mb-4 md:mb-6 pl-4">
            <li className="mb-4">Answer phone calls and written questions, concerns, and complaints regarding membership.</li>
            <li className="mb-4">Provide information on membership fees, policies, processes, benefits, products, and services.</li>
            <li className="mb-4">Listen to members and identifying their needs.</li>
            <li className="mb-4">Recommend and cross-selling products and services to members and potential members.</li>
            <li className="mb-4">Investigate and resolving or escalating membership and payment issues.</li>
          </ul>
        </div>

        <div
          className={`flex sticky z-30 ${
            isScrollEndDes
              ? ''
              : 'justify-between max-md:flex-col py-3 max-md:pb-6 px-4 md:px-6 bg-neutral-0 -mx-4 md:-mx-10 border-t-[1px] border-neutral-200'
          } bottom-0 flex-rows gap-4 xl:hidden`}
        >
          {isScrollEndDes ? (
            <>
              <button
                onClick={isMobile ? handleShowBottomSheet : handleModalShare}
                type="button"
                className="flex gap-1 md:gap-2 btn-secondary btn btn-lg rounded-full w-1/2"
              >
                <Svg src="/icons/bold/share.svg" width={24} height={24} />
                Chia sẻ
              </button>
              <Link
                className="btn-primary btn btn-lg rounded-full w-1/2 max-md:px-2"
                href={{ pathname: Routers.RECRUITMENT_APPLY, query: { id: job.id } }}
              >
                Ứng tuyển ngay
              </Link>
            </>
          ) : (
            <>
              <div className="flex flex-col">
                <p className="text-neutral-500 text-sm">Ứng tuyển</p>
                <p className="text-xl font-bold">Vị trí {job.jobTitle}</p>
              </div>
              <div className="flex gap-2 max-md:w-full">
                <button
                  onClick={isMobile ? handleShowBottomSheet : handleModalShare}
                  type="button"
                  className="flex gap-2 btn-secondary btn btn-lg rounded-full max-md:w-1/2"
                >
                  <Svg src="/icons/bold/share.svg" width={24} height={24} />
                  Chia sẻ
                </button>
                <Link
                  className="btn-primary btn btn-lg rounded-full max-md:w-1/2 max-md:px-2"
                  href={{ pathname: Routers.RECRUITMENT_APPLY, query: { id: job.id } }}
                >
                  Ứng tuyển ngay
                </Link>
              </div>
            </>
          )}
        </div>

        <div className="job-des hidden xl:flex md:w-1/3 rounded-2xl relative h-fit flex-col border border-neutral-300 xl:h-fit xl:min-h-[650px] p-8">
          <span className="tag tag-vector tag-md h-auto bg-gradient-to-r from-yellow-500 to-red-500 py-2 px-4">Tuyển dụng mới</span>
          <h2 className="text-h4 font-bold xl:text-2xl xl:leading-8 mb-6 mt-3">{job.jobTitle}</h2>

          <div className="mb-4">
            <p className="text-sm mb-2 text-neutral-500">Hạn nộp hồ sơ</p>
            <span className="font-bold text-base">10.04.2023</span>
          </div>
          <div className="mb-4">
            <p className="text-sm mb-2 text-neutral-500">Địa điểm</p>
            <span className="font-bold text-base">Hồ Chí Minh</span>
          </div>
          <div className="mb-4">
            <p className="text-sm mb-2 text-neutral-500">Ngành nghề</p>
            <span className="font-bold text-base">Product & Design</span>
          </div>
          <div className="mb-4">
            <p className="text-sm mb-2 text-neutral-500">Vị trí</p>
            <span className="font-bold text-base">Full-time</span>
          </div>
          <div className="mb-8">
            <p className="text-sm mb-2 text-neutral-500">Mức lương</p>
            <span className="font-bold text-base">Thỏa thuận</span>
          </div>
          <div className="flex flex-col gap-4">
            <Link href={{ pathname: Routers.RECRUITMENT_APPLY, query: { id: job.id } }}>
              <button type="button" className="btn-primary btn btn-lg rounded-full w-full">
                Ứng tuyển ngay
              </button>
            </Link>
            <Menu>
              <Menu.Button
                type="button"
                className="flex items-center justify-center gap-2 py-3 transition-default hover:text-primary max-xl:hidden"
              >
                <Svg src="/icons/bold/share.svg" width={24} height={24} />
                <span className="font-bold">Chia sẻ</span>
              </Menu.Button>
              <Menu.Items className="absolute right-0 z-10 mt-2 w-[25rem] origin-top-right rounded-2xl shadow-itel" data-theme="light">
                <DropdownShare
                  withLink
                  itemImage={imageCareer}
                  itemName={'Tuyển dụng'}
                  itemDesc={`Vị trí ${job.jobTitle}`}
                  href={href}
                  onCopy={handleCopy}
                />
              </Menu.Items>
            </Menu>
          </div>
        </div>
      </section>
      <div className="bg-neutral-50 py-4 md:py-20">
        <section className="container">
          <div className="flex items-center">
            <h2 className="font-itel flex-1 text-2xl md:text-h4 font-bold xl:text-h3 max-xl:text-center">Vị Trí Liên quan</h2>
          </div>
          <div className="mt-3 md:mt-10 grid grid-cols-1 md:grid-cols-2 md:gap-6 gap-3 lg:grid-cols-3">
            {similarJobs?.map((job, index) => (
              <JobItemDetail classNameCustom={`${index > 1 ? 'max-xl:hidden' : ''}`} key={job.id} item={job} />
            ))}
          </div>
        </section>
      </div>
      <div className="max-xl:hidden">
        <SendEmail />
      </div>
    </div>
  );
};

const getStaticProps = getServerPropsWithTranslation<PageProps>(async ({ params }) => {
  const id = params?.id as string;
  if (!id) return { notFound: true };

  const job = recruitmentService.getById(Number(id));
  const similarJobs = (await recruitmentService.searchJobs({ limit: 3 })) || [];
  if (!job) return { notFound: true };

  return {
    props: {
      job: job,
      similarJobs: similarJobs
    }
  };
});

export async function getStaticPaths() {
  return {
    paths: [{ params: { id: '1' } }],
    fallback: 'blocking' // can also be true or 'blocking'
  };
}

JobDetail.getLayout = function getLayout(page, props) {
  return (
    <>
      <LayoutDefault footerClassName="bg-neutral-0">
        <Head>
          <title>{`Job - ${props.job.jobTitle}`}</title>
        </Head>
        <HeaderWebDefault title={'Vị trí tuyển dụng'} withMenu withSearch />
        {page}
      </LayoutDefault>
    </>
  );
};
export default JobDetail;

export { getStaticProps };

const JobItemDetail = ({ item, classNameCustom }: { item: IJob; classNameCustom?: string }) => {
  return (
    <div className={`h-full ${classNameCustom}`}>
      <section className="bg-neutral-0 p-4 md:p-6 rounded-lg flex flex-col justify-between gap-3 md:gap-4 h-full">
        <div className="flex gap-2 max-md:text-sm">
          <span className="bg-red-100 text-primary rounded-full px-3 py-1">{item.location}</span>
          <span className="bg-red-100 text-primary rounded-full px-3 py-1">{item.jobType}</span>
        </div>
        <h4 className="text-xl md:text-h4 font-bold"> {item.jobTitle}</h4>
        <div>
          <p className="max-md:text-sm text-neutral-500 line-clamp-3 mb-1 md:mb-2">{item.jobDes}</p>
          <p className="max-md:text-xs text-neutral-500">Mức lương: {item.salary}</p>
          <Link
            href={{ pathname: Routers.RECRUITMENT_JOB_DETAIL, query: { id: item.id } }}
            className="mt-4 font-bold flex items-center gap-2 md:gap-4 text-sm hover:cursor-pointer hover:bg-red-400 hover:text-neutral-0 w-fit md:p-2 rounded-lg transition-all"
          >
            Chi tiết <Svg src="/icons/bold/arrow-right.svg" className="h-3 w-3 md:h-6 md:w-6" />
          </Link>
        </div>
      </section>
    </div>
  );
};
