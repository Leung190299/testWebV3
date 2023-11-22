// @flow
import * as React from 'react';
import { useEffect, useState } from 'react';
import { CardFilmItem } from '@/components/card/card-film';
import { getMultipleRandom } from '@/utilities/randomNumberItem';
import film from '@/mock/film.json';
import FavouriteMovieCard from '@/components/pages/profiles/component/card/card-favourite-movie';
import PaginationSimple from '@/components/pagination/pagination-simple';

export const HistoryFilmGrid = () => {
  const [data, setData] = useState<CardFilmItem[]>([]);

  useEffect(() => {
    setData(getMultipleRandom(film, 9));
  }, []);

  return (
    <>
      <div className="grid grid-cols-3 gap-x-6 gap-y-12 max-md:mt-0 max-md:grid-cols-2 max-md:gap-x-3 max-md:gap-y-3 max-lg:gap-x-4 max-lg:gap-y-6">
        {data.map((item, index) => (
          <FavouriteMovieCard
            key={item.id}
            cardFilm={{
              ...item,
              newChapter: [1, 3, 4].includes(index)
            }}
            hideButtonAction
            isWatchingList={[0, 1, 2].includes(index)}
          />
        ))}
      </div>
      <div className="md:hidden mt-6">
        <PaginationSimple totalPage={100} adjacent={[3, 1]} />
      </div>
    </>
  );
};
