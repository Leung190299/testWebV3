import Breadcrumbs, { BreadcrumbItem } from '@/components/breadcrumbs/breadcrumbs';
import CardNewsProduct from '@/components/card/card-news-product';
import LayoutDefault from '@/components/layout/layout-default';
import SectionSupports from '@/components/section/section-supports';
import Seo from '@/components/seo';
import Contact from '@/components/siderbar/Contact';
import NewsSidlerBar from '@/components/siderbar/NewsSidlerBar';
import PackSidlerBar from '@/components/siderbar/PackSidlerBar';
import Routers from '@/routes';
import itelClubService from '@/services/itelClubService';
import NewService from '@/services/newService';
import { INews } from '@/services/news/news';
import type { Model } from '@/types/model';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

type PageProps = {
  category: Model.INewsCategory;
  news?: INews;
  similarNews?: INews[];
};

const tags = ['Hướng dẫn', 'Mua Sim', 'Sim mới', 'Tin hot', 'Chương trình hot'];

const INewsDetail: NextPage<PageProps> = () => {
  const [newsDetail, setNewsDetail] = useState<newModal.BlogDetail>({});
  const [news, setNews] = useState<newModal.Blog[]>([]);

  const router = useRouter();
  const { slug } = router.query;

  const getDetailNews = async (Slug: string) => {
    const parmas: newModal.BlogParams = {
      columnFilters: { Slug },
      sort: [],
      page: 1,
      pageSize: 1000,
      lang: 1
    };
    const res = await NewService.getDetail(parmas);
    if (res.code == 200) {
      setNewsDetail(res.result.BlogDetail![0]);
      setNews(res.result.ListBlogItemRelated!);
    }
  };

  const getDetailLoyalty = async (Slug: string) => {
    const parmas: itelClubModel.BlogLoyaltyBySlugParams = {
      columnFilters: { Slug },
      sort: [],
      page: 1,
      pageSize: 1000,
      lang: 1
    };
    const res = await itelClubService.getBlogLoyaltyBySlug(parmas);
    setNewsDetail(res.result[0]);
  };

  useEffect(() => {
    if (slug) {
      // if (type) {
      //   getDetailLoyalty(slug as string);
      //   return
      // }
      getDetailNews(slug[1] as string);
    }
  }, [slug]);

  const iframe_container = {
    left: 0,
    width: '100%',
    height: 500,
    position: 'relative'
  };
  const page: BreadcrumbItem[] = [
    {
      name: 'Tin tức',
      href: Routers.NEWS
    },
    {
      name: newsDetail.ParentName!,
      href: `${Routers.NEWS}/${newsDetail.BlogCategorySlug}`,
    },
    {
      name: newsDetail.Title!,
      href: '#',
      current: true
    }
  ];


  return (
    <div className="news-detail bg-neutral-0">
      <Seo
        title={newsDetail.SeoTitle! || ''}
        description={newsDetail.SeoDetails! || ''}
        image={newsDetail.SeoThumbnail}
        keywords={newsDetail.SeoKeyword}
      />

      <Breadcrumbs breadcrumbs={page} />

      <section className="container flex flex-col md:flex-row pb-4 pt-0 md:py-10 gap-10">
        <div className="description w-full  md:w-2/3 text-neutral-500">
          <p className="text-base"> {`${newsDetail.ParentName} • ${newsDetail.CreatedOn?.split('T')[0]}`}</p>
          <h1 className="font-bold text-2xl md:text-h4 xl:text-h3 text-neutral-800 my-2">{newsDetail.Title}</h1>
          {/* {type&&<img src={newsDetail.Thumbnail} />} */}
          <div className="mt-4" dangerouslySetInnerHTML={{ __html: newsDetail.Detail! }} />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: `{
  "@context": "https://schema.org",
  "@type": "Article",
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://v3.itel.vn/news/detail/${newsDetail.Slug}"
  },
  "headline": "${newsDetail.Title}",
  "description": "${newsDetail.SeoDetails}",
  "image": "${newsDetail.BannerImage}",
  "author": {
    "@type": "Person",
    "name": "${newsDetail.Author}"
  },
  "publisher": {
    "@type": "Organization",
    "name": "${newsDetail.Author}",
    "logo": {
      "@type": "ImageObject",
      "url": "${newsDetail.AuthorIcon}"
    }
  },
  "datePublished": "${newsDetail.CreatedOn}",
  "dateModified": "${newsDetail.CreatedOn}"
}`
            }}
          />

          <div className="flex gap-2 flex-wrap mt-5">
            {tags.map((tag) => (
              <div key={tag} className="rounded-3xl border border-neutral-300 px-3 md:px-4 py-2 md:py-3 cursor-pointer text-neutral-800">
                {tag}
              </div>
            ))}
          </div>
        </div>
        <div className="  w-full md:w-1/3    h-fit">
          <div className="relative xl:flex rounded-2xl overflow-hidden">
            <img src="/images/banner-news-sim.png" alt="banner" className="w-full h-full" />
            <div className="absolute top-0 left-0 p-8 h-full">
              <h3 className="font-bold text-[32px] leading-10 text-neutral-800 mb-2">Bạn đã sẵn sàng chọn số, mua Sim?</h3>
              <p className="text-sm xl:text-base text-neutral-500 mb-8">Cùng Anh iTel đi liền thôiiiiii! Gét gô</p>

              <button type="button" onClick={() => router.push(Routers.SIM)} className="btn btn-lg rounded-full btn-primary py-4 px-14">
                Gét gô!
              </button>
            </div>
          </div>
          <Contact />
          <PackSidlerBar />
          <NewsSidlerBar />
        </div>
      </section>
      {news.length != 0 && (
        <div className="bg-neutral-50 py-4 md:py-20">
          <section className="container">
            <div className="flex items-center">
              <h2 className="md:font-itel flex-1 text-xl md:text-h4 font-bold xl:text-h3 text-center">Tin tức liên quan</h2>
            </div>
            <div className="mt-3 md:mt-10 grid grid-cols-2 md:gap-6 gap-3 lg:grid-cols-3">
              {news
                ?.filter((item) => item.Id != newsDetail.Id && item.Slug)
                .slice(0, 3)
                .map((item, index) => (
                  <CardNewsProduct
                    key={item.Id}
                    {...item}
                    className={`bg-neutral-50 rounded-xl ${index > 1 ? 'max-xl:hidden' : ''}`}
                    classNameFrame="rounded-xl aspect-video"
                    classNameDes=""
                  />
                ))}
            </div>
          </section>
        </div>
      )}
      <div className="max-xl:hidden">
        <SectionSupports />
      </div>
    </div>
  );
};



INewsDetail.getLayout = function getLayout(page) {
  return (
    <>
      <LayoutDefault footerClassName="bg-neutral-0 max-md:hidden">{page}</LayoutDefault>
    </>
  );
};
export default INewsDetail;
