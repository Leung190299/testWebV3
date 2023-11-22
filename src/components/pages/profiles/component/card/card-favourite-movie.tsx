import Svg from '@/components/icon/svg';
import modalFilm from '@/components/modal/modal-film';
import FilmProgerssBar from '@/components/progress/film-progress-bar';
import SectionFilmFeatureDetail from '@/components/section/section-film-feature-detail';
import { modal } from '@/libs/modal';
import { formatFilmTimeLength } from '@/utilities/formatTime';
import clsx from 'clsx';
import * as React from 'react';
import { useReducer } from 'react';

export type FilmChapter = {
  id: number;
  image: string;
  chap: string;
  length: number;
  description: string;
};

export type CardFilmItem = {
  id?: number;
  name: string;
  img: string;
  time: number;
  chap?: string;
  nation: string;
  year: string;
  category: string;
  viewTime: number;
  isSeriesMovie?: boolean;
  newChapter?: boolean;
  child?: FilmChapter[];
};

type CardFilmProps = {
  cardFilm: CardFilmItem;
  isHorizontal?: boolean;
  isRanked?: boolean;
  rank?: string;
  isWatchingList?: boolean;
  hideButtonAction?: boolean;
};

const FavouriteMovieCard = ({
  cardFilm,
  isHorizontal = false,
  isRanked = false,
  rank,
  isWatchingList = false,
  hideButtonAction = false
}: CardFilmProps) => {
  const [isFavourite, setIsFavourite] = useReducer((state) => {
    return !state;
  }, false);

  const handleLikeItem = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavourite();
  };

  const handleModalFilmSeries = () => modalFilm({ filmDetail: cardFilm });

  const handleModalFilmFeature = () => {
    modal.open({
      render: <SectionFilmFeatureDetail filmDetail={cardFilm} />,
      transition: false,
      closeButton: false,
      className: 'modal-box shadow-itel',
      classNameContainer: 'modal-full md:modal-bottom-sheet',
      classNameOverlay: 'bg-neutral-0 md:bg-neutral-900 md:bg-opacity-50'
    });
  };

  return (
    <div className="w-full">
      <div className="flex flex-col gap-4 max-lg:gap-y-2 w-full cursor-pointer relative ">
        <div className={clsx('group card rounded-lg', 'max-w-none relative overflow-hidden')}>
          <img
            src={cardFilm.img}
            alt="card-film"
            className={clsx(
              'rounded-lg transition-default object-cover group-hover:scale-110',
              isHorizontal ? 'aspect-photo-vertical' : 'aspect-video'
            )}
            onClick={cardFilm.isSeriesMovie ? handleModalFilmSeries : handleModalFilmFeature}
          />
          {!hideButtonAction && (
            <div className="absolute bottom-4 right-4 card-hover max-md:hidden">
              <button type="button" onClick={handleLikeItem} className="btn-tertiary btn  mt-2 flex btn-circle">
                <Svg className="h-6 w-6" src={isFavourite ? '/icons/line/heart.svg' : '/icons/bold/favorite.svg'} />
              </button>
            </div>
          )}
          {cardFilm.newChapter && isWatchingList && (
            <div className="absolute bottom-0 left-0">
              <span className="tag tag-vector tag-md h-auto bg-gradient-to-r from-yellow-500 to-red-500 py-2">Tập mới</span>
            </div>
          )}
          {cardFilm.viewTime > 0 && isWatchingList && (
            <div
              className="absolute left-0 bottom-0 w-full"
              onClick={cardFilm.isSeriesMovie ? handleModalFilmSeries : handleModalFilmFeature}
            >
              <FilmProgerssBar timeWatched={cardFilm.viewTime} totalTime={cardFilm.time} inFilmSection />
            </div>
          )}
        </div>

        {!isHorizontal && (
          <div
            className="flex flex-col gap-2 max-lg:gap-1 max-md:max-lg:pb-2 pb-4"
            onClick={cardFilm.isSeriesMovie ? handleModalFilmSeries : handleModalFilmFeature}
          >
            <p className="text-lg font-bold max-lg:text-base text-neutral-800 line-clamp-1 max-lg:leading-6">{cardFilm.name}</p>
            <div className="flex items-center justify-start text-sm font-normal text-neutral-500 flex-wrap leading-5">
              {cardFilm.isSeriesMovie ? (
                <span className={'text-xs whitespace-nowrap'}>{cardFilm.chap} tập</span>
              ) : (
                <span className={'text-xs whitespace-nowrap'}>{formatFilmTimeLength(cardFilm.time)}</span>
              )}
              &nbsp;<span className={'text-xs whitespace-nowrap'}>&#8226;</span>&nbsp;
              <span className={'text-xs whitespace-nowrap'}>{cardFilm.nation}</span>&nbsp;
              <span className={'text-xs whitespace-nowrap'}>&#8226;</span>&nbsp;
              <span className={'text-xs whitespace-nowrap'}>{cardFilm.category}</span>&nbsp;
              <span className={'text-xs whitespace-nowrap'}>&#8226;</span>&nbsp;
              <span className={'text-xs whitespace-nowrap'}>{cardFilm.year}</span>
            </div>
          </div>
        )}
        {isRanked && (
          <div
            className="relative w-full xl:h-40 md:h-20 h-14 bg-transparent"
            onClick={cardFilm.isSeriesMovie ? handleModalFilmSeries : handleModalFilmFeature}
          >
            <div className="xl:text-[13.5rem] md:text-[11rem] text-[7.5rem] font-bold font-itel text-neutral-0 opacity-80 absolute left-8 xl:bottom-0 bottom-[5%]">
              {rank}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FavouriteMovieCard;
