import clsx from 'clsx';
import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import * as React from 'react';

type CardNotificationProps = {
  title: string;
  image: StaticImageData;
  description: string;
  dateTime: string;
  link?: string;
  isViewEd?: boolean;
};
const CardNotification = ({ item }: { item: CardNotificationProps }) => {
  const router = useRouter();

  const handlerClick = useCallback(
    (link?: string) => {
      if (!link) return;
      void router.push(link);
    },
    [router]
  );

  return (
    <div
      key={item.title}
      className={clsx(item.isViewEd ? 'bg-neutral-50' : 'bg-neutral-0', ' mb-[2px] md:mb-4 rounded-xl py-4 px-4 md:px-8 md:py-6 flex-1')}
    >
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-row gap-6">
          <Image src={item.image} alt="itel" className="w-[48px] h-[48px] md:w-[80px] md:h-[80px]" />
          <div className="flex flex-col gap-1 w-full overflow-hidden mr-6">
            {item?.link && (
              <Link href={item?.link} className="text-neutral-800 text-base font-bold">
                {item.title}
              </Link>
            )}
            {!item?.link && <p className="text-neutral-800 text-base font-bold">{item.title}</p>}
            <p className="text-sm font-normal text-neutral-700 overflow-hidden [display:-webkit-box] [-webkit-line-clamp:1] [-webkit-box-orient:vertical] ">
              {item.description}
            </p>
            <p className="text-neutral-500 text-xs font-medium">{item.dateTime}</p>
          </div>
        </div>
        <div className="min-w-[9rem] hidden md:flex">
          <button onClick={() => handlerClick(item.link)} className="btn btn-secondary rounded-full w-full">
            Xem chi tiết
          </button>
        </div>
      </div>
    </div>
  );
};
export default CardNotification;
