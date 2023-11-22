import { NextPage } from 'next';
import { Logger } from '@/utilities/logger';
import getServerPropsWithTranslation from '@/i18n/getServerPropsWithTranslation';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import LayoutDefault from '@/components/layout/layout-default';
import Link from 'next/link';
import Routers from '@/routes';
import Head from 'next/head';
import SectionSupports from '@/components/section/section-supports';
import { IJob } from '@/services/recruitment/recruiment';
import { Menu } from '@headlessui/react';
import Svg from '@/components/icon/svg';
import DropdownShare from '@/components/dropdown/dropdown-share';
import { copyTextToClipboard } from '@/utilities/copy';
import { toast } from 'react-hot-toast';
import { modal } from '@/libs/modal';
import ModalSharePost from '@/components/modal/modal-share-post';
import HeaderWebDefault from '@/components/header/header-web-default';
import { SendEmail } from '@/pages/recruitment/index';
import { useRouter } from 'next/router';
import recruitmentService from '@/services/recruitmentService';

type PageProps = {
};

const logger = new Logger('ICareer Detail Page');
const JobDetail: NextPage<PageProps> = ({}) => {
  const href = typeof window !== 'undefined' ? window.location.href : '/';
  const imageCareer = '/images/my-itel.png';
  const router = useRouter();
  const {slug} = router.query

  const [scrollPosition, setScrollPosition] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [jobDetail,setJobDetail] = useState<recruitmentModal.RecruitmentDetail>({})
  const [listJob, setListJob] = useState<recruitmentModal.ListJob>({});

  const params: recruitmentModal.JobDetailParams= {
    columnFilters: {Slug: slug as string},
    sort: [],
    page: 1,
    pageSize: 1000,
    lang: 1
  }

  const paramsList: recruitmentModal.ListJobParams = {
    columnFilters: {},
    sort: [],
    page: 1,
    pageSize: 1000,
    lang: 1
  };

  const getListJob = async () => {
    const res = await recruitmentService.getListJob(paramsList);
    setListJob(res.result);
  };

  useEffect(() => {
    getListJob();
  }, []);
  const getJobDetail =async () => {
    const res = await recruitmentService.getJobDetail(params)
    setJobDetail(res.result.RecruitmentDetail||{})
  }

  useEffect(()=>{
    getJobDetail()
  },[slug])

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
              itemDesc={`Vị trí ${jobDetail.Brief}`}
              href={href}
              onCopy={handleCopy}
            />
          </div>
        );
      },
      closeButton: true,
      className: 'modal-box max-w-[35rem]'
    });
  }, [handleCopy, href, jobDetail.Brief]);

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
              itemDesc={`Vị trí ${jobDetail.Brief}`}
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
                <p className="line-clamp-1 ">{jobDetail.Brief}</p>
              </Link>
            </li>
          </ul>
        </div>
      </section>
      <section className="container relative flex max-xl:flex-col py-6 md:py-10 xl:gap-10">
        <div className="description w-full xl:w-2/3 text-neutral-700">
          {/* <p className="text-base md:text-sm mb-2">Tuyển dụng • 09/03/2023</p> */}
          <h2 className="font-bold text-xl xl:text-2xl md:text-[32px] xl:leading-[48px] xl:text-[40px] text-neutral-800 mb-4 md:mb-6">
            Vị trí {jobDetail.Brief}
          </h2>
          <div className="xl:hidden grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            <div className="">
              <p className="text-sm mb-2 text-neutral-500">Hạn nộp hồ sơ</p>
              <span className="font-bold text-base">13.09.2020</span>
            </div>
            <div className="">
              <p className="text-sm mb-2 text-neutral-500">Địa điểm</p>
              <span className="font-bold text-base">Hà Nội</span>
            </div>
            <div className="">
              <p className="text-sm mb-2 text-neutral-500">Thời gian làm việc</p>
              <span className="font-bold text-base">Full-time</span>
            </div>
            <div className="">
              <p className="text-sm mb-2 text-neutral-500">Mức lương</p>
              <span className="font-bold text-base">Thỏa thuận</span>
            </div>
          </div>
          <div dangerouslySetInnerHTML={{__html:jobDetail.Detail || {}}} />  

        
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
                href={{ pathname: Routers.RECRUITMENT_APPLY, query: { slug: jobDetail.Slug, jobName: jobDetail.Title} }}
              >
                Ứng tuyển ngay
              </Link>
            </>
          ) : (
            <>
              <div className="flex flex-col">
                <p className="text-neutral-500 text-sm">Ứng tuyển</p>
                <p className="text-xl font-bold">Vị trí {jobDetail.Title}</p>
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
                  href={{ pathname: Routers.RECRUITMENT_APPLY, query: { slug: jobDetail.Slug, jobName: jobDetail.Title } }}
                >
                  Ứng tuyển ngay
                </Link>
              </div>
            </>
          )}
        </div>

        <div className="job-des hidden xl:flex md:w-1/3 rounded-2xl relative h-fit flex-col border border-neutral-300 xl:h-fit xl:min-h-[650px] p-8">
          <span className="tag tag-vector tag-md h-auto bg-gradient-to-r from-yellow-500 to-red-500 py-2 px-4">Tuyển dụng mới</span>
          <h2 className="text-h4 font-bold xl:text-2xl xl:leading-8 mb-6 mt-3">{jobDetail.Title}</h2>

          <div className="mb-4">
            <p className="text-sm mb-2 text-neutral-500">Hạn nộp hồ sơ</p>
            <span className="font-bold text-base">13.09.2020</span>
          </div>
          <div className="mb-4">
            <p className="text-sm mb-2 text-neutral-500">Địa điểm</p>
            <span className="font-bold text-base">Hà Nội</span>
          </div>
          {/* <div className="mb-4">
            <p className="text-sm mb-2 text-neutral-500">Ngành nghề</p>
            <span className="font-bold text-base">{jobDetail.SeoTitle}</span>
          </div> */}
          <div className="mb-4">
            <p className="text-sm mb-2 text-neutral-500">Thời gian làm việc</p>
            <span className="font-bold text-base">Full-time</span>
          </div>
          <div className="mb-8">
            <p className="text-sm mb-2 text-neutral-500">Mức lương</p>
            <span className="font-bold text-base">Thỏa thuận</span>
          </div>
          <div className="flex flex-col gap-4">
            <Link href={{ pathname: Routers.RECRUITMENT_APPLY, query: { slug: jobDetail.Slug, jobName: jobDetail.Title } }}>
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
                  itemDesc={`Vị trí ${jobDetail.Title}`}
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
            {listJob.Recruitment?.filter(item=>item.Id != jobDetail.Id ).slice(0,3).map((job, index) => (
              <JobItemDetail classNameCustom={`${index > 1 ? 'max-xl:hidden' : ''}`} key={job.Id} item={job} />
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


  return {
    props: {
    }
  };
});


JobDetail.getLayout = function getLayout(page, props) {
  return (
    <>
      <LayoutDefault footerClassName="bg-neutral-0">
        <Head>
          {/* <title>{`Job - ${props.job.jobTitle}`}</title> */}
        </Head>
        <HeaderWebDefault title={'Vị trí tuyển dụng'} withMenu withSearch />
        {page}
      </LayoutDefault>
    </>
  );
};
export default JobDetail;

export { getStaticProps };

const JobItemDetail = ({ item, classNameCustom }: { item: recruitmentModal.Recruitment; classNameCustom?: string }) => {
  return (
    <div className={`h-full ${classNameCustom}`}>
      <section className="bg-neutral-0 p-4 md:p-6 rounded-lg flex flex-col justify-between gap-3 md:gap-4 h-full">
        <div className="flex gap-2 max-md:text-sm">
          <span className="bg-red-100 text-primary rounded-full px-3 py-1">{'Hà Nội'}</span>
          <span className="bg-red-100 text-primary rounded-full px-3 py-1">{'Full-time'}</span>
        </div>
        <h4 className="text-xl md:text-h4 font-bold"> {item.Title}</h4>
        <div>
          <p className="max-md:text-sm text-neutral-500 line-clamp-3 mb-1 md:mb-2">{item.Brief}</p>
          <p className="max-md:text-xs text-neutral-500">Mức lương: thoả thuận</p>
          <Link
            href={{ pathname: Routers.RECRUITMENT_JOB_DETAIL, query: { slug: item.Slug } }}
            className="mt-4 font-bold flex items-center gap-2 md:gap-4 text-sm hover:cursor-pointer hover:bg-red-400 hover:text-neutral-0 w-fit md:p-2 rounded-lg transition-all"
          >
            Chi tiết <Svg src="/icons/bold/arrow-right.svg" className="h-3 w-3 md:h-6 md:w-6" />
          </Link>
        </div>
      </section>
    </div>
  );
};
