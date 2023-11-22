import ChatBoxLazy from '@/components/chat/chat-box-lazy';
import HeaderMobileWeb from '@/components/header/header-mobile-web';
import LayoutIFilm from '@/components/layout/layout-ifilm';
import PaginationList from '@/components/pagination/pagination-list';
import SectionFilmList from '@/components/section/section-film-list';
import film from '@/mock/film.json';
import { getMultipleRandom } from '@/utilities/randomNumberItem';
import { NextPage } from 'next';
import Head from 'next/head';

const FavoriteFilmPage: NextPage = () => {
  return (
    <div>
      <Head>
        <title>iFilm</title>
      </Head>
      <section className="bg-neutral-900 md:py-20 pb-8">
        <div className="container">
          <SectionFilmList filmData={getMultipleRandom(film, 16)} className="gap-[1.125rem]" isHorizontal={false} isTabHeading />
        </div>
        <div className="w-full flex justify-center">
          <div className="md:hidden">
            <PaginationList pageList={['1', '2', '3', '...', '7']} subPageList={['4', '5', '6']} theme="dark" />
          </div>
          <div className="max-md:hidden">
            <PaginationList
              pageList={['1', '2', '3', '4', '...', '12', '13', '14', '15']}
              subPageList={['5', '6', '7', '8', '9', '10', '11']}
              theme="dark"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

FavoriteFilmPage.getLayout = function (page) {
  return (
    <>
      <LayoutIFilm pageMobileTitle="Phim của tôi" footerClassName="bg-neutral-700">
        {page}
      </LayoutIFilm>
      <ChatBoxLazy />
    </>
  );
};

export default FavoriteFilmPage;
