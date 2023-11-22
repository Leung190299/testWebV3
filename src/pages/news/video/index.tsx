import NewsContainer from '@/components/container/news';
import { LayoutWithChatBox } from '@/components/layout/layout-default';
import getServerPropsWithTranslation from '@/i18n/getServerPropsWithTranslation';
import vouchersServices from '@/services/vouchers/vouchers';
import newsService, { INews } from '@/services/news/news';
import { Data } from '@/types/model';
import { NextPage } from 'next';

type PageProps = {
  shorts: Data.Shorts;
  news: INews[];
};

const VideoNews: NextPage<PageProps> = ({ shorts, news }) => {
  return <NewsContainer shorts={shorts} news={news} haveHotNews={false} hrefItemVideo="/news/video/[id]" hrefVideoNews=""></NewsContainer>;
};

const getStaticProps = getServerPropsWithTranslation<PageProps>(async () => {
  const shorts = await vouchersServices.getListShort({ limit: 10 });
  const news = await newsService.getNews({ limit: 9 });
  return {
    props: { shorts, news },
    // revalidate: 8600
  };
});

VideoNews.getLayout = LayoutWithChatBox;
export { getStaticProps };
export default VideoNews;
