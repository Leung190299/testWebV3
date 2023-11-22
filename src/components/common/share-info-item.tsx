import clsx from 'clsx';
import React from 'react';

import socials from '@/mock/socials.json';
import Svg from '../icon/svg';
import { useRouter } from 'next/router';

export type ShareInforItemProps = {
  itemName: string;
  itemImage: string;
  itemDesc?: string;

  withLink?: boolean;
  from?: string;
  href?: string;

  onCopy?(): void;
  onShare?(): void;
};

const ShareInforItem = ({ itemImage, itemName, itemDesc, withLink, from, href, onCopy, onShare }: ShareInforItemProps) => {
  const router = useRouter();
  const shareFoundation = (name: string) =>{
    switch (name) {
      case 'facebook':
        router.push(`https://www.facebook.com/sharer/sharer.php?u=${href}`)
        break;
      case 'twitter':
        router.push(`http://www.twitter.com/share?url=${href}`)
        break;
      default:
        break;
    }
  }
  return (
    <div className="space-y-4">
      <div>
        <div className="card flex-row gap-x-3 bg-neutral-50 p-3 text-sm">
          <div className="w-12">
            <div className="card-image block-img block-square">
              <img
                src={itemImage}
                alt={itemName}
                className={clsx(from === 'payment-status' ? 'object-contain' : 'object-contain', 'rounded-lg')}
              />
            </div>
          </div>
          <div className='overflow-hidden'>
            <p>{itemName}</p>
            {itemDesc && <p className="font-medium truncate">{itemDesc}</p>}
          </div>
        </div>
      </div>
      {withLink && (
        <div>
          <p className="font-bold">Đường dẫn</p>
          <div className="mt-2 flex w-full gap-x-2 rounded-lg border border-neutral-300 p-4">
            <p id="test" className="truncate text-subtle-content flex-1">{href}</p>
            <button type="button" onClick={onCopy}>
              <Svg src="/icons/bold/copy.svg" width={24} height={24} />
            </button>
          </div>
        </div>
      )}
      <div>
        <p className="font-bold">Chia sẻ đến</p>
        <ul className="mt-2 flex gap-x-3">
          {socials.map(({ name, icon }) => {
            return (
              <li key={name}>
                <button type="button" className="p-1" data-target={name} data-href={href} onClick={()=> shareFoundation(name)}>
                  <Svg width={32} height={32} src={icon} />
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default ShareInforItem;
