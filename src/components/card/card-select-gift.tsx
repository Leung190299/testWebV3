import React from 'react';
import Svg from '../icon/svg';
import Link from 'next/link';

type CardPolicyProps = {
  logo?: string;
  img?: string;
  url?: string;
  title: string;
  desc?: string;
  logoBg?: string;
};

const CardSelectGift = ({ title, desc, img, logo, url, logoBg }: CardPolicyProps) => {
  const isSvg = logo?.includes('.svg');
  return (
    <article className="group card space-y-6 rounded-3xl border border-neutral-200 p-4 pb-6">
      <div className="card-image relative aspect-cinema overflow-hidden rounded-2xl bg-base-200">
        {logo && (
          <div className="absolute bottom-0">
            <span className="tag tag-vector tag-sale bg-red-500 px-3 py-2.5 text-neutral-0" style={{ backgroundColor: logoBg }}>
              {isSvg ? <Svg className="h-5 w-11" src={logo} /> : <img className="h-5 w-11" src={logo} alt={title} />}
            </span>
          </div>
        )}
      </div>
      <div className="card-body p-0">
        <h5 className="card-title text-xl font-bold text-base-content">{title}</h5>
        <p className="card-desc text-sm">{desc}</p>
      </div>
      {url && (
        <div className="card-actions">
          <Link href={url} className="btn-tertiary btn h-10 w-full rounded-full text-sm">
            Xem thêm
          </Link>
        </div>
      )}
    </article>
  );
};

export default CardSelectGift;
