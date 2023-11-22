import film from '@/mock/film.json';
import filmService from '@/services/film/film';
import { sleep } from '@/utilities/time';
import { useRouter } from 'next/router';
import { useCallback, useContext, useEffect, useState } from 'react';
import { CardFilmItem } from '../card/card-film';
import CardFilmGrid from '../card/card-film-grid';
import FilterFilm from '../filter/filter-film';
import { useSearchContext } from '../input/input-search-header';
import { filmQuickSearchs } from '../layout/layout-ifilm';

type Props = {};

const SharedFilmSectionSearch = (props: Props) => {
  const [products, setFilms] = useState<CardFilmItem[]>([]);
  const [peopleSearch, setPeopleSearch] = useState<CardFilmItem[]>([]);
  const [category, setCategory] = useState<string>('Tất cả thể loại');
  const input = useSearchContext();
  const query = input.querySubmited;

  const handleClickOptionList = (choice: string) => {
    setCategory(choice);
  };

  const searchFilms = useCallback((params: { q: string; limit: number; skip?: number; arr: CardFilmItem[] }) => {
    return filmService.getFilms(params);
  }, []);

  useEffect(() => {
    async function search() {
      setFilms([]);
      const films = await searchFilms({ q: String(query), limit: 8, arr: film });
      setPeopleSearch(films);
    }

    search();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    async function search() {
      setFilms([]);
      await sleep(1000);
      const films = await searchFilms({ q: String(query), limit: 12, arr: film });
      setFilms(films);

      const data = [...films];
      if (category !== 'Tất cả thể loại') {
        const newFilmList = data.filter((filmType) => filmType.category === category);
        setFilms(newFilmList);
      } else {
        setFilms(films);
      }
    }

    query && search();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, category]);

  return (
    <div className="container relative z-10 pb-10 md:pt-2">
      {!query && (
        <div className="mt-4">
          <ul className="flex flex-wrap gap-2">
            {filmQuickSearchs.map((search) => {
              return (
                <li key={search.id}>
                  <button
                    className="btn-outline btn h-11 rounded-full border-neutral-500 text-neutral-0 font-medium text-sm"
                    onClick={() => input.handleSearchSelect(search.text)}
                  >
                    {search.text}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
      <div className="md:mt-10">
        {query && (
          <div className="pb-4 border-b border-b-neutral-600 mb-6 md:hidden">
            <p className="text-base text-neutral-300 font-medium">
              {query ? `Kết quả tìm kiếm cho phim liên quan đến “${query}”` : 'Mọi người cũng tìm kiếm'}
            </p>
          </div>
        )}
        <div className="flex justify-between xl:flex-row md:flex-col xl:items-center md:items-start mt-6 md:mt-0">
          <h4 className="md:text-s-sm text-lg font-bold text-neutral-0 md:block hidden  ">
            {query ? `Kết quả cho "${query}"` : 'Mọi người cũng tìm kiếm'}
          </h4>
          <div className="w-full h-[0.0625rem] bg-neutral-500 my-6 hidden md:block xl:hidden" />
          <h4 className="text-lg font-bold text-neutral-0 md:hidden block whitespace-nowrap">
            {query ? `Kết quả tìm kiếm` : 'Mọi người cũng tìm kiếm'}
          </h4>
          {query && (
            <>
              <div className="md:w-[11.75rem]">
                <FilterFilm
                  categoryList={['Tất cả thể loại', 'Tâm lý', 'Kinh dị', 'Hài hước', 'Tình cảm', 'Hành động']}
                  handleChooseOption={handleClickOptionList}
                />
              </div>
              <div className="w-full h-[0.0625rem] bg-neutral-600 mt-6 hidden md:block xl:hidden" />
            </>
          )}
        </div>
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 xl:gap-6 md:mt-10 mt-4">
          {(query ? products : peopleSearch).map((card) => {
            return (
              <div key={card.id} className="">
                <CardFilmGrid key={card.id} cardFilm={card} isHorizontal={false} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SharedFilmSectionSearch;
