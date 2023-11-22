import React, { ReactNode, useReducer } from 'react';
import TagOutstanding from '@/components/tag-chip/tag-outstanding';
import { IGame } from '@/pages/igame';
import Svg from '@/components/icon/svg';

interface CardDataPackProps extends IGame {
  descriptionElement?: ReactNode;
  classNameWrapper?: string;
  classNameImage?: string;
  index?: number;
  hideButtonAction?: boolean;
}

const Hot = () => {
  return (
    <div
      className="transition-default
    badge absolute -right-3 -top-3 z-10 h-8 md:h-10 w-8 md:w-10 md:uppercase rotate-[30deg] rounded-full font-normal max-md:text-xs group-hover:rotate-0"
    >
      Hot
    </div>
  );
};

const CardGameFavourite = ({
  name,
  image,
  descriptionElement,
  isHot,
  isOutstanding,
  isHotWeek,
  categories,
  numberOfPlayer,
  classNameWrapper,
  classNameImage,
  hideButtonAction = false
}: CardDataPackProps) => {
  const [isFavourite, setIsFavourite] = useReducer((state) => {
    return !state;
  }, false);

  const handleLikeItem = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavourite();
  };

  return (
    <div className={`group relative flex cursor-pointer flex-col justify-start pb-4 max-md:pb-2 gap-4 max-lg:gap-2 ${classNameWrapper}`}>
      {isHot && <Hot />}
      <div className={`transition-default relative  overflow-hidden rounded-[1rem] ${classNameImage}`}>
        <img src={image} alt={name} className={`w-full transition-default object-cover group-hover:scale-110`} />
        {!hideButtonAction && (
          <div className="card-hover absolute bottom-4 right-4">
            <button type="button" onClick={handleLikeItem} className="btn-tertiary btn btn-circle">
              <Svg className="h-6 w-6" src={isFavourite ?  '/icons/line/heart.svg' : '/icons/bold/favorite.svg'} />
            </button>
          </div>
        )}
        {isOutstanding && (
          <div className="absolute bottom-0 left-0">
            <TagOutstanding text={'Game nổi bật'} />
          </div>
        )}
      </div>
      <div className="flex flex-col gap-y-2 max-md:gap-y-0">
        <p className="line-clamp-1 font-bold md:text-base xl:text-xl max-md:text-base">{name}</p>
        {descriptionElement ? (
          <span className="text-neutral-500 md:max-xl:-mt-2 text-sm md:inline max-md:text-xs font-normal">{descriptionElement}</span>
        ) : (
          <>
            <span className="text-neutral-500 md:max-xl:-mt-2 text-sm md:inline max-md:text-xs font-normal">
              {isHotWeek ? 'Hot tuần • ' : ''}
              {categories.length > 0 ? `${categories[0]} • ` : ''}
              {numberOfPlayer ? `${numberOfPlayer} người tham gia` : ''}
            </span>
          </>
        )}
      </div>
    </div>
  );
};

export default CardGameFavourite;
