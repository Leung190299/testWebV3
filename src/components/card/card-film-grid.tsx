import { modal } from '@/libs/modal';
import { formatFilmTimeLength } from '@/utilities/formatTime';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import ButtonAdd from '../button/button-add';
import ButtonFavorite from '../button/button-favorite';
import modalFilm from '../modal/modal-film';
import FilmProgerssBar from '../progress/film-progress-bar';
import SectionFilmFeatureDetail from '../section/section-film-feature-detail';
import { CardFilmProps } from './card-film';

type CardFilmGridProps = CardFilmProps;

const CardFilmGrid = ({
  cardFilm,
  isHorizontal = false,
  isRanked = false,
  rank,
  isWatchingList = false,
  showFilmDetail = true
}: CardFilmGridProps) => {
  const [hydrated, setHydrated] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  const handleModalFilmSeries = () => modalFilm({ filmDetail: cardFilm });

  const handleModalFilmFeature = () => {
    modal.open({
      render: <SectionFilmFeatureDetail filmDetail={cardFilm} />,
      transition: false,
      closeButton: false,
      className: 'modal-box shadow-itel scrollbar-hide md:bg-neutral-800',
      classNameContainer: 'modal-full md:modal-bottom-sheet ',
      classNameOverlay: 'bg-neutral-0 md:bg-neutral-900 md:bg-opacity-50'
    });
  };

  const handleClickAddButton = () => {
    setIsAdded(!isAdded);
    toast.success(!isAdded ? 'Đã thêm vào danh sách phim của tôi' : 'Đã bỏ khỏi danh sách phim của tôi', {
      style: { backgroundColor: '#FFFFFF', color: '#181818' }
    });
  };

  const handleClickFavoriteButton = () => {
    setIsFavorite(!isFavorite);
    toast.success(!isFavorite ? 'Đã thêm vào danh sách yêu thích' : 'Đã xóa khỏi danh sách yêu thích', {
      style: { backgroundColor: '#FFFFFF', color: '#181818' }
    });
  };

  return (
    <div className="w-full ">
      {hydrated && (
        <div className="flex flex-col gap-2 w-full cursor-pointer group relative">
          <img
            src={cardFilm.img}
            alt="card-film"
            className={clsx('max-w-none rounded-lg object-cover w-full h-full', isHorizontal ? 'aspect-photo-vertical' : 'aspect-video')}
            onClick={cardFilm.isSeriesMovie ? handleModalFilmSeries : handleModalFilmFeature}
          />
          <div className="xl:group-hover:flex flex-col gap-2 w-fit absolute right-4 top-[20%] hidden">
            <ButtonFavorite
              className="text-neutral-800 hover:text-red-500"
              theme="dark"
              onClick={handleClickFavoriteButton}
              isFavorite={isFavorite}
            />
            <ButtonAdd className="text-neutral-800 hover:text-red-500" theme="dark" onClick={handleClickAddButton} isAdd={isAdded} />
          </div>
          {showFilmDetail && !isHorizontal && (
            <div className="relative" onClick={cardFilm.isSeriesMovie ? handleModalFilmSeries : handleModalFilmFeature}>
              {cardFilm.newChapter && isWatchingList && (
                <div
                  className="absolute -top-11 w-[5.3rem] h-[2.25rem] flex justify-center items-center rounded-bl"
                  style={{ backgroundImage: 'url(https://res.cloudinary.com/dgkrchato/image/upload/v1685904396/itel-web/BG_i7v0t7.png)' }}
                >
                  <p className="text-sm font-bold text-neutral-0 whitespace-nowrap">Tập mới</p>
                </div>
              )}
              {cardFilm.viewTime > 0 && isWatchingList && (
                <div className="absolute left-0 -top-3 w-full">
                  <FilmProgerssBar timeWatched={cardFilm.viewTime} totalTime={cardFilm.time} inFilmSection />
                </div>
              )}
              <div className="flex flex-col md:gap-2 gap-1">
                <p className="md:text-lg text-base font-medium text-neutral-0 line-clamp-1">{cardFilm.name}</p>
                <div className="flex items-center justify-start md:text-sm text-xs font-normal text-neutral-0 gap-2 md:flex-nowrap flex-wrap">
                  {cardFilm.isSeriesMovie ? <p>{cardFilm.chap} tập</p> : <p>{formatFilmTimeLength(cardFilm.time)}</p>}
                  <div className="w-1 h-1 bg-neutral-0 rounded-full" />
                  <p>{cardFilm.nation}</p>
                  <div className="w-1 h-1 bg-neutral-0 rounded-full" />
                  <p>{cardFilm.category}</p>
                  <div className="w-1 h-1 bg-neutral-0 rounded-full" />
                  <p>{cardFilm.year}</p>
                </div>
              </div>
            </div>
          )}
          {isRanked && (
            <div className="relative w-full xl:h-40 md:h-20 h-14 bg-transparent">
              <div className="xl:text-[13.5rem] md:text-[11rem] text-[7.5rem] font-bold font-itel text-neutral-0 opacity-80 absolute left-8 xl:bottom-0 bottom-[5%]">
                {rank}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CardFilmGrid;
