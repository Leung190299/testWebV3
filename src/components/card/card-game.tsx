import React, { ReactNode } from 'react';
import TagOutstanding from '@/components/tag-chip/tag-outstanding';
import { IGame } from '@/pages/igame';

interface CardDataPackProps extends IGame {
  descriptionElement?: ReactNode;
  classNameWrapper?: string;
  classNameImage?: string;
  index?: number;
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

const CardDataPackOutStanding = ({
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
  index
}: CardDataPackProps) => {
  return (
    <div className={`group relative flex cursor-pointer flex-col justify-start gap-2 md:gap-4 ${classNameWrapper}`}>
      {isHot && <Hot />}
      <div className={`transition-default relative  overflow-hidden rounded-[1rem] ${classNameImage}`}>
        <img src={image} alt={name} className={`w-full transition-default object-cover group-hover:scale-110 `} />
        {isOutstanding && (
          <div className="absolute bottom-0 max-md:hidden left-0">
            <TagOutstanding text={'Game nổi bật'} />
          </div>
        )}
      </div>
      <h5 className="card-title line-clamp-1 font-bold md:text-base xl:text-xl">{name}</h5>
      {descriptionElement ? (
        descriptionElement
      ) : (
        <>
          <span className="text-neutral-500 md:max-xl:-mt-2 text-sm hidden md:inline">
            {isHotWeek ? 'Hot tuần • ' : ''}
            {categories.length > 0 ? `${categories[0]} • ` : ''}
            {numberOfPlayer ? `${numberOfPlayer} người tham gia` : ''}
          </span>
          <span className="text-neutral-500 text-sm -mt-2 md:hidden">
            {isHotWeek ? 'Hot tuần • ' : ''}
            {categories.length > 0 ? `${categories[0]}` : ''}
          </span>
        </>
      )}
    </div>
  );
};

export default CardDataPackOutStanding;
