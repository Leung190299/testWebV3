import React from 'react';

type Props = {
  img?: string;
  alt: string;
  className?: string;
  noti?: number;
};
const DEFAULT_IMAGE = 'https://i.pinimg.com/originals/ba/92/7f/ba927ff34cd961ce2c184d47e8ead9f6.jpg';
const Avatar = ({ img, alt, className = 'w-12 rounded', noti }: Props) => {
  return (
    <div className="avatar">
      <div className={className}>
        <img src={img || DEFAULT_IMAGE} alt={alt} />
      </div>
      {typeof noti == 'number' ? (
        <span className="badge badge-sm badge-center absolute -right-0.5 -top-0.5 w-4 rounded-full ring-1 ring-neutral-0">
          <span>{noti}</span>
        </span>
      ) : null}
    </div>
  );
};

export default Avatar;
