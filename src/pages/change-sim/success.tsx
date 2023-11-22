import ChatBoxLazy from '@/components/chat/chat-box-lazy';
import HeaderMobileWeb from '@/components/header/header-mobile-web';
import LayoutDefault from '@/components/layout/layout-default';
import { SuccessView } from '@/components/pages/support/result';
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
      <SuccessView
        title="Gửi yêu cầu thành công!"
        description={
          <>
            Tel đã tiếp nhận yêu cầu đổi SIM/ eSIM của bạn và sẽ xử lý trong vòng 24h.
            <br />
            Lưu ý: Sau khi yêu cầu được xử lý, SIM cũ của Bạn sẽ bị vô hiệu hóa và KHÔNG THỂ tiếp tục sử dụng.
            <br />
            Chi tiết liên hệ 0877 087 087 (miễn phí cho thuê bao iTel). Trân trọng!
          </>
        }
        questions="Bạn gửi yêu cầu có dễ dàng không? Hãy đánh giá ngay bên dưới nhé."
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
