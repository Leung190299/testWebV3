
import ChatBoxLazy from '@/components/chat/chat-box-lazy';
import LayoutDefault from '@/components/layout/layout-default';
import getServerPropsWithTranslation from '@/i18n/getServerPropsWithTranslation';
import pageDetailService from '@/services/pageDetailService';
import { Logger } from '@/utilities/logger';
import { NextPage } from 'next';

interface DefaultProps {
  pageDetail: { Detail: string };
}

const Data = [
  { slug: 'dieu-khoan-bao-mat' },
  { slug: 'dieu-khoan-su-dung' },
  { slug: 'quyen-rieng-tu' },
  { slug: 'dieu-khoan-giao-dich-chung' },
  { slug: 'mua-ban' },
  { slug: 'diem-ban-hang-luu-dong' },
  { slug: 'diem-uy-quyen' },
  { slug: 'bao-cao-chat-luong-dich-vu' },
  { slug: 'giay-phep-cung-cap-dich-vu-vien-thong' }
];

const ThongTin: NextPage<DefaultProps> = (props) => {
  const { pageDetail } = props;
  return <div dangerouslySetInnerHTML={{ __html: pageDetail.Detail }} />;
};

ThongTin.displayName = 'ThongTin';
const logger = new Logger(ThongTin.displayName!);

ThongTin.getLayout = function (page) {
  return (
    <LayoutDefault>
      {page}
      <ChatBoxLazy />
    </LayoutDefault>
  );
};

export const getStaticProps = getServerPropsWithTranslation<DefaultProps>(async (context) => {
  const slug = context.params?.slug;

  const params = {
    columnFilters: { Slug: slug },
    sort: [],
    lang: 1,
    page: 1,
    pageSize: 1000
  };
  const detail = await pageDetailService.getPageDetail(params);
  const pageDetail = detail.result[0]||[];
  return {
    props: {
      pageDetail
    }
  };
});
export async function getStaticPaths() {
  let listPath = Data.map((path) => ({ params: { ...path } }));
  return {
    paths: listPath,
    fallback: false
  };
}

export default ThongTin;
