import NewsContainer, { VideoNews } from '@/components/container/news';
import { LayoutWithChatBox } from '@/components/layout/layout-default';
import Pagination from '@/components/pagination/Pagination';
import LuckySim from '@/components/siderbar/LuckySim';
import NewsContact from '@/components/siderbar/NewsContact';
import NewService, { Blog, ListBlog, ListBlogCategory } from '@/services/newService';
import { INews } from '@/services/news/news';
import { Data } from '@/types/model';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { AllNewsItems } from '.';

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

const NewsCategory: NextPage<PageProps> = () => {
const [namePage, setNamePage]= useState<string>('')
  const [blog, setBlog] = useState<ListBlog>({});
  const router = useRouter();
  const [tabId, setTabId] = useState<ListBlogCategory>({});
  const refDiv = useRef<HTMLDivElement>(null);
  const [blogDetail, setBlogDetail] = useState<Blog[]>([]);
  const [page, setPage] = useState<number>(0);
  const { category  } = router.query;

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

  const paramsNew = {
    columnFilters: { BlogCategoryId: 9 },
    sort: [],
    page: 1,
    pageSize: 10,
    lang: 1
  };
  const paramsBlog = {
    columnFilters: { BlogCategorySlug: category as string },
    sort: [],
    page: 1,
    pageSize: 10,
    lang: 1
  };
  const getBlog = async () => {
    const res = await NewService.getListBlog(paramsNew );
    setBlog(res.result);
  };

  useEffect(() => {

    const getCategory = async () => {
      const categories = await NewService.getCategory(params);
      setNamePage(categories.result.ListBlogCategories!.find(item=>item.Slug==category)?.Name ||'');

    };

    getCategory();
    getBlog();
  }, [category]);


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
      title={namePage}
      hrefHotNews="/news/itel/[id]"
      className="bg-neutral-0 pt-4 md:pt-12 xl:pt-20"
    >
      <div ref={refDiv} className="container flex gap-6">
        <div className="w-2/3">
          <h2 className="font-itel flex-1 text-xl md:text-h3 font-bold xl:text-h3">Tin mới cập nhật</h2>

          <AllNewsItems
            news={[]}
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
          <VideoNews href={'/'} blogs={blog.ListVideoBlog} />
          <NewsContact />
          <LuckySim/>
        </div>
      </div>
    </NewsContainer>
  );
};





NewsCategory.getLayout = LayoutWithChatBox;

export default NewsCategory;
