import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { CardFilmItem } from '../card/card-film';
import CardFilmGrid from '../card/card-film-grid';
import FilterFilm from '../filter/filter-film';
import Tab from '../tabs/tabs';
// import film from '@/mock/film.json'

type SectionFilmListProps = {
  label?: string;
  filmData: CardFilmItem[];
  className?: string;
  isHorizontal?: boolean;
  isDisplayButtonFilter?: boolean;
  isTabHeading?: boolean;
};

const SectionFilmList = ({
  label,
  filmData,
  className,
  isHorizontal = false,
  isDisplayButtonFilter = true,
  isTabHeading
}: SectionFilmListProps) => {
  const [filmList, setFilmList] = useState<CardFilmItem[]>(filmData);
  const [category, setCategory] = useState<string>('Tất cả thể loại');
  const [tabIndex, setTabIndex] = useState<number>(1);

  const handleClickOptionList = (choice: string) => {
    setCategory(choice);
  };

  useEffect(() => {
    const data = [...filmData];
    if (category !== 'Tất cả thể loại') {
      const newFilmList = data.filter((filmType) => filmType.category === category);
      setFilmList(newFilmList);
    } else {
      setFilmList(filmData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);

  return (
    <div>
      <div
        className={clsx(
          'flex justify-between xl:items-center md:mb-10 mb-4 xl:flex-row md:static z-20 pt-3',
          isTabHeading ? 'flex-col xl:gap-0 gap-6 sticky top-16' : 'static'
        )}
      >
        {isTabHeading ? (
          <div className="flex md:justify-start md:gap-10 border-b border-b-neutral-600 xl:border-none justify-center">
            {['Phim của tôi', 'Phim yêu thích'].map((tab, index) => (
              <Tab
                key={`tab-${index}`}
                label={tab}
                isActive={index + 1 === tabIndex}
                onClick={() => setTabIndex(index + 1)}
                className={clsx(
                  'xl:text-h3 md:text-h4 text-sm font-bold md:font-itel md:uppercase xl:border-none',
                  index + 1 === tabIndex ? 'text-neutral-0' : ''
                )}
                tabStyle={clsx('w-1/2 md:w-fit', index + 1 === tabIndex ? 'md:border-none' : '')}
              />
            ))}
          </div>
        ) : (
          <div className={clsx('flex justify-start items-center')}>
            <p className="md:hidden block text-xl text-neutral-0 font-bold font-itel uppercase">DANH SÁCH PHIM</p>
            <p className="xl:text-h3 md:text-h4 text-xl text-neutral-0 font-bold font-itel uppercase md:block hidden">{label}</p>
          </div>
        )}
        {isDisplayButtonFilter && (
          <div
            className={clsx(
              isTabHeading
                ? 'w-full xl:w-fit md:border-b border-b-neutral-600 xl:border-none md:pb-6 xl:pb-0 pb-0 border-transparent hidden md:block'
                : ''
            )}
          >
            <div className="md:w-[11.75rem]">
              <FilterFilm
                categoryList={['Tất cả thể loại', 'Tâm lý', 'Kinh dị', 'Hài hước', 'Tình cảm', 'Hành động']}
                handleChooseOption={handleClickOptionList}
              />
            </div>
          </div>
        )}
      </div>
      {isDisplayButtonFilter && isTabHeading && (
        <div className={clsx('md:hidden xl:hidden flex justify-end mb-4')}>
          <FilterFilm
            categoryList={['Tất cả thể loại', 'Tâm lý', 'Kinh dị', 'Hài hước', 'Tình cảm', 'Hành động']}
            handleChooseOption={handleClickOptionList}
          />
        </div>
      )}
      <div
        className={clsx(
          'grid xl:gap-6 md:gap-4 gap-3 z-10',
          isHorizontal ? 'xl:grid-cols-5 md:grid-cols-3 grid-cols-2' : 'xl:grid-cols-4 grid-cols-2 ',
          className
        )}
      >
        {filmList.map((card) => (
          <CardFilmGrid key={card.id} cardFilm={card} isHorizontal={isHorizontal} />
        ))}
      </div>
    </div>
  );
};

export default SectionFilmList;
