import clsx from 'clsx';
import { useState } from 'react';
import CardFilm, { CardFilmItem } from '../card/card-film';
import Svg from '../icon/svg';

type SectionFilmFeatureProps = {
  label: string;
  filmData: CardFilmItem[];
  isHorizontal?: boolean;
  isRanked?: boolean;
  isWatchingList?: boolean;
  showFilmDetail?: boolean;
  showItem?: number;
};

const SectionFilmFeature = ({
  label,
  filmData,
  isHorizontal = false,
  isRanked = false,
  isWatchingList = false,
  showFilmDetail = true
}: SectionFilmFeatureProps) => {
  const [curr, setCurr] = useState(0);

  const prev = () => setCurr((curr) => (curr === 0 ? Math.ceil(isHorizontal ? filmData.length / 5 : filmData.length / 4) - 1 : curr - 1));
  const next = () => setCurr((curr) => (curr === Math.ceil(isHorizontal ? filmData.length / 5 : filmData.length / 4) - 1 ? 0 : curr + 1));

  return (
    <div className="flex flex-col md:gap-10 gap-3">
      <p className="xl:text-h3 md:text-h4 text-lg text-neutral-0 font-bold font-itel uppercase">{label}</p>
      <div className="relative group">
        <div className="xl:overflow-hidden overflow-auto scrollbar-hide md:-mx-10 md:px-10 -mx-4 px-4 xl:-mx-0 xl:px-0">
          <div
            className="flex transition-transform ease-out duration-500 xl:gap-6 md:gap-4 gap-3 w-fit xl:w-auto"
            style={{ transform: `translateX(-${curr * 100}%)` }}
          >
            {filmData.map((card, index) => (
              <CardFilm
                key={card.id}
                cardFilm={card}
                isHorizontal={isHorizontal}
                rank={(index + 1).toString()}
                isRanked={isRanked}
                isWatchingList={isWatchingList}
                showFilmDetail={showFilmDetail}
              />
            ))}
          </div>
        </div>
        <div className={clsx('opacity-0 group-hover:opacity-100 absolute max-xl:hidden top-1/3', isHorizontal ? '-left-[6%]' : 'left-10')}>
          <button className="btn btn-tertiary btn-circle w-18 h-18 rotate-180" onClick={prev}>
            <Svg src="/icons/line/chevron-right.svg" className="inline h-10 w-10" />
          </button>
        </div>
        <div
          className={clsx('opacity-0 group-hover:opacity-100 absolute max-xl:hidden top-1/3', isHorizontal ? '-right-[6%]' : 'right-10')}
        >
          <button className="btn btn-tertiary btn-circle w-18 h-18" onClick={next}>
            <Svg src="/icons/line/chevron-right.svg" className="inline h-10 w-10" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SectionFilmFeature;
