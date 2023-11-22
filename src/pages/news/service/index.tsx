import NewsContainer from '@/components/container/news';
import { LayoutWithChatBox } from '@/components/layout/layout-default';
import getServerPropsWithTranslation from '@/i18n/getServerPropsWithTranslation';
import vouchersServices from '@/services/vouchers/vouchers';
import newsService, { INews } from '@/services/news/news';
import { Data } from '@/types/model';
import { NextPage } from 'next';
import SectionNews from '@/components/section/section-news';
import CardNewsProduct from '@/components/card/card-news-product';
import clsx from 'clsx';

type PageProps = {
  shorts: Data.Shorts;
  news: INews[];
};

const ServiceNews: NextPage<PageProps> = ({ shorts, news }) => {
  return (
    <NewsContainer shorts={shorts} news={news} haveVideos={false} haveShorts={false} titleNews="dịch vụ" hrefHotNews="/news/service/[id]">
      <ServiceNewsItems news={news} />
    </NewsContainer>
  );
};

const ServiceNewsItems = ({ news }: { news: INews[] }) => {
  return (
    <SectionNews haveFilter classTitle="md:text-h3 text-xl" title="tin dịch vụ" className="container py-4 md:py-6 xl:py-20">
      <div className="mt-3 md:mt-10 grid grid-cols-2 md:gap-6 gap-3 lg:grid-cols-3">
        {news.map((item, index) => (
          <CardNewsProduct
            key={item.id}
            {...item}
            className={clsx('bg-neutral-0 rounded-xl', index === 0 && 'max-xl:hidden')}
            classNameFrame="rounded-xl aspect-video"
            href={'/news/service/[id]'}
          />
        ))}
      </div>
    </SectionNews>
  );
};

const getStaticProps = getServerPropsWithTranslation<PageProps>(async () => {
  const shorts = await vouchersServices.getListShort({ limit: 10 });
  const news = await newsService.getNews({ limit: 9 });
  return {
    props: { shorts, news },
    // revalidate: 8600
  };
});

ServiceNews.getLayout = LayoutWithChatBox;
export { getStaticProps };
export default ServiceNews;
