import HeaderWebDefault from '@/components/header/header-web-default';
import Tab from '@/components/tabs/tabs';
import useOnClickOutside from '@/hooks/useOnClickOutside';
import { modal } from '@/libs/modal';
import Routers from '@/routes/routers';
import NewService, { Blog, ListBlog, ListBlogCategory, ListCategory } from '@/services/newService';
import { INews } from '@/services/news/news';
import { Data } from '@/types/model';
import { clsx } from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Dispatch, PropsWithChildren, SetStateAction, useEffect, useMemo, useRef, useState } from 'react';
import Breadcrumbs from '../breadcrumbs/breadcrumbs';
import NewsCardShort from '../card/card-news-short';
import CardVideosProduct from '../card/card-news-video';
import Svg from '../icon/svg';
import ModalSearchNews from '../modal/modal-search-news';
import SectionNews from '../section/section-news';
import SectionSupports from '../section/section-supports';
import PopupViewNewsShort from '../shorts/PopupViewNewsShort';

const news = [
  {
    id: 1,
    name: 'Chương trình iTel Quay số trúng thưởng 6 Triệu đồng và hàng ngàn phần ',
    href: '/news/active/1',
    category: 'Tin hoạt động'
  },
  {
    id: 2,
    name: 'Chương trình iTel Quay số trúng thưởng 6 Triệu đồng và hàng ngàn phần ',
    href: '/news/itel/1',
    category: 'Tin iTel'
  },
  { id: 3, name: 'Chương trình mua Sim tặng quà', href: '/news/service/1', category: 'Tin dịch vụ' },
  { id: 4, name: 'Chương trình Quay số trúng thưởng', href: '/news/video/1', category: 'Video' },
  {
    id: 5,
    name: 'Chương trình iTel Quay số trúng thưởng 6 Triệu đồng và hàng ngàn phần ',
    href: '/news/active/2',
    category: 'Tin hoạt động'
  },
  {
    id: 6,
    name: 'Chương trình iTel Quay số trúng thưởng 6 Triệu đồng và hàng ngàn phần ',
    href: '/news/video/2',
    category: 'Video'
  },
  {
    id: 7,
    name: 'Chương trình iTel Quay số trúng thưởng 6 Triệu đồng và hàng ngàn phần ',
    href: '/news/video/2',
    category: 'Video'
  },
  {
    id: 8,
    name: 'Chương trình iTel Quay số trúng thưởng 6 Triệu đồng và hàng ngàn phần ',
    href: '/news/video/2',
    category: 'Video'
  },
  {
    id: 9,
    name: 'Chương trình iTel Quay số trúng thưởng 6 Triệu đồng và hàng ngàn phần ',
    href: '/news/video/2',
    category: 'Video'
  }
];

const tabs = [
  { id: 1, label: 'Tất cả', href: Routers.NEWS },
  { id: 2, label: 'Tin iTel', href: Routers.NEWS_ITEL },
  { id: 3, label: 'Tin hoạt động', href: Routers.NEWS_ACTIVE },
  { id: 4, label: 'Tin dịch vụ', href: Routers.NEWS_SERVICE },
  { id: 5, label: 'Video', href: Routers.NEWS_VIDEO }
];

type DefaultProps = {
  handleScroll?: () => void;
  shorts?: Data.Shorts;
  news?: INews[];
  titleNews?: string;
  haveShorts?: boolean;
  haveVideos?: boolean;
  haveHotNews?: boolean;
  hrefHotNews?: string;
  hrefVideoNews?: string;
  hrefItemVideo?: string;
  className?: string;
  tabId?: ListBlogCategory;
  title?: string;
  setTabId?: Dispatch<SetStateAction<ListBlogCategory>>;
};
type Props = PropsWithChildren<DefaultProps & Omit<JSX.IntrinsicElements['main'], keyof DefaultProps>>;
const pages = [{ name: 'Tin tức', href: '#', current: true }];
export default function NewsContainer({ children, titleNews = 'tin tức', haveHotNews = true, className, tabId, title, setTabId }: Props) {
  const router = useRouter();
  const [tabNews, setTabNews] = useState<ListCategory>({});
  const [blog, setBlog] = useState<ListBlog>({});

  const params = {
    columnFilters: {},
    sort: [],
    page: 1,
    pageSize: 1000,
    lang: 1
  };
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

  useEffect(() => {
    const getCategory = async () => {
      const category = await NewService.getCategory(params);
      setTabNews(category.result);
      setTabId && setTabId(category.result.ListBlogCategories ? category.result.ListBlogCategories[0] : {});
    };

    getCategory();
    getBlog();
  }, []);
  const getBlog = async () => {
    const res = await NewService.getListBlog(paramsBlog);
    setBlog(res.result);
  };
  const pages = useMemo(() => {
    if (title) return [{ name: 'Tin tức', href: Routers.NEWS }, { name: title, href: '#', current: true }];
    return  [{ name: 'Tin tức', href: '#', current: true }];
  }, [title]);
  return (
    <div>
      <HeaderWebDefault title="Tin tức" withMenu withSearch />
      <div>
        {!title && (
          <div className="flex md:hidden items-center bg-neutral-0 overflow-x-auto no-scrollbar justify-start pt-4">
            {tabNews.ListBlogCategories?.map((tab, index) => (
              <div key={tab.Id} className={`${index === 0 ? 'ml-4' : ''}`}>
                <Tab
                  className={`flex-1 sm:flex-none text-center sm:text-left`}
                  label={tab.Name}
                  onClick={() => {
                    router.push(Routers.NEWS + '/' + tab.Slug);
                  }}
                  isActive={tabId?.Id === tab.Id}
                  size="small"
                />
              </div>
            ))}
          </div>
        )}
      </div>
      <section>
        <Breadcrumbs breadcrumbs={pages} />

        <SearchNews />
        <SearchNewsMobile />
      </section>
      {title ? (
        <div className='container py-6'>
          <h1 className='font-itel uppercase text-h-sm md:text-h-xl text-neutral-800 font-bold text-center'>{title}</h1>
     </div>
      ) : (
      <div className="flex justify-center xl:gap-4 max-md:hidden">
        {tabNews.ListBlogCategories?.map((tab, index) => (
          <div
            key={index}
            onClick={() => {
              router.push(Routers.NEWS + '/' + tab.Slug);
            }}
          >
            <div
              className={`cursor-pointer whitespace-nowrap border-b-4 border-transparent px-8 py-6 text-xl font-bold ${
                tabId?.Id === tab.Id ? 'border-b-red-300 text-neutral-0 bg-red-500' : ''
              }`}
            >
              {tab.Name}
            </div>
          </div>
        ))}
      </div>
      )}
      {haveHotNews && (
        <section className="bg-neutral-0 pt-4 md:pt-16">
          <HotNews titleNews={titleNews} blogs={blog.ListFeatureBlog} />
        </section>
      )}
      <div className={className}>{children}</div>
      <section>
        <SectionSupports />
      </section>
    </div>
  );
}

const SearchNews = () => {
  const [isFocus, setIsFocus] = useState<boolean>(false);
  const [query, setQuery] = useState('');
  const ref = useRef<HTMLInputElement>(null);
  useOnClickOutside(ref, () => setIsFocus(false));

  const filteredNews =
    query === ''
      ? news
      : news.filter((item) => {
          return item.name.toLowerCase().includes(query.toLowerCase()) || item.category.toLowerCase().includes(query?.toLowerCase());
        });
  return (
    <section className="relative bg-base-100 pt-28 pb-16 max-md:hidden">
      <img src="/images/bannerNews.png" alt="banner_background" className="absolute inset-0 h-full w-full object-cover" />
      <div className="relative container">
        <div className="font-itel text-neutral-0">
          <h2 className=" text-h4 xl:text-h3 drop-shadow-lg shadow-primary ">
            Tin tức nóng hổi. trend mới nổi
            <br /> Khám phá ngay
          </h2>
        </div>
        <div className="mt-10 max-w-2xl">
          <div className="relative flex rounded-full bg-neutral-100" ref={ref}>
            <div className="flex w-16 flex-shrink-0 items-center justify-center ">
              <Svg src="/icons/bold/search.svg" className="inline h-6 w-6" />
            </div>
            <input
              placeholder="Tìm kiếm tin tức, video"
              className="peer w-full bg-transparent p-4 font-medium outline-none"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setIsFocus(true)}
            />
            {query && isFocus && (
              <div className="w-16 flex justify-center items-center hover:cursor-pointer" onClick={() => setQuery('')}>
                <Svg src="/icons/line/close.svg" className="inline h-6 w-6" />
              </div>
            )}
            {query && isFocus && (
              <div className="absolute top-full mt-2 bg-neutral-0 w-full rounded-lg p-2 shadow-itel z-10 max-h-[352px] overflow-scroll">
                {filteredNews.length > 0 ? (
                  filteredNews.map((item) => (
                    <Link key={item.id} href={item.href}>
                      <div className="hover:bg-neutral-100 hover:cursor-pointer p-4 rounded-lg truncate">
                        <strong>[{item.category}]</strong> {item.name}
                      </div>
                    </Link>
                  ))
                ) : (
                  <div className="hover:bg-neutral-100 hover:cursor-pointer p-4 rounded-lg truncate">Không tìm thấy !</div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

const SearchNewsMobile = () => {
  const handleModalSearch = () => {
    modal.open({
      render: <ModalSearchNews data={news} />,
      transition: false,
      closeButton: false,
      className: 'modal-box shadow-itel bg-neutral-100',
      classNameContainer: 'modal-full'
    });
  };

  return (
    <>
      <div className="relative bg-neutral-0 mb-2 hidden max-md:block px-4 py-2" onClick={handleModalSearch}>
        <div className="bg-neutral-100 flex rounded-lg">
          <div className="flex w-16 flex-shrink-0 items-center justify-center ">
            <Svg src="/icons/bold/search.svg" className="inline h-6 w-6" />
          </div>
          <div className="w-full bg-transparent p-2 text-neutral-400">Tìm kiếm tin tức, video</div>
        </div>
      </div>
      <section className="relative bg-base-100 py-16 hidden max-md:block">
        <img
          src="https://res.cloudinary.com/dm1ttdfnb/image/upload/v1686480393/Recruitment/Block_Image_tlzysj.png"
          alt="banner_background"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="relative container">
          <div className="font-itel text-neutral-0">
            <h2 className=" text-h5">
              Tin nóng hổi.
              <br /> Trend mới nổi
            </h2>
          </div>
        </div>
      </section>
    </>
  );
};

const HotNews = ({
  titleNews,
  blogs
}: {
  titleNews: string;

  blogs?: Blog[];
}) => {
  const router = useRouter();
  const onClickDetail = (slug: string,category:string) => {
    router.push(`${Routers.NEWS}/${category}/${slug}`, undefined, { shallow: true });
  };

  return (
    <div className="container max-md:mb-2">
      <h3 className="text-xl md:text-h3 font-itel font-bold">
        {titleNews} <span className="text-primary">nổi bật</span>
      </h3>
      <div className="pt-3 xl:pt-10 pb-3 xl:pb-20 flex gap-6 flex-col xl:flex-row">
        <section className="w-full xl:w-2/3 hover:cursor-pointer relative" onClick={() => onClickDetail((blogs && blogs[0].Slug) || '',(blogs && blogs[0].BlogCategorySlug) || '')}>
          <div className="w-full overflow-hidden rounded-xl">
            <img className=" w-full hover:scale-110 transition-default aspect-photo" src={blogs && blogs[0].Thumbnail} alt="" />
          </div>
          <div className="xl:absolute mt-2 xl:mt-4">
            <h3 className="font-bold text-base md:text-h-xs max-md:line-clamp-2">{blogs && blogs[0].Title}</h3>
            <p className="max-md:text-sm text-[#666666]">{blogs && blogs[0].Tagging}</p>
          </div>
        </section>
        <section className="xl:flex-col w-full xl:w-1/3 flex justify-between gap-3 md:gap-6 xl:gap-0">
          <div className="w-1/2 xl:w-full hover:cursor-pointer" onClick={() => onClickDetail((blogs && blogs[1].Slug) || '',(blogs && blogs[1].BlogCategorySlug) || '')}>
            <div className="w-full overflow-hidden rounded-xl">
              <img className="aspect-cinema w-full hover:scale-110 transition-default" src={blogs && blogs[1].Thumbnail} alt="" />
            </div>
            <div className=" mt-2">
              <h3 className=" font-bold md:text-lg text-base max-md:line-clamp-2"> {blogs && blogs[1].Title} </h3>
              <p className="max-md:text-sm text-[#666666]">{blogs && blogs[1].Tagging}</p>
            </div>
          </div>
          <div className="w-1/2 xl:w-full hover:cursor-pointer xl:mt-4" onClick={() => onClickDetail((blogs && blogs[2].Slug) || '',(blogs && blogs[2].BlogCategorySlug) || '')}>
            <div className="w-full overflow-hidden rounded-xl">
              <img className="aspect-cinema w-full hover:scale-110 transition-default" src={blogs && blogs[2].Thumbnail} alt="" />
            </div>
            <div className=" mt-2">
              <h3 className=" font-bold md:text-lg text-base max-md:line-clamp-2">{blogs && blogs[2].Title}</h3>
              <p className="max-md:text-sm text-[#666666]">{blogs && blogs[2].Tagging}</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

const ShortNews = ({ shorts }: { shorts: Data.Shorts }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-neutral-0 max-md:mb-2">
      <SectionNews
        title="shorts"
        classTitle="md:text-h3 text-xl"
        className="container py-4 md:py-6 xl:py-20"
        actionAll={() => {
          setOpen(true);
        }}
      >
        <div className="scrollbar-hide mt-3 md:mt-10 gap-3 grid md:hidden xl:grid xl:grid-cols-4 grid-flow-col overflow-auto md:gap-6">
          {shorts.data.slice(0, 4).map((short) => (
            <NewsCardShort short={short} key={short.id} shorts={shorts} />
          ))}
        </div>
        <div className="mt-3 md:mt-10 gap-6 md:grid-cols-3 xl:hidden hidden md:grid">
          {shorts.data.slice(0, 3).map((short) => (
            <NewsCardShort short={short} key={short.id} shorts={shorts} />
          ))}
        </div>
      </SectionNews>
      <PopupViewNewsShort data={{ short: shorts.data[0], shorts }} open={open} setOpen={setOpen} handleClose={() => setOpen(false)} />
    </div>
  );
};

export const VideoNews = ({ href = '#', shorts, blogs }: { href?: string; shorts?: Data.Shorts; blogs?: Blog[] }) => {
  const [open, setOpen] = useState(false);
  const handleModalVideo = (item: Blog) => {
    modal.open({
      render: ({ close }) => (
        <div className="relative h-screen w-screen md:h-[90vh] md:w-[90vw] ">
          <Svg
            src="/icons/line/arrow-left.svg"
            className="absolute left-4 top-8 h-10 w-10 cursor-pointer rounded-full bg-neutral-100 p-2 z-10 max-md:block hidden"
            onClick={close}
          />
          <Svg
            src="/icons/line/close.svg"
            className="absolute -right-4 -top-0 xl:-right-16 h-14 w-14 cursor-pointer rounded-full bg-neutral-100 p-4 hidden md:block z-10"
            onClick={close}
          />
          <iframe
            id="mainVideo"
            src={`https://www.youtube.com/embed/${item.VideoUrl}?rel=0&amp;amp;autoplay=0&amp;amp;playsinline=1`}
            allow="autoplay; encrypted-media"
            className="w-full h-full"
          ></iframe>
        </div>
      ),
      transition: false,
      closeButton: false,
      className: 'modal-box shadow-itel bg-neutral-900 md:rounded-t-3xl flex justify-center items-center',
      classNameContainer: 'modal-full md:pt-16'
    });
  };

  return (
    <SectionNews classTitle="md:text-h3 text-xl" title="video hot" className=" py-4 max-md:mb-2 bg-neutral-100 p-4 rounded-lg">
      <div className="mt-3 ">
        {blogs &&
          blogs.slice(0,3).map((item, index) => (
            <CardVideosProduct
              onClick={() => {
                handleModalVideo(item);
              }}
              key={item.Id}
              {...item}
              className={clsx('bg-neutral-0 rounded-xl mt-4', index === 8 && 'max-md:hidden')}
              classNameFrame="rounded-xl aspect-video"
              classNameDes="hidden"
              haveLink={false}
            />
          ))}
      </div>
      {/* <PopupViewNewsShort data={{ short: shorts.data[0], shorts }} open={open} setOpen={setOpen} handleClose={() => setOpen(false)} /> */}
    </SectionNews>
  );
};
