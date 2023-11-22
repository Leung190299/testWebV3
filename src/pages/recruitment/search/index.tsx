import Accordions from '@/components/accordion/accordions';
import Svg from '@/components/icon/svg';
import LayoutDefault from '@/components/layout/layout-default';
import ModalCareerFilter from '@/components/modal/modal-career-filter';
import { Button } from '@/components/modal/modal-sim-filter';
import SelectSingle, { ISelect } from '@/components/select/select-single';
import { FILTER_JOB_LOCATION, FILTER_JOB_TIME, FILTER_JOB_TYPE, FILTER_JOB_WORKING_TYPE } from '@/constants/career.constants';
import useBoolean from '@pit-ui/modules/hooks/useBoolean';
import useControlled from '@pit-ui/modules/hooks/useControlled';
import useOnClickOutside from '@/hooks/useOnClickOutside';
import getServerPropsWithTranslation from '@/i18n/getServerPropsWithTranslation';
import { modal } from '@/libs/modal';
import { SendEmail } from '@/pages/recruitment';
import Routers from '@/routes';
import { IJob } from '@/services/recruitment/recruiment';
import clsx from 'clsx';
import Link from 'next/link';

import recruitmentService from '@/services/recruitmentService';
import { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
type PageProps = {};

interface Recruitment {
  Id?: number;
  Thumbnail?: string;
  Slug?: string;
  Author?: Author;
  OrderNumber?: number;
  Title?: string;
  Tagging?: Tagging;
  Brief?: string;
  AuthorIcon?: string;
}
enum Author {
  Itel = 'ITEL',
  MạngDiĐộngITel = 'Mạng di động iTel'
}

enum Tagging {
  Empty = '',
  TuyểnDụng = 'tuyển dụng',
  TuyểnDụngITEL = 'Tuyển dụng ITEL'
}

const CardJob = ({ Id, Thumbnail, Slug, Author, OrderNumber, Title, Tagging, Brief, AuthorIcon }: Recruitment) => {
  return (
    <div className="card-job bg-neutral-0 rounded-2xl p-4 md:p-6 relative overflow-hidden">
      <div className="transition-default absolute -right-10 top-3 h-[28px] text-sm text-neutral-0 w-[160px] rotate-[30deg] font-light max-md:text-xs ">
        {/* {isHot && <div className="w-full h-full flex justify-center items-center bg-primary md:uppercase">Hot</div>} */}
        {/* {isNew && <div className="w-full h-full flex justify-center items-center bg-blue-500">New</div>} */}
        {status && <div className="w-full h-full flex justify-center items-center bg-orange">{status}</div>}
      </div>

      <div className="w-4/5">
        <div className="card-tags max-md:gap-1 mb-3 md:mb-4">
          <span className="tag tag-sm md:tag-md tag-primary">{'Hà Nội'}</span>
          <span className="tag tag-sm md:tag-md tag-primary">{'Full-time'}</span>
        </div>
        <Link
          href={{ pathname: Routers.RECRUITMENT_JOB_DETAIL, query: { slug: Slug  } }}
          className="block text-lg md:text-2xl font-bold mb-2 hover:underline"
        >
          {Title}
        </Link>
        <p className="text-sm md:text-base text-neutral-500 mb-1 md:mb-6 line-clamp-2">{Brief}</p>
        <p className="text-xs md:text-sm text-neutral-500 max-md:mb-3">Mức lương: Thoả Thuận</p>
      </div>
      <Link
        href={{ pathname: Routers.RECRUITMENT_JOB_DETAIL, query: { slug: Slug } }}
        className="md:absolute btn-secondary btn btn-md rounded-full bottom-6 right-6"
      >
        Xem chi tiết
      </Link>
    </div>
  );
};

const SearchBarJob = ({ children, value, onChange, placeholder, onSearch }: any) => {
  const [query, setQuery] = useControlled(value, '', onChange);
  const focusInput = useBoolean(false);
  const ref = useRef<HTMLDivElement>(null);
  useOnClickOutside(ref, focusInput.setFalse);

  const handleSearch = () => {
    onSearch?.(query);
    focusInput.setFalse();
  };
  return (
    <div className="relative flex rounded-full bg-neutral-0 flex-1" ref={ref}>
      <div className="p-4">
        <Svg src="/icons/bold/vector.svg" width={24} height={24} />
      </div>
      <input
        placeholder={placeholder}
        className="flex-1 truncate bg-transparent outline-none p-4 pl-0 h-14"
        onFocus={focusInput.setTrue}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => {
          if (e.key == 'Enter') {
            handleSearch();
          }
        }}
      />
      {query && (
        <button onClick={() => setQuery('')}>
          <Svg src="/icons/line/close.svg" className="inline h-5 w-5 cursor-pointer mr-6 xl:mr-4" />
        </button>
      )}
      <div className="hidden xl:flex items-center gap-4">
        <button className="btn-secondary btn btn-lg w-[8.5rem] rounded-full" onClick={handleSearch}>
          Tìm kiếm
        </button>
      </div>
    </div>
  );
};

export interface IFormJob {
  sort: number;
  location: number;
  profession: number[];
  workingForm: number[];
}

const Recruitment: NextPage<PageProps> = ({}) => {
  const router = useRouter();
  const [search, setSearch] = useState<string>('');
  const [filterSelected, setFilterSelected] = useState<ISelect>(FILTER_JOB_TIME[2]);
  const [locationFilterSelected, setLocationFilterSelected] = useState<ISelect>(FILTER_JOB_LOCATION[0]);

  const [filterData, setFilterData] = useState<IFormJob>({
    sort: FILTER_JOB_TIME[2].value,
    location: FILTER_JOB_LOCATION[0].value,
    profession: [],
    workingForm: []
  });

  const [jobs, setJobs] = useState<IJob[]>([]);
  const methods = useForm<IFormJob>({
    defaultValues: { sort: FILTER_JOB_TIME[2].value as number, location: FILTER_JOB_LOCATION[0].value as number }
  });
  const [listJob, setListJob] = useState<recruitmentModal.ListJob>({});

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

  useEffect(() => {
    getListJob();
  }, []);

  const handleModalFilter = () => {
    modal.open({
      render: <ModalCareerFilter defaultValues={filterData} />,
      onDone(data: IFormJob) {
        setFilterData(data);
      },
      transition: false,
      closeButton: false,
      className: 'modal-box shadow-itel md:bg-neutral-0',
      classNameContainer: 'modal-full md:modal-bottom-sheet',
      classNameOverlay: 'bg-neutral-100 md:bg-neutral-900 md:bg-opacity-50'
    });
  };

  // useEffect(() => {
  //   const init = async () => {
  //     const result = await recruitmentService.searchJobs({ limit: 10 });

  //     setJobs(result);
  //   };

  //   init();
  // }, []);

  const onSearch = (value: string) => {
    setSearch(value);
    router.push(
      {
        href: router.pathname
      },
      value ? `${Routers.RECRUITMENT_SEARCH}?s=${value}` : router.pathname,
      {
        shallow: true
      }
    );
  };

  return (
    <div className="recruitment-search">
      <section className="relative xl:h-[340px] h-[256px] bg-modern-red bg-base-100 py-10 md:py-16">
        <img className="absolute xl:left-14 md:left-0 max-xl:w-56 bottom-0" src="/images/banner-career-left.png" alt="banner" />
        <img className="absolute right-0 max-xl:h-64 bottom-0" src="/images/banner-career-right.png" alt="banner" />
        <div className="relative container">
          <div className="font-itel text-neutral-0 flex justify-center">
            <h3 className="text-[32px] max-md:leading-10 max-md:text-center md:text-h3">Cơ hội cho bạn tại #iTel</h3>
          </div>
          <div className="mt-8 md:mt-10 max-w-2xl mx-auto">
            <SearchBarJob placeholder={'Tìm kiếm công việc'} onSearch={onSearch} />
          </div>
        </div>
      </section>
      <section className="container pt-6 md:pt-10 pb-6 md:pb-20">
        <div className="title flex justify-between items-center mb-3 md:mb-4">
          {!search ? (
            <h2 className="text-neutral-800 text-xl font-bold">
              Vị trí đang tuyển dụng <span className="text-sm max-md:block font-normal">({listJob.Recruitment?.length} Jobs)</span>
            </h2>
          ) : (
            <h2 className="text-neutral-800 text-xl font-bold">
              Kết quả tìm kiếm cho “{search}” <span className="text-sm max-md:block font-normal"></span>
            </h2>
          )}
          <SelectSingle
            buttonClassName="border-neutral-300 min-w-[188px] h-[48px] m-0"
            containerClassName="z-20 w-auto hidden xl:block"
            options={FILTER_JOB_TIME}
            displayValue={(data) => data.label}
            value={filterSelected}
            onChange={(option) => {
              setFilterSelected(option);
            }}
          />
          <button
            type="button"
            className={clsx('relative btn-tertiary btn rounded-full py-4 px-6 bg-neutral-0 flex-shrink-0 xl:hidden')}
            onClick={handleModalFilter}
          >
            <Svg src="/icons/bold/filter.svg" width={24} height={24} />
          </button>
        </div>
        <div className="search-result flex gap-6">
          <div className="max-xl:hidden filter xl:w-1/4 bg-neutral-0 rounded-2xl p-6 h-fit">
            <div className="filter-location mb-8">
              <h4 className="font-bold mb-4">Khu vực</h4>
              <SelectSingle
                buttonClassName="border-neutral-300 h-[48px] m-0 w-full rounded-lg"
                containerClassName="z-20 w-auto hidden md:block rounded-lg"
                options={FILTER_JOB_LOCATION}
                displayValue={(data) => data.label}
                value={locationFilterSelected}
                onChange={(option) => {
                  setLocationFilterSelected(option);
                }}
              />
            </div>
            <div className="border-t border-neutral-200"></div>
            <Accordions>
              <Button classNameButton="border-none pt-6">Ngành nghề</Button>
              <Accordions.Panel>
                <ul className="pb-4 md:pb-0">
                  {FILTER_JOB_TYPE.map(({ value, label }) => (
                    <li key={value}>
                      <label role="button" className="flex h-12 items-center">
                        <input type="checkbox" value={value} className="mr-2" />
                        <span>{label}</span>
                      </label>
                    </li>
                  ))}
                </ul>
              </Accordions.Panel>
            </Accordions>
            <Accordions>
              <Button classNameButton="border-none pt-6">Hình thức làm việc</Button>
              <Accordions.Panel>
                <ul className="pb-4 md:pb-0">
                  {FILTER_JOB_WORKING_TYPE.map(({ value, label }) => (
                    <li key={value}>
                      <label role="button" className="flex h-12 items-center">
                        <input type="checkbox" value={value} className="mr-2" />
                        <span>{label}</span>
                      </label>
                    </li>
                  ))}
                </ul>
              </Accordions.Panel>
            </Accordions>
          </div>
          <div className="result xl:w-3/4 rounded-2xl flex flex-col gap-3 md:gap-4">
            {listJob.Recruitment?.map((job) => (
              <CardJob
                key={job.Id}
                Id={job.Id||0}
                Title={job.Title || ''}
                Brief={job.Brief || ''}
                Slug={job.Slug}
              />
            ))}
            {/* {!search && (
              <>
                <div className="md:hidden">
                  <PaginationList pageList={['1', '2', '3', '...', '7']} subPageList={['4', '5', '6']} />
                </div>
                <div className="max-md:hidden">
                  <PaginationList
                    pageList={['1', '2', '3', '4', '...', '12', '13', '14', '15']}
                    subPageList={['5', '6', '7', '8', '9', '10', '11']}
                  />
                </div>
              </>
            )} */}
          </div>
        </div>
      </section>
      <SendEmail />
    </div>
  );
};

Recruitment.getLayout = function (page) {
  return (
    <>
      <LayoutDefault isHomePage footerClassName="bg-neutral-0">
        <Head>
          <title>{`Itel Career`}</title>
        </Head>
        {page}
      </LayoutDefault>
    </>
  );
};

const getStaticProps = getServerPropsWithTranslation<PageProps>(async () => {
  // const shorts = await vouchersServices.getListShort({ limit: 10 });
  // const news = await newsService.getNews({ limit: 6 });
  return {
    props: {}
    // revalidate: 8600
  };
});

export { getStaticProps };
export default Recruitment;
