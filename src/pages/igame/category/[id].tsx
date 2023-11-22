import getServerPropsWithTranslation from '@/i18n/getServerPropsWithTranslation';
import { NextPage } from 'next';
import { useRouter } from 'next/router';

import CardGame from '@/components/card/card-game';
import ChatBoxLazy from '@/components/chat/chat-box-lazy';
import LayoutIgame from '@/components/layout/layout-igame';
import PaginationList from '@/components/pagination/pagination-list';
import SectionIgame from '@/components/section/section-igame';
import routers from '@/routes/routers';
import gameService from '@/services/game/game';
import { IGame } from '@/pages/igame';
import React from 'react';
import Head from 'next/head';
import HeaderWebDefault from '@/components/header/header-web-default';
import Link from 'next/link';
import Routers from '@/routes/routers';
import PaginationSimple from '@/components/pagination/pagination-simple';

type GameCategoryProps = {
  games: (Omit<IGame, 'id'> & { id: number })[];
  hotWeekGames: IGame[];
};
const nameByTag: Record<string, string> = {
  action: 'Hành động',
  sports: 'Thể thao',
  intellectual: 'Trí truệ'
};
const GameCategoryPage: NextPage<GameCategoryProps> = ({ games, hotWeekGames }) => {
  const router = useRouter();

  const onClickGame = (id: string) => {
    const url = routers.IGAME_DETAIL.replace('[id]', id);
    router.push(url);
  };
  const name = nameByTag[router.query.id as string];
  const title = `Game ${name.toLowerCase()}`;
  const [item, ...others] = hotWeekGames;

  return (
    <>
      <Head>
        <title>{name}</title>
      </Head>
      <HeaderWebDefault title={title} withSearch withMenu />
      <div className="flex container mt-2 md:mt-0 md:py-10 flex-wrap xl:flex-nowrap xl:gap-6">
        <Link href={{ pathname: Routers.IGAME_DETAIL, query: { id: item.id } }} className="w-full h-full">
          <div className="card">
            <figure className="group block-img block-photo rounded-lg bg-base-300">
              <img
                src={item.image}
                alt={item.name}
                className="group-hover:scale-110 transition-default h-full w-full object-cover center-by-grid"
              />
            </figure>
            <div className="mt-3 md:mt-4">
              <h5 className="md:text-s-sm">
                <b>Vernal Edge</b>
              </h5>
              <div className="md:mt-1 text-sm md:text-base text-subtle-content">
                Hot Tuần • {name} <span className="max-md:hidden">• 23045 người tham gia</span>
              </div>
            </div>
          </div>
        </Link>
        <div className="w-full xl:w-[25.5rem] max-md:hidden flex-shrink-0 mt-10 xl:mt-0">
          <section className="flex-wrap flex -mx-3 gap-y-6">
            {others.map((item) => {
              return (
                <div className="w-1/2 px-3 xl:w-full" key={item.id}>
                  <Link href={{ pathname: Routers.IGAME_DETAIL, query: { id: item.id } }}>
                    <div className="card">
                      <figure className="group block-img block-cinema rounded-lg bg-base-300">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="group-hover:scale-110 transition-default h-full w-full object-cover center-by-grid"
                        />
                      </figure>
                      <div className="mt-2">
                        <h5 className="text-lg">
                          <b>Vernal Edge</b>
                        </h5>
                        <div className="mt-1 text-base text-subtle-content">
                          Hot Tuần • {name} <span className="max-md:hidden">• 23045 người tham gia</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </section>
        </div>
      </div>
      <section className="container md:bg-neutral-50 xl:bg-transparent py-6 md:py-10 xl:pb-20">
        <h2 className="flex-1 font-itel text-xl md:text-h4 font-bold xl:text-h3">{title}</h2>
        <div className="flex flex-wrap -mx-1.5 md:-mx-3 md:mt-4 xl:mt-0">
          {games.map((item) => (
            <div key={item.id} className="w-1/2 px-1.5 md:px-3 xl:w-1/4 mt-3 md:mt-6 xl:mt-10">
              <Link href={{ pathname: Routers.IGAME_DETAIL, query: { id: item.id } }}>
                <div className="card group">
                  <figure className="block-img rounded-lg bg-base-300 block-photo">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="group-hover:scale-110 transition-default h-full w-full object-cover center-by-grid"
                    />
                  </figure>
                  {item.id % 3 ? null : (
                    <div className="transition-default absolute -right-3 -top-3 rotate-[30deg] group-hover:rotate-0">
                      <div className="badge text-xs badge-center w-10 rounded-full font-normal ">
                        <b>HOT</b>
                      </div>
                    </div>
                  )}
                  <div className="card-body px-0 py-2 md:py-4">
                    <h5 className="md:text-lg">
                      <b>Vernal Edge</b>
                    </h5>
                    <div className="md:mt-2 text-xs md:text-sm text-subtle-content">
                      Hot Tuần • {name} <span className="max-md:hidden">• 23045 người tham gia</span>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
        <div className="max-md:hidden mt-4 md:mt-10">
          <PaginationSimple totalPage={7} adjacent={4} />
        </div>
        <div className="md:hidden mt-4 md:mt-10">
          <PaginationSimple totalPage={7} adjacent={[3, 1]} />
        </div>
      </section>
    </>
  );
};
GameCategoryPage.getLayout = function (page) {
  return (
    <>
      <LayoutIgame className="bg-neutral-0">{page}</LayoutIgame>
      <ChatBoxLazy />
    </>
  );
};

const validTags = ['action', 'sports', 'intellectual'];
const getStaticProps = getServerPropsWithTranslation<GameCategoryProps>(async ({ params }) => {
  const cat = params?.id;
  if (typeof cat !== 'string' || !validTags.includes(cat)) return { notFound: true };
  const games = await gameService.getGames({ limit: 20 });
  if (games.length < 20) {
    games.push(...(await gameService.getGames({ limit: 20 - games.length })));
  }
  return {
    props: {
      games: games.map((v, index) => ({ ...v, id: index })),
      hotWeekGames: await gameService.getHotWeekGames({ limit: 3 })
    },
    // revalidate: 8600
  };
});
export async function getStaticPaths() {
  return {
    paths: validTags.map((id) => ({ params: { id: id } })),
    fallback: 'blocking' // can also be true or 'blocking'
  };
}
export default GameCategoryPage;
export { getStaticProps };
