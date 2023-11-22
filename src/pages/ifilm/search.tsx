import { NextPage } from 'next';
import { useRouter } from 'next/router';

import getServerPropsWithTranslation from '@/i18n/getServerPropsWithTranslation';

import ChatBoxLazy from '@/components/chat/chat-box-lazy';
import Head from 'next/head';
import SharedFilmSectionSearch from '@/components/section/shared-film-section-search';
import LayoutIFilm from '@/components/layout/layout-ifilm';

type PageProps = {};

const IFilmSearchPage: NextPage<PageProps> = (props) => {
  const router = useRouter();
  const s = String(router.query.s);
  return (
    <>
      <Head>
        <title>{`Ifilm - Tìm kiếm "${s}"`}</title>
      </Head>
      <section>
        <SharedFilmSectionSearch />
      </section>
    </>
  );
};
IFilmSearchPage.getLayout = function Layout(page, props) {
  const router = useRouter();
  const s = String(router.query.s);
  return (
    <>
      <LayoutIFilm isSearchPage className="bg-neutral-700">
        {page}
      </LayoutIFilm>
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
export default IFilmSearchPage;
