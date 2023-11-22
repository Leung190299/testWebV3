import { NextPage } from 'next';
import { useRouter } from 'next/router';

import getServerPropsWithTranslation from '@/i18n/getServerPropsWithTranslation';

import ChatBoxLazy from '@/components/chat/chat-box-lazy';
import LayoutImall from '@/components/layout/layout-imall';
import SharedSectionSearchProduct from '@/components/section/shared-section-search-product';
import Head from 'next/head';

type PageProps = {};

const ImallSearchPage: NextPage<PageProps> = (props) => {
  const router = useRouter();
  const s = String(router.query.s);
  return (
    <>
      <Head>
        <title>{`Imall - Tìm kiếm "${s}"`}</title>
      </Head>
      <section>
        <SharedSectionSearchProduct />
      </section>
    </>
  );
};
ImallSearchPage.getLayout = function Layout(page, props) {
  const router = useRouter();
  const s = String(router.query.s);
  return (
    <>
      <LayoutImall isSearchPage className="bg-neutral-0">
        {page}
      </LayoutImall>
      <ChatBoxLazy></ChatBoxLazy>
    </>
  );
};

const getStaticProps = getServerPropsWithTranslation<PageProps>(async () => {
  return {
    props: {},
    // revalidate: 8600
  };
});
export { getStaticProps };
export default ImallSearchPage;
