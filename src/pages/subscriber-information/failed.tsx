import ChatBoxLazy from '@/components/chat/chat-box-lazy';
import HeaderMobileWeb from '@/components/header/header-mobile-web';
import LayoutDefault from '@/components/layout/layout-default';
import { FailedView } from '@/components/pages/support/result';
import getServerPropsWithTranslation from '@/i18n/getServerPropsWithTranslation';
import Head from 'next/head';

interface PageProps {}
const Page = (props: PageProps) => {
  return (
    <>
      <Head>
        <title>Itel - Chi tiết giao dịch</title>
      </Head>
      <HeaderMobileWeb title="Chi tiết giao dịch" />
      <FailedView
        title="Gửi yêu cầu thất bại!"
        description={
          <>
            Hệ thống đang bảo trì, Bạn vui lòng thử lại sau ít phút.
            <br />
            iTel rất xin lỗi về sự bất tiện này!
          </>
        }
        method="Cập nhật TTTB"
        time="16:50 - 01/03/2023"
        status="Thất bại"
      />
    </>
  );
};

Page.getLayout = function layout(page: any) {
  return (
    <>
      <LayoutDefault footerClassName="bg-neutral-50">{page}</LayoutDefault>
      <ChatBoxLazy />
    </>
  );
};
const getStaticProps = getServerPropsWithTranslation(async () => {
  return {
    props: {}
  };
});
export { getStaticProps };

export default Page;
