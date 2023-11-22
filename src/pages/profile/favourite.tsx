import LayoutProfile from '@/components/layout/layout-profile';
import { FavouriteProductGrid } from '@/components/pages/profiles/component/favourite-product-grid';
import { ProfileTab } from '@/components/pages/profiles/component/tab/favourite-tab';
import { NextPage } from 'next';
import Head from 'next/head';
import React, { useState } from 'react';
import { FavouriteFilmGrid } from '@/components/pages/profiles/component/favourite-film-grid';
import { FavouriteGameGrid } from '@/components/pages/profiles/component/favourite-game-grid';
import { FILM_TYPE, GAME_TYPE, PRODUCT_TYPE } from '@/components/pages/profiles/constant/profile.constant';
import { TabFavouriteMobile } from '@/components/pages/profiles/component/tab/tab-product-favorite-mobile';

const tabs = [
  { id: PRODUCT_TYPE, label: 'Sản phẩm', icon: '/icons/bold/shopping.svg' },
  { id: FILM_TYPE, label: 'Phim', icon: '/icons/bold/movie.svg' },
  { id: GAME_TYPE, label: 'Game', icon: '/icons/bold/itel-game.svg' }
];

const Favourite: NextPage = () => {
  const [tab, setTab] = useState(PRODUCT_TYPE);

  return (
    <div className="max-md:-mt-4">
      <Head>
        <title>Itel - profile</title>
      </Head>
      <section className="hidden md:flex bg-neutral-100 mb-[1rem]">
        <h2 className="font-itel text-h3 font-bold">Yêu Thích</h2>
      </section>
      <ProfileTab setTab={setTab} tab={tab} tabs={tabs} />
      <TabFavouriteMobile setTab={setTab} tab={tab} tabs={tabs} />
      <div className="max-md:px-4 max-md:bg-neutral-0 p-4 md:pt-6 md:px-0 max-md:pb-0 mt-2 md:mt-0 max-md:mb-2">
        {tab === PRODUCT_TYPE && <FavouriteProductGrid />}
        {tab === FILM_TYPE && <FavouriteFilmGrid />}
        {tab === GAME_TYPE && <FavouriteGameGrid />}
      </div>
    </div>
  );
};

Favourite.getLayout = function (page) {
  return (
    <>
      <LayoutProfile titleMobile="Yêu thích" footerClassName="bg-neutral-0 max-md:mt-0">
        {page}
      </LayoutProfile>
    </>
  );
};
export default Favourite;
