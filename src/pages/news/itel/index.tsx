import CardNewsProduct from '@/components/card/card-news-product';
import NewsContainer from '@/components/container/news';
import { LayoutWithChatBox } from '@/components/layout/layout-default';
import SectionNews from '@/components/section/section-news';
import getServerPropsWithTranslation from '@/i18n/getServerPropsWithTranslation';
import newsService, { INews } from '@/services/news/news';
import vouchersServices from '@/services/vouchers/vouchers';
import { Data } from '@/types/model';
import clsx from 'clsx';
import { NextPage } from 'next';

type PageProps = {
  shorts: Data.Shorts;
  news: INews[];
};

const ITelNews: NextPage<PageProps> = ({ shorts, news }) => {

  return (
    <NewsContainer shorts={shorts} news={news} haveVideos={false} titleNews="tin itel" hrefHotNews="/news/itel/[id]">
      <ITelNewsItems news={news} />
    </NewsContainer>
  );
};

const ITelNewsItems = ({ news }: { news: INews[] }) => {
  return (
    <SectionNews haveFilter classTitle="md:text-h3 text-xl" title="tin itel" className="container py-4">
      <div className="mt-3 md:mt-10 grid grid-cols-2 md:gap-6 gap-3 lg:grid-cols-3">
        {news.map((item, index) => (
          <CardNewsProduct
            key={item.id}
            {...item}
            className={clsx('bg-neutral-0 rounded-xl', index === 0 && 'max-xl:hidden')}
            classNameFrame="rounded-xl aspect-video"
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

ITelNews.getLayout = LayoutWithChatBox;
export { getStaticProps };
export default ITelNews;
