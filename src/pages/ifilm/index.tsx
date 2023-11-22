import BannerIfilm from '@/components/banner/banner-ifilm';
import { CardFilmItem } from '@/components/card/card-film';
import ChatBoxLazy from '@/components/chat/chat-box-lazy';
import LayoutIFilm from '@/components/layout/layout-ifilm';
import PaginationList from '@/components/pagination/pagination-list';
import SectionFilmBanner from '@/components/section/section-film-banner';
import SectionFilmFeature from '@/components/section/section-film-feature';
import SectionFilmList from '@/components/section/section-film-list';
import { useGlobalContext } from '@/context/global';
import film from '@/mock/film.json';
import Routers from '@/routes/routers';
import { getMultipleRandom } from '@/utilities/randomNumberItem';
import { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import { useMemo } from 'react';

type PageProps = {
  data: CardFilmItem[];
  populars: CardFilmItem[];
  watching: CardFilmItem[];
  maybeLike: CardFilmItem[];
  highestWatch: CardFilmItem[];
};
const IFilmPage: NextPage<PageProps> = ({ data, highestWatch, maybeLike, populars, watching }) => {
  const { toggleModalAuth, status } = useGlobalContext();
  const banner = useMemo(
    () => [
      {
        id: 1,
        label: 'Phim bộ',
        href: Routers.FILM_SERIES,
        image: 'https://res.cloudinary.com/dgkrchato/image/upload/v1685505814/itel-web/fc8c5e564102ce37cbb0496bfe60b85b_idvtoj.png'
      },
      {
        id: 2,
        label: 'Phim lẻ',
        href: Routers.FILM_FEATURED,
        image: 'https://res.cloudinary.com/dgkrchato/image/upload/v1685505807/itel-web/66b8aff0ed6219cacc8f08157f5ae5a6_rr5yfc.png'
      },
      {
        id: 3,
        label: 'Phổ biến',
        href: Routers.FILM_POPULAR,
        image: 'https://res.cloudinary.com/dgkrchato/image/upload/v1685505806/itel-web/3236f85abb4338cbda6c222e7ea56540_vxkeip.png'
      },
      {
        id: 4,
        label: 'Phim của tôi',
        href: Routers.FILM_FAVORITE,
        onClick(e: any) {
          if (status !== 'authenticated') {
            e.preventDefault();
            return toggleModalAuth(0, { type: 'secondary' });
          }
        },
        image: 'https://res.cloudinary.com/dgkrchato/image/upload/v1685792664/itel-web/55a64227658f019a93f56b193a1159f7_jwfbgc.png'
      }
    ],
    [status, toggleModalAuth]
  );

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

      <section className="bg-neutral-900 xl:py-20 md:py-10 py-8">
        <div className="container block xl:hidden md:mb-16 mb-8">
          <SectionFilmBanner bannerData={banner} />
        </div>
        <div id="film-list" className="container xl:pl-28 xl:max-w-none xl:pr-0">
          <SectionFilmFeature label="Phim Phổ biến TRÊN ITEL" filmData={populars} />
        </div>
        <div className="md:mt-20 mt-10 container xl:pl-28 xl:max-w-none xl:pr-0">
          <SectionFilmFeature label="Phim đang xem của bạn" filmData={watching} isWatchingList />
        </div>
        <div className="md:mt-20 mt-10 container xl:pl-28 xl:max-w-none xl:pr-0">
          <SectionFilmFeature label="CÓ THỂ BẠN SẼ THÍCH" filmData={maybeLike} showFilmDetail={false} />
        </div>
        <div className="container xl:px-28 xl:max-w-none">
          <div className="md:mt-16 mt-8">
            <SectionFilmFeature label="PHIM THỊNH HÀNH" filmData={highestWatch} isHorizontal isRanked />
          </div>
        </div>
        <div className="container xl:px-28 xl:max-w-none">
          <div>
            <div className="md:block hidden">
              <SectionFilmList label="Danh sách phim" filmData={data} isHorizontal />
            </div>
            <div className="block md:hidden">
              <SectionFilmList label="Danh sách phim" filmData={data.slice(0, 6)} isHorizontal />
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
          </div>
        </div>
      </section>
    </div>
  );
};
const getStaticProps: GetStaticProps<PageProps> = async () => {
  const data = film.filter((movie) => movie.viewTime > 0);
  return {
    props: {
      data: getMultipleRandom(data, 15),
      populars: getMultipleRandom(data, 14),
      highestWatch: getMultipleRandom(data, 18),
      maybeLike: getMultipleRandom(data, 14),
      watching: data
    }
  };
};
export { getStaticProps };
IFilmPage.getLayout = function (page, props) {
  return (
    <>
      <LayoutIFilm isHomePage footerClassName="bg-neutral-700">
        {page}
      </LayoutIFilm>
      <ChatBoxLazy />
    </>
  );
};

export default IFilmPage;
