import CardNewsProduct from '@/components/card/card-news-product';
import Svg from '@/components/icon/svg';
import LayoutDefault from '@/components/layout/layout-default';
import SectionSupports from '@/components/section/section-supports';
import Seo from '@/components/seo';
import getServerPropsWithTranslation from '@/i18n/getServerPropsWithTranslation';
import Routers from '@/routes';
import itelClubService from '@/services/itelClubService';
import newsService, { INews } from '@/services/news/news';
import NewService from '@/services/newService';
import type { Model } from '@/types/model';
import { Logger } from '@/utilities/logger';
import clsx from 'clsx';
import { NOTFOUND } from 'dns';
import _ from 'lodash';
import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Error from 'next/error'


type PageProps = {
  category: Model.INewsCategory;
  news?: INews;
  similarNews?: INews[];
};

const tags = ['Hướng dẫn', 'Mua Sim', 'Sim mới', 'Tin hot', 'Chương trình hot'];

const logger = new Logger('INew Detail Page');
const INewsDetail: NextPage<PageProps> = ({ category, similarNews }) => {
  const [newsDetail, setNewsDetail] = useState<newModal.BlogDetail>({});
  const [news, setNews] = useState<newModal.Blog[]>([]);

  const router = useRouter();
  const { slug, type } = router.query;


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
		setNews(res.result.ListBlogItemRelated!)
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
  }

  useEffect(() => {
    if (slug) {
      if (type) {
        getDetailLoyalty(slug as string);
        return
      }
      getDetailNews(slug as string);
    }
  }, [slug]);
  if (!slug) {
    return <Error statusCode={404} />
  }
  const iframe_container = {
    left: 0,
    width: '100%',
    height: 500,
    position: 'relative'
  };

  const iframe = {};
	return (
		<div className="news-detail bg-neutral-0">
		<Seo title={newsDetail.SeoTitle!||''} description={newsDetail.SeoDetails!||''} image={newsDetail.SeoThumbnail} keywords={newsDetail.SeoKeyword} />
      <section className="container max-md:hidden">
        <div className="breadcrumbs text-sm text-neutral-500">
          <ul aria-label="Breadcrumb line-clamp-1 ">
            <li>
              <Link href={Routers.IMALL}> Trang chủ </Link>
            </li>
            <li>
              <Link href={Routers.NEWS}>Tin tức</Link>
            </li>
            <li className="text-neutral-800 line-clamp-1 ">
              <Link href={router.asPath}>
                <p className="line-clamp-1 ">{newsDetail.Title}</p>
              </Link>
            </li>
          </ul>
        </div>
      </section>
      <section className="container flex pb-4 pt-0 md:py-10 gap-10">
        <div className="description w-full xl:w-2/3 text-neutral-500">
          <p className="text-base"> {`${newsDetail.ParentName} • ${newsDetail.CreatedOn?.split('T')[0]}`}</p>
          <h1 className="font-bold text-2xl md:text-h4 xl:text-h3 text-neutral-800 my-2">{newsDetail.Title}</h1>
          {type&&<img src={newsDetail.Thumbnail} />}
          <div className="mt-4" dangerouslySetInnerHTML={{ __html: newsDetail.Detail! }} />

          <div className="flex gap-2 flex-wrap mt-5">
            {tags.map((tag) => (
              <div key={tag} className="rounded-3xl border border-neutral-300 px-3 md:px-4 py-2 md:py-3 cursor-pointer text-neutral-800">
                {tag}
              </div>
            ))}
          </div>
        </div>
        <div className="ads hidden xl:flex md:w-1/3 rounded-2xl overflow-hidden relative h-fit">
          <img src="/images/banner-news-sim.png" alt="banner" className="w-full h-full" />
          <div className="absolute top-0 left-0 p-8 h-full">
            <h3 className="font-bold text-[32px] leading-10 text-neutral-800 mb-2">Bạn đã sẵn sàng chọn số, mua Sim?</h3>
            <p className="text-sm xl:text-base text-neutral-500 mb-8">Cùng Anh iTel đi liền thôiiiiii! Gét gô</p>

            <button type="button" onClick={()=>router.push(Routers.SIM)} className="btn btn-lg rounded-full btn-primary py-4 px-14">
              Gét gô!
            </button>
          </div>
        </div>
      </section>
      {news.length != 0 &&
      <div className="bg-neutral-50 py-4 md:py-20">
        <section className="container">
          <div className="flex items-center">
            <h2 className="md:font-itel flex-1 text-xl md:text-h4 font-bold xl:text-h3 text-center">Tin tức liên quan</h2>
          </div>
          <div className="mt-3 md:mt-10 grid grid-cols-2 md:gap-6 gap-3 lg:grid-cols-3">
            {news?.filter(item=>item.Id!=newsDetail.Id && item.Slug).slice(0,3).map((item, index) => (
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
      </div>}
      <div className="max-xl:hidden">
        <SectionSupports />
      </div>
    </div>
  );
};

const HeaderStiky = ({ title }: { title: string }) => {
  const router = useRouter();
  return (
    <div className="md:hidden bg-neutral-0 container h-16 flex items-center sticky top-0 gap-4 font-bold">
      <button
        type="button"
        className={clsx('')}
        onClick={() => {
          router.back();
        }}
      >
        <Svg src={'/icons/line/close.svg'} width={24} height={24} />
      </button>
      <p className="text-lg text-neutral-800 line-clamp-1">{title}</p>
    </div>
  );
};

const getStaticProps = getServerPropsWithTranslation<PageProps>(async ({}) => {
  const category = newsService.getCategoryByPath('itel');
  const news = newsService.getNewsDetailById('1');
  const similarNews = await newsService.getNews({ limit: 3 });

  if (!category || !news || !similarNews) return { notFound: true };

  return {
    props: {
      category: category,
      news: news,
      similarNews: similarNews
    }
  };
});

INewsDetail.getLayout = function getLayout(page, props) {
  return (
    <>
      <LayoutDefault footerClassName="bg-neutral-0 max-md:hidden">
        <Head>
          <title>{`News - ${props.category.name}`}</title>
        </Head>
        <HeaderStiky title={props.news?.name || ''} />
        {page}
      </LayoutDefault>
    </>
  );
};
export default INewsDetail;

export { getStaticProps };
