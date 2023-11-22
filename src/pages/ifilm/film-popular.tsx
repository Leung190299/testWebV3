import BannerIfilm from '@/components/banner/banner-ifilm';
import ChatBoxLazy from '@/components/chat/chat-box-lazy';
import HeaderMobileWeb from '@/components/header/header-mobile-web';
import LayoutIFilm from '@/components/layout/layout-ifilm';
import PaginationList from '@/components/pagination/pagination-list';
import SectionFilmList from '@/components/section/section-film-list';
import film from '@/mock/film.json';
import { getMultipleRandom } from '@/utilities/randomNumberItem';
import { NextPage } from 'next';
import Head from 'next/head';

const FilmPopularPage: NextPage = () => {
  return (
    <div>
      <Head>
        <title>iFilm</title>
      </Head>
      <section>
        <BannerIfilm
          category="Lãng mạn, hành động"
          chap="22/24"
          description="Lorem ipsum dolor sit amet consectetur. Augue felis ultrices praesent suscipit. Maecenas tristique mauris sed sed proin id sed ut. "
          name="https://res.cloudinary.com/dgkrchato/image/upload/v1685503610/itel-web/36a6a664cc00831ed00e6bbe50c344c4_kkoqo9.png"
          nation="Trung Quốc"
          year="2022"
        />
      </section>
      <section className="bg-neutral-900 xl:py-28 py-10">
        <div className="container" id="film-list">
          <SectionFilmList label="DANH SÁCH PHIM PHổ biến" filmData={getMultipleRandom(film, 15)} className="gap-[1.125rem]" isHorizontal />
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

FilmPopularPage.getLayout = function (page) {
  return (
    <>
      <LayoutIFilm pageMobileTitle="Phim phổ biến" footerClassName="bg-neutral-700">
        {page}
      </LayoutIFilm>
      <ChatBoxLazy />
    </>
  );
};

export default FilmPopularPage;
