import CardVideosProduct from '@/components/card/card-news-video';
import NewsContainer, { VideoNews } from '@/components/container/news';
import { LayoutWithChatBox } from '@/components/layout/layout-default';
import Pagination from '@/components/pagination/Pagination';
import LuckySim from '@/components/siderbar/LuckySim';
import NewsContact from '@/components/siderbar/NewsContact';
import Tab from '@/components/tabs/tabs';
import getServerPropsWithTranslation from '@/i18n/getServerPropsWithTranslation';
import Routers from '@/routes';
import NewService, { Blog, ListBlog, ListBlogCategory, ListCategory } from '@/services/newService';
import newsService, { INews } from '@/services/news/news';
import vouchersServices from '@/services/vouchers/vouchers';
import { Data } from '@/types/model';
import clsx from 'clsx';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';

type PageProps = {
  shorts: Data.Shorts;
  news: INews[];
  newsList: INews[];
};
const tabs = [
  { id: 1, label: 'Tất cả', href: '/news/itel/[id]' },
  { id: 2, label: 'Tin iTel', href: '/news/itel/[id]' },
  { id: 3, label: 'Tin hoạt động', href: '/news/active/[id]' },
  { id: 4, label: 'Tin dịch vụ', href: '/news/service/[id]' }
];

const News: NextPage<PageProps> = ({ shorts, news, newsList }) => {
  const [tabNews, setTabNews] = useState<ListCategory>({});
  const [blog, setBlog] = useState<ListBlog>({});
  const router = useRouter();
  const [tabId, setTabId] = useState<ListBlogCategory>({});
  const refDiv = useRef<HTMLDivElement>(null);
  const [blogDetail, setBlogDetail] = useState<Blog[]>([]);
  const [page, setPage] = useState<number>(0);

  const handleScroll = () => {
    if (refDiv.current) {
      window.scrollTo({
        top: refDiv.current.offsetTop - 150,
        left: 0,
        behavior: 'smooth'
      });
    }
  };
  const params = {
    columnFilters: {},
    sort: [],
    page: 1,
    pageSize: 1000,
    lang: 1
  };

  const paramsBlog = {
    columnFilters: { BlogCategoryId: 9 },
    sort: [],
    page: 1,
    pageSize: 10,
    lang: 1
  };
  const getBlog = async () => {
    const res = await NewService.getListBlog({ ...paramsBlog, page });
    setBlog(res.result);
  };

  useEffect(() => {
    const getCategory = async () => {
      const category = await NewService.getCategory(params);
      setTabNews(category.result);
      setTabId(category.result.ListBlogCategories ? category.result.ListBlogCategories[0] : {});
    };

    getCategory();
    getBlog();
  }, []);

  const getBlockBlog = async (page: number = 1) => {
    const blockBlog = await NewService.getBlockBlog({ ...paramsBlog, page });
    setBlogDetail(blockBlog.result.BlockBlog);
    setPage(Math.floor(blockBlog.totalRecords / 10));
  };
  useEffect(() => {
    getBlockBlog();
  }, [tabId]);

  return (
    <NewsContainer
      tabId={tabId}
      setTabId={setTabId}
      handleScroll={handleScroll}
      shorts={shorts}
      news={news}
      hrefHotNews="/news/itel/[id]"
      className="bg-neutral-0 pt-4 md:pt-12 xl:pt-20"
    >
      <div ref={refDiv} className="container flex gap-6">
        <div className="w-2/3">
          <h2 className="font-itel flex-1 text-xl md:text-h3 font-bold xl:text-h3">Tin mới cập nhật</h2>
          <div className="flex items-center overflow-x-auto no-scrollbar justify-start pt-4">
            {tabNews.ListBlogCategories?.map((tab) => (
              <Tab
                className="flex-1 sm:flex-none text-center sm:text-left"
                key={tab.Id}
                label={tab.Name}
                onClick={() => {
                  router.push(Routers.NEWS + '/' + tab.Slug);
                }}
                isActive={tabId.Id == tab.Id}
                size="small"
              />
            ))}
          </div>
          <AllNewsItems
            news={newsList}
            setPage={(page) => {
              getBlockBlog(page);
            }}
            href={tabs.find((item) => item.id === tabId)?.href || ''}
            blogDetail={blogDetail}
          />
          <div className="my-4">
            <Pagination
              pageCount={page}
              onPageChange={(page) => {
                getBlockBlog(page.selected + 1);
              }}
            />
          </div>
        </div>

        <div className="w-1/3">
          <VideoNews href={'/'} shorts={shorts || { data: [], page: 1 }} blogs={blog.ListVideoBlog} />
          <NewsContact />
          <LuckySim />
        </div>
      </div>
    </NewsContainer>
  );
};

export const AllNewsItems = ({
  news,
  href,
  blogDetail,
  setPage
}: {
  news: INews[];
  href: string;
  blogDetail: Blog[];
  setPage: (numberPage: number) => void;
}) => {
  return (
    <>
      <div className="mt-3 md:mt-10 grid grid-cols-2 md:gap-6 gap-3 ">
        {blogDetail
          // .filter((item) => item.Slug)
          .map((item, index) => (
            <CardVideosProduct
              key={item.Id}
              {...item}
              className={clsx('bg-neutral-0 rounded-xl', index === 0 && 'max-xl:hidden')}
              classNameFrame="rounded-xl aspect-video"
              classNameDes=""
              href={href}
            />
          ))}
      </div>
      {/* <div className="flex w-full items-center justify-center">
        <div className=" mt-3 mb-8 md:mt-8">
          <Pagination
            pageCount={10}
            onPageChange={(page) => {
              setPage(page.selected + 1);
            }}
          />
        </div>
      </div> */}
    </>
  );
};

const getStaticProps = getServerPropsWithTranslation<PageProps>(async () => {
  const shorts = await vouchersServices.getListShort({ limit: 10 });
  const news = await newsService.getNews({ limit: 6 });
  const newsList = await newsService.getNews({ limit: 9 });

  return {
    props: { shorts, news, newsList }
    // revalidate: 8600
  };
});

News.getLayout = LayoutWithChatBox;
export { getStaticProps };
export default News;
