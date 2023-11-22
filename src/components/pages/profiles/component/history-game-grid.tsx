import { useEffect, useState } from 'react';
import { IGame } from '@/pages/igame';
import gameList from '@/mock/game.json';
import Link from 'next/link';
import Routers from '@/routes';
import CardGameFavourite from '@/components/pages/profiles/component/card/card-favourite-game';
import PaginationSimple from '@/components/pagination/pagination-simple';
import * as React from 'react';

export const HistoryGameGrid = () => {
  const [games, setGames] = useState<IGame[]>([]);

  useEffect(() => {
    setGames(gameList.slice(0, 9));
  }, []);

  return (
    <>
      <div className="flex flex-wrap gap-y-6 max-md:mt-0  xl:gap-y-8">
        <div className="grid grid-cols-3 gap-x-6 gap-y-12 max-lg:gap-x-4 max-lg:gap-y-6 max-md:grid-cols-2 max-md:gap-x-3 max-md:gap-y-3">
          {games.map((item) => (
            <div key={item.id} className="">
              <Link href={{ pathname: Routers.IGAME_DETAIL, query: { id: item.id } }}>
                <CardGameFavourite
                  id={item.id}
                  name={item.name}
                  image={item.image}
                  categories={item.categories}
                  numberOfPlayer={item.numberOfPlayer}
                  isHotWeek={item.isHotWeek}
                  isHot={false}
                  hideButtonAction
                  classNameImage={'rounded-lg'}
                  isOutstanding={item.isOutstanding}
                  classNameWrapper={'group card'}
                  playingPlatforms={item.playingPlatforms}
                />
              </Link>
            </div>
          ))}
        </div>
      </div>
      <div className="md:hidden mt-6">
        <PaginationSimple totalPage={100} adjacent={[3, 1]} />
      </div>
    </>
  );
};
