import * as React from 'react';
import gameList from '@/mock/game.json';
import { useEffect, useState } from 'react';
import { IGame } from '@/pages/igame';
import Link from 'next/link';
import Routers from '@/routes';
import CardGameFavourite from '@/components/pages/profiles/component/card/card-favourite-game';

export const FavouriteGameGrid = () => {
  const [games, setGames] = useState<IGame[]>([]);

  useEffect(() => {
    setGames(gameList.slice(0, 9));
  }, []);

  return (
    <div className="grid grid-cols-3 max-md:mt-0 max-md:grid-cols-2 max-md:gap-3 gap-x-6 gap-y-12 max-lg:gap-x-4 max-lg:gap-y-6">
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
              classNameImage={'rounded-lg'}
              isOutstanding={item.isOutstanding}
              classNameWrapper={'group card'}
              playingPlatforms={item.playingPlatforms}
            />
          </Link>
        </div>
      ))}
    </div>
  );
};
