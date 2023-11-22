import * as React from 'react';
import { useEffect, useState } from 'react';
import { CardFilmItem } from '@/components/card/card-film';
import { getMultipleRandom } from '@/utilities/randomNumberItem';
import film from '@/mock/film.json';
import FavouriteMovieCard from '@/components/pages/profiles/component/card/card-favourite-movie';

export const FavouriteFilmGrid = () => {
  const [data, setData] = useState<CardFilmItem[]>([]);

  useEffect(() => {
    setData(getMultipleRandom(film, 9));
  }, []);

  return (
    <div className="grid grid-cols-3 gap-x-6 max-md:grid-cols-2 max-md:gap-x-3 max-md:gap-y-4 max-lg:gap-x-4 gap-y-12 max-lg:gap-y-6 max-md:mt-0">
      {data.map((item, index) => (
        <FavouriteMovieCard
          key={item.id}
          cardFilm={{
            ...item,
            newChapter: [0, 1, 2].includes(index)
          }}
          isWatchingList={[0, 1, 2].includes(index)}
        />
      ))}
    </div>
  );
};
