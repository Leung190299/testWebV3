import clsx from 'clsx';
import React from 'react';

export type CardResultItemProps = {
  image?: string;
  title?: string;
  desc?: string;
  secondaryTitle?: string;
  secondaryDesc?: string;

  hideOnMobile?: boolean;
  imageType?: string;
  failed?: boolean;
};

const CardResultItem = ({
  image,
  title,
  desc,
  secondaryDesc,
  secondaryTitle,
  hideOnMobile,
  imageType = 'contain',
  failed
}: CardResultItemProps) => {
  return (
    <div className="flex items-center">
      {image && (
        <div className="mr-2 md:mr-6 w-12 md:w-18">
          <div className="card-image block-img block-square w-full">
            <img src={image} alt={title} className={`rounded-lg bg-neutral-100 object-${imageType}`} />
          </div>
        </div>
      )}
      <div className="flex-1">
        <p className="text-sm md:text-base">
          <b>{title}</b>
        </p>
        <p className="mt-1 md:mt-0 text-xs md:text-sm text-subtle-content">{desc}</p>
      </div>
      {(secondaryTitle || secondaryDesc) && (
        <div className={clsx('flex-1 text-right md:text-left', { 'max-md:hidden': hideOnMobile, 'text-red-500': failed })}>
          <p className="text-sm">
            <b>{secondaryTitle}</b>
          </p>
          <p className="mt-1 md:mt-0 text-xs md:text-sm text-subtle-content">{secondaryDesc}</p>
        </div>
      )}
    </div>
  );
};

export default CardResultItem;
