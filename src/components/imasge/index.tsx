/* eslint-disable jsx-a11y/alt-text */
import React, { ImgHTMLAttributes } from 'react';

interface Props extends ImgHTMLAttributes<HTMLImageElement> {
  source?: { media: string; srcSet: string }[];
}
const Images = ({ source, ...props }: Props) => {
  return (
    <picture>
      {source && source.length > 0 && source.map((item, index) => <source key={index} media={item.media} srcSet={item.srcSet} />)}
      <img {...props} />
    </picture>
  );
};

export default Images;
